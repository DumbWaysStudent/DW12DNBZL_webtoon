/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon,Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';

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
        <Header>
            <Item>
                <Item>        
                    <Text>PROFILE</Text>
                    <Right>
                    <Icon name="arrow-forward"></Icon>
                    </Right>
                </Item>
            </Item>
        </Header>
        <Content>
          <Item style={{borderWidth:0, justifyContent:"center"}}>
              <Image style={{height:200,width:200}} source={{uri : photo.uri}}></Image>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Icon name="photo"></Icon>
              </TouchableOpacity>
          </Item>
          <Item>
            <Input placeholder="Your Name">
            </Input>
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