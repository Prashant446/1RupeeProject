import React from 'react';
import { Platform, KeyboardAvoidingView, Text,Modal,WebView,AsyncStorage, TextInput, View, Dimensions,StyleSheet, Image, Animated, PanResponder, ActivityIndicator, ScrollView, TouchableWithoutFeedback , TouchableOpacity} from 'react-native';
import {styles} from './assets/styles/styles'

const SCREEN_HEIGHT = Dimensions.get('window').height
const SCREEN_WIDTH = Dimensions.get('window').width
import Icon from 'react-native-vector-icons/Ionicons'
import { AuthSession } from 'expo';
// const Users = [
//   { id: "1", uri: require('./assets/1.jpg') },
//   { id: "2", uri: require('./assets/2.jpg') },
//   { id: "3", uri: require('./assets/3.jpg') },
//   { id: "4", uri: require('./assets/4.jpg') },
//   { id: "5", uri: require('./assets/5.jpg') },
// ]
let global={
  money : 0,
  email : '',
  date : '',
};
 
function conversion(date){
  for(var i = 0; i < date.length; i++){
    if(date[i] == '/'){
      date = date.substr(0 , i) + '-' + date.substr(i + 1);
    }
  };
  return date;
};
global.date = new Date(Date.now()).toLocaleString();
global.date = conversion(global.date); 

export class Decker extends React.Component {

