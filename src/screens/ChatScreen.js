import React, { Component } from 'react'
import {
    Container,
    Icon,
    Text,
    Thumbnail,
    Button,
    View,
    Content,
    List,
    Card,
    CardItem,
    Right,
    Left,
    Body
} from 'native-base';
import {
    StyleSheet,
    Dimensions,
    ImageBackground,
    KeyboardAvoidingView,
    TextInput,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import { MyContext } from '../../App';
import bgImage from '../../assets/images/background.jpeg';
import socketIO from 'socket.io-client';



const { width: Width, height: Height } = Dimensions.get('screen');


// const baseUrl = "http://192.168.43.10:3005";
const baseUrl = "https://mk14chatserver.herokuapp.com";
let socket = '';


export default class Chat extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.getParam('user').username,
            headerLeft: <>
                <Button transparent onPress={() => navigation.goBack(null)} >
                    <Icon name="arrow-back" style={{ color: '#333' }} />
                </Button>
                <Thumbnail circular source={{ uri: navigation.getParam('user').profileImg }} style={{ width: 0.1 * Width, height: 0.1 * Width }} /></>
            ,
            headerRight: <View style={{ flexDirection: "row" }}>
                <Icon name='call' style={{ color: "#333", marginHorizontal: 0.05 * Width }} />
            </View>,
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
            chatID: '',
            user: this.props.navigation.getParam("user"),
            currentUser: this.props.navigation.getParam("currentUser"),
            chatMessages: [],
            currentMsg: '',


        }
        // socket.on('connect',data => {
        //     alert("Connect to Web Socket")
        //     console.log(data)
        // })


        //=========================================== Sockets ============================================//
         socket = socketIO(baseUrl, {
            transports: ['websocket'],
            jsonp: false
        });
        // socket.connect(); 
        socket.on('connect', () => {
            console.log("MY Socket id is : "  , socket.id);
            console.log("MY Socket id is : "  , socket.id);
            socket.emit("addOnlineUser", { userID: this.state.currentUser.uid })
        })

        socket.on('recieveMsg', data => {
            console.log("re", data)
            if (data.data.chatID === this.state.chatID) {
                let msg = {
                    senderID: data.data.senderID,
                    msgBody: data.data.msgBody
                }
                this.setState({
                    chatMessages: [...this.state.chatMessages, msg]
                })
                // $("#msgs").scrollTop($("#msgs").height);
            }
            // this.scrollDown()
        })
    }

    componentDidMount = () => {

        
        //=========================================== Fetch Data =========================================//

        // Order New Chat if doesn't exist 
        fetch(`${baseUrl}/newChat`, {
            method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*"
			},

			body: JSON.stringify({
				users: [this.state.user._id, this.state.currentUser.uid]
			}),
        }).then(res => res.json())
        .then(res => {
            this.setState({
                chatID: res.chatID,
                chatMessages: res.messages
            })
        })

        // start new socket connection 
        .then(() => {

            socket.emit('addActiveChat', { chatID: this.state.chatID });

        })


        // Chat Messages 
        // fetch(`${baseUrl}/chatMessages`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*"
        //     },

        //     body: JSON.stringify({
        //         chatID: this.state.chatID,
        //     }),
        // }).then(res => res.json())
        //     .then(response => {
        //         if (response.code == "200") {
        //             this.setState({
        //                 user: this.props.navigation.getParam("user"),
        //                 chatMessages: response.data[0].messages
        //             })
        //         }
            // })
        // console.log("Chats : ",this.state.chat) ; 

        // start new Socket with Server 
        // socket.on('connect', () => {
        // 	console.log("MY Socket id is : ", socket.id);
        // 	socket.emit("addOnlineUser", { userID: this.state.currentUser.uid })
        // })

        // Disconnction 
        socket.on('disconnect', () => {
        	socket.emit("removeFromOnlineUser", { userID: this.state.currentUser.uid })
        })

    }

    chatMessages = () => 
        this.state.chatMessages.map((msg , i)=>
            <View
                style={{
                    flexDirection: this.state.currentUser.uid === msg.senderID ? "row" : "row-reverse",
                    marginVertical: 0.03 * Height
                }}
                key = {i}
                >

                <Thumbnail source={{ uri: this.state.currentUser.uid === msg.senderID ? this.state.currentUser.profileImg : this.state.user.profileImg }}
                    style={{ width: 0.1 * Width, height: 0.1 * Width, marginHorizontal: 0.03 * Width }}
                />
                <View style={{ backgroundColor: this.state.currentUser.uid === msg.senderID ? "#333" : "gold", padding: 0.02 * Width, borderRadius: 10 }}>
                    <Text style={{ color: this.state.currentUser.uid === msg.senderID ? "#eee" : "#333" }}>{msg.msgBody}</Text>
                </View>
            </View>)
    


    sendMsg = () => {
        // alert("Send Clicked");
        if (this.state.currentMsg != ''){

            let newMsg = {
                senderID: this.state.currentUser.uid,
                msgBody: this.state.currentMsg
            }
            this.setState({
                chatMessages: [...this.state.chatMessages, newMsg],
                currentMsg: ''
            })

            		// send message to database 
			fetch(`${baseUrl}/newMessage`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					"Access-Control-Allow-Origin": "*"
				},
				body: JSON.stringify({
					chatID: this.state.chatID,
					senderID: this.state.currentUser.uid,
					msgBody: this.state.currentMsg
				})
			})

			// send message to server socket 
			socket.emit("sendMsg", {
				receiverID: this.state.user._id,
				msgBody: this.state.currentMsg,
				chatID: this.state.chatID
			})
        }
    }

    render() {
        return (
            <MyContext.Consumer>
                {(context) =>
                    <ImageBackground source={bgImage} style={styles.backgroundContainer}>
                        <ScrollView>
                            <List style={{ height: 0.7 * Height }}>
                                <ScrollView ref={ref => this.scrollView = ref}
                                    onContentSizeChange={(contentWidth, contentHeight) => {
                                        this.scrollView.scrollToEnd({ animated: false });
                                    }}>
                                    {this.chatMessages()}
                                    {/* {this.state.chatMessages.map(msg =>
                                        <View
                                            style={{
                                                flexDirection: this.state.currentUser.uid === msg.senderID ? "row" : "row-reverse",
                                                marginVertical: 0.03 * Height
                                            }}>

                                            <Thumbnail source={{ uri: this.state.currentUser.uid === msg.senderID ? this.state.currentUser.profileImg : this.state.user.profileImg }}
                                                style={{ width: 0.1 * Width, height: 0.1 * Width, marginHorizontal: 0.03 * Width }}
                                            />
                                            <View style={{ backgroundColor: this.state.currentUser.uid === msg.senderID ? "#333" : "gold", padding: 0.02 * Width, borderRadius: 10 }}>
                                                <Text style={{ color: this.state.currentUser.uid === msg.senderID ? "#eee" : "#333" }}>{msg.msgBody}</Text>
                                            </View>
                                        </View>)} */}
                                </ScrollView>
                            </List>
                            <KeyboardAvoidingView behavior="position" enabled style={{ flex: 1 }} keyboardVerticalOffset={65} >
                                <View style={styles.container}>
                                    <View style={styles.inputContainer}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder={'Type your message here...'}
                                            placeholderTextColor="grey"
                                            underlineColorAndroid='transparent'
                                            onChangeText={message => {
                                                //  console.log(message);
                                                this.setState({ currentMsg: message })
                                            }}
                                            value={this.state.currentMsg}
                                        />

                                    </View>
                                    <TouchableOpacity style={styles.sendBtn} onPress={this.sendMsg}>
                                        <Icon name="send" style={{ color: '#333' }} />
                                    </TouchableOpacity>

                                </View>
                            </KeyboardAvoidingView>
                        </ScrollView>
                    </ImageBackground>
                }
            </MyContext.Consumer>

        );
    }

}

const styles = StyleSheet.create({

    container: {
        flexDirection: 'row',
        // backgroundColor:'#eee'
        marginBottom: 20
    },
    sendBtn: {
        backgroundColor: 'gold',
        width: 0.15 * Width,
        height: 0.15 * Width,
        borderRadius: 0.075 * Width,
        justifyContent: 'center',
        alignItems: 'center'
    },

    backgroundContainer: {
        width: Width,
        height: Height,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems : 'center' ,
        backgroundColor: '#eee',
        borderColor: '#333',
        borderWidth: 1,
        borderRadius: 25,
        // marginRight: 0.03 * Width,
        height: 50,
        marginLeft: 10
    },
    input: {
        width: 0.72 * Width,
        height: 45,
        fontSize: 16,
        color: '#333',
        paddingHorizontal: 20,
        marginRight: 10,
    },
})