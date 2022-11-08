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
} from 'react-native';
import {Auth, DataStore} from 'aws-amplify';
import {Picker} from '@react-native-picker/picker';
import {User} from '../models/';

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [hasPet, setHasPet] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u => u.sub("eq", user.attributes.sub));
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

  const save = async () => {
    if (!isValid()) {
      console.warn('not valid');
      return;
    }

    if (user) {
      const updatedUser = User.copyOf(user, updated => {
        // if user already exists in Database so update instead of creating a new user
        updated.name = name;
        updated.bio = bio;
        updated.hasPet = hasPet;
      });

      try {
        await DataStore.save(updatedUser);
      } catch (error) {
        console.log('Error saving user', error);
      }
    } else {
      const authUser = await Auth.currentAuthenticatedUser(); //user ID linked from authentication list

      const newUser = new User({
        sub: authUser.attributes.sub,
        name: name,
        bio: bio,
        hasPet: hasPet,
        image:
          'https://images.unsplash.com/photo-1570314032164-6a08c8fa63d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YnVsbGRvZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1200&q=60',
      });
      try {
        await DataStore.save(newUser);
      } catch (error) {
        console.log('Error saving user', error);
      }
    }

    Alert.alert('User saved succesfully');
  };

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Name ..."
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          multiline
          numberOfLines={3}
          placeholder="bio..."
          value={bio}
          onChangeText={setBio}
        />
        <Text>Do you Have a Pet?</Text>
        <Picker
          selectedValue={hasPet}
          onValueChange={itemValue => setHasPet(itemValue)}>
          <Picker.Item label="Select..." value={null} />
          <Picker.Item label="Yes" value={true} />
          <Picker.Item label="No" value={false} />
        </Picker>

        <Pressable onPress={save} style={styles.button}>
          <Text>Save</Text>
        </Pressable>

        <Pressable onPress={() => Auth.signOut()} style={styles.button}>
          <Text>Sign out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
  },
  container: {
    padding: 10,
  },
  button: {
    backgroundColor: '#F63A6E',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
  },
  input: {
    margin: 10,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
});

export default ProfileScreen;