  constructor() {
    super();

    this.position = new Animated.ValueXY();
    this.swipedPosition = new Animated.ValueXY({ x: -SCREEN_WIDTH-100, y:0 });
    this.gestPosition = new Animated.ValueXY();
    this.state = {
      currentIndex: 0,
      isLoading: true,
    }
    this.lastIndex = 4

    this.rotate = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0],
      outputRange: ['-10deg', '0deg'],
      extrapolate: 'clamp'
    })
    this.cardOpacity = this.gestPosition.x.interpolate({
        inputRange: [0,SCREEN_WIDTH / 2],
        outputRange: [1, 0.5],
        extrapolate: 'clamp'
      })
    this.cardScale = this.gestPosition.x.interpolate({
        inputRange: [0,SCREEN_WIDTH / 2],
        outputRange: [1, 0.8],
        extrapolate: 'clamp'
      })
    this.swipedRotate = this.swipedPosition.x.interpolate({
        inputRange: [-SCREEN_WIDTH / 2, 0],
        outputRange: ['-10deg','0deg'],
        extrapolate: 'clamp'
    })

    this.rotateAndTranslate = {
      opacity: this.cardOpacity,  
      
      transform: [{
        rotate: this.rotate,
        
      },
      {
        scale: this.cardScale
      },
      ...this.position.getTranslateTransform()
      ]
    }

    this.swipedTrasnform = {
        transform: [{
            rotate: this.swipedRotate
        },
        ...this.swipedPosition.getTranslateTransform()
        ]
    }

    this.nextCardOpacity = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    })
    this.nextCardScale = this.position.x.interpolate({
      inputRange: [-SCREEN_WIDTH / 2, 0],
      outputRange: [1, 0.8],
      extrapolate: 'clamp'
    })
  }

  componentWillMount() {
    userMail = AsyncStorage.getItem('userMail', (err, result) => {
     
      let maill = JSON.parse(result);
      maill = maill.mail;
      // console.log(maill);
      global.email = maill ;
    })
    fetch('http://172.17.73.189:8080/projects')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(JSON.stringify(responseJson));
        var arr = Object.keys(responseJson).map((k) => { return {id:k ,...responseJson[k]} });
        // console.log(arr);
        this.setState({
          isLoading: false,
          dataSource: arr,
        })
        this.lastIndex = arr.length - 1;
       })
      .catch((error) =>{
        console.error(error);
      });
    
    this.PanResponder = PanResponder.create({

    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      
        if(gestureState.dx<0) {
            this.position.setValue({ x: gestureState.dx, y: gestureState.dy });
        }
        else if(gestureState.dx>0 && this.state.currentIndex > 0) {
            this.swipedPosition.setValue({ x:-SCREEN_WIDTH - 100 + gestureState.dx, y: 0})
        }
        this.gestPosition.setValue({ x: gestureState.dx, y: gestureState.dy })
    },
    onPanResponderRelease: (evt, gestureState) => {

        if (gestureState.dx > 120) {    // swipe right (load previous card)  
          Animated.timing(this.swipedPosition, {
              toValue: { x:0, y:0 },
              duration: 150
          }).start(() => {
              this.setState({ currentIndex: (this.state.currentIndex) ? this.state.currentIndex - 1: 0 }, () => {
                this.position.setValue({ x: 0, y: 0 })
                this.swipedPosition.setValue({ x:-SCREEN_WIDTH-100, y:0 })
                this.gestPosition.setValue({ x: 0, y: 0 })
            });
          });
        }
        else if (gestureState.dx < -120 && this.state.currentIndex < this.lastIndex) { 
           // swipe left (load next card)
            Animated.timing(this.position, {
                toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
                duration: 150
            }).start(() => {
              this.setState({ currentIndex: (this.state.currentIndex<this.lastIndex) ? this.state.currentIndex + 1:this.lastIndex },
              () => {
                this.position.setValue({ x: 0, y: 0 })
                this.swipedPosition.setValue({ x:-SCREEN_WIDTH-100, y:0})
                this.gestPosition.setValue({ x: 0, y: 0 })
              });
            });   
        }

        else {
          Animated.spring(this.position, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()
          Animated.spring(this.gestPosition, {
            toValue: { x: 0, y: 0 },
            friction: 4
          }).start()

          Animated.spring(this.swipedPosition, {
            toValue: { x: -SCREEN_WIDTH - 100, y: 0 },
            friction: 4
          }).start()
        }
      }
    })
  }

  onFocus = () => {
    this.setState({
        backgroundColor: 'green'
    })
  }

  onBlur = () => {
    this.setState({
      backgroundColor: '#ededed'
    })
  }
  _renderHeader= (item) => {

    return(
      <View style={styles.cardHeader}>
        <Text 
          style={styles.projectName}>{item.projectName}</Text>
      </View>
    )
  }

  _renderContent = (item) => {

    return(
      <View style={styles.cardContent}>
      <ScrollView >
        <TouchableWithoutFeedback>
          <View style={{padding:3}}>
          <Text style={styles.genText}>Short Desc- {item.shortDescription}</Text>
              {/* <Text style={styles.genText}>Account NO.- {item.accountNo}</Text> */}
              {/* <Text style={styles.genText}>IFSC Code- {item.ifscCode}</Text> */}
              <Text style={styles.genText}>Total Amount- {item.projectbalance}</Text>
              <Text style={styles.genText}>Education Qualification- {item.education}</Text>
              {/* <Text style={styles.genText}>Total Withdrawn Amount- {item.projectwithdrawn}</Text> */}
              {/* <Text style={styles.genText}>Requested Amount- {item.requestedbalance}</Text> */}
              <Text style={styles.genText}>Long Desc- {item.longDescription}</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      </View>
    )
  }

  _renderFooter = () => {

    return(
      <View style={styles.cardFooter}>
        <TextInput
          adjustsFontSizeToFit={true}
          numberOfLines={1}
          placeholder="Enter Amount"
          editable = {true}
          keyboardType = "number-pad"
          style={styles.textInput}
          onChangeText={(text) => this.setState({amount:text})}/>
        <TouchableOpacity style={styles.submitButton} 
          onPress={() => {
            global.money = this.state.amount;
            this.props.navigation.navigate('pay');
          }}
        >
          <View style={{}}>
            <Text
              style={{fontSize:15, color:'#efefef'}}>Contribute</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderUsers = () => {

    if(this.state.isLoading==true)
      return(
          <ActivityIndicator/>
      );

    return this.state.dataSource.map((item, i) => {
      if (i==this.state.currentIndex - 1){

          return (
            <Animated.View
            key={item.id} style={[this.swipedTrasnform, styles.card]}>
            {this._renderHeader(item)}
            {this._renderContent(item)}
          </Animated.View>
          )
      }
      else if (i == this.state.currentIndex) {

        return (
          <Animated.View
            {...this.PanResponder.panHandlers}
            key={item.id} style={[this.rotateAndTranslate, styles.card]}>
            {this._renderHeader(item)}
            {this._renderContent(item)}
          </Animated.View>
        )
      }

      else if(i == this.state.currentIndex + 1){
        
        return (
          <Animated.View
            key={item.id} style={[{
              opacity: this.nextCardOpacity,
              transform: [{ scale: this.nextCardScale }],
              
            }, styles.card]}>
            {this._renderHeader(item)}
            {this._renderContent(item)}
          </Animated.View>
        )
      }
      else 
        return null

    }).reverse()
  }

  render() {

    return (
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : null} style={{ flex: 1 }}>
        <View style={{flex: 1, justifyContent: "flex-end",}}>      
          <View style={{ backgroundColor:'#002E6E', height:50 }}>
          </View>
          <View style={{ backgroundColor: '#ededed',flex:1}}>
              {this.renderUsers()}
          </View>
          {this._renderFooter()}
        </View>
      </KeyboardAvoidingView>
    );
  }
}
export class paytm extends React.Component {
  state = {
    showModal: false,
    ack: "",
    ORDER_ID: global.date + global.email,
    TXN_AMOUNT: global.money,
    CUST_ID: global.email,
  }
  
    render() {
    {console.log(this.state)};  
    let {showModal,ack,ORDER_ID,TXN_AMOUNT,CUST_ID}= this.state;
      return (
        <View style={styless.container}>
          <Text style={styless.header}>Paytm</Text>
  
          <TouchableOpacity
            style={styless.button}
            onPress={() => {
              this.setState({
               showModal:true, 
  
              })
            }}>
            <Text style={styless.btntext}>Pay with Paytm</Text>
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
      );
    }
  }
  const styless = StyleSheet.create({
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