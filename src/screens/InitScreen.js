import React, {useState, useEffect} from 'react';
import {Text, View, Image, Button, TouchableOpacity, Alert, StyleSheet} from 'react-native';
import SignInHeader from './SignInHeader';
import SignTest from './SignTest';


const InitScreen = () => {
    
    const [activeScreen, setActiveScreen] = useState('INIT');

    const renderPage = () =>{
        if (activeScreen === 'INIT') {
            return  (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../components/initlogo.png')} ></Image>
                    
                    <TouchableOpacity style={styles.buttonz1} onPress={() => setActiveScreen('SIGNIN')}>
                        <Text style={styles.buttonText}>GET STARTED</Text>
                     </TouchableOpacity>

                     <Text style={styles.smallText}>By creating an account or logging in, you agree to our extensive Terms of Service and Privacy Policy</Text>
                     
                </View>
        
            )
          }
      
        if (activeScreen === 'SIGNIN') {
            return (
                <View  style={styles.container}>
                    <SignInHeader/>
                    <SignTest />
                </View>   
            )
        }
    }

    return (
        <View style={styles.container2}>
        {renderPage()}
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
    container2: {
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical:20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e97a3a',
    },
    image: {
        paddingBottom: 15
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
        fontWeight: '500',
        fontSize: 20,
        color: 'black',
        paddingHorizontal:40,
        paddingVertical: 7
        
    },
    buttonz1: {
        backgroundColor:'#e97a3a',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#fff4e4',
        overflow:'hidden',
        marginBottom: 8,
        width: 240
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
        marginBottom: 145,
    },
    smallText: {
        fontSize: 10, 
        color: 'white',
        textAlign: 'center',
        marginBottom: 80
    }
  });

export default InitScreen;
