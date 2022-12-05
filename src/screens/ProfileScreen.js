import '@azure/core-asynciterator-polyfill';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  TextInput,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {Auth, DataStore, Storage} from 'aws-amplify';
import {S3Image} from 'aws-amplify-react-native';
import {Picker} from '@react-native-picker/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {User} from '../models/';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [hasPet, setHasPet] = useState(null);
  const [newImageLocalUri, setNewImageLocalUri] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', authUser.attributes.sub),
      );
      if (!dbUsers || dbUsers.length <= 0) {
        return;
      }
      const dbUser = dbUsers[0];
      setUser(dbUser);
      setName(dbUser.name);
      setBio(dbUser.bio);
      setHasPet(dbUser.hasPet);
    };
    getCurrentUser();
  }, []);

  const isValid = () => {
    if (hasPet != null && bio && name) {
      return true;
    }
    return false;
  };

  const uploadImage = async () => {
    try {
      const response = await fetch(newImageLocalUri);

      const blob = await response.blob();

      const urlParts = newImageLocalUri.split('.');
      const extension = urlParts[urlParts.length - 1];

      const key = `${user.id}.${extension}`;

      await Storage.put(key, blob);

      return key;
    } catch (e) {
      console.log(e);
    }
    return '';
  };

  const save = async () => {
    if (!isValid()) {
      console.warn('not valid, please fill out all fields');
      return;
    }
    let newImage;
    if (newImageLocalUri) {
      newImage = await uploadImage();
    }

    if (user) {
      const updatedUser = User.copyOf(user, updated => {
        // if user already exists in Database so update instead of creating a new user
        updated.name = name;
        updated.bio = bio;
        updated.hasPet = hasPet;
        if (newImage) {
          updated.image = newImage;
        }
      });

      try {
        await DataStore.save(updatedUser);
        setNewImageLocalUri(null);
      } catch (error) {
        console.log('Error saving user', error);
      }
    } else {
      const authUser = await Auth.currentAuthenticatedUser(); //user ID linked from authentication list
      if (!newImageLocalUri) {
        console.warn('Please select an image');
        return;
      }

      const newUser = new User({
        sub: authUser.attributes.sub,
        name: name,
        bio: bio,
        hasPet: hasPet,
        image: newImage,
      });
      try {
        await DataStore.save(newUser);
      } catch (error) {
        console.log('Error saving user', error);
      }
    }

    Alert.alert('User saved succesfully');
  };

  const pickImage = () => {
    launchImageLibrary(
      {mediaType: 'mixed'},
      ({didCancel, errorCode, errorMessage, assets}) => {
        if (didCancel || errorCode) {
          console.warn('canceled or error');
          if (errorCode) {
            console.log(errorMessage);
          }
          return;
        }
        setNewImageLocalUri(assets[0].uri);
      },
    );
  };

  const signOut = async () => {
    Auth.signOut();
  };

  const renderImage = () => {
    if (newImageLocalUri) {
      return <Image source={{uri: newImageLocalUri}} style={styles.image} />;
    }
    if (user?.image?.startsWith('http')) {
      return <Image source={{uri: user?.image}} style={styles.image} />;
    }
    return <S3Image imgKey={user?.image} style={styles.image} />;
  };

  return (
    <SafeAreaView style={styles.root}>
      <ScrollView style={styles.container}>
        <View style={styles.imageChange}>
          {renderImage()}
          <Pressable onPress={pickImage}>
          <Text style={{textDecorationLine: 'underline', color: 'orange'}}> Change Image</Text>
          </Pressable>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Name ..."
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          multiline
          maxLength={500}
          placeholder="bio..."
          value={bio}
          onChangeText={setBio}
        />
        <Text style={{fontSize: 10, paddingLeft: 10,}}>500 characters max</Text>
        <Text style={styles.what}>What do you want to see today?</Text>
        <Picker
          selectedValue={hasPet}
          onValueChange={itemValue => setHasPet(itemValue)}
          style={styles.picker}>
          <Picker.Item label="Select..." value={null} />
          <Picker.Item label="People to care for my pet" value={true} />
          <Picker.Item label="Pets to care for" value={false} />
        </Picker>
      </ScrollView>
      <View style={styles.footer}>
          <Pressable onPress={save} style={styles.button}>
            <Text style={styles.buttonText}>SAVE</Text>
          </Pressable>

          <Pressable onPress={signOut} style={styles.button2}>
            <Text style={styles.buttonText}>SIGN OUT</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 20,
  },
  container: {
    backgroundColor: '#ededed',
  },
  question: { // What do you want to see today?
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Gill Sans',
    color: '#fff4e4',
  },
  footer: { // buttons
    flex: 1,
    marginTop: 'auto',
    backgroundColor: '#ededed',
    paddingHorizontal: 10,
    
  },
  button: { // SAVE BUTTON
    backgroundColor: '#e97a3a',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: 'black',
    borderRadius: 20,
    marginBottom: 12,
  },
  button2: { // SIGN OUT BUTTON
    backgroundColor: 'black',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageChange: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
