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

export default class viewprojectrequestpage extends React.Component {
  constructor(props) {
    super(props);
    const takeData = async () => {
            try {
              let projectdata = await this.uploadProjectRequest();
              }catch (err) {
              console.log(err);
            }
       };
  }
  async uploadProjectRequest() {
    try {
      let response = await fetch('http://ec2-3-14-86-69.us-east-2.compute.amazonaws.com/adminProjectRequest', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
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
        <Text style={styles.header}>Project Upload Requests</Text>
        <Text>Display Project Reuests Here  </Text>
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
