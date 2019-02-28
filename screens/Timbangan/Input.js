import React from 'react';
import firebase from '../../firebase/config'
import { StyleSheet, Text, View, AsyncStorage, Modal } from 'react-native';
import { Form, Item, Input, Label, Icon, Button, Toast } from 'native-base';

import { Query, Mutation } from 'react-apollo'
import gpt from 'graphql-tag'

import Camera from './Camera'
import Loading from './Loading'
import History from './History'

export default class App extends React.Component {
  componentWillMount = async () => {
    let user = await AsyncStorage.getItem('user')
    console.log('masuk')
    let param = this.props.navigation.getParam('current')
    if(param){
      this.props.navigation.navigate('Home')
    }
    this.setState({
      user: user
    })
  }
  componentDidMount = async () => {

    let timbangan = await AsyncStorage.getItem('timbangan')
    if (timbangan) {
      this.props.navigation.navigate('Timbangan')
    }
  }
  state = {
    timbanganID: '',
    user: '',
    loading: false,
    showToast: false,
    history: false,
    ModalCam: false
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

  onSubmitTimbangan = (mutation, currentTimbangan) => {
    let self = this
    let currentTimb = JSON.parse(currentTimbangan)

    let Timbangan = self.state.timbanganID || "NULL"
    self.setState({
      loading: true
    })
    firebase.database().ref(`Timbangans/${Timbangan}`).once('value', (snapshot) => {
      let data = snapshot.val()
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
          let filter = await currentTimb.timbangans.filter(val => {
            return val == Timbangan
          })
          if (filter.length == 0) {
            let tim = Number(Timbangan)
            await mutation({
              variables: { token: self.state.user, timbanganId: tim }, refetchQueries: [{
                query: gpt`{
              getData(token: "${self.state.user}"){
                data
              }
            }` }]
            })
          }

          await AsyncStorage.setItem('timbangan', self.state.timbanganID)
          await firebase.database().ref(`Timbangans/${Timbangan}`).set({
            currentUser: 'resa',
            value: 0,
            height: 0
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
  }

  toggleCamera = () => {
    this.setState({
      ModalCam: !this.state.ModalCam
    })
  }

  getQr = (value) => {
    const qrVal = value + ''
    this.setState({
      timbanganID: qrVal,
      ModalCam: false
    })
  }

  render() {
    const { user } = this.state
    const getData = gpt`{
      getData(token: "${user}"){
        data
      }
    }`
    return (
      <Query
        query={
          getData
        }
      >
        {
          ({ error, loading, data }) => {
            if (loading) { return <Loading /> }
            if (error) { return <Text>Error while fetch</Text> }
            if (data.getData) {
              let TimbanganNow = data.getData.data
              return (
                <View style={styles.container}>
                  {this.state.loading && <Loading timbangan={true} timbName={this.state.timbanganID} />}

                  <Modal
                    animationType='slide'
                    visible={this.state.history}
                  >
                    <History
                      history={data.getData}
                      val={this.changeHistory}
                      modal={this.toggleHistory} />
                  </Modal>

                  <Modal
                    visible={this.state.ModalCam}
                  >
                    <Camera
                      qrFunct={this.getQr}
                      toggleCam={this.toggleCamera}
                    />

                  </Modal>

                  <Form style={{ width: '100%', }}>
                    <Item>
                      <Icon active name='speedometer' style={{color: '#b2905b'}}/>
                      <Input value={this.state.timbanganID} onChangeText={this.changeHandler} placeholderTextColor="rgb(66, 134, 244)" placeholder="Input Timbangan ID Here" />
                    </Item>
                  </Form>

                  <View style={styles.ButtonContainer}>
                    <View>
                      <Button onPress={this.toggleHistory} rounded style={styles.btnColor}>
                        <Icon
                          name="time"
                        />
                        <Text style={{ marginRight: 10, color: 'white', fontWeight: 'bold' }}>
                          History
                        </Text>
                      </Button>
                    </View>
                    <View style={{ marginLeft: 5 }}>
                      <Button onPress={this.toggleCamera} rounded style={styles.btnColor}>
                        <Icon
                          name="camera"
                        />
                        <Text style={{ marginRight: 10, color: 'white', fontWeight: 'bold' }}>
                          Scan QR
                        </Text>
                      </Button>
                    </View>
                  </View>

                  <Mutation
                    mutation={
                      gpt`
                      mutation AddTimb($token:String!, $timbanganId:Int! ) {
                        addTimb(input:{token:$token, timbanganId:$timbanganId}) {
                          message
                        }
                      }
                      `
                    }
                  >
                    {
                      (AddTimb, { data }) => (
                        <Button style={styles.ButtonStyle} onPress={() => this.onSubmitTimbangan(AddTimb, TimbanganNow)}
                          rounded success>
                          <Text style={styles.ButtonText}>Proceed</Text>
                        </Button>
                      )
                    }

                  </Mutation>

                </View>
              )
            }

          }
        }

      </Query>

    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#b5deff'
  },
  ButtonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 5,
    width: '100%'
  },
  ButtonStyle: {
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#rgb(52,94,127)',
    marginTop: 20
  },
  ButtonText: {
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  btnColor: {
    backgroundColor: '#b2905b'
  }
});
