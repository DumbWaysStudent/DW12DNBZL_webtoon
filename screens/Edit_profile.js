/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Edit_profile extends Component{
  constructor(props){
    super(props)
    this.state={
        photo: ''
    }
}
  handleChoosePhoto = () =>{
      const options = {
          noData : true
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          this.setState({ photo: response });
        }
      });
  };
  
  render() {
    const {photo} = this.state;
    return (
      <Container>
        <Content>
          <Item style={{borderWidth:0, justifyContent:"center"}}>
              <Image style={{width: 200, height: 200, borderRadius: 200/ 2, borderWidth:4,borderColor:'black'}}  source={{uri : photo.uri}}></Image>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Icon name="camera" size={20}></Icon>
              </TouchableOpacity>
          </Item>
          <Item style={{justifyContent:'center',marginTop:20}}>
          <Item style={{width:300}}>
            <Input style={{borderWidth:2, width: 100}} placeholder="Your Name">
            </Input>
          </Item>
          </Item>
        </Content>
        
      </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      justifyContent: 'center'
  },
});