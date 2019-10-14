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

export default class Edit_profile extends Component{
  constructor(props){
    super(props)
    this.state={
        photo: ''
    }
}
  handleChoosePhoto = () =>{
      const options = {
          noData : true
      };
      ImagePicker.launchImageLibrary(options, response => {
        if (response.uri) {
          console.log(response.uri)
          this.setState({ photo: response });
        }
      });
  };
  
  render() {
    const {photo} = this.state;
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
            <Input style={styles.input} placeholder="Your Name">
            </Input>
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
    alignItems : 'center'
  },
  input :{
    borderWidth:1,
    width: 300}
});