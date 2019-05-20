import React from 'react';
import {
  StyleSheet,
   Text,
   TextInput ,
   View ,
   Image ,
   ImageBackground ,
   Dimensions ,
   TouchableOpacity ,
   KeyboardAvoidingView ,
   ScrollView , 
   Alert

   } from 'react-native';

import {MyContext} from '../../App' ; 
 import bgImage from '../../assets/images/background.jpeg' ;
 import logo from '../../assets/images/logo.jpg' ;
 import Icon from 'react-native-vector-icons/Ionicons' ;

const {width : WIDTH , height : Hieght} = Dimensions.get('window') ;

 

export default class Registration extends React.Component {

  constructor(props){
    
    super(props) ;

    this.state = {
      showPass : true ,
      press : false , 
      username : '' , 
      email : '' , 
      password1:'' ,
      password2:''
    }
  }


  showPass = ()=>{
    if (this.state.press == false){
      this.setState({
        showPass:false , press : true
      }) ;
 
    }
    else {
      this.setState({
        showPass:true , press : false 
      }) ;
    }
  }
 
  addAccount = () => {
    if (this.state.password1 === this.state.password2)
    {
      fetch('https://mk14chatserver.herokuapp.com/addAccount' , {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: this.state.username,
          email: this.state.email,
          password:this.state.password1
        })
      }).then(data => this.setState({
        username :'' , 
        email : '' , 
        password1 : '' , 
        password2 : ''
      })
      ).then(data =>this.props.navigation.navigate("Login"),{})
    } else {

      Alert.alert(
        'Not Matched Password',
        'Sorry But both passwords must be matched ',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
      
      
    }  
    
 } ; 

  

  render() {
    return (
  <MyContext.Consumer>
     {
       (context)=>(

      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <ScrollView contentContainerStyle={styles.scroll}>

           <KeyboardAvoidingView behavior="position">
              <View style = {styles.logoContainer}>
                <Image source={logo} style = {styles.logo}  />
                <Text style = {styles.logoText}>MK14 Chat</Text>
              </View>

                {/* User Name View  */}
                <View style = {styles.inputContainer}>
              <Icon name = {'ios-person'} size = {28} color= {'rgba(255,255,255,0.7)'}
                style = {styles.inputIcon}
              />

                <TextInput
                    style = {styles.input}
                    placeholder = {'User Name'}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.username}
                    onChangeText = {username => this.setState({username})}
                    />
              </View >



              {/* Email View  */}
              <View style = {styles.inputContainer}>
              <Icon name = {'ios-person'} size = {28} color= {'rgba(255,255,255,0.7)'}
                style = {styles.inputIcon}
              />

                <TextInput
                    style = {styles.input}
                    placeholder = {'Email'}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.email}
                    onChangeText={email => this.setState({email})}/>
              </View >

              {/* Password View */}
              <View style = {styles.inputContainer}>
              <Icon name = {'ios-lock'} size = {28} color= {'rgba(255,255,255,0.7)'}
                style = {styles.inputIcon}
              />

                <TextInput
                    style = {styles.input}
                    placeholder = {'Password'}
                    secureTextEntry = {this.state.showPass}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.password1}
                    onChangeText = {password1 => this.setState({password1})}
                    />


                <TouchableOpacity style={styles.btnEye}
                  onPress = {this.showPass}
                >
                      <Icon name = {this.state.press == false ? 'ios-eye':'ios-eye-off'} size = {20} color ={'rgba(255,255,255,0.7)'} />
                </TouchableOpacity>

              </View>

            {/* Repeated Password View */}
            <View style = {styles.inputContainer}>
              <Icon name = {'ios-lock'} size = {28} color= {'rgba(255,255,255,0.7)'}
                style = {styles.inputIcon}
              />

                <TextInput
                    style = {styles.input}
                    placeholder = {'Repeated Password'}
                    secureTextEntry = {this.state.showPass}
                    placeholderTextColor = {'rgba(255,255,255,0.7)'}
                    underlineColorAndroid = 'transparent'
                    value = {this.state.password2}
                    onChangeText = {password2 => this.setState({password2})}
                    />
 

                <TouchableOpacity style={styles.btnEye}
                  onPress = {this.showPass}
                >
                <Icon name = {this.state.press == false ? 'ios-eye':'ios-eye-off'} size = {20} color ={'rgba(255,255,255,0.7)'} />
                </TouchableOpacity>

              </View>

          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.btnLogin}
            onPress = {this.addAccount}
            >
                  <Text style={styles.text}>Registration</Text>
          </TouchableOpacity>

          <Text
          onPress={() => this.props.navigation.navigate("Login",{})}
          style={styles.RegLink}
          > Already Have Account ? <Text style={styles.SignUpText}> Sign In Now </Text> </Text>


        </ScrollView>

      </ImageBackground>
          )
        }
      </MyContext.Consumer>
      
    );
  }
}
{/* */}


{/*  ========================================  Styles ==================================== */}
  const styles = StyleSheet.create({
  backgroundContainer: {
    width: null ,
    height : null ,

  },

  scroll : {
    // flex: 1,
    height : Hieght,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo : {
    width:120 ,
    height:120 ,
    borderRadius : 20 ,
    opacity : 0.7
  } ,
  logoContainer : {
    alignItems : 'center'
  } ,
  logoText : {
    color : 'white' ,
    fontSize : 20 ,
    fontWeight: '500',
    marginTop: 10,
    opacity : 0.5
  } ,
  input :  {
    width: WIDTH - 50 ,
    height: 45 ,
    borderRadius : 25 ,
    fontSize : 16 ,
    paddingLeft: 45 ,
    backgroundColor : 'rgba(0,0,0,0.35)' ,
    color: 'rgba(255,255,255,0.7)' ,
    marginHorizontal: 25,
  } ,
  inputIcon : {
    position : 'absolute' ,
    top : 8 ,
    left : 37
  } ,
  inputContainer :  {
    marginTop : 10
  } ,
  btnEye:{
    position : 'absolute' ,
    top : 8 ,
    right : 37
  } ,
  btnLogin:{
    width: WIDTH - 50 ,
    height: 45 ,
    borderRadius : 25 ,
    backgroundColor:'gold' ,
    marginTop : 20

  },
  text:{
    marginTop:7 ,
    color:'rgba(0,0,0,0.7)' ,
    fontSize: 15 ,
    textAlign : 'center'
  } , 
  RegLink:{
    marginTop:15 ,
    color:'#fff' ,
    fontSize: 20 ,
    textAlign : 'center'
  } , 
  SignUpText : {
    color:'gold'
  }

});