/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Content} from 'native-base'
import {Image,StyleSheet,Dimensions,FlatList} from 'react-native';
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'


export default class Detail_episodes extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      id : props.navigation.state.params.title.id,
      epid : props.navigation.state.params.item,
      entries: []
    }
  }
  

  async retrieveSessionToken() {
    try {
      const tokening = await AsyncStorage.getItem('userToken');
      if (tokening !== null) {
        console.log("Session token",this.state.token)
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
    console.log('hasil get param = ',this.state.id)
    console.log('hasil episodeid = ',this.state.epid)
    const tokening = await AsyncStorage.getItem('userToken');
    await axios.get(`http://192.168.1.11:5000/api/v1/webtoon/${this.state.epid}/episode/${this.state.id}`,{
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