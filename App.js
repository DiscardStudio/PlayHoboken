import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Auth from './screens/Auth.js';

export default function App() {
  fetch('https://play-hoboken.herokuapp.com/', {
    method: 'GET',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
  }).done();

  return (
    <View style={styles.container}>
      <Auth/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
