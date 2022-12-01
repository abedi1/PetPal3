import React, {useEffect, useState} from 'react';
import {Text, ImageBackground, View, StyleSheet} from 'react-native';
import {Storage} from 'aws-amplify';
import { set } from 'react-native-reanimated';

const Card = props => {
  const {name, image, bio} = props.user;
  const [imageUrl, setImageUrl] = useState(image);

  useEffect(()=> {
    if (!image?.startsWith('http')){
      Storage.get(image).then(setImageUrl) // downloads the s3Image
    } else{
      setImageUrl(image);
    }
  }, [image])


  return (
    <View style={styles.card}>
      <ImageBackground
        source={{
          uri: imageUrl,
        }}
        style={styles.image}>
        
      </ImageBackground>
      <View style={styles.cardInner}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.bio}>{bio}</Text>
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
  cardInner: {
     //marginBottom: 350,
   padding: 10,
   backgroundColor: '#b5b5b5',
   //opacity: 0.7,
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#b5b5b5',
  },
  bio: {
    fontSize: 18,
    color: 'white',
    lineHeight: 25,
    backgroundColor:'black',
  },
});

export default Card;
