/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'
import {Image,View,StyleSheet,Dimensions,ScrollView,FlatList} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'
import Detail_screen from './Detail_screen'



export default class Foryouscreen extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
      entries: [{
        title: 'The Secret of Angel',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Pasutri Gaje',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Young Mom',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'The Secret of Angel',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Pasutri Gaje',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Young Mom',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      },{
        title: 'The Secret of Angel',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Pasutri Gaje',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }, {
        title: 'Young Mom',
        image: 'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=770&q=90'
      }]
    }
  }
  
  renderPage(image, index) {
    return (
        <View key={index} style={{marginTop: 10, borderWidth:2}}>
            <Image style={{ width: this.state.BannerWidth, height: this.state.BannerHeight }} source={{ uri: image.image }} />
        </View>
    );
}
  favoritePage(image, index) {
    return (
      <View style={{height:100, width:100,borderWidth:0, marginTop: 20}}>
        <View>
          <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </View>
        <Text style={{fontSize:10}}>{image.title}</Text>
      </View>
    );
  }
  allPage(image, index) {
    return (
      <ListItem style={{height:100,borderWidth:0}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen")} style={{width: 66, height: 58}}>
        <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
        </TouchableOpacity>
        <Body>
        <Text style={{fontSize:10}}>{image.title}</Text>
        <Button warning style={{height:15,width:70,marginLeft:12}}><Text style={{fontSize:7}}>+ Favorite</Text>
        </Button>
        </Body>
      </ListItem>
    );
  }
  
  render() {
    
    return (
      <Container>
        <Content>
          <Item rounded style={{borderWidth:2}}>
            <Input ></Input>
            <Icon name="search" onPress={() => alert('SEARCH BUTTON')}/>
          </Item>
          <Item>
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
          </Item>
          <Item style={{borderWidth:0}}>
            <Label>
              <Text style={{fontSize:20}}>Favourite</Text>
            </Label>
            </Item>
          <Item style={{borderWidth:0}}>
            <ScrollView horizontal={true} style={{borderWidth:0}}>
              {this.state.entries.map((image, index) => this.favoritePage(image, index))}
            </ScrollView>
          </Item>
          <Item style={{borderWidth:0}}>
            <Label>
              <Text style={{fontSize:20}}>ALL</Text>
            </Label>
          </Item>
          <Item style={{borderWidth:0}}>
            <FlatList style={{borderWidth:0}}
            data={this.state.entries} 
            renderItem={({ item }) => this.allPage(item)}
            keyExtractor={item => item.id}
            >
            </FlatList>
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
});