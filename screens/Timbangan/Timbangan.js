import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { StyleSheet, Text, View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Button, Toast } from 'native-base'

import Loading from './Loading'
import Height from './Height'

import gpt from 'graphql-tag'
import { Mutation } from 'react-apollo'

import firebase from '../../firebase/config'

export default class App extends React.Component {

  componentDidMount = async () => {
    let self = this
    let timbangan = await AsyncStorage.getItem('timbangan')
    this.setState({
      timbangan: timbangan
    })
    firebase.database().ref(`Timbangans/${timbangan}`).on('value', (snapshot) => {
      let height = snapshot.val().height / 200
      self.setState({
        timbanganValue: snapshot.val().value,
        heightValue: height,
        actualHeight: snapshot.val().height
      })
    })
  }
  state = {
    timbanganValue: 0,
    heightValue: 0.1,
    actualHeight: 0,
    loading: false,
    timbangan: '',
    maxPoints: 150,
    currentView: true
  }

  toggleScale = () => {
    this.setState({
      currentView: !this.state.currentView
    })
  }

  onDisconect = async () => {
    await firebase.database().ref(`Timbangans/${this.state.timbangan}`).set({
      currentUser: '',
      value: 0,
      height: 0
    })
    await AsyncStorage.removeItem('timbangan')
    this.props.navigation.navigate('InputTimbangan')
  }

  saveValue = async (mutation) => {

    if (this.state.timbanganValue == 0) {
      Toast.show({
        text: 'Please scale your weigth frist',
        buttonText: 'Okay!',
        duration: 4000,
        type: 'danger',
        position: 'top'
      })
    } else {
      this.setState({
        loading: true
      })
      let timbangan = await AsyncStorage.getItem('timbangan')
      let user = await AsyncStorage.getItem('user')
      const getData = gpt`{
        getData(token: "${user}"){
          data
        }
      }`
      await mutation({ variables: { token: user, weight: Math.round(this.state.timbanganValue) }, refetchQueries: [{ query: getData }] })

      await firebase.database().ref(`Timbangans/${timbangan}`).set({
        currentUser: '',
        value: 0
      })
      await AsyncStorage.removeItem('timbangan')
      this.setState({
        loading: false,
        timbangan: ''
      })
      this.props.navigation.navigate('InputTimbangan', { current: 'gohome' })
    }
  }


  saveValueHeight = async (mutation) => {
    if (this.state.actualHeight < 1) {
      Toast.show({
        text: 'Please scale your height frist',
        buttonText: 'Okay!',
        duration: 4000,
        type: 'danger',
        position: 'top'
      })
    } else {
      this.setState({
        loading: true
      })
      let timbangan = await AsyncStorage.getItem('timbangan')
      let user = await AsyncStorage.getItem('user')
      const getData = gpt`{
        getData(token: "${user}"){
          data
        }
      }`
      console.log(this.state.actualHeight)
      await mutation({ variables: { token: user, height: this.state.actualHeight }, refetchQueries: [{ query: getData }] })
      await firebase.database().ref(`Timbangans/${timbangan}`).set({
        currentUser: '',
        value: 0,
        height: 0
      })
      await AsyncStorage.removeItem('timbangan')
      this.setState({
        loading: false,
        timbangan: ''
      })
      this.props.navigation.navigate('InputTimbangan', { current: 'gohome' })
    }
  }
  render() {
    const { timbanganValue, maxPoints, loading, heightValue, actualHeight } = this.state
    const fill = timbanganValue / maxPoints * 100
    const btncontent = this.state.currentView ? "Try Heigth" : "Back to Weight"
    return (
      <View style={styles.container}>
        {
          loading
            ? <Loading />
            : null
        }
        <View style={styles.headerContainer}>
          <TouchableHighlight
            onPress={this.onDisconect}
            style={{ width: '100%' }}
          >
            <View style={styles.TouchContainer}>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Connected on: {this.state.timbangan}
              </Text>
              <Text style={{ fontWeight: 'bold', color: 'white' }}>
                Tap to disconect
                </Text>
            </View>
          </TouchableHighlight>
          <View style={{ width: '100%', alignItems: 'flex-end' }}>
            <View>
              <Button
                style={{ backgroundColor: '#eee', margin: 20 }}
                rounded
                onPress={this.toggleScale}
              >
                <Text style={{ margin: 5, color: 'rgb(90,111,127)', fontWeight: 'bold' }}>
                  {
                    btncontent
                  }
                </Text>
              </Button>
            </View>
          </View>
        </View>

        <View style={styles.ButtonContainer}>
          <View>
            {this.state.currentView && <Mutation
              mutation={
                gpt`
              mutation AddData($token:String!, $weight:Int!){
                    addData(token:$token, weight: $weight){
                      message
                    }
              }
              `
              }
            >
              {
                (AddData, { data }) => {
                  return (

                    <Button style={styles.ButtonStyle} rounded onPress={() => this.saveValue(AddData)}>
                      <Text style={{ fontWeight: 'bold' }}>Save</Text>
                    </Button>
                  )
                }
              }

            </Mutation>
            }
            {/* INI ADD HEIGHT */}

            {!this.state.currentView && <Mutation
              mutation={
                gpt`
              mutation editHeight($token:String!, $height:Int!){
                    editHeight(token:$token, height: $height){
                      message
                    }
              }
              `
              }
            >
              {
                (editHeight, { data }) => {
                  return (

                    <Button style={styles.ButtonStyle} rounded onPress={() => this.saveValueHeight(editHeight)}>
                      <Text style={{ fontWeight: 'bold' }}>Save Height</Text>
                    </Button>
                  )
                }
              }

            </Mutation>}
          </View>
        </View>

        <View style={styles.GraphContainer}>
          {!this.state.currentView && <Height actualHeight={actualHeight} heightValue={heightValue} />}
          {this.state.currentView && <AnimatedCircularProgress
            size={300}
            width={15}
            backgroundWidth={5}
            fill={fill}
            tintColor="#00e0ff"
            backgroundColor="#3d5875"
            arcSweepAngle={240}
            rotation={240}
            lineCap="round"
          >
            {(fill) => (
              <Text style={styles.points}>
                {Math.round(maxPoints * fill / 100)}Kg
            </Text>
            )}
          </AnimatedCircularProgress>}
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
    backgroundColor: '#b5deff'
  },
  points: {
    backgroundColor: 'transparent',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#7591af',
    fontSize: 40,
    fontWeight: "bold"
  },
  headerContainer: {
    flex: 1,
    width: '100%'
  },
  TouchContainer: {
    backgroundColor: '#3b91e2',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 50
  },
  ButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonStyle: {
    width: 100,
    justifyContent: 'center',
    backgroundColor: 'wheat'
  },
  GraphContainer: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
