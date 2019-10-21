/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Content, Input} from 'native-base'
import {Image,View,StyleSheet,Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import {ip} from '../ip'


export default class Edit_profile extends Component{
  constructor(props){
    super(props)
    this.state={
        photo: '',
        entries : [],
        token : '',
        name: '',
        id : 0
    }
}
  handleChoosePhoto = () =>{
      const options = {
          noData : true
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          console.log('this is it',response.uri)
          this.setState({ photo: response });
        }
      });
  };

  
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
    this.setState({id : new_id})
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

  async confirm(){
    const createFormData = (photo, body) => {
      const data = new FormData();
    
      data.append('image', {
        name: photo.fileName,
        type: photo.type,
        uri:
          Platform.OS === 'android' ? photo.uri : photo.uri.replace('file://', ''),
      })
    
      Object.keys(body).forEach(key => {
        data.append(key, body[key])
      })
      console.log('data' ,data)
      return data
      
    }
    console.log('tokennya ini', this.state.token)
    await axios.put(`${ip}/user/${this.state.id}`,createFormData(this.state.photo, { name: this.state.name },
    {
      headers: {
        'Authorization': 'Bearer '+ this.state.token
      }
    }
    ))
    .then(response => {
      console.log('upload success', response)
      alert('Data diupdate')
      this.setState({photo : ''});
      this.props.navigation.navigate("profile")
    })
    .catch(error =>{
      console.log('upload error', error);
      alert('upload failed')
    })
  }
  
  render() {
    const { photo } = this.state;
    return (
      <Container>
        <Content>
          <View style={styles.imageContainer}>
              <Image style={styles.image}  source={{uri : photo.uri}}></Image>
              <TouchableOpacity onPress={this.handleChoosePhoto}>
              <Icon name="camera" size={20}></Icon>
              </TouchableOpacity>
          </View>
          
          <View style={styles.nameContainer}>
            <Input style={styles.input} placeholder={this.state.entries.name} onChangeText={(text)=>this.setState({name : text})}>
            </Input>
          </View>
          <View style={{alignItems:'center',marginTop: 30}}>
          <TouchableOpacity onPress={()=>this.confirm()}>
            <Icon name="check" size={30}></Icon>
          </TouchableOpacity>
          </View>
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
  imageContainer:{
    justifyContent:"center",
    backgroundColor:'#673ab7',
    alignItems:'center',
    flexDirection : 'row',
    height : 300
  },
  image:{
    marginLeft : 15,
    marginTop : 10,
    width: 260, 
    height: 260, 
    borderRadius: 260/ 2,
    borderWidth:4,
    borderColor:'black'
  },
  nameContainer :{
    marginTop : 20,
    width : Dimensions.get('window').width,
    alignItems : 'center',
    alignContent : 'center'
  },
  input :{
    borderWidth:1,
    width: 300,
    alignContent: 'center'
  }
});