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
import viewmoneyrequestpage from './Viewmoney'
import viewprojectrequestpage from './Viewproject'
import signupform from './App'
import options from './opti'
// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'
export default class loginform extends React.Component {
  constructor(props) {
    super(props);
    this.state = { password: '', email: '' };
  }
  async checkUser(data) {
    try {
      let response = await fetch('http://ec2-3-14-86-69.us-east-2.compute.amazonaws.com/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
    
      <View style={styles.container}>
        <Text style={styles.header}>Login</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your email"
          underlineColorAndroid={'transparent'}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your Password"
          secureTextEntry={true}
          underlineColorAndroid={'transparent'}
          onChangeText={password => this.setState({ password })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            try {
              let isadmin = await this.checkUser(this.state);
              if (isadmin.val == 'admin') {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'admin' })
              ],
            }))
              } else if (isadmin.val == 'user') {
            this.props.navigation.dispatch(StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'option' })
               ],
            }))
          
              } else if (isadmin.val == 'nouser') {
                alert('Login failed');
                this.props.navigation.navigate('login');
              }
            } catch (err) {
              console.log(err);
            }
          }}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.props.navigation.navigate('signup');
          }}>
          <Text style={styles.btntext}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      // </View>
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
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
});
