import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Entypo , FontAwesome} from "@expo/vector-icons" 
import { View , Text } from 'react-native';
import {Header , Thumbnail} from 'native-base' ; 

import Profile from '../screens/ProfileScreen';
import Login from '../screens/LoginScreen';
import Registration from '../screens/RegistrationScreen';
import Home from '../screens/HomeScreen' ; 
import Chat from '../screens/ChatScreen' ; 


const usersChat = createStackNavigator({
  Home : {
    screen:Home , 
  } , 
  ChatRoom : {
    screen : Chat 
  }
} , {headerLayoutPreset: 'center'})


const main = createStackNavigator({
  UsersList:{
      screen: usersChat , 
      navigationOptions: {
          tabBarIcon: ({tintColor})=>{
              return <FontAwesome name="home" color={tintColor} size={20} />
          } ,
          headerTitle: "Home",
      }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => {
        return <Entypo name="user" color={tintColor} size={20} />
      }
    }
  },
}, {}) ; 



const HomeRoute = createStackNavigator({
  Login:{
    screen:Login , 
    navigationOptions: () => ({
      headerTitle :null , 
      header:null 
    })
  },
  Registration:{
    screen:Registration , 
    navigationOptions: ()=>({
      headerTitle : "Registration" , 
      header : null
    })
  },
  Profile : {
    screen : usersChat , 
    navigationOptions: () => ({
      headerTitle : "Profile" ,
      header : null
    })
  }
})



// const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })
const screens = createStackNavigator({ HomeRoute }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(HomeRoute)
export default AppNavigation;
