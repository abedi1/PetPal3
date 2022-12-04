import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {Auth, API, graphqlOperation} from 'aws-amplify';

dayjs.extend(relativeTime);

const ChatListItem = ({chat, me}) => {
  const navigation = useNavigation();
  //const user = chat.Users.items[0].user;
  const [user, setUser] = useState(null);
  //const [chatRoom, setChatRoom] = useState(chat);

  useEffect(() => {
    const fetchUser = async () => {
      const authUser = await Auth.currentAuthenticatedUser();

      // Loop through chat.users.items and find a user that is not us (Authenticated user)
      const userItem = chat.Users.items.find(item => item.user.id !== me.id);
      setUser(userItem?.user);
    };

    fetchUser();
  }, []);

  return (
    <Pressable
      onPress={() =>
        navigation.navigate('Chat', {id: chat?.id, name: user?.name})
      }
      style={styles.container}>
      {/* User Avatar */}
      <Image source={{uri: user?.image}} style={styles.image} />

      {/* content */}
      <View style={styles.content}>
        <View style={styles.row}>
          <Text style={styles.name} numberOfLines={1}>
            {user?.name}
          </Text>

          {chat.LastMessage && (
            <Text style={styles.subTitle}>
              {dayjs(chat.LastMessage?.createdAt).fromNow(true)}
            </Text>
          )}
        </View>

        <Text style={styles.subTitle} numberOfLines={2}>
          {chat?.LastMessage?.text}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'stretch',
    marginHorizontal: 10,
    marginVertical: 5,
    height: 70,
  },
  image: {
    width: 60,
    aspectRatio: 1,
    borderRadius: 30,
    marginRight: 10,
  },
  content: {
    flex: 1,
    borderBottomColor: 'lightgray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
    flex: 1,
  },
  subTitle: {
    color: 'grey',
  },
});

export default ChatListItem;
