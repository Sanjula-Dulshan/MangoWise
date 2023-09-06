import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Variety() {
  return (
    <View style={styles.container}>
      <Text>Market</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#edde30',
  }
})