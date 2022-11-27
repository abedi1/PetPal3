import {View, Text, TextInput, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {useState} from 'react';

const InputBox = () => {
  const [newMessage, setNewMessage] = useState('');

  const onSend = () => {
   console.warn('Send a new message: ', newMessage);

   setNewMessage('');
 };
 
  return (
    <View style={styles.container}>
      <Icon name="plus" type="font-awesome" size={24} color="royalblue" />
      <TextInput
      value={newMessage}
      onChangeText={setNewMessage}
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
