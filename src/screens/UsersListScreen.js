import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
// import userMaleAvator from '../../assets/images/maleuser' ; 
// import Icon from 'react-native-vector-icons/Ionicons' ;
import logo from '../../assets/images/logo.jpg' ;
import { Font, AppLoading } from "expo";



export default class UsersList extends Component {

  state = {
    loading : true 
  }

  async componentWillMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf")
    });
    this.setState({ loading: false });
  }

  render() {
  
  
    if (this.state.loading){
      return (
        <AppLoading />
      ) ; 
    } else {

    return (
        <Container>
        <Header />
        <Content>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{ uri: '../../assets/images/maleuser.png' }} />
              </Left>
              <Body>
                <Text>Sankhadeep</Text>
                <Text note numberOfLines={1}>Its time to build a difference . .</Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>View</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
      
    );
  }

  }
}