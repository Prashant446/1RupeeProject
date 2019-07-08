import React, { Component } from 'react';
import {Platform, StyleSheet,Text,TextInput,View,TouchableOpacity,Button,} from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  StackActions,
  NavigationActions,
} from 'react-navigation';

type props={};
let global = {
  name:'',
  longdescription: '', 
  shortdescription: '' 
}
export class project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', longdescription: '', shortdescription: '' };
  }
  render() {
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Registration for Organisations</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Name of organisation"
          underlineColorAndroid={'transparent'}
          onChangeText={name => this.setState({ name })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="short description"
                numberOfLines={10}
            multiline={true}
          underlineColorAndroid={'transparent'}
          onChangeText={shortdescription => this.setState({ shortdescription })}
        />
        <View style={styles.textAreaContainer}>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Brief Description"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
            onChangeText={longdescription => this.setState({ longdescription })}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            global.name=this.state.name;
            global.longdescription=this.state.longdescription;
            global.shortdescription=this.state.shortdescription;
            this.props.navigation.navigate('ban');
          }}>
          <Text style={styles.btntext}>Proceed to Bank Details</Text>
        </TouchableOpacity>
      </View>
    );
  }
}


export class bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bankno: '', ifsccode: '', education: '',name:global.name ,longdescription:global.longdescription ,shortdescription: global.shortdescription};
  }


  async newUser(data) {
    try {
      let response = await fetch('http://ec2-3-14-86-69.us-east-2.compute.amazonaws.com/', {
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
        <Text style={styles.header}>SIGN UP</Text>
        <TextInput
          style={styles.textinput}
          placeholder="Your Account No"
          underlineColorAndroid={'transparent'}
          onChangeText={bankno => this.setState({ bankno })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your IFSC Code"
          underlineColorAndroid={'transparent'}
          onChangeText={ifsccode => this.setState({ ifsccode })}
        />
        <TextInput
          style={styles.textinput}
          placeholder="Your Educational Qualifications"
          underlineColorAndroid={'transparent'}
          onChangeText={education => this.setState({ education })}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
  
            this.newUser(this.state);
            this.props.navigation.navigate('proj');
          }}>
          <Text style={styles.btntext}>Sign Up</Text>
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
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 10,
    borderBottomColor: '#f8f8f8',
    borderBottomWidth: 1,
  },
  textAreaContainer: {
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
  },
  textArea: {
    height: 150,
    width:230,
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

