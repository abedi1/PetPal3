import React, {useState, useEffect} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import {createChatRoom, createChatRoomUser} from '../graphql/mutations';
import {MyQuery} from './matchQueries';
import getCommonChatRoomWithUser from '../serevices/chatRoomServices';

import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Pressable,
  AppRegistry,
} from 'react-native';
import users from '../../assets/data/animals';
import {DataStore, Auth} from 'aws-amplify';
import {Match, User} from '../models';
import ChatListItem from '../components/ChatListItem';
import ChatScreen from './ChatScreen';

//dummy data import
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import messages from '../../assets/data/messages.json';
import chats from '../../assets/data/chats.json';
import {create} from 'react-test-renderer';
import {useNavigation, useRoute} from '@react-navigation/native';

const chat = {
  id: '1',
  user: {
    image:
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/lukas.jpeg',
    name: 'Lukas',
  },
  lastMessage: {
    text: 'Oke',
    createdAt: '07:30',
  },
};

const MatchesScreen = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [matches, setMatches] = useState([]);
  const [me, setMe] = useState(null);
  const navigator = useNavigation();
  const [loading, setLoading] = useState(false);

  pressed = matchUser => async () => {
    //check if the chatroom exists
    //create chatroom
    const existingChatRoom = await getCommonChatRoomWithUser(
      me.id,
      matchUser.id,
    );

    if (existingChatRoom) {
      navigator.navigate('Chat', {
        id: existingChatRoom.id,
        name: matchUser?.name,
      });
      console.log('hello');
      return;
    }
    const newChatRoomData = await API.graphql(
      graphqlOperation(createChatRoom, {input: {}}),
    );

    if (!newChatRoomData.data?.createChatRoom) {
      console.log('Error creating chatroom');
    }
    const newChatRoom = newChatRoomData.data?.createChatRoom;

    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: {chatRoomID: newChatRoom.id, userID: matchUser.id},
      }),
    );

    await API.graphql(
      graphqlOperation(createChatRoomUser, {
        input: {chatRoomID: newChatRoom.id, userID: me.id},
      }),
    );

    //add clicked user to the chatroom
    //add auth user to the chatroom
    navigator.navigate('Chat', {id: newChatRoom.id});
    //navigate to chatroom
  };

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

  const fetchChatRooms = async () => {
    setLoading(true);
    const response = await API.graphql(graphqlOperation(MyQuery, {id: me.id}));

    const rooms = response?.data?.getUser?.chatrooms?.items;
    const sortedRooms = rooms.sort(
      (r1, r2) =>
        new Date(r2.chatRoom.updatedAt) - new Date(r1.chatRoom.updatedAt),
    );
    setChatRooms(sortedRooms);
    setLoading(false);
  };

  useEffect(() => {
    fetchChatRooms();
  }, [me]);

  useEffect(() => {
    if (!me) {
      return;
    }
    const fetchMatches = async () => {
      const result = await DataStore.query(Match, m =>
        m
          .isMatch('eq', true)
          .or(m => m.matchUser1Id('eq', me.id).matchUser2Id('eq', me.id)),
      );
      setMatches(result);
      temp = JSON.parse(JSON.stringify(matches));
      for (match in matches) {
        if (match.matchUser1Id == me.id) {
          const existingChatRoom = await getCommonChatRoomWithUser(
            me.id,
            match.matchUser2Id,
          );
          if (existingChatRoom) {
            temp = temp.filter(item => item !== match);
          }
        } else if (match.matchUser2Id == me.id) {
          const existingChatRoom = await getCommonChatRoomWithUser(
            me.id,
            match.matchUser1Id,
          );
          if (existingChatRoom) {
            temp = temp.filter(item => item !== match);
          }
        }
      }
      setMatches(temp);
    };
    fetchMatches();
  }, [me]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        {matches[0] && (
          <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E', textAlign: 'center',}}>
            New Matches
          </Text>
        )}
        <View style={styles.users}>
          {matches.map(match => {
            const matchUser =
              match.matchUser1Id === me.id ? match.User2 : match.User1;
            return (
              <Pressable
                onPress={this.pressed(matchUser)}
                sytle={styles.container}>
                <View style={styles.user} key={matchUser.id}>
                  <Image source={{uri: matchUser.image}} style={styles.image} />
                  <Text style={styles.name}>{matchUser.name}</Text>
                </View>
              </Pressable>
            );
          })}
        </View>
        <FlatList
          data={chatRooms}
          renderItem={({item}) => <ChatListItem chat={item.chatRoom} me={me} />}
          style ={{backgroundColor: "white"}}
          refreshing={loading}
          onRefresh={fetchChatRooms}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    paddingHorizontal: 10,
  },
  container: {
    padding: 10,
  },
  users: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  user: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 50,

    borderWidth: 2,
    padding: 3,
    borderColor: '#F63A6E',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: {
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default MatchesScreen;
