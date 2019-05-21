import 
{ StyleSheet, Text, View , 
  TextInput , 
} from 'react-native';
import { Font } from 'expo';
import io from 'socket.io-client' ;
import AppNavigation from './src/routes/navigator';
import React, { Component } from 'react';
import {Constants} from 'expo' ;


export const MyContext = React.createContext() ;

class MyProvider extends React.Component {
  
  state = {
    
  }


  
  render(){
    return (
    <MyContext.Provider value ={{state : this.state}}>
      {this.props.children}
    </MyContext.Provider>
    ) ; 
  }
}


export default class App extends React.Component {


  constructor (props){
    super(props) ; 
    this.state = {
    
    }
  } 


  
  
  render() {
    return (
  
      <MyProvider>
        <AppNavigation />
      </MyProvider>
    );
  }
}

