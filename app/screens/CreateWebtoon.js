/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text, Body, Content,Item, Input, Button,Label, ListItem, Right} from 'native-base'
import {Image,View,StyleSheet,Dimensions,TextInput,FlatList,TouchableOpacity} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'

export default class create_webtoon extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [],
      id : 0,
      modal : false,
      newtitle : '',
      newGenre : '',
      newImage : '',
      update: false,
      toonid : 0
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
    this.setState({id : new_id})
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

  postwebtoon= async() =>{
    await axios.post(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon`,{
      title : this.state.newtitle,
      genre : this.state.newGenre,
      image : this.state.newImage
    },{
      headers : {
        'Authorization': ' Bearer '+ this.state.token
      }
    })
    .then(res => {
      alert(res)
      this.setState({modal : false})
    })
  }

  deletewebtoon=async(id)=>{
    await axios.delete(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon/${id}`,{
      headers : {
        'Authorization': ' Bearer '+ this.state.token
      }
    }).then(res=>{
      alert('deleted')
      this.setState()
    })
  }

  edit=async()=>{
    await axios.put(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon/${this.state.toonid}`,{
      title : this.state.newtitle,
      genre : this.state.newGenre,
      image : this.state.newImage
  },
  {
      headers : {
        'Authorization': ' Bearer '+ this.state.token
      }
    }).then(res=>{
      alert('updated', this.state.toonid)
      this.setState({update:false,modal:false})
    })
  }

  allPage(image) {
    return (
        <ListItem style={styles.listItemContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("create_webtoon_episode", {title :image})} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:20}}>{image.tittle}</Text>
        <Text style={{fontSize:10}}>{image.createdAt}</Text>
        </Body>
        <Right> 
        <TouchableOpacity onPress={()=> this.setState({modal:true,update:true,toonid: image.id})}>
        <Icon size={25} style={{marginRight : 30}} name="pencil"  />
        </TouchableOpacity>
        <Icon size={25} style={{marginRight : 30,color : 'red',marginTop: 20}} name="trash" onPress={()=>this.deletewebtoon(image.id)} />
        </Right>
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
         <Modal isVisible={this.state.modal}>
          <View style={styles.containerform}>
              <View>
              <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Title"
              placeholderTextColor='#673ab7'
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({newtitle : email})}
              />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Genre"
              placeholderTextColor='#673ab7'
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({newGenre: password})}
              />
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Image"
              placeholderTextColor='#673ab7'
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({newImage: name})}
              />
        </View>
              </View>
              <Button onPress={()=>this.state.update == true ? this.edit() :this.postwebtoon()} style={styles.button}>
                 <Text style={{color: 'black'}}>+ ADD WEBTOON</Text>
             </Button>
             <TouchableOpacity onPress={()=>this.setState({modal: false})}>
               <Text>Close</Text>
             </TouchableOpacity>
          </View>
        </Modal>
        </Content>
        <Item style={styles.buttonContainer}>
             <Button onPress={()=>this.setState({modal : true})} style={styles.button}>
                 <Text style={{color: 'black'}}>+ ADD WEBTOON</Text>
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
  },
  containerform : {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
    height: 400,
  },
  inputContainer: {
      
      backgroundColor: '#FFFFFF',
      borderRadius:20,
      borderWidth : 2,
      width:250,
      height:35,
      marginBottom:10,
      flexDirection: 'row',
      alignItems:'center'
  },
  
  inputs:{
      height:45,
      marginLeft:0,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    marginLeft:15,
    justifyContent: 'center'
  },
  loginButton: {
    backgroundColor: 'black',
    borderColor : '#673ab7',
    borderWidth : 2
  },
  registerButton: {
    backgroundColor: '#673ab7',
    borderColor : '#673ab7',
    borderWidth : 2
  },
  foryouButton: {
    backgroundColor: '#673ab7',
    borderColor : '#673ab7',
    borderWidth : 2,
    marginTop : 30
  },
  registerText: {
    color: 'black',
  },
  loginText: {
    color: '#673ab7',
  },
  foryouText:{
    color : 'white'
  },
  apptext : {
    fontSize : 30,
    color: 'black'
  },
  Icon :{
    marginRight : 10
  }
});