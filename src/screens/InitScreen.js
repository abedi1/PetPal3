import React, {useState, useEffect} from 'react';
import {Text, View, Image, Button, TouchableOpacity, Alert, StyleSheet} from 'react-native';

const InitScreen = () => {

    return  (
        <View style={styles.container}>
            <Text style={styles.main}>
                PetPal</Text>
            <Image
                source={{
                    uri: 'https://cdn.pixabay.com/photo/2016/04/07/18/57/silhouette-1314467__340.png',  
                }}
                style={styles.img}
            />
            <Text style={styles.smallText}>By creating an account or logging in, you agree to our extensive Terms of Service and Privacy Policy</Text>
            <TouchableOpacity style={styles.buttonz1} onPress={() => Alert.alert('Left button pressed')}>
                <Text style={styles.buttonText}>SIGN UP</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.buttonz2} onPress={() => Alert.alert('Left button pressed')}>
                <Text style={styles.buttonText}>SIGN IN</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.forgot} onPress={() => Alert.alert('Left button pressed')}>
                <Text style={{fontSize: 15, color: 'white',}}>Forgot your password?</Text>
             </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e97a3a',


    },
    main: {
        fontFamily: "Gill Sans",
        fontSize: 45,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 8
        
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: "Gill Sans",
        fontSize: 20,
        color: 'white',
        paddingHorizontal:60,
        paddingVertical:4
        
    },
    buttonz1: {
        backgroundColor:'#e97a3a',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        color: 'black',
        overflow:'hidden',
        underlayColor: 'black',
        marginBottom: 8,
        width: 210
    },
    buttonz2: {
        backgroundColor:'#e97a3a',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        color: 'black',
        overflow:'hidden',
        underlayColor: 'black',
        marginBottom: 8,
        width: 250
    },
    forgot: {
        backgroundColor:'#e97a3a',
    },
    img: {
        alignSelf: 'center',
        width: 110, 
        height: 110,
        marginBottom: 175,
    },
    smallText: {
        fontSize: 10, 
        color: 'white',
        textAlign: 'center',
        marginBottom: 8
    }
  });

export default InitScreen;