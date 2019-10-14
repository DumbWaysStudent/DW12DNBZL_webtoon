/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Item, Input, Button,Label,ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList,SafeAreaView} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'



export default class Foryouscreen extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 200,
      entries: [{
        title: 'Setan Emosi',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109179-tatang-s.jpg'
      }, {
        title: 'Hantu Pohon Sawo',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109180-tatang-s.jpg'
      }, {
        title: 'Yong Samson',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109181-tatang-s.jpg'
      },{
        title: 'Ririwa',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109182-tatang-s.jpg'
      }, {
        title: 'Babi Siluman',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109183-tatang-s.jpg'
      }, {
        title: 'Hantu',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109184-tatang-s.jpg'
      },{
        title: 'Ilmu Halimuan',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109185-tatang-s.jpg'
      }, {
        title: 'Penakluk Iblis',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109186-tatang-s.jpg'
      }, {
        title: 'Takut Ni,Ye',
        image: 'https://cdn.brilio.net/news/2015/11/30/29400/109187-tatang-s.jpg'
      }]
    }
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
  favoritePage(image, index) {
    return (
      <View style={styles.favoriteContainer}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
          <Image source={{uri : image.image}} style={styles.favoriteImage}></Image>
          </TouchableOpacity>
        <Text style={styles.favoriteText}>{image.title}</Text>
      </View>
    );
  }
  allPage(image, index) {
    return (
      
      <ListItem style={styles.listItemContainer}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
        <Image source={{uri : image.image}} style={styles.image}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={styles.tittleall}>{image.title}</Text>
        <Button style={styles.favoritebutton}><Text style={{fontSize:7}}>+ Favorite</Text>
        </Button>
        </Body>
      </ListItem>
     
    );
  }
  
  render() {
    
    return (
      <Container>
        <Header searchBar rounded style={styles.header}>
          <Item rounded>
            <Input placeholder="Search" style={{marginLeft: 20}} />
            <Icon size={25} style={styles.seachIcon} name="search" />
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
              {this.state.entries.map((image, index) => this.favoritePage(image, index))}
            </ScrollView>
          </View>
          </View>
          <View>
          <View style={styles.subMenuTextContainer}>
            <Label>
              <Text style={styles.text}>All</Text>
            </Label>
          </View>
          <SafeAreaView>
            <FlatList
           style={styles.allContainer}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}>
            </FlatList> 
            </SafeAreaView>
          </View>
        </Content>
        
      </Container>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor : '#eaeaea',
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
  }
})