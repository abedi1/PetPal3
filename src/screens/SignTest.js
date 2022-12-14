import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Pressable,
  View,
  ActivityIndicator,
  Text
} from 'react-native';

import HomeScreen from './HomeScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Amplify, Hub, DataStore, Auth} from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import awsconfig from '../aws-exports';
import ProfileScreen from './ProfileScreen';
import {User} from '../models';
import Navigator from '../navigation/index';

Amplify.configure({
  awsconfig,
  Analytics: {
    disabled: true,
  },
});

const SignTest = () => {
  const color = '#b5b5b5';
  const activeColor = 'black';
  const topIconSize = 30;
  const [activeScreen, setActiveScreen] = useState('HOME');
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [me, setMe] = useState(null);

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

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', user.attributes.sub),
      );
      if (!dbUsers || dbUsers.length <= 0) {
        setMe(null);
        setActiveScreen('PROFILE'); // If they don't have an account make the default screen be profile.
        return;
      }
      setMe(dbUsers[0]);
    };
    getCurrentUser();
  }, [isUserLoading]);

  const renderPage = () => {
    if (activeScreen === 'HOME') {
      return <HomeScreen isUserLoading={isUserLoading} />;
    }

    if (isUserLoading) {
      return <ActivityIndicator style={{flex: 1}} />;
    }

    if (activeScreen === 'CHAT') {
      return <Navigator/>
    }

    if (activeScreen === 'PROFILE') {
      return <ProfileScreen />;
    }
  };

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
    width: '100%',
  },
  pageContainer: {
    flex: 1,
  },
  topNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    padding: 10,
    backgroundColor: '#e97a3a',
  },
});

export default withAuthenticator(SignTest);
