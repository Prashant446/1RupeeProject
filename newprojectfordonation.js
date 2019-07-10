import React, { Component } from 'react';
import {Platform, StyleSheet,Text,TextInput,View,TouchableOpacity,Button,} from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions';
import {styles} from './styles';

type props={};
let global = {
  name:'',
  longdescription: '', 
  shortdescription: '',
  image64:'' 
}
export class project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: '', longdescription: '', shortdescription: '', image64:''  };
  }


  render() {
  
    return (
      <View style={[styles.container, {backgroundColor:'white'}]}>
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
        <View style={style.textAreaContainer}>
          <TextInput
            style={style.textArea}
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
          onPress= {this._pickImage}
        >
        <Text style={styles.btntext}> Add Image </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            global.name=this.state.name;
            global.longdescription=this.state.longdescription;
            global.shortdescription=this.state.shortdescription;
            global.image64 = this.state.image64;
            this.props.navigation.navigate('ban');
          }}>
          <Text style={styles.btntext}> Proceed </Text>
        </TouchableOpacity>
      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      base64: true
    });

    // console.log(result.base64);

    if (!result.cancelled) {
      this.setState({ image64: result.base64 });
    }
  };
  _
}


export class bank extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bankno: '', ifsccode: '', education: '',name:global.name , image64:global.image64, longdescription:global.longdescription ,shortdescription: global.shortdescription};
  }


  async newUser(data) {
    try {
      let response = await fetch('http://ec2-3-14-86-69.us-east-2.compute.amazonaws.com/addProject', {
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
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Enter Bank Details</Text>
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
          <Text style={styles.btntext}>Submit</Text>
        </TouchableOpacity>
      </View>
      </View>
    );
  }
}

const style = StyleSheet.create({
  textAreaContainer: {
    borderColor: '#ededed',
    borderWidth: 1,
    padding: 5,
    alignSelf: 'stretch',
  },
  textArea: {
    height: 150,
    width:230,
  },
});
