import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Pressable, View, ActivityIndicator,Text, Image} from 'react-native';
import AnimatedStack from '../components/AnimatedStack';

const SignInHeader = () => {
    return(
        <View style={styles.container}>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Image source={require('../components/logo.png')} ></Image>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom:60,
        justifyContent: 'center',
        alignItems: 'center',
        width: 75,
        height: 200,    
    }
});

export default SignInHeader;