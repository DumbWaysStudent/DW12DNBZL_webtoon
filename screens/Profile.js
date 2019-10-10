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
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
    }
}
  
  
  
  render() {
    
    return (
      <Container>
        <Header>
          <Item>
            <Item>
              <Icon name="arrow-left" onPress={() => this.props.navigation.goBack(null)}></Icon>
            <Body>
              <Text>PROFILE</Text>
            </Body>
            <Right>
              <Icon name="pencil" onPress={()=>this.props.navigation.navigate("Edit_profile")}></Icon>
            </Right>
            </Item>
          </Item>
        </Header>
        <Content>
          <Item style={{borderWidth:0, justifyContent:"center"}}>
              <Image style={{height:200,width:200}} source={{uri : 'https://cdn3.iconfinder.com/data/icons/social-messaging-productivity-6/128/profile-female-circle2-512.png'}}></Image>
          </Item>
          <Item>
            <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={()=>this.props.navigation.navigate("Edit_profile")}>
                <Item>
                <Text>Create WebToon</Text>
                <Right>
                <Icon name="arrow-forward"/>
                </Right>
                </Item>
            </TouchableOpacity>  
          </Item>
          <Item>
            <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={() => alert('LogOut')}> 
            <Text>Log Out</Text>
            </TouchableOpacity> 
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