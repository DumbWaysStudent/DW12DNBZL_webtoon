/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup} from 'native-base'
import Foryouscreen from './Foryouscreen'
import {createStackNavigator} from 'react-navigation-stack'
import {StyleSheet,Image,TouchableOpacity} from 'react-native'
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
      alert('Login Success');
      Toast.show({
        text: "Correct Email Format",
        buttonText: "Okay",
        duration: 3000,
        });
      this.props.navigation.navigate('Fyscreen'); 
      
      }else{
      this.state.allow = false;
      alert('Login Failed');
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
      <Container contentContainerStyle={styles.container}>
        <Content contentContainerStyle={styles.container}>
        <Root>
        <Content contentContainerStyle={[{justifyContent:'center', marginTop: 0}]}>
          <Image style={styles.logo} source={{uri :'https://mmc.tirto.id/image/otf/700x0/2018/07/02/ilustrasi-tatang-suhendra-dan-petruk-tirto.id-fuad_ratio-16x9.jpg'}}/>
          <Item style={{justifyContent: 'center',borderBottomWidth:0}}>
            <Label style={{fontSize: 40,color:'black'}}>KUNTUL</Label>
          </Item>
          <Item style={{justifyContent: 'center',fontSize: 20,marginTop:10,borderBottomWidth:0}}>
          <Label style={{fontSize: 20,color:'black'}}>Kumpulan Novel Tatang S Jadul</Label>
          </Item>
          <Form style={{justifyContent: 'center',marginTop:20}}>
            <Item stackedLabel style={{borderBottomWidth:1}}>
              <Label style={{marginBottom:5, color:'black'}}>Email</Label>
              <Input type='email' style={{}} placeholder="example@gmail.com" onChangeText={(value) => this.setState({string : value})}>
              </Input>
            </Item>
            <Item stackedLabel style={{borderBottomWidth:1, marginTop: 5}}>
              <Label style={{marginBottom:5,color:'black'}}>Password</Label>
              <InputGroup borderType="regular" iconRight>
                <Input secureTextEntry={this.state.eye} style={{}} onChangeText={(value) => this.setState({pass : value})}/>
                <TouchableOpacity onPressIn={()=> this.setState({eye : false})} onPressOut={()=> this.setState({eye : true})}>
                <Icon name='eye' size={30}></Icon>
                </TouchableOpacity>
              </InputGroup>
            </Item>
            <Item style={{justifyContent: 'center',borderBottomWidth:0,marginTop: 10}}>
              <TouchableOpacity  style={styles.buttonContainer}
                onPress={() => this.validate()
                }>
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            </Item>
          </Form>
        </Content>
        </Root>
        </Content>
      </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor : '#5ca2c6',
    alignItems:'center',
    justifyContent : "space-between"
  },
  logo : {
    flex :1,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  buttonContainer:{
    backgroundColor: 'blue',
    paddingVertical: 15,
    width : 350
},
buttonText:{
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
}
})