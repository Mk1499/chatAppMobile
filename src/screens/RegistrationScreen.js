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
   Alert , 
   Button , 
   Platform

   } from 'react-native';


import {ImagePicker} from 'expo' ; 

import ImgToBase64 from 'react-native-image-base64';

import {MyContext} from '../../App' ; 
 import bgImage from '../../assets/images/background.jpeg' ;
 import logo from '../../assets/images/logo.png' ;
 import Icon from 'react-native-vector-icons/Ionicons' ;

const {width : WIDTH , height : Hieght} = Dimensions.get('window') ;

// const options = {
//   title: 'Select Avatar',
//   customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//   storageOptions: {
//     skipBackup: true,
//     path: 'images',
//   },
// };
 
// ImagePicker.showImagePicker(options, (response) => {
//   console.log('Response = ', response);

//   if (response.didCancel) {
//     console.log('User cancelled image picker');
//   } else if (response.error) {
//     console.log('ImagePicker Error: ', response.error);
//   } else if (response.customButton) {
//     console.log('User tapped custom button: ', response.customButton);
//   } else {
//     const source = { uri: response.uri };

//     // You can also display the image using data:
//     // const source = { uri: 'data:image/jpeg;base64,' + response.data };

//     this.setState({
//       avatarSource: source,
//     });
//   }
// });

export default class Registration extends React.Component {

  constructor(props){
    
    super(props) ;

    this.state = {
      showPass : true ,
      press : false , 
      username : '' , 
      email : '' , 
      password1:'' ,
      password2:'' , 
      photo : null 
    }
  }

  
  _pickImage = async () => {
    const options = {
      noData: true,
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);
    
    if (!result.cancelled) {
      console.log("HERER")
      // this.state.photo.append('fileName','img') ; 
    console.log(this.state.photo);

      this.setState({ photo: result });
    }
  }

   createFormData = (photo, body) => {
    const data = new FormData();
    
  
    data.append("photo", {
      // name: photo.fileName,
      type: photo.type,
      uri:
        Platform.OS === "android" ? photo.uri : photo.uri.replace("file://", "")
    });
  
    Object.keys(body).forEach(key => {
      data.append(key, body[key]);
    });
  
    return data;
  };


handleUploadPhoto = () => {
  fetch("http://192.168.1.7:3000/addImage", {
    method: "POST",
    body: this.createFormData(this.state.photo, { userId: "123" }) 
    // body : "dd"
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      this.setState({ photo: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
};




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

  // uploadImg =  () => {



  //   var photo = {
  //     uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mk14%252Fmobile/ImagePicker/365ad8ee-a595-49c9-bca9-0d6b8475ffde.jpg",
  //     type: 'image/jpeg',
  //     name: 'photo.jpg',
  // };
  
  // var body = new FormData();
  // body.append('authToken', 'secret');
  // body.append('photo', photo);
  // body.append('title', 'A beautiful photo!');
  
  // var xhr = new XMLHttpRequest();
  // xhr.open('POST', "http://192.168.1.7:3000/addImage");
  // console.log(body)
  // xhr.send(body);


//     const data = new FormData();
//     data.append('name', 'testName'); // you can append anyone.
//      data.append('photo', {
//     uri: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540mk14%252Fmobile/ImagePicker/365ad8ee-a595-49c9-bca9-0d6b8475ffde.jpg",
//     type: 'image/jpeg', // or photo.type
//     name: 'testPhotoName'
// });
// data.append('authToken', 'secret');


// console.log('data : ', data) ; 

//  fetch("http://192.168.1.7:3000/addImage", {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type':'multipart/form-data'
//   },
//   body:data

// }).then(res => {
//   console.log(res)
// });
  // }
 
 
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
    const { photo } = this.state
    return (
  <MyContext.Consumer>
     {
       (context)=>(

      <ImageBackground source={bgImage} style={styles.backgroundContainer}>

        <ScrollView contentContainerStyle={styles.scroll}>

           <KeyboardAvoidingView behavior="position">
              <View style = {styles.logoContainer}>
                <Image source={logo} style = {styles.logo}  />
                {/* <Text style = {styles.logoText}>MK14 Chat</Text> */}
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
              <Icon name = {'ios-mail'} size = {28} color= {'rgba(255,255,255,0.7)'}
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

          {/* <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 30, height: 30 }}
          />
        )}
        <Button title="Choose Photo" onPress={this._pickImage} />
        <Button title="Upload" onPress={this.handleUploadPhoto} />
      </View> */}

          {/* <TouchableOpacity 
            onPress = {this._pickImage}
            // onPress = {this.uploadImg}
          ><Text>Select Image </Text></TouchableOpacity> */}

          

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