import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, AsyncStorage } from 'react-native';
import { Button } from 'native-base'
import firebase from '../../firebase/config'

export default class App extends React.Component {
  componentDidMount = async () => {
    let self = this
    let timbangan = await AsyncStorage.getItem('timbangan')
    console.log(timbangan)
    firebase.collection("Timbangans").doc(timbangan)
      .onSnapshot(function (doc) {
        console.log("Current data: ", doc.data());
        self.setState({
          timbanganValue: doc.data().value
        })
      });
  }
  state = {
    timbanganValue: 0
  }

  saveValue = async () => {
    let timbangan = await AsyncStorage.getItem('timbangan')
    await firebase.collection('Timbangans').doc(timbangan).set({
      currentUser: '',
      value: 0
    })
    await AsyncStorage.removeItem('timbangan')
    this.props.navigation.navigate('InputTimbangan')
  }

  render() {
    const { timbanganValue } = this.state
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/timbangan.png')}
          style={{
            zIndex: -10,
            flex: 1,
            resizeMode: 'center',
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
          }}
        />

        <Text style={styles.value}>
          {timbanganValue}
        </Text>


        <View style={{ flex: 1, height: '100%', width: '100%' }}>
          <View style={{ flex: 5, heigh: '100%', }}>

          </View>
          <View style={{ flex: 1, justifyContent: 'center', height: '100%', margin: 10 }}>
            <Button block onPress={this.saveValue}>
              <Text>Primary</Text>
            </Button>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  value: {
    alignItems: 'center',
    color: 'red',
    position: 'absolute',
    top: 210,
    fontWeight: 'bold',
    fontSize: 50
  }
});
