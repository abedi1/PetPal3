import React, {useState, useEffect} from 'react';
import {SafeAreaView, Text, View, Image, Button, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, LogBox} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InitScreen from './src/screens/InitScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import Navigator from './src/navigation/index';
  

const App = () => {
  LogBox.ignoreAllLogs();//Ignore all log notifications

  const [activeScreen, setActiveScreen] = useState('INIT');
  const [isUserLoading, setIsUserLoading] = useState(true)

  const renderPage = () =>{
    if (activeScreen === 'INIT') { // This is the only thing that runs
      return <InitScreen/>
    }

    if (activeScreen === 'HOME'){
      return <HomeScreen isUserLoading={isUserLoading}/>
    }
  
    if (isUserLoading){
      return <ActivityIndicator style ={{flex:1}}/>
    }
  
    if (activeScreen === 'CHAT'){
      return <Navigator/>;
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
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e97a3a',
    },
    header: {
      flex: 1,
      flexDirection: 'row'
    },
    
  });

export default App;
