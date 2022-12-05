import React, {useState, useEffect} from 'react';
import {Text, View, Image, Button, TouchableOpacity, Alert, StyleSheet, SafeAreaView} from 'react-native';
import SignInHeader from './SignInHeader';
import SignTest from './SignTest';


const InitScreen = () => {
    
    const [activeScreen, setActiveScreen] = useState('INIT');

    const renderPage = () =>{
        if (activeScreen === 'INIT') {
            return  (
                <View style={styles.container}>
                    <Image style={styles.image} source={require('../components/initlogo.png')} ></Image>
                    
                    <TouchableOpacity style={styles.button} onPress={() => setActiveScreen('SIGNIN')}>
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
        <SafeAreaView style={styles.container}>
        {renderPage()}
        </SafeAreaView>
    )
    
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e97a3a',


    },
    image: {
        paddingBottom: 15
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
    button: {
        backgroundColor:'#e97a3a',
        borderRadius: 20,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: '#fff4e4',
        overflow:'hidden',
        marginBottom: 8,
        width: 240
    },
    smallText: {
        fontSize: 10, 
        color: 'white',
        textAlign: 'center',
        marginBottom: 80
    }
  });

export default InitScreen;
