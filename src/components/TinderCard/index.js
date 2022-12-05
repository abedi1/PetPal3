import React, {useEffect, useState} from 'react';
import {Text, ImageBackground, View, StyleSheet, Button, TouchableOpacity, Alert} from 'react-native';
import {Storage} from 'aws-amplify';
import { set } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Greetings } from 'aws-amplify-react-native/dist/Auth';


const bottomIconSize = 30;

const Card = props => {
  const {name, image, bio} = props.user;
  const [imageUrl, setImageUrl] = useState(image);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  useEffect(()=> {
    if (!image?.startsWith('http')){
      Storage.get(image).then(setImageUrl) // downloads the s3Image
    } else{
      setImageUrl(image);
    }
  }, [image])

  const report = () => {

    Alert.alert(
      'This user has been reported\n\nThe PetPal team will review their account'
      )
    {}
  }


  return (
    <View style={styles.card}>
      
      <Modal
        isVisible={isModalVisible}
        animationInTiming={500}
        animationOutTiming={500}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        onBackdropPress={handleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeadingText}>{name}</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={styles.fullbio}>{bio}</Text>
          </View>
          <View style = {styles.modalFooter}>
            <Button title="Close" onPress={handleModal} color ={'#e97a3a'} borderRadius={100} />
          </View>
        </View>
      </Modal>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        style={styles.image}>
        <TouchableOpacity onPress={report} style={styles.report}>
          <Text style={{fontWeight: 'bold', fontSize: 15, color: '#b5b5b5', margin: 5}}> Report User ! </Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.cardInner}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.button}>
            <TouchableOpacity onPress={handleModal}>
              <Text style={{fontWeight: 'normal', fontSize: 30, color: '#b5b5b5'}}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.bio} numberOfLines={2}>{bio}{'\n'}</Text>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: '#fefefe',

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    marginBottom: 50,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',

    justifyContent: 'flex-end',
  },
  report: {
    flex: 1,
    alignSelf: 'flex-start',
    marginTop: "2%",
    marginLeft: "2%",
    marginBottom: "114%",
    backgroundColor: 'white',
    borderRadius: 70,
    opacity: 0.7
  },
  cardInner: {
   padding: 10,
   backgroundColor: '#b5b5b5',
  },
  button: {
    width: '10%',
    height: '40%',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 100,
    opacity: 0.8,
    alignSelf: 'flex-end',
    position: 'absolute',
    opacity: 0.6,
    
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#b5b5b5',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  bio: {
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
    
  },
  fullbio: { // no max number 
    fontSize: 18,
    color: 'black',
    lineHeight: 25,
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.2,
  },
  modalHeadingText: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: "Gill Sans",
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  modalText: {
    fontSize: 18,
    
  },
  modalBody: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
  },
  modalFooter: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 3,
    flexDirection: 'row',
  },
});

export default Card;
