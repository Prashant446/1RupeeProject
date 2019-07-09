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
      <View style={styles.innerContainer}>
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
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#ededed',
    paddingLeft: 20,
    paddingRight: 20,
  },
  innerContainer: {
    elevation:1,
    backgroundColor:'white',
    alignItems:'center',
    padding:15,
    borderRadius:10
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#59cbbd',
    marginTop: 30,
    marginBottom:20,
    borderRadius: 5,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize:20,
  },
  header: {
    fontSize: 32,
    // color: '#fff',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#012F6F',
    borderBottomWidth: 1,
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    borderBottomColor: '#012F6F',
    borderBottomWidth: 1,
  },
});
