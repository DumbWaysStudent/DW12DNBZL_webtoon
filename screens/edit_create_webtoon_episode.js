/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon,Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import Carousel from 'react-native-banner-carousel';


export default class edit_create_webtoon_episode extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [{
        title: 'Episode 1',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 2',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Episode 3',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'Episode 4',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    }
  }
  
  allPage(image, index) {
    return (
        <ListItem style={{height:100,borderWidth:0}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:20}}>{image.title}</Text>
        <Button danger style={{height:15,width:70,marginLeft:12}}><Text style={{fontSize:7}}>DELETE</Text>
        </Button>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
        <Content>
            <Label>
                    <Text>Name</Text>
            </Label>  
          <Item regular style={{height: 40 ,width:Dimensions.get('window').width-20}}>
            <Input></Input>
            
          </Item>
          <Label>
                    <Text>Add Image</Text>
            </Label>  
          <Item>
            <FlatList style={{borderWidth:0}}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
         </Item>
         <Item style={{justifyContent: 'center'}}>
             <Button style={{width : 300,justifyContent:'center'}} onPress={()=>this.props.navigation.navigate("")}>
                 <Text>+ IMAGE</Text>
             </Button>
             <Button onPress={()=>this.props.navigation.navigate("create_webtoon_episode")}>
                 <Text>DELETE</Text>
             </Button>
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