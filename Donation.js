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
import {bank,project} from './newprojectfordonation'
import paytm from './paytm.js'
import decker from './decker'
// import {
//   Header,
// } from 'react-component';
// import 
//   HHeader
//  rom './HHeader.js'
export default class donations extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Apply for Donation</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
           this.props.navigation.navigate('deck');
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
