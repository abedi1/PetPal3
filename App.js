import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import HomeScreen from './src/screens/HomeScreen';
import MatchesScreen from './src/screens/MatchesScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import Icon from 'react-native-vector-icons/FontAwesome'
const App = () => {
  const color = '#b5b5b5';
  return (
    <GestureHandlerRootView style={styles.pageContainer}>
      <HomeScreen/>
    </GestureHandlerRootView>
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

export default App;
