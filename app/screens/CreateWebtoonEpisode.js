/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Text, Body, Content,Item, Input, Button,Label, ListItem,Right} from 'native-base'
import {Image,StyleSheet,Dimensions,FlatList,TouchableOpacity,View,TextInput} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import Modal from 'react-native-modal'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class create_webtoon_episode extends Component{
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
      toonid :props.navigation.state.params.title.id,
      epid : ''
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
    await axios.get(`http://192.168.1.11:5000/api/v1/user/${new_id}/webtoon/${this.state.toonid}/episodes`,{
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

  postepisode= async() =>{
    await axios.post(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon/${this.state.toonid}/episodes`,{
      title : this.state.newtitle,
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

  deleteepisode=async(id)=>{
    await axios.delete(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon/${this.state.toonid}/episodes/${id}`,{
      headers : {
        'Authorization': ' Bearer '+ this.state.token
      }
    }).then(res=>{
      alert('deleted')
      this.setState()
    })
  }

  edit=async()=>{
    await axios.put(`http://192.168.1.11:5000/api/v1/user/${this.state.id}/webtoon/${this.state.toonid}/episodes/${this.state.epid}`,{
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



  allPage(image, index) {
    return (
        <ListItem style={{height:100,borderWidth:0}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("edit_create_webtoon_episode", {title :image})} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:20}}>{image.title}</Text>
        <Button danger style={{height:15,width:70,marginLeft:12}}><Text style={{fontSize:7}} onPress={()=>this.deleteepisode(image.id) }>DELETE</Text>
        </Button>
        </Body>
        <Right>
        <TouchableOpacity onPress={()=> this.setState({modal:true,update:true,epid: image.id})}>
        <Icon size={25} style={{marginRight : 30}} name="pencil"  />
        </TouchableOpacity>
        </Right>
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
             <Button style={{width : 300,justifyContent:'center'}} onPress={()=>this.setState({modal:true})}>
                 <Text>+ ADD EPISODE</Text>
             </Button>
         </Item>
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
              placeholder="Image"
              placeholderTextColor='#673ab7'
              underlineColorAndroid='transparent'
              onChangeText={(name) => this.setState({newImage: name})}
              />
        </View>
              </View>
              <Button onPress={()=>this.state.update == true ? this.edit() :this.postepisode()} style={styles.button}>
                 <Text style={{color: 'black'}}>+ ADD EPISODE</Text>
             </Button>
             <TouchableOpacity onPress={()=>this.setState({modal: false})}>
               <Text>Close</Text>
             </TouchableOpacity>
          </View>
        </Modal>

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