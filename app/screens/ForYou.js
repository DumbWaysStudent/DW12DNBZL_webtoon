/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Item, Input, Button,Label,ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,SafeAreaView,TouchableHighlight} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import {ip} from '../ip'
import {connect} from 'react-redux'
import {getAllToon} from '../_redux/store'
import AsyncStorage from '@react-native-community/async-storage'


class Foryouscreen extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 200,
      entries: [],
      search : '',
      toons : [],
      favorites : [],
      favarray : [],
      id_user : 0
    }
  }
  
  async componentDidMount(){
    this.foryou()
    await axios.get(`${ip}/webtoons`)
    .then(res => {
      const entries = res.data
      this.setState({entries})
      
    })
    this.showToon()
   
  }

async search(text){
  await axios.get(`${ip}/webtoons?title=${text}`)
  .then(res => {
    const entries = res.data
    this.setState({entries})
    console.log(entries)
  })
}

  showToon = () => {
    this.props.getAllToon()
  }

  async foryou(){
    const id_user = await AsyncStorage.getItem('userID');
    if (id_user !== null)  {
      this.setState({id_user})
      this.takefav() 
    }else{
      
    }
  }

  async addfav(id_toon){
    await axios.post(`${ip}/user/${this.state.id_user}/favorites/${id_toon}`)
    this.takefav()
  }

  async delfav(id_toon){
    this.state.favarray.splice(id_toon)
    await axios.delete(`${ip}/user/${this.state.id_user}/favorites/${id_toon}`)
    this.takefav()
  }

  async takefav(){
    await axios.get(`${ip}/user/${this.state.id_user}/favorites`)
    .then(res => {
      const favorites = res.data.data
      this.setState({favorites})
    })
  }

  renderPage(image, index) {
    return (
        <View key={index}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
            <Image style={{ width: this.state.BannerWidth, height: this.state.BannerHeight }} source={{ uri: image.image }} />
            </TouchableOpacity>
        </View>
    );
}
  favoritePage(image) {
    this.state.favarray.push(image.id)
    return (
      <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
          <Image source={{uri : image.image}} style={styles.favoriteImage}></Image>
          </TouchableOpacity>
        <Text style={styles.favoriteText}>{image.tittle}</Text>
      </View>
    );
  }
  allPage(image) {
    return (
      <ListItem style={styles.listItemContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
        <Image source={{uri : image.image}} style={styles.image}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={styles.tittleall}>{image.tittle}</Text>
        {(this.state.favarray.includes(image.id)) ? 
        <Button success style={styles.favoritebutton}  onPress={()=> this.delfav(image.id)}><Text style={{fontSize:7}}>FAVORITED</Text>
        </Button>
        : 
        <Button success style={styles.favoritebuttondisabled} onPress={()=> this.addfav(image.id)}><Text style={{fontSize:7}}>+ FAVORITE</Text></Button>}
        </Body>
      </ListItem>
     
    );
  }
  
  render() {
    const {toons} = this.props
    return (
      <Container>
        <Header searchBar rounded style={styles.header}>
          <Item rounded>
            <Input placeholder="Search" style={{marginLeft: 20}} onChangeText={(text)=>{this.setState({search:text})}}/>
            <TouchableHighlight onPress={()=> this.search(this.state.search)}>
            <Icon size={25} style={styles.seachIcon} name="search" />
            </TouchableHighlight>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
          </Header>
        
        <Content contentContainerStyle={styles.container}>
          <View style={styles.container}>
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={this.state.BannerWidth}
                >
                    {this.state.entries.map((image, index) => this.renderPage(image, index))}
                </Carousel>
            </View>
         
          <View>
          <View style={styles.subMenuTextContainer}>
            <Label>
              <Text style={styles.text}>Favourite</Text>
            </Label>
          </View>
          <View >
            <ScrollView horizontal={true} >
              {this.state.favorites.map((image, index) => this.favoritePage(image, index))}
            </ScrollView>
          </View>
          </View>
          <View>
          <View style={styles.subMenuTextContainer}>
            <Label>
              <Text style={styles.text}>All</Text>
            </Label>
          </View>
          
            <FlatList
           style={styles.allContainer}
            data={toons.toons} 
            extraData={this.state}
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}>
            </FlatList> 
           
          </View>
        </Content>
        
      </Container>
    )
  }
};
const mapStateToProps = state => {
  return {
    toons: state.toons
  }
}

const mapDispatchToProps = {
  getAllToon
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Foryouscreen)


const styles = StyleSheet.create({
  container: {
    backgroundColor : '#673ab7',
    width : Dimensions.get('window').width,
    borderWidth: 1,
    borderColor : 'black'
  },
  header:{
    backgroundColor:'#673ab7',
  
  },
  seachIcon:{
    marginRight: 15
  },
  logo : {
    flex :1,
    width: "100%",
    height: 200,
    resizeMode: "contain",
    alignSelf: 'center'
  },
  favoriteContainer:{
    marginHorizontal : 2,
    backgroundColor: 'white',
    height:128,
    width:80,
    marginTop: 5,
  },
  favoriteImage:{
    width: 80, 
    height: 100,
    borderWidth:2,
    borderColor : 'black',
  },  
  favoriteText:{
    fontSize:10,
    textAlign :'center',
    color: 'black'
  },
  allContainer:{ 
    marginRight : 15,
  },
  listItemContainer:{
    width: Dimensions.get('window').width,
    marginTop: 5,
    backgroundColor: 'white'
  },
  subMenuTextContainer :{
    marginLeft:15,
    marginTop : 10,
    marginBottom: 5
  },
  text:{
    fontSize: 18,
    color:'black',
  },
  image : {
    flex: 1,
    width: 70,
    height: 70,
    resizeMode: 'contain',
  },
  favoritebutton:{
    height:20,
    width:70,
    marginLeft : 12,
    backgroundColor: '#ee532f'
  },
  tittleall :{
    fontSize:15,
    marginBottom : 10
  },
  favoritebuttondisabled:{
    height:20,
    width:70,
    marginLeft : 12,
    backgroundColor: 'black'
  },
})