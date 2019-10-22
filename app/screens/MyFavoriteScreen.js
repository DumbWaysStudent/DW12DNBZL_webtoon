/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Icon,Container,Header,Text, Body, Content, Item, Input, Button,ListItem} from 'native-base'
import {Image,StyleSheet,Dimensions,FlatList,TouchableOpacity,SafeAreaView} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../ip'


export default class My_favourite_screen extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      token : '',
      entries: []
    }
  }
  
  async retrieveSessionToken() {
    try {
      const tokening = await AsyncStorage.getItem('userToken');
      const id_user = await AsyncStorage.getItem('userID');
      if (tokening !== null) {
        console.log("Session token",tokening)
        console.log("id_user", id_user)
        this.setState({token : tokening })
      }else{
        console.log("Youre not Logged in Yet");
        alert('must login first')
        this.props.navigation.navigate('Login')
      }
     }catch (e) {
       console.log(error)
     }
  }
  
  
  async componentDidMount(){
    
    this.retrieveSessionToken()
    //retrieve id toon
    const tokening = await AsyncStorage.getItem('userToken');
    const id = await AsyncStorage.getItem('userID');
    let new_id = JSON.parse(id)
    await axios.get(`${ip}/user/${new_id}`,{
      headers: {
        'Authorization': 'Bearer '+ tokening
      }
    })
    .then(res => {
      const entries = res.data
      this.setState({entries})
      console.log(entries)
    })
  }

  allPage(image, index) {
    return (
      <ListItem style={styles.favoriteitem}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
        <Image source={{uri : image.image}} style={styles.image}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={styles.title}>{image.title}</Text>
        <Text style={styles.favoritetext}>{image.favorite}</Text>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container >
        <Header searchBar rounded style={styles.headercontainer}>
          <Item rounded>
            <Input placeholder="Search" style={{marginLeft: 20}} />
            <Icon size={25} style={styles.seachIcon} name="search" />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
          </Header>
        <Content contentContainerStyle={styles.container}>
        <SafeAreaView>
            <FlatList
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
        </SafeAreaView>
        </Content>
        
      </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#eaeaea',
      justifyContent: 'center'
  },
  headercontainer: {
    backgroundColor: '#673ab7',
  },
  favoriteitem:{
    height:100,
    marginTop: 5,
    marginRight : 15,
    backgroundColor : 'white',
  },
  image : {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title:{
    fontSize:15
  },
  favoritetext:{
    fontSize:10, 
    marginTop:10
  }

});