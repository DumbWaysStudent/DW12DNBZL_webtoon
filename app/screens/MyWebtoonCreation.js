/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'


export default class My_webtoon_creation extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [{
        title: 'Young MOM',
        episodes : 50,
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Old MOM',
        favorite: '100 + favorite',
        episodes : 50,
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Baby MOM',
        favorite: '100 + favorite',
        episodes : 50,
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    }
  }
  
  allPage(image, index) {
    return (
      <ListItem style={{height:100,borderWidth:0}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        <Body>
        <Text style={{fontSize:20}}>{image.title}</Text>
        <Text style={{fontSize:10, marginTop:10}}>{image.episodes}</Text>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
        <Content>
          <Item style={{borderWidth:0}}>
         
            <FlatList style={{borderWidth:0}}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
            
          </Item>
         
        </Content>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={()=>this.props.navigation.navigate("create_webtoon")}
          style={styles.TouchableOpacityStyle}>
          <Image
            source={{
              uri:
                'https://raw.githubusercontent.com/AboutReact/sampleresource/master/plus_icon.png',
            }}
            style={styles.FloatingButtonStyle}
          />
        </TouchableOpacity>
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
  TouchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: 0,
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },
});