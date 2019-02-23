import React from 'react';
import firebase from '../../firebase/config'
import { StyleSheet, Text, View, AsyncStorage, Modal } from 'react-native';
import { Form, Item, Input, Label, Icon, Button, Toast } from 'native-base';

import Loading from './Loading'
import History from './History'

export default class App extends React.Component {

  componentDidMount = async () => {
    let timbangan = await AsyncStorage.getItem('timbangan')
    if (timbangan) {
      this.props.navigation.navigate('Timbangan')
    }
  }
  state = {
    timbanganID: '',
    loading: false,
    showToast: false,
    history: false
  }
  toggleHistory = () => {
    this.setState({
      history: !this.state.history
    })
  }

  changeHistory = (val) => {
    this.setState({
      history: !this.state.history,
      timbanganID: val
    })
  }

  changeHandler = (e) => {
    this.setState({
      timbanganID: e
    })
  }

  onSubmitTimbangan = () => {
    let Timbangan = this.state.timbanganID || "NULL"
    let self = this
    self.setState({
      loading: true
    })
    firebase.database().ref(`Timbangans/${Timbangan}`).once('value', (snapshot) => {
      let data = snapshot.val()
      console.log(data)
      if (!data) {
        self.setState({
          loading: false
        }, () => {
          Toast.show({
            text: 'Timbangan not found, please correct Timbangan ID',
            buttonText: 'Okay!',
            duration: 4000,
            type: 'danger',
            position: 'top'
          })
        })
      }
      else if (data.currentUser) {
        self.setState({
          loading: false
        }, () => {
          Toast.show({
            text: self.state.timbanganID + ' is bussy, please use another Timbangan',
            buttonText: 'Okay!',
            duration: 4000,
            type: 'danger',
            position: 'top'
          })
        })
      }
      else {
        let set = async () => {
          await AsyncStorage.setItem('timbangan', self.state.timbanganID)
          await firebase.database().ref(`Timbangans/${Timbangan}`).set({
            currentUser: 'resa',
            value: 50
          })
          await self.setState({
            loading: false,
            timbanganID: ''
          })
          self.props.navigation.navigate('Timbangan')
        }
        set()
      }
    })
    // let doc = await firebase.collection("Timbangans").doc(Timbangan).get()

    // if (!doc.data()) {
    //   self.setState({
    //     loading: false
    //   }, () => {
    //     Toast.show({
    //       text: 'Timbangan not found, please correct Timbangan ID',
    //       buttonText: 'Okay!',
    //       duration: 4000,
    //       type: 'danger',
    //       position:'top'
    //     })
    //   })
    // } else if (doc.data().currentUser) {
    //   self.setState({
    //     loading: false
    //   }, () => {
    //     Toast.show({
    //       text: self.state.timbanganID + ' is bussy, please use another Timbangan',
    //       buttonText: 'Okay!',
    //       duration: 4000,
    //       type: 'danger',
    //       position:'top'
    //     })
    //   })
    // } else {
    //   await AsyncStorage.setItem('timbangan', self.state.timbanganID)
    //   firebase.collection('Timbangans').doc(self.state.timbanganID).set({
    //     currentUser: 'resa',
    //     value: 50
    //   })
    //   await self.setState({
    //     loading: false,
    //   })
    //   self.props.navigation.navigate('Timbangan')

    // }
  }
  render() {
    return (
      <View style={styles.container}>
        {this.state.loading && <Loading />}

        <Modal
          animationType='slide'
          visible={this.state.history}
        >
          <History
            val={this.changeHistory}
            modal={this.toggleHistory} />
        </Modal>

        <Form style={{ width: '100%', }}>
          <Item>
            <Icon active name='speedometer' />
            <Input value={this.state.timbanganID} onChangeText={this.changeHandler} placeholderTextColor="green" placeholder="Input Timbangan ID Here" />
          </Item>
        </Form>

        <View style={styles.ButtonContainer}>
          <View>
            <Button onPress={this.toggleHistory} rounded success>
              <Icon
                name="time"
              />
            </Button>
          </View>
        </View>

        <Button style={styles.ButtonStyle} onPress={this.onSubmitTimbangan} rounded success>
          <Text style={styles.ButtonText}>Proceed</Text>
        </Button>

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
  ButtonContainer: {
    alignItems: 'baseline',
    marginTop: 10,
    marginBottom: 5,
    width: '100%'
  },
  ButtonStyle: {
    width: '100%',
    justifyContent: 'center'
  },
  ButtonText: {
    margin: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
