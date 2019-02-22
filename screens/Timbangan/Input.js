import React from 'react';
import firebase from '../../firebase/config'
import { StyleSheet, Text, View, AsyncStorage, ActivityIndicator } from 'react-native';
import { Form, Item, Input, Label, Icon, Button, Toast } from 'native-base';

import Loading from './Loading'

export default class App extends React.Component {

  componentDidMount = async () => {
    // firebase.collection("Timbangans").doc("Timbangan01").set({
    //   currentUser: '',
    //   value: 0
    // })
    //   .then(data => {
    //   })
    //   .catch(err => {
    //   })
    let timbangan = await AsyncStorage.getItem('timbangan')
    if (timbangan) {
      this.props.navigation.navigate('Timbangan')
    }
  }
  state = {
    timbanganID: '',
    loading: false,
    showToast: false
  }
  changeHandler = (e) => {
    this.setState({
      timbanganID: e
    })
  }
  onSubmitTimbangan = async () => {
    let Timbangan = this.state.timbanganID || "NULL"
    let self = this
    self.setState({
      loading: true
    })
    let doc = await firebase.collection("Timbangans").doc(Timbangan).get()

    if (!doc.data()) {
      self.setState({
        loading: false
      }, () => {
        alert('Timbangan not found, please correct Timbangan ID')
      })
    } else if (doc.data().currentUser) {
      self.setState({
        loading: false
      }, () => {
        alert(self.state.timbanganID + ' is bussy, please use another Timbangan')
      })
    } else {
      await AsyncStorage.setItem('timbangan', self.state.timbanganID)
      firebase.collection('Timbangans').doc(self.state.timbanganID).set({
        currentUser: 'resa',
        value: 50
      })
      await self.setState({
        loading: false,
      })
      self.props.navigation.navigate('Timbangan')

    }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}
        <Form style={{ width: '100%', }}>
          <Item>
            <Icon active name='home' />
            <Input onChangeText={this.changeHandler} placeholderTextColor="green" placeholder="Input Timbangan ID Here" />
          </Item>
        </Form>
        <View style={{ marginTop: 20 }}>
          <Button onPress={this.onSubmitTimbangan} rounded success>
            <Text style={{ margin: 5, fontWeight: 'bold' }}>Proceed</Text>
          </Button>
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
});
