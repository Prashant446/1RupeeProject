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
import {styles} from './styles';

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
          <Text style={styles.btntext}>Your Projects</Text>
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

