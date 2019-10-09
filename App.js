import React, {Component} from 'react'
import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Foryouscreen from './screens/Foryouscreen'
import Login_screen from './screens/Login_screen'

const AppNavigator = createStackNavigator({
  Login : Login_screen,
  Fyscreen: Foryouscreen
},
{
  initialRouteName : 'Login'
})

const AppContainer = createAppContainer(AppNavigator)

export default class App extends Component{
  render(){
    return <AppContainer/>
  }
}