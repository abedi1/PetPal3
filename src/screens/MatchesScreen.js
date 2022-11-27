import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList
} from 'react-native';
import users from '../../assets/data/animals';
import {DataStore, Auth} from 'aws-amplify';
import {Match, User} from '../models';
import ChatListItem from '../components/ChatListItem';
//dummy data import 
import bg from '../../assets/images/BG.png';
import Message from '../components/Message';
import messages from '../../assets/data/messages.json';
import chats from '../../assets/data/chats.json';


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
  const [matches, setMatches] = useState([]);
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
    };
    fetchMatches();
  }, [me]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.container}>
        <Text style={{fontWeight: 'bold', fontSize: 24, color: '#F63A6E'}}>
          New Matches
        </Text>
        <View style={styles.users}>
          {matches.map(match => {
            const matchUser =
              match.matchUser1Id === me.id ? match.User2 : match.User1;
            return (
              <View style={styles.user} key={matchUser.id}>
                <Image source={{uri: matchUser.image}} style={styles.image} />
                <Text style={styles.name}>{matchUser.name}</Text>
              </View>
            );
          })}
        </View>
        <FlatList
          data={chats}
          renderItem={({item}) => <ChatListItem chat={item} />}
         // style={{padding: 10}}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flex: 1,
    padding: 10,
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
    fontWeight: 'bold'
  }
});

export default MatchesScreen;
