// src/screens/ChatScreen.js
import {useEffect} from 'react';
import {
  ImageBackground,
  StyleSheet,
  FlatList,
  ViewComponent,
  KeyboardAvoidingView,
  View,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import messages from '../../assets/data/messages.json';
import InputBox from '../components/InputBox';
import React from 'react';


const ChatScreen = () => {

  return (
      <KeyboardAvoidingView
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.bg}
        >

        <ImageBackground source={bg} style={styles.bg}>
          <FlatList
            data={messages}
            renderItem={({item}) => <Message message={item} />}
            style={{padding: 10}}
            inverted
          />

        <InputBox />
        </ImageBackground>

      </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  wrapper: {
   // flex: 1,
  },
});

export default ChatScreen;