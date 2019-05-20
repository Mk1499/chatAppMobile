import 
{ StyleSheet, Text, View , 
  TextInput , 
} from 'react-native';
import { Font } from 'expo';
import io from 'socket.io-client' ;
import AppNavigation from './src/routes/navigator';
import React, { Component } from 'react';
import {Constants} from 'expo'
// import {
//   Container,
//   Header,
//   Button,
//   Text,
//   Body,
//   Form,
//   Item as FormItem,
//   Input,
//   Label,
//   Title,
// } from 'native-base';

export const MyContext = React.createContext() ;

class MyProvider extends React.Component {
  
  state = {
    // name : "Khaled" , 
    // movies : [{id:"",title:"",large_cover_image:"https://loading.io/spinners/rolling/lg.curve-bars-loading-indicator.gif" ,genres:[],description_full:""}], 

  }

  // componentDidMount = () => {
  //   fetch("https://yts.am/api/v2/list_movies.json")
  //   .then(response => response.json())
  //     .then(movies => this.setState({ movies : movies.data.movies}));
  // }
  
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
      // chatMsg : "intial value" , 
      // chatMessages : []
    }
  } 


  // componentDidMount(){
  //   this.socket = io('http://192.168.1.4:3000') ; 
  // }

  // submitChatMsg(event){
  //   this.socket.emit('chat message' , this.state.chatMsg) ; 
  //   this.setState({chatMsg:""})
  // }
  
  render() {
    return (
      // <View style={styles.container}>
      //   <TextInput 
      //   style = {{height : 40 , borderWidth : 2 }}
      //   autoCorrect={false} 
      //   value={this.state.chatMsg}
      //   onSubmitEditing = {(event)=> this.submitChatMsg(event)} 
      //   onChange={chatMsg => {
      //     this.setState({chatMsg})
      //   }}
        
      //   />
      // </View>
      <MyProvider>
        <AppNavigation />
      </MyProvider>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
