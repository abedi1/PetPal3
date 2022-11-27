import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {View} from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import MatchesScreen from '../screens/MatchesScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Chats">
        <Stack.Screen
          name="Chats"
          component={MatchesScreen} />
  <Stack.Screen name="Chat" component={ChatScreen} /> 
    </Stack.Navigator> */}
      <MatchesScreen />
      {/* <ChatScreen /> */}
    </NavigationContainer>
  );
};

export default Navigator;
