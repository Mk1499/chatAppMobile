import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Button

} from 'react-native';

import {
  Spinner,
  Toast
} from 'native-base';

import Context from '../config/Context';
import ContextProvider from '../provider/ContextProvider';
import { MyContext } from '../../App';
import bgImage from '../../assets/images/background.jpeg';
import logo from '../../assets/images/logo.png';
import Icon from 'react-native-vector-icons/Ionicons';

const { width: WIDTH, height: Hieght } = Dimensions.get('window');

// const baseUrl = "http://192.168.43.10:3005";
const baseUrl = "https://mk14chatserver.herokuapp.com";

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showPass: true,
      press: false,
      email: '',
      password: '',
      error: false, 
      displaySpinner: 0
    }
  }

  showPass = () => {
    if (this.state.press == false) {
      this.setState({
        showPass: false, press: true
      });

    }
    else {
      this.setState({
        showPass: true, press: false
      });
    }
  }

  LoginFun = () => {
    this.setState({ displaySpinner: 1, error: false })
    seen = []
    return fetch(baseUrl+'/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      },

      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      }),
    })
      .then(response => {
        if (response.status === 200) {
          response.json()
            .then(response => {
              // localStorage.setItem('MK14ChatToken', response.token)
              // console.log("User Token ", response.token) ; 
              this.setState({displaySpinner:0})
              this.props.navigation.navigate("Profile", {token : response.token})
            })

        } else {
          // console.log("E L : ", response)
          this.setState({displaySpinner: 0 ,
                          error: true });
          () => Toast.show({
            text: 'Wrong Email or password!',
            buttonText: 'Okay'
          })
          // alert(response.status)
        }

      }).catch(err => {
        alert(err)
        this.setState({ displaySpinner: 0 })
      });
  }

  render() {
    return (
      <MyContext.Consumer>
        {
          (context) => (

            <ImageBackground source={bgImage} style={styles.backgroundContainer}>

              <ScrollView contentContainerStyle={styles.scroll}>

                <KeyboardAvoidingView behavior="position">
                  <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                    {/* <Text style={styles.logoText}>{context.state.AppName}</Text> */}
                  </View>


                  {/* Email View  */}
                  <View style={styles.inputContainer}>
                    <Icon name={'ios-person'} size={28} color={'rgba(255,255,255,0.7)'}
                      style={styles.inputIcon}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder={'Email'}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underlineColorAndroid='transparent'
                      onChangeText={email => {
                        // console.log(email);
                        return this.setState({ email })
                      }}
                    />
                  </View >

                  {/* Password View */}
                  <View style={styles.inputContainer}>
                    <Icon name={'ios-lock'} size={28} color={'rgba(255,255,255,0.7)'}
                      style={styles.inputIcon}
                    />

                    <TextInput
                      style={styles.input}
                      placeholder={'Password'}
                      secureTextEntry={this.state.showPass}
                      placeholderTextColor={'rgba(255,255,255,0.7)'}
                      underlineColorAndroid='transparent'
                      onChangeText={password => this.setState({ password })} />


                    <TouchableOpacity style={styles.btnEye}
                      onPress={this.showPass}
                    >
                      <Icon name={this.state.press == false ? 'ios-eye' : 'ios-eye-off'} size={20} color={'rgba(255,255,255,0.7)'} />
                    </TouchableOpacity>

                  </View>

                </KeyboardAvoidingView>



                <TouchableOpacity style={styles.btnLogin}
                  onPress={() => {
                    context.changeEmail(this.state.email);
                    return this.LoginFun()
                  }}
                >
                  <Text style={styles.text} >Login</Text>
                </TouchableOpacity>

                <Text
                  title="Go to Registration"
                  onPress={() => this.props.navigation.navigate("Registration", {})}
                  style={styles.RegLink}
                > Don't Have Account <Text style={styles.SignUpText}> Sign Up Now </Text> </Text>

                <Spinner color='gold' style={{ opacity: this.state.displaySpinner }} />
                <Text style={this.state.error ? styles.errorDiv : styles.hideError}> Sorry but there is not valid email or password</Text>
              </ScrollView>

            </ImageBackground>
          )
        }
      </MyContext.Consumer>

    );
  }
}



{/*  ========================================  Styles ==================================== */ }
const styles = StyleSheet.create({
  backgroundContainer: {
    width: null,
    height: null,

  },

  scroll: {
    // flex: 1,
    height: Hieght,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  logoContainer: {
    alignItems: 'center'
  },
  logoText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginTop: 10,
    opacity: 0.5
  },
  input: {
    width: WIDTH - 50,
    height: 45,
    borderRadius: 25,
    fontSize: 16,
    paddingLeft: 45,
    backgroundColor: 'rgba(0,0,0,0.35)',
    color: 'rgba(255,255,255,0.7)',
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37
  },
  inputContainer: {
    marginTop: 10
  },
  btnEye: {
    position: 'absolute',
    top: 8,
    right: 37 , 
    width : 30
  },
  btnLogin: {
    width: WIDTH - 50,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'gold',
    marginTop: 20

  },
  text: {
    marginTop: 7,
    color: 'rgba(0,0,0,0.7)',
    fontSize: 15,
    textAlign: 'center'
  },
  RegLink: {
    marginTop: 15,
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  SignUpText: {
    color: 'gold'
  },
  hideError: {
    display: 'none'
  },
  errorDiv: {
    backgroundColor: 'red',
    color: 'white',

  }

});