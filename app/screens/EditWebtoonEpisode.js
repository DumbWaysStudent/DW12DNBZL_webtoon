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
      item : this.props.navigation.state.params.title,
      entries: []
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
        <Button danger style={{height:15,width:70,marginLeft:12,backgroundColor:'red'}}><Text style={{fontSize:7}}>DELETE</Text>
        </Button>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
        <Content>
        <Item style={{marginLeft:20}}>
            <Label style={{color: 'black'}}>Name</Label>
          </Item>
          <Item style={{height: 40 ,width:335,justifyContent:'center',marginTop :10}}>
          <Item >
            <Input style={{ marginLeft : 20, borderWidth: 4}} >
              <Text>{this.state.item.title}</Text>
            </Input>
            </Item>
          </Item>
          <Item style={{marginLeft:20,marginTop:20}}>
          <Label>
                <Text>Add Image</Text>
            </Label>  
            </Item>
          <Item>
            <FlatList style={{borderWidth:0}}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
         </Item>
         <Item style={{justifyContent: 'center'}}>
           
              <Button style={{borderWidth: 2,borderColor: 'black',width : 300, justifyContent: 'center',backgroundColor: 'white'}} onPress={()=>this.props.navigation.navigate("create_webtoon_episode")}>
                 <Text style={{color:'black'}}>+ ADD IMAGE</Text>
             </Button>
             </Item>
             <Item style={{justifyContent:'center'}}>
             <Button style={{justifyContent:'center', backgroundColor:'red', width: 300,borderColor : 'black',borderWidth : 2, marginTop : 10}} onPress={()=>this.props.navigation.navigate("create_webtoon_episode")}>
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