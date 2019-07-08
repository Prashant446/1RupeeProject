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
import signupform from './App'
import viewmoneyrequestpage from './Viewmoney'
import viewprojectrequestpage from './Viewproject'
import loginform from './Loginforms'
import options from './opti'

// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'
export default class adminpage extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Admin</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => 
          {
            this.props.navigation.navigate('viewprojectrequest');
          }}
        >
          <Text style={styles.btntext}>Project Upload Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('viewmoneyrequest');
          }}
        >
          <Text style={styles.btntext}>Money Pull Requests</Text>
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
  header: {
    fontSize: 24,
    color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
  },

});
