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