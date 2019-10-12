import React, {Component} from 'react'
import {createAppContainer,createSwitchNavigator,NavigationActions} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Foryouscreen from './screens/Foryouscreen'
import Login_screen from './screens/LoginScreen'
import Detail_screen from './screens/DetailScreen'
import Detail_episodes from './screens/DetailEpisodes'
import My_favourite_screen from './screens/MyFavoriteScreen'
import Profile from './screens/Profile'
import create_webtoon from './screens/CreateWebtoon'
import create_webtoon_episode from './screens/CreateWebtoonEpisode'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Share} from 'react-native'
import edit_create_webtoon from './screens/EditWebtoon'
import edit_create_webtoon_episode from './screens/EditWebtoonEpisode'
import Edit_profile from './screens/EditProfile'
import My_webtoon_creation from './screens/MyWebtoonCreation'

import { Container,Header,Text, Body, Content, Form, Item, Input, Button,Toast,Root, Label,InputGroup, Footer, FooterTab, CardItem,Card, Left, Right, ListItem} from 'native-base'

onShare = async () => {
  try {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    alert(error.message);
  }
};
const switchContainer = createSwitchNavigator({
  Login : Login_screen,
  'Fyscreen': {
    screen : createBottomTabNavigator({
      'Fyscreen':{
        screen : createStackNavigator({
          'Fyscreen' : {
            screen : Foryouscreen,
            navigationOptions:{
              header: null
            }
          },
          Detail_screen : {
            screen : Detail_screen,
            navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title.title}`,
              headerRight: <Icon name="share-alt" size={30} onPress={() => onShare()}></Icon>
            }), 
          },
          Detail_episode : {
            screen : Detail_episodes,
            navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title.title}`,
              headerRight: <Icon name="share-alt" size={30} onPress={() => onShare()}></Icon>
            })
          }
      }),navigationOptions :{
        tabBarLabel : 'For You',
        tabBarIcon : <Icon name="bars" size={30}></Icon>
      }
    },  
    favorit : {
      screen : My_favourite_screen,
      navigationOptions : {
        tabBarLabel : 'Favorite',
      tabBarIcon : <Icon name="star" size={30}></Icon>
      }
    },
    'profile' : {
      screen : createStackNavigator({
      'profile' : {
        screen : Profile,
        navigationOptions: ({navigation}) => ({
          title: 'Profile',
          tabBarLabel : 'Profil',
          tabBarIcon : <Icon name="user" size={30}></Icon>,
          headerRight :(<Icon name="edit" size={30} onPress={() => navigation.navigate("Edit_profile")} color='yellow'/>)
          })
        },
       'Edit_profile' :{
        screen : Edit_profile,
        navigationOptions:{
          title : 'Profile',
          headerRight :<Icon name="check" size={30} color='yellow'></Icon>
        }
        },
        'web_creation' : {
          screen : My_webtoon_creation,
          navigationOptions:{
            title: 'My Webtoon'
          }
        },
        'create_webtoon' :{
          screen : create_webtoon,
          navigationOptions:{
            title: 'Create Webtoon',
            headerRight : <Icon size={30} color='yellow' name="check"></Icon>
          }
        },
        'create_webtoon_episode' :{
          screen : create_webtoon_episode,
          navigationOptions:{
            title: 'Create Webtoon Episode',
            headerRight : <Icon size={30} color='yellow' name="check"></Icon>
          }
        },
        'edit_create_webtoon' :{
          screen : edit_create_webtoon,
          navigationOptions:{
            title: 'Edit Your Webtoon',
            headerRight : <Icon size={30} color='yellow' name="check"></Icon>
          }
        },
        'edit_create_webtoon_episode' :{
          screen : edit_create_webtoon_episode,
          navigationOptions:{
            title: 'Edit Your Webtoon Episode',
            headerRight : <Icon size={30} color='yellow' name="check"></Icon>
          }
        }
        
    }),navigationOptions:{
      tabBarLabel : 'Profile',
      tabBarIcon : <Icon name='user' size={30}></Icon>
    }
  }
  
})
}
},{
  initialRouteName : 'Login'
})

const AppContainer = createAppContainer(switchContainer)

export default class App extends Component{
  
  render(){
    const { navigate } = this.props;
    return <AppContainer/>
  }
}
