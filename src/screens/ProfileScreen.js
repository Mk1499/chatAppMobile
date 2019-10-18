import React, { Component } from 'react'
import { Text, View , StyleSheet , Image} from 'react-native'
import {
  Content , 
  Card , 
  CardItem , 
  Thumbnail , 
  Header ,
  Left
  
} from 'native-base'

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("email"),
    headerLeft: <Text>back</Text>,
    headerRight: <Text onPress={() => navigation.goBack(null)}>back</Text>,
  })

  constructor(props){
    super(props) ;
    this.state = {
      email : this.props.navigation.getParam("email") ,
      user : {
        username : '' , 
        email : '' , 
        age : '' , 
        imgUrl : 'https://www.shareicon.net/data/2016/05/26/771203_man_512x512.png'
      }
    }
    fetch(`http://192.168.1.7:3000/user/${this.state.email}`,{
      method : 'GET'
    }).then(response => response.json())
    .then (response => this.setState({user : response.user})) 
  }
  
  render() {
    return (
  <Content >
      <Header />
      <Card >
        <Content contentContainerStyle = {styles.content}>
          <Image
           source={{uri: this.state.user.imgUrl}}
           style = {styles.profileImage} 
            />
          <Text  style={styles.username}> {this.state.user.username} </Text>

        </Content>
      
      </Card>

        <Card>
          <Content>
            <Left>
              <Text style={{fontWeight:'bold',fontSize:20}}>Age : </Text>
              <Text>{this.state.user.age}</Text>
            </Left>
          </Content>  
        </Card>       

  </Content> 
    
    )
  }
}

{/*=========================================== Styles ======================================== */}

const styles = StyleSheet.create({
  content : {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  } , 
  profileImage : {
    borderRadius : 100 ,
    width : 200 , 
    height : 200 , 
    borderWidth: 5,
    borderColor: 'gold',
  } , 
  username : {
    marginVertical : 20 , 
    fontSize : 50
  }
})