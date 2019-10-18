/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text, Content, Item, Right,} from 'native-base'
import {Image,View,StyleSheet,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'
import {ip} from '../ip'

export default class Profile extends Component{
  constructor(props){
    super(props)
    this.state={
      token : '',
      entries : []
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
  this.retrieveSessionToken()
  const id = await AsyncStorage.getItem('userID')
  const tokening = await AsyncStorage.getItem('userToken');
  let new_id = JSON.parse(id)
  console.log('id', new_id)
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

async logout() {
  try {
    await AsyncStorage.removeItem('userToken');
    this.componentDidMount()
  }
  catch(exception) {
    return false;
  }
}

  render() {
    
    return (
      <Container>
        <Content>
          <View style={styles.photoiconcontainer}>
              <Image style={styles.image}  source={{uri : this.state.entries.image}}></Image>
          </View>
          <View style={styles.createWT}>
            <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={()=>this.props.navigation.navigate("web_creation")}>
                <Item style={{borderColor: 'white'}}>
                <Text style={styles.menuText}>Create WebToon</Text> 
                <Right>
                <Icon name="angle-right" size={30} style={styles.createcomicicon}/>
                </Right>
                </Item>
            </TouchableOpacity>  
          </View>
          <Item style={styles.createWT}>
            <TouchableOpacity style={{width:Dimensions.get('window').width}} onPress={() => this.logout()}> 
            <Text style={styles.menuText}>Log Out</Text>
            </TouchableOpacity> 
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
  photoiconcontainer:{
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#673ab7',
    borderBottomWidth: 2,
    borderColor:'black'
  },
  image:{
    width: 300, 
    height: 300, 
    borderRadius: 400/ 2,
    backgroundColor:'white'
  },
  createcomicicon : {
    marginRight:25,
    marginTop : 20
  },
  createWT :{
    height:50,
    borderColor: 'white'
  },
  menuText :{
    marginLeft :20,
    marginTop: 20
  }
});