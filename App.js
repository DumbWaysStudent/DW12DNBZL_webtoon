import React, {Component} from 'react'
import {createAppContainer,createSwitchNavigator,NavigationActions} from 'react-navigation'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Foryouscreen from './app/screens/ForYou'
import Login_screen from './app/screens/LoginScreen'
import Detail_screen from './app/screens/DetailScreen'
import Detail_episodes from './app/screens/DetailEpisodes'
import My_favourite_screen from './app/screens/MyFavoriteScreen'
import Profile from './app/screens/Profile'
import create_webtoon from './app/screens/CreateWebtoon'
import create_webtoon_episode from './app/screens/CreateWebtoonEpisode'
import Icon from 'react-native-vector-icons/FontAwesome'
import {Share} from 'react-native'
import edit_create_webtoon from './app/screens/EditWebtoon'
import edit_create_webtoon_episode from './app/screens/EditWebtoonEpisode'
import Edit_profile from './app/screens/EditProfile'
import My_webtoon_creation from './app/screens/MyWebtoonCreation'
import Register from './app/screens/Register'
import {Provider} from 'react-redux'
import store from './app/_redux/store'





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
  Register : Register,
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
              title: `${navigation.state.params.title.tittle}`,
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
        tabBarIcon : ({tintColor}) =><Icon name='th-large' size={30} color = {tintColor}></Icon>,
        tabBarOptions : {
        activeTintColor : 'white',
        inactiveBackgroundColor : '#673ab7',
        activeBackgroundColor : '#673ab7'
      }
      }
    },  
    favorit : {
      screen : My_favourite_screen,
      navigationOptions : {
        tabBarLabel : 'Favorite',
        tabBarIcon : ({tintColor}) =><Icon name='star' size={30} color = {tintColor}></Icon>,
        tabBarOptions : {
          activeTintColor : 'white',
          inactiveBackgroundColor : '#673ab7',
          activeBackgroundColor : '#673ab7'
        }
      }
    },
    'profile' : {
      screen : createStackNavigator({
      'profile' : {
        screen : Profile,
        navigationOptions: ({navigation}) => ({
          title: 'Profile',
          headerTitleStyle :{
            fontWeight : 'bold',
            color : 'white'
          },
          headerStyle:{
            backgroundColor : '#673ab7'
          },
          
          tabBarIcon : <Icon name="user" size={30}></Icon>,
          headerRight :(<Icon name="edit" size={30} onPress={() => navigation.navigate("Edit_profile")} style={{marginRight: 10}} color='#ee532f'/>)
          })
        },
       'Edit_profile' :{
        screen : Edit_profile,
        navigationOptions:{
          title : 'Edit Profile',
          headerTitleStyle :{
            fontWeight : 'bold',
            color : 'white'
          },
          headerStyle:{
            backgroundColor : '#673ab7'
          },
          headerRight :<Icon name="check" size={30} color='#ee532f' style={{marginRight : 10}}></Icon>
        }
        },
        'web_creation' : {
          screen : My_webtoon_creation,
          navigationOptions:{
            title: 'My Webtoon',
            headerTitleStyle :{
              fontWeight : 'bold',
              color : 'white'
            },
            headerStyle:{
              backgroundColor : '#673ab7'
            },
          }
        },
        'create_webtoon' :{
          screen : create_webtoon,
          navigationOptions:{
            title: 'Create Webtoon',
            headerTitleStyle :{
              fontWeight : 'bold',
              color : 'white'
            },
            headerStyle:{
              backgroundColor : '#673ab7'
            },
            headerRight :<Icon name="check" size={30} color='#ee532f' style={{marginRight : 10}}></Icon>
          }
        },
        'create_webtoon_episode' :{
          screen : create_webtoon_episode,
          navigationOptions:{
            title: 'Create Webtoon Episode',
            headerTitleStyle :{
              fontWeight : 'bold',
              color : 'white'
            },
            headerStyle:{
              backgroundColor : '#673ab7'
            },
            headerRight :<Icon name="check" size={30} color='#ee532f' style={{marginRight : 10}}></Icon>
          
          }
        },
        'edit_create_webtoon' :{
          screen : edit_create_webtoon,
          navigationOptions:{
            title: 'Edit Your Webtoon',
            headerTitleStyle :{
              fontWeight : 'bold',
              color : 'white'
            },
            headerStyle:{
              backgroundColor : '#673ab7'
            },
            headerRight :<Icon name="check" size={30} color='#ee532f' style={{marginRight : 10}}></Icon>
          }
          
        },
        'edit_create_webtoon_episode' :{
          screen : edit_create_webtoon_episode,
          navigationOptions:{
            title: 'Edit Your Webtoon Episode',
            headerTitleStyle :{
              fontWeight : 'bold',
              color : 'white'
            },
            headerStyle:{
              backgroundColor : '#673ab7'
            },
            headerRight :<Icon name="check" size={30} color='#ee532f' style={{marginRight : 10}}></Icon>
          }
          
        }
        
    }),navigationOptions:{
      tabBarLabel : 'Profile',
      tabBarIcon : ({tintColor}) =><Icon name='user' size={30} color = {tintColor}></Icon>,
      tabBarOptions : {
        activeTintColor : 'white',
        inactiveBackgroundColor : '#673ab7',
        activeBackgroundColor : '#673ab7'
      }
    }
  }
})
}
},{
  initialRouteName : 'Fyscreen'
})

const AppContainer = createAppContainer(switchContainer)

export default class App extends Component{
  
  render(){
    const { navigate } = this.props;
    return (
      <Provider store={store}>
        <AppContainer/>
      </Provider>
    )
  }
}
