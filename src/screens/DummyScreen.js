import { View, Text } from 'react-native'
import React from 'react'

const DummyScreen = () => {
    console.log("ran this screen")
  return (
    <View style={{backgroundColor:'green', flex: 1}}>
      <Text>DummyScreen</Text>
    </View>
  )
}

export default DummyScreen