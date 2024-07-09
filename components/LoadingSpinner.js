import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React from 'react'

export default function LoadingSpinner() {
  return (
    <View style={styles.container}>
    <ActivityIndicator size="large" color="purple" />
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'pink',
      },
})