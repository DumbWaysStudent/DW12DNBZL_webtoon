/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon,Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer} from 'native-base'


export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      eye : true,
      string : '',
      allow : true
    }
  }
  validate = () => {
    
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(this.state.string)) {
      this.state.allow = true;
      alert('Berhasil Masuk');
      Toast.show({
        text: "Format Email Benar",
        buttonText: "Okay",
        duration: 3000,
        });  
    }else{
      this.state.allow = false;
      alert('Gagal Masuk');
      Toast.show({
        text: "Format Email Salah",
        buttonText: "Okay",
        duration: 3000,
        });  
    }
    
  }
  render() {
    return (
      <Container style={{backgroundColor:'#72ea12'}}>
        <Header style={{backgroundColor:'#72ea12'}}>
          <Body style={{alignItems:'center'}}>
            <Text style={{color: 'white'}}>CLONE WEBTOON</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={{backgroundColor:'#72ea12'}}>
        <Root>
        <Content contentContainerStyle={[{justifyContent:'center', marginTop: 130}]}>
          <Item style={{justifyContent: 'center',borderBottomWidth:0}}>
            <Label style={{fontSize: 40}}>LOG IN</Label>
          </Item>
          <Item style={{justifyContent: 'center',fontSize: 20,marginTop:10,borderBottomWidth:0}}>
          <Label>Log In with your Account Webtoon</Label>
          </Item>
          <Form style={{justifyContent: 'center',marginTop:20}}>
            <Item stackedLabel style={{borderBottomWidth:1}}>
              <Label style={{marginBottom:5}}>Email</Label>
              <Input type='email' style={{}} placeholder="example@gmail.com" onChangeText={(value) => this.setState({string : value})}>
              </Input>
            </Item>
            <Item stackedLabel style={{borderBottomWidth:1, marginTop: 5}}>
              <Label style={{marginBottom:5}}>Password</Label>
              <InputGroup borderType="regular" iconRight>
                <Input secureTextEntry={this.state.eye} style={{}}/>
                <Button onPressIn={()=> this.setState({eye : false})} onPressOut={()=> this.setState({eye : true})}>
                <Icon name='eye-off'></Icon>
                </Button>
              </InputGroup>
            </Item>
            <Item style={{justifyContent: 'center',borderBottomWidth:0,marginTop: 10}}>
              <Button style={{backgroundColor:'#285b03',borderWidth:1,borderColor:'#eef043'}}
                onPress={() => this.validate()
                }
              >
                <Text>Submit</Text>
              </Button>
            </Item>
          </Form>
        </Content>
        </Root>
        </Content>
      </Container>
    )
  }
};
