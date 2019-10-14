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
import SafeAreaView from 'react-native-safe-area-view';


export default class create_webtoon extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [{
        title: 'Young MOM',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'OK MOM',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Ugly MOM',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'Are you kidding me MOM??',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'Ugly MOM',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'Ugly MOM',
        date: '1 Januari 1945',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },
    ]
    }
  }
  
  allPage(image, index) {
    return (
        <ListItem style={styles.listItemContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("edit_create_webtoon", {title :image})} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:20}}>{image.title}</Text>
        <Text style={{fontSize:10}}>{image.date}</Text>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
        <View style={styles.tittleContainer}>
          <Label style={styles.tittle}>
            <Text>Title</Text>
          </Label> 
          <View style={styles.inputTittleContainer}>
            <Input style={{justifyContent:'center'}} ></Input>
          </View>  
          </View>
        <Content contentContainerStyle={styles.container}>
          
          <View>
          <SafeAreaView>
            <FlatList
            style={styles.allContainer}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
         </SafeAreaView>
         </View>
         
        </Content>
        <Item style={styles.buttonContainer}>
             <Button onPress={()=>this.props.navigation.navigate("create_webtoon_episode")} style={styles.button}>
                 <Text style={{color: 'black'}}>+ ADD EPISODE</Text>
             </Button>
         </Item>
      </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
      backgroundColor: '#eaeaea',
      justifyContent: 'center'
  },
  tittleContainer : {
    height: 90,
    width:Dimensions.get('window').width,
    marginTop : 0,
    backgroundColor : '#eaeaea'
  },
  inputTittleContainer: {
    justifyContent : 'center',
    borderWidth : 2,
    marginTop : 10,
    marginHorizontal : 20,
    height : 40,
    
  },
  tittle:{
    marginLeft : 20,
    marginTop : 10
  },
  button : {
    borderWidth: 2,
    borderColor: 'black',
    width : 310 , 
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  listItemContainer:{
    width: Dimensions.get('window').width,
    marginTop: 5,
    backgroundColor: 'white',
  },
  allContainer:{ 
    marginRight : 20,
    marginLeft : 2
  },
  buttonContainer : {
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
  },
  button : {
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth : 2,
    width: 320,
    marginVertical : 10
  }
});