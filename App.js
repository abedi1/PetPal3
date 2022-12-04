import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Image, Button, TouchableOpacity, Alert, StyleSheet, ActivityIndicator} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InitScreen from './src/screens/InitScreen';
//import SignInScreen from './src/screens/SignInScreen';
import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import SignTest from './src/screens/SignTest';
//import SignTest2 from './src/screens/SignTest2';
import SignInHeader from './src/screens/SignInHeader';


  

const App = () => {

  const [activeScreen, setActiveScreen] = useState('INIT');
  const [isUserLoading, setIsUserLoading] = useState(true)

  const renderPage = () =>{
    if (activeScreen === 'INIT') {
      return <InitScreen/>
    }

    if (activeScreen === 'SIGNIN') {
      return <SignInScreen isUserLoading={isUserLoading}/>
    }
  
    if (activeScreen === 'TEST'){
      return (
        <View  style={styles.container}>
          <SignInHeader style={styles.header}></SignInHeader>
          <SignTest style={styles.signin} isUserLoading={isUserLoading}/>
        </View>
      )
    }

    if (activeScreen === 'HOME'){
      return <HomeScreen isUserLoading={isUserLoading}/>
    }
  
    if (isUserLoading){
      return <ActivityIndicator style ={{flex:1}}/>
    }
  
    if (activeScreen === 'CHAT'){
      return <MatchesScreen/>
    }
    if (activeScreen === 'PROFILE'){
      return <ProfileScreen/>
    }
   }

   
    return (
      <SafeAreaView style={styles.container}>
        {renderPage()}
        </SafeAreaView>
       
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      //paddingHorizontal: 50,
      //paddingVertical:20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ededed',
    },
    header: {
      flex: 1,
      flexDirection: 'row'
    },
    signin: {
      flex: 3,
      flexDirection: 'row'
    },
    main: {
        fontFamily: "Gill Sans",
        fontSize: 45,
        fontWeight: "bold",
        color: 'white',
        marginBottom: 8
        
    },
    buttonText1: {
        textAlign: 'center',
        fontFamily: "Gill Sans",
        fontSize: 20,
        color: 'white',
        paddingHorizontal:60,
        paddingVertical:4
        
    },
    buttonText2: {
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
        marginBottom: 8,
        marginHorizontal:10
    }
  });

export default App;
