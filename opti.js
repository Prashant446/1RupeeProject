import React, { Component } from 'react';
import {Platform, StyleSheet,Text,TextInput,View,TouchableOpacity,Button,} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import donation from './Donation'
import decker from './decker'

export default class options extends React.Component {
  render() {
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Donate or Apply</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('deck');
          }}>
          <Text style={styles.btntext}>Donate</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('donate');
          }}>
          <Text style={styles.btntext}>Apply for Donations</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#36485f',
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#59cbbd',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  },
});