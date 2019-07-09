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
import {styles} from './styles';
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
      <View style={styles.innerContainer}>
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
      </View>
    );
  }
}

