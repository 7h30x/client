import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import firebase from '../firebase/config'

export default class Blank extends Component {
  componentDidMount = () => {
    // firebase.database().ref('Timbangans/Timbangan01').on('value', (snapshot) => {
    //   console.log(snapshot.val().currentUser)
    // })

    
    // firebase.database().ref('Timbangans/12').set({
    //   currentUser:'',
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
