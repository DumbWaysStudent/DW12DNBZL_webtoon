/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text, Body, Content, ListItem} from 'native-base'
import {Image,StyleSheet,Dimensions,FlatList,TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


export default class My_webtoon_creation extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: []
    }
  }
  
  async retrieveSessionToken() {
    try {
      const tokening = await AsyncStorage.getItem('userToken');
      if (tokening !== null) {
        console.log("Session token",tokening);
        this.setState({token : tokening})
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
    console.log('varToken = ',this.state.token)
    console.log('ini sedang dimuat')
    this.retrieveSessionToken()
    const id = await AsyncStorage.getItem('userID')
    let new_id = JSON.parse(id)
    console.log('id', new_id)
    await axios.get(`http://192.168.1.11:5000/api/v1/user/${new_id}/webtoons`,{
      headers: {
        'Authorization': ' Bearer '+ this.state.token
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
        <Text style={styles.title}>{image.tittle}</Text>
        <Text style={styles.favoritetext}>{image.favorite}</Text>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
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
      backgroundColor: '#fafafa',
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
    marginBottom : 30
    
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