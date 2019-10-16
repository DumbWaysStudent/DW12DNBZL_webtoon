/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Text,Toast, Root} from 'native-base'
import {StyleSheet,Image,TouchableOpacity,View,TextInput,TouchableHighlight,Dimensions} from 'react-native'
import ImageExample from '../assets/logo'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios';



export default class Register extends Component{
  constructor(props){
    this.registerUser = this.registerUser.bind(this)
    super(props)
    this.state={
      eye : true,
      string : '',
      allow : true,
      pass: '',
      button_status : true
    }
  }

  registerUser(){
      const {email,password,password_confirmation} = this.state
      
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
      <Root>
      <View style={styles.container}>
        <View style={styles.containerlogo}>
        <ImageExample style={styles.logo}/>
        <Text style={styles.apptext}>KUNTUL</Text>
        <Text fontSize={10}>Kumpulan TOON Jadul</Text>
        </View>
      <View style={styles.containerform}> 
        <View style={styles.inputContainer}>
          <Icon size={20} name='envelope' style={styles.inputIcon} > </Icon>
          <TextInput style={styles.inputs}
              placeholder="Email"
              placeholderTextColor='#673ab7'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({string: email})}/>
        </View>
        <View style={styles.inputContainer}>
        <Icon size={20} name='key' style={styles.inputIcon} > </Icon>
          <TextInput style={styles.inputs}
              placeholder="Password"
              placeholderTextColor='#673ab7'
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
        </Root>
    );
  }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#673ab7',
    },
    containerlogo :{
      alignItems: 'center',
      marginTop : 70,
      backgroundColor: '#673ab7',
      marginBottom : 30,
      width : Dimensions.get('window').width
    },
    containerform : {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#673ab7',
    },
    inputContainer: {
        
        backgroundColor: '#FFFFFF',
        borderRadius:20,
        borderWidth : 2,
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
      backgroundColor: 'black',
      borderColor : '#673ab7',
      borderWidth : 2
    },
    loginText: {
      color: '#673ab7',
    },
    apptext : {
      fontSize : 30,
      color: 'black'
    },
    Icon :{
      marginRight : 10
    }
  });