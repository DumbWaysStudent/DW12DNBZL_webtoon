/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Form, Item, Input,Toast,Root, Label,InputGroup} from 'native-base'
import Foryouscreen from './ForYou'
import {createStackNavigator} from 'react-navigation-stack'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions} from 'react-native'
import ImageExample from '../assets/logo'
import Icon from 'react-native-vector-icons/FontAwesome'



const AppNavigator = createStackNavigator({
  Fyscreen: Foryouscreen
})

export default class Login_screen extends Component{
  constructor(props){
    super(props)
    this.state={
      eye : true,
      string : '',
      allow : true,
      pass: '',
      button_status : true
    }
  }

  
  validate = () => {
    if ((this.state.string !== '') && (this.state.pass !== '')){  
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.string)) {
      this.state.allow = true;
      Toast.show({
        text: "Correct Email Format",
        buttonText: "Okay",
        duration: 3000,
        });
      this.props.navigation.navigate('Fyscreen'); 
      
      }else{
      this.state.allow = false;
      Toast.show({
        text: "Wrong Email Format",
        buttonText: "Okay",
        duration: 3000,
        });  
      }
    }else{
    Toast.show({
      text: "email or password cant be empty",
      buttonText: "Okay",
      duration: 3000,
      });  
  }
  }
  


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerlogo}>
        <ImageExample style={styles.logo}/>
        <Text style={styles.apptext}>KUNTUL</Text>
        </View>
      <View style={styles.containerform}> 
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/message/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({string: email})}/>
        </View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db'}}/>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={this.state.eye}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({pass : password})}/>
              <TouchableOpacity onPressIn={()=> this.setState({eye : false})} onPressOut={()=> this.setState({eye : true})}>
                <Icon name='eye' size={20} style={styles.Icon}></Icon>
              </TouchableOpacity>
        </View>
        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.validate()}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
         </View>
        </View>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00bbd4',
    },
    containerlogo :{
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00bbd4',
      marginBottom : 50,
      width : Dimensions.get('window').width
    },
    containerform : {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00bbd4',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius:20,
        borderBottomWidth: 1,
        width:250,
        height:35,
        marginBottom:10,
        flexDirection: 'row',
        alignItems:'center'
    },
    
    inputs:{
        height:45,
        marginLeft:0,
        borderBottomColor: '#FFFFFF',
        flex:1,
    },
    inputIcon:{
      width:30,
      height:30,
      marginLeft:15,
      justifyContent: 'center'
    },
    buttonContainer: {
      height:45,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10,
      marginTop: 20 ,
      width:150,
      borderRadius:30,
    },
    loginButton: {
      backgroundColor: "#00bbd4",
      borderColor : 'white',
      borderWidth : 2
    },
    loginText: {
      color: 'black',
    },
    apptext : {
      fontSize : 30,
      fontWeight : 'bold'
    },
    Icon :{
      marginRight : 10
    }
  });