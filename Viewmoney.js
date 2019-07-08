import React, { Component } from 'react';
import {
  Platform,
  Button,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';

import adminpage from './Admin'
import signupform from './App'
import viewprojectrequestpage from './Viewproject'
import loginform from './Loginforms'
import options from './opti'
// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'
export default class viewmoneyrequestpage extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Money Pull Requests</Text>
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

});
