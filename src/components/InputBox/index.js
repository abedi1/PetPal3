import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useState} from 'react';
import {API, graphqlOperation, Auth} from 'aws-amplify';
import {createMessage} from '../../graphql/mutations';
import {Match, User} from '../../models';
import {DataStore} from 'aws-amplify';
import React, {useEffect} from 'react';

const InputBox = ({chatroomID}) => {
  const [text, setText] = useState('');
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

  const onSend = async () => {
    console.warn('Send a new message: ', text);

    const newMessage = {
      chatroomID,
      text,
      userID: me.id,
    };

    await API.graphql(graphqlOperation(createMessage, {input: newMessage}));

    setText('');
  };

  return (
    <View style={styles.container}>
      <Icon name="plus" type="font-awesome" size={24} color="royalblue" />
      <TextInput
        value={text}
        onChangeText={setText}
        multiline
        style={styles.input}
      />
      <Icon
        name="send"
        type="font-awesome"
        size={24}
        color="royalblue"
        onPress={onSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    padding: 5,
    alignItems: 'center',
  },
  input: {
    fontSize: 18,

    flex: 1,
    backgroundColor: 'white',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,

    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
  },
  send: {
    backgroundColor: 'royalblue',
    padding: 7,
    borderRadius: 15,
    overflow: 'hidden',
  },
});

export default InputBox;
