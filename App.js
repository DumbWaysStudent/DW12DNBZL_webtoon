/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon,Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card} from 'native-base'
import {Image,View} from 'react-native'
import Carousel from 'react-native-snap-carousel';

export default class App extends Component{
  constructor(props){
    super(props)
    this.state={
      entries: [{
        title: 'The Secret of Angel',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Pasutri Gaje',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Young Mom',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    }
  }
  
  render() {
    
    return (
      <Container>
        <Content>
          <Item rounded >
            <Input ></Input>
            <Icon name="search" onPress={() => alert('SEARCH BUTTON')}/>
          </Item>
          <Item>
          
          </Item>
        </Content>
        <Footer>
          <FooterTab>
            <Button vertical>
              <Icon name="apps"></Icon>
              <Text>For You</Text>
            </Button>
            <Button vertical>
              <Icon name="star"></Icon>
              <Text>Favorite</Text>
            </Button>
            <Button vertical>
              <Icon name="person"></Icon>
              <Text>Profile</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }
};
