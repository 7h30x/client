import React, { Component } from 'react'
import { Text, View } from 'react-native'
import firebase from '../firebase/config'

export default class Blank extends Component {
  componentDidMount = () => {
    firebase.database().ref('Timbangans/Timbangan01').on('value', (snapshot) => {
      console.log(snapshot.val().currentUser)
    })
    
    // firebase.database().ref('Timbangans/Timbangan01').set({
    //   currentUser:'hafriz',
    //   value:50
    // })
    // .then(data => {
    //   console.log(data)
    // })
    // .catch(err => {
    //   console.log(err)
    // })
  }
  
  render() {
    return (
      <View>
        <Text> WKWK </Text>
      </View>
    )
  }
}
