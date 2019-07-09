import React, { Component } from 'react';
import {Platform, StyleSheet,Text,TextInput,AsyncStorage,View,TouchableOpacity,Button,} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';
import donation from './Donation'
import decker from './decker'
import owndecker from './owndecker'
import {styles} from './styles';
// import console = require('console');

export default class options extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { email: 'hi' };
    // let uemail='hi';
    this.email = '';
  }

    //  console.log(email);
    // console.log('componentWillMount', i++);
  render() {
    userMail = AsyncStorage.getItem('userMail', (err, result) => {
     
      let maill = JSON.parse(result);
      maill = maill.mail;
      
      this.email = maill;
      console.log(this.email);
 });
    return (
      <View style={styles.container}>
      <View style={styles.innerContainer}>
        {/* {console.log(this.state.email)}  */}
        <Text style={styles.header}>Donate or Apply </Text>

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
           this.props.navigation.navigate('owndeck');
                }}
        >
          <Text style={styles.btntext}>Your Project</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('proj');
          }}
        >
          <Text style={styles.btntext}>Requests for Donation</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}
