import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Profile extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerTitle: navigation.getParam("username"),
    headerLeft: <Text>back</Text>,
    headerRight: <Text onPress={() => navigation.goBack(null)}>back</Text>,
  })
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "lightblue", justifyContent: "center", alignItems: "center" }}>
        <Text> {this.props.navigation.getParam("username")} </Text>
      </View>
    )
  }
}