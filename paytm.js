import React, { Component } from 'react';
import {Modal,WebView,Platform, StyleSheet,Text,TextInput,View,TouchableOpacity,Button,} from 'react-native';

import {styles} from './styles';

export default class paytm extends React.Component {
state = {
showModal: false,
ack: "",
ORDER_ID:"ASAFADFERGASKHDBFHJSNDByuhdakjJ",
TXN_AMOUNT:"500",
CUST_ID:"Aditya123",
}

  render() {
  let {showModal,ack,ORDER_ID,TXN_AMOUNT,CUST_ID}= this.state;
    return (
      <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Paytm</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.setState({
             showModal:true, 

            })
          }}>
          <Text style={styles.btntext}>Pay with Paytm</Text>
        </TouchableOpacity>
      <Modal
    visible = {showModal}
    onRequestClose =  {() => this.setState({
      showModal:false
    })} 
  >
      <WebView
        source={{uri:'http://172.17.74.169:3009/api/paytm/request'}}
        injectedJavaScript={`document.getElementById('ORDER_ID').value = "${ORDER_ID}";
        document.getElementById('TXN_AMOUNT').value = "${TXN_AMOUNT}";
        document.getElementById('CUST_ID').value = "${CUST_ID}";
        document.f1.submit();
        `}
      />
      </Modal>
      </View>
      </View>
    );
  }
}