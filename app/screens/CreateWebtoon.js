/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text, Body, Content,Item, Input, Button,Label, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

export default class create_webtoon extends Component{
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
        <ListItem style={styles.listItemContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("edit_create_webtoon", {title :image})} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:20}}>{image.tittle}</Text>
        <Text style={{fontSize:10}}>{image.createdAt}</Text>
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