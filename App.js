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
import {Icon} from 'react-native'


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
            navigationOptions : {
              headerRight: <Icon name="share" onPress={this.onShare}></Icon>
            }
          },
          Detail_episode : {
            screen : Detail_episodes,
            navigationOptions : {
              headerRight : <Icon name="share"></Icon>
            }
          }
        })
    },  
    favorit : {
      screen : My_favourite_screen
    },
    profile : {
      screen : Profile
    }
  })
}
},{
  initialRouteName : 'Login'
})

const AppContainer = createAppContainer(switchContainer)

export default class App extends Component{
  render(){
    return <AppContainer/>
  }
}
