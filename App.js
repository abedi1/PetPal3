import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill'
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Pressable, View} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Amplify} from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react-native';
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
  const activeColor = '#F76C6B';
  const topIconSize = 30;
  const [activeScreen, setActiveScreen] = useState('HOME');
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
        {activeScreen === 'HOME' && <HomeScreen />}
        {activeScreen === 'CHAT' && <MatchesScreen />}
        {activeScreen === 'PROFILE' && <ProfileScreen />}
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

export default withAuthenticator(App);
