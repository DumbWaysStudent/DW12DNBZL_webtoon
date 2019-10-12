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


export default class Detail_episodes extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [{
        title: 'Episode 1',
        date: '1 Januari 1945',
        image: 'https://1.bp.blogspot.com/-W_OZk6ZPMgU/Wd79RTN7YFI/AAAAAAAAD2U/NIJX1WQFOFsZ0gvPfIwKEa1515V-ugy3ACK4BGAYYCw/s1600/Petruk%2BGareng%2B-%2BSetan%2BPerawan-00.jpg'
      }, {
        title: 'Episode 2',
        date: '1 Januari 1945',
        image: 'http://www.egrafis.com/images/baca-komik-tatang-s-malam-satu-suro-permainan-bocah.jpg'
      }, {
        title: 'Episode 3',
        date: '1 Januari 1945',
        image: 'https://calisweb.files.wordpress.com/2016/08/31.png?w=736'
      },{
        title: 'Episode 4',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 5',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 6',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'Episode 7',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 8',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 9',
        date: '1 Februari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    }
  }
  
  allPage(image, index) {
    return (
        <Image source={{uri : image.image}} style={{width: Dimensions.get('window').width, height: 300}}></Image>
     
    );
  }
  
  render() {
    
    return (
      <Container>
        <Content>
            <FlatList style={{borderWidth:0}}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
        
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