import React, {Component} from 'react'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Foryouscreen from './screens/Foryouscreen'
import Login_screen from './screens/Login_screen'
import Detail_screen from './screens/Detail_screen'
import Detail_episodes from './screens/Detail_episodes'
import My_favourite_screen from './screens/My_favourite_screen'

const switchContainer = createSwitchNavigator({
  Login : Login_screen,
  'Fyscreen': {
    screen : createBottomTabNavigator({
      'Fyscreen':{
        screen : createStackNavigator({
          'Fyscreen' : Foryouscreen,
          detail : My_favourite_screen,
          test3 : My_favourite_screen
        })
    },  
    favorit : My_favourite_screen,
    profile : My_favourite_screen
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