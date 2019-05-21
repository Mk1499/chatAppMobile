import React from 'react';
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import { Entypo , FontAwesome} from "@expo/vector-icons" 
import { Text } from 'react-native';

import Profile from '../screens/ProfileScreen';
import Login from '../screens/LoginScreen';
import Registration from '../screens/RegistrationScreen';
import UsersList from '../screens/UsersListScreen' ; 



const main = createBottomTabNavigator({
  UsersList:{
      screen: UsersList , 
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
}, {})

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
    screen : main , 
    navigationOptions: () => ({
      headerTitle : "Profile" ,
      header : null
    })
  }
})



const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(HomeRoute)
export default AppNavigation;
