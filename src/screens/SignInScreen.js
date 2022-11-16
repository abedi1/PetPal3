import React, {useState} from 'react';
import CustomButton from '../components/CustomButton';
import CustomInput from '../components/CustomInput';
import SocialSignInButtons from '../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';

import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const {height} = useWindowDimensions();
    const [isUserLoading, setIsUserLoading] = useState(true)
    const [activeScreen, setActiveScreen] = useState('SIGNIN');



    const renderPage = () => {
        if (activeScreen === 'SIGNIN') {
            return <SignInScreen isUserLoading={isUserLoading}/>
          }

        
       }

  

      return (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.root}>
    
            <CustomInput
              placeholder="Username"
              value={username}
              setValue={setUsername}
            />
            <CustomInput
              placeholder="Password"
              value={password}
              setValue={setPassword}
              secureTextEntry
            />
    
            <CustomButton text="Sign In" onPress={() => setActiveScreen('SIGNIN')} />
    
            <CustomButton
              text="Forgot password?"
              onPress={() => setActiveScreen('SIGNIN')}
              type="TERTIARY"
            />
    
            <SocialSignInButtons />
    
            <CustomButton
              text="Don't have an account? Create one"
              onPress={() => setActiveScreen('SIGNIN')}
              type="TERTIARY"
            />

          </View>
        </ScrollView>
        
      );
    };
    
    const styles = StyleSheet.create({
      root: {
        alignItems: 'center',
        padding: 20,
      },
    });
    
export default SignInScreen;