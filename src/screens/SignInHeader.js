import 'react-native-gesture-handler';
import '@azure/core-asynciterator-polyfill';
import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, Pressable, View, ActivityIndicator,Text, Image} from 'react-native';
import AnimatedStack from '../components/AnimatedStack';

const SignInHeader = () => {
    return(
        <SafeAreaView style={styles.container}>

        <Image source={require('../components/logo.png')} ></Image>

        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        <Text>  </Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom:100,
        paddingHorizontal: 200,
        justifyContent: 'center',
        alignItems: 'center',
        width: "50%",
        height: "5%",   
    }
});

export default SignInHeader;
