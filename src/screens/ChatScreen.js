// src/screens/ChatScreen.js
import {useEffect, useState} from 'react';
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
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {getChatRoom} from '../graphql/queries';
import {Match, User} from '../models';
import {DataStore} from 'aws-amplify';


const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const chatroomID = route.params.id;

  const [me, setMe] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, u =>
        u.sub('eq', user.attributes.sub),
      );
      if (!dbUsers || dbUsers.length <= 0) {
        setMe(null);
        return;
      }
      setMe(dbUsers[0]);
    };
    getCurrentUser();
  }, []);
  //console.log(me);

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, {id: chatroomID})).then(result =>
      setChatRoom(result.data?.getChatRoom),
    );
  }, []);

  useEffect(() => {
    navigation.setOptions({title: route.params.name});
  }, [route.params]);

  console.log(chatRoom);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90}
      style={styles.bg}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList
          data={chatRoom?.Messages?.items}
          renderItem={({item}) => <Message message={item} me={me.id} />}
          style={{padding: 10}}
          inverted
        />

        <InputBox chatroomID={chatroomID} />
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },

  wrapper: {
   // flex: 1,
  },
});

export default ChatScreen;