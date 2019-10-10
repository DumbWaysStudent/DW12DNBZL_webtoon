import React, {Component} from 'react'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Foryouscreen from './screens/Foryouscreen'
import Login_screen from './screens/Login_screen'
import Detail_screen from './screens/Detail_screen'
import Detail_episodes from './screens/Detail_episodes'
import My_favourite_screen from './screens/My_favourite_screen'
import Profile from './screens/Profile'
import create_webtoon from './screens/create_webtoon'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Share} from 'react-native'
import Edit_profile from './screens/Edit_profile'
import My_webtoon_creation from './screens/My_webtoon_creation'
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
          },
          Detail_screen : {
            screen : Detail_screen,
            navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title.title}`,
              headerRight: <Icon name="share" onPress={() => onShare()}></Icon>
            }),
            
          },
          Detail_episode : {
            screen : Detail_episodes,
            navigationOptions: ({ navigation }) => ({
              title: `${navigation.state.params.title.title}`,
              headerRight: <Icon name="share" onPress={() => onShare()}></Icon>
            }),
          }
      })
    },  
    favorit : {
      screen : My_favourite_screen
    },
    'profile' : {
      screen : createStackNavigator({
      'profile' : {
        screen : Profile,
        navigationOptions : {
          header : null
          }
        },
       'Edit_profile' :{
        screen : Edit_profile,
        navigationOptions:{
          title : 'Profile',
          headerRight :<Icon name="arrow" style={{height: 20,width:20}}></Icon>
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
        }
    })
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
