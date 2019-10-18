import React, { Component } from 'react';
import {
  Container, Icon, Content,
  List, ListItem, Thumbnail, Text,
  Left, Body, Right, Button, Spinner, Item, Input
} from 'native-base';
import { StyleSheet, TouchableOpacity, Dimensions , Image } from 'react-native';
import { Font, AppLoading } from "expo";
import decode from 'jwt-decode';
import io from 'socket.io-client';


// const baseUrl = "http://192.168.43.10:3005";
const baseUrl = "https://mk14chatserver.herokuapp.com";

const { width: Width, height: Height } = Dimensions.get('screen');

export default class Home extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Chats",
      headerLeft: <>
        <Button transparent onPress={() => navigation.goBack(null)} >
          <Icon name="arrow-back" style={{ color: '#333' }} />
        </Button>

      </>
      ,
      headerRight: <Icon name="menu" style={{ color: '#333' }} />,
      headerStyle: {
        backgroundColor: 'gold',

      },
      headerTitleStyle: {
        fontWeight: 'bold',
        color: '#333'
      },
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {},
      loading: true,
      loadingUsers: true,
      users: [],
      latestChats: [],
      searchingForContacts: false,
      contactsBySearch: []
    }


    const socket = io(baseUrl, {
      transports: ['websocket'],
      jsonp: false
    });

    socket.on('connect', () => {
      console.log("New Socket connection from home screen : ", socket.id)
    })


    // add DidFocus Event lisenter
    this.props.navigation.addListener('didFocus', async () =>{

      this.fetchLatestChats();
      this.userChats() ;
      this.setState({ state : this.state}) ; 

    })


  }

  componentDidMount = async () => {

    let token = this.props.navigation.getParam('token');
    var decoded = decode(token);
    this.setState({
      currentUser: decoded
    })

    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });


    this.fetchLatestChats() ; 

  }


  // load latest Chats
  fetchLatestChats = () => {
    fetch(baseUrl + "/latestChats/" + this.state.currentUser.uid, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(response => {
        this.setState({ latestChats: response.preChats });

      }).then(() => this.setState({ loadingUsers: false }))
  }


  // custmize chats list 
  userChats = () => {
    let chatsArr = [];
    let chats = this.state.latestChats;
    for (let chat of chats) {
      if (chat.messages[0] && chat.messages.length > 0) {
        chat.users.map(user => {
          if (user._id !== this.state.currentUser.uid) {

            chatsArr.push(

              <ListItem key={user._id} thumbnail >
                <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatRoom", { user, currentUser: this.state.currentUser })} style={{ flexDirection: "row" }}>

                  <Left>
                    <Thumbnail circular source={{ uri: user.profileImg }} />
                  </Left>
                  <Body>
                    <Text>{user.username}</Text>
                    <Text note numberOfLines={1}>{chat.messages[0] ? chat.messages[chat.messages.length - 1].msgBody : null}</Text>
                  </Body>
                  <Right>
                    <Button transparent>
                      <Text></Text>
                    </Button>
                  </Right>
                </TouchableOpacity>
              </ListItem>
            )
          }
        })
      }

    }

    
    if (chatsArr.length > 0)
    return chatsArr;
    else{
      return (
        <Content padder contentContainerStyle={{justifyContent:'center', alignItems : 'center' , height : 0.5*Height}}>
          <Text style={{fontSize : 20 , color:"#333"}}>You Have No Previous Chats</Text>
        </Content>
      )
    }

  }

  // searching for new Contact
  searchContact = (text) => {
    let searchResult = [];
    console.log("TEXT : ", text)
    if (text !== '') {

      this.setState({ searchingForContacts: true })

      fetch(`${baseUrl}/searchFriends/${text}`)
        .then(res => {
          if (res.status == 200) {
            res.json()
              .then(json => this.setState({
                contactsBySearch: json.users
              }))
            // .then((rslt) => rslt.users.map(user =>
            //   searchResult.push(

            // <ListItem key={user._id} thumbnail >
            //   <TouchableOpacity onPress={() => this.props.navigation.navigate("ChatRoom", { user, currentUser: this.state.currentUser })} style={{ flexDirection: "row" }}>
            //     <Left>
            //       <Thumbnail circular source={{ uri: user.profileImg }} />
            //     </Left>
            //     <Body>
            //       <Text>{user.username}</Text>
            //       <Text note numberOfLines={1}>{chat.messages[0] ? chat.messages[chat.messages.length - 1].msgBody : null}</Text>
            //     </Body>
            //     <Right>
            //       <Button transparent>
            //         <Text></Text>
            //       </Button>
            //     </Right>
            //   </TouchableOpacity>
            // </ListItem>
            //     )  )
            // )
          }
        })

      return searchResult;
    } else {
      this.setState({
        searchingForContacts: false
      })
    }

  }


  render() {


    if (this.state.loading || this.state.loadingUsers) {
      return (
        <Container>
          {/* <Header color="gold" style={styles.header}/> */}
          <Content contentContainerStyle={styles.loadingContainer}>
            <AppLoading />
            <Spinner color='gold' style={styles.spinner} />
          </Content>
        </Container>
      );
    } else {

      return (
        <Container>
          {/* <Header style={styles.header}/> */}
          <Content>
            <Item>
              <Icon name="ios-search" />
              <Input
                placeholder="Search or start a new chat"
                onChangeText={contact => {
                  this.setState({contact})
                  this.searchContact(contact)
                }}
                value={this.state.contact} />
              {this.state.searchingForContacts ?
                <TouchableOpacity onPress={() => this.setState({
                  searchingForContacts: false,
                  contact: ''
                })}>
                  <Icon name="close-circle" />
                </TouchableOpacity>
                : null
              }
            </Item>
            <List>

              {
                !this.state.searchingForContacts ?
                  this.userChats() :
                  // if searching for a contact 
                  this.state.contactsBySearch.map(user =>
                    <ListItem key={user._id} thumbnail >
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          contact: '',
                          searchingForContacts: false
                        })
                        this.props.navigation.navigate("ChatRoom", { user, currentUser: this.state.currentUser })
                      }} style={{ flexDirection: "row" }}>
                        <Left>
                          <Thumbnail circular source={{ uri: user.profileImg }} />
                        </Left>
                        <Body>
                          <Text>{user.username}</Text>
                          {/* <Text note numberOfLines={1}>{chat.messages[0] ? chat.messages[chat.messages.length - 1].msgBody : null}</Text> */}
                        </Body>
                        <Right>
                          <Button transparent>
                            <Text><Icon name="arrow-forward" /></Text>
                          </Button>
                        </Right>
                      </TouchableOpacity>
                    </ListItem>
                  )
              }

            </List>
          </Content>
        </Container>

      );
    }

  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    // backgroundColor: '#333',
    justifyContent: 'center',
    flex: 1,

  },
  header: {
    backgroundColor: 'gold'
  } , 
 
})