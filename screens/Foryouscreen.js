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



export default class Foryouscreen extends Component{
  constructor(props){
    super(props)
    this.state={
      BannerWidth: Dimensions.get('window').width,
      BannerHeight: 260,
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
        <View key={index} style={{marginTop: 10, borderWidth:2}}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
            <Image style={{ width: this.state.BannerWidth, height: this.state.BannerHeight }} source={{ uri: image.image }} />
            </TouchableOpacity>
        </View>
    );
}
  favoritePage(image, index) {
    return (
      <View style={{height:100, width:100,borderWidth:0, marginTop: 20}}>
        <View key={image.index}>
          <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})}>
          <Image source={{uri : image.image}} style={{width: 66, height: 58}}></Image>
          </TouchableOpacity>
        </View>
        <Text style={{fontSize:10}}>{image.title}</Text>
      </View>
    );
  }
  allPage(image, index) {
    return (
      <ListItem style={{height:100,borderWidth:0}}>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate("Detail_screen", {title :image})} style={{width: 66, height: 58}}>
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