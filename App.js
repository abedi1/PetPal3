import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Pressable, View, ActivityIndicator} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Amplify, Hub} from 'aws-amplify';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import awsconfig from './src/aws-exports';
import ProfileScreen from './src/screens/ProfileScreen';

Amplify.configure({
  awsconfig,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const color = '#b5b5b5';
  const activeColor = '#f07c3c';
  const topIconSize = 30;
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [isUserLoading, setIsUserLoading] = useState(true)

  useEffect(() => {
    const listener = Hub.listen('datastore', async hubData => {
      const {event, data} = hubData.payload;
      if (event === 'modelSynced' && data?.model?.name === 'User') {
        console.log('User Model has finished syncing');
        setIsUserLoading(false);
      }
    });

    return () => listener(); //removes listener when apllication closes
  }, []);

 const renderPage = () =>{
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
    <SafeAreaView style={styles.root}>
      <GestureHandlerRootView style={styles.pageContainer}>
        <View style={styles.topNavigation}>
          <Pressable onPress={() => setActiveScreen('HOME')}>
            <MaterialIcons
              name="pets"
              size={topIconSize}
              color={activeScreen === 'HOME' ? activeColor : color}
            />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('LIKES')}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={topIconSize}
              color={activeScreen === 'LIKES' ? activeColor : color}
            />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('CHAT')}>
            <Ionicons
              name="ios-chatbubbles"
              size={topIconSize}
              color={activeScreen === 'CHAT' ? activeColor : color}
            />
          </Pressable>

          <Pressable onPress={() => setActiveScreen('PROFILE')}>
            <FontAwesome
              name="user"
              size={topIconSize}
              color={activeScreen === 'PROFILE' ? activeColor : color}
            />
          </Pressable>
        </View>

        {renderPage()}

      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  pageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
  },
});

const signUpConfig = {
  header: "SIGN UP",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    
  ],
};

const signInConfig = {
  header: "SIGN IN",
  hideAllDefaults: true,
  signInFields: [
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
    
  ],
};

const customTheme = {
  ...AmplifyTheme,
  sectionHeader: {
		width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
		marginBottom: 32,
		paddingTop: 20,
	},
  button: {
    ...AmplifyTheme.button,
  }
};

export default withAuthenticator(App, {signInConfig, signUpConfig, theme: customTheme});
