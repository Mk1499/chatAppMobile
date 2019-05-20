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

const HomeRoute = createStackNavigator({
  Login:{
    screen:Login , 
    navigationOptions: () => ({
      headerTitle :'Login'
    })
  },
  Registration:{
    screen:Registration , 
    navigationOptions: ()=>({
      headerTitle : "Registration"
    })
  },
})

const main = createBottomTabNavigator({
  Home:{
      screen: HomeRoute , 
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

const screens = createStackNavigator({ main }, { defaultNavigationOptions: { header: null } })

const AppNavigation = createAppContainer(screens)
export default AppNavigation;
