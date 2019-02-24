import React from 'react';
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { StyleSheet, Text, View, Image, TouchableHighlight, AsyncStorage } from 'react-native';
import { Button } from 'native-base'

import Loading from './Loading'

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
      self.setState({
        timbanganValue: snapshot.val().value
      })
    })
  }
  state = {
    timbanganValue: 0,
    loading: false,
    timbangan: '',
    maxPoints: 150
  }

  onDisconect = async () => {
    await firebase.database().ref(`Timbangans/${this.state.timbangan}`).set({
      currentUser: '',
      value: 0
    })
    await AsyncStorage.removeItem('timbangan')
    this.props.navigation.navigate('InputTimbangan')
  }

  saveValue = async (mutation) => {
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
      loading: false
    })
    this.props.navigation.navigate('InputTimbangan')
  }

  render() {
    const { timbanganValue, maxPoints, loading } = this.state
    const fill = timbanganValue / maxPoints * 100
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
                Connected on: WKWK
                </Text>
              <Text>
                Tap to disconect
                </Text>
            </View>
          </TouchableHighlight>
        </View>

        <View style={styles.ButtonContainer}>
          <View>
            <Mutation
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
          </View>
        </View>

        <View style={styles.GraphContainer}>

          <AnimatedCircularProgress
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
          </AnimatedCircularProgress>
        </View>

        {/* <Image
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
          <View style={{ flex: 2, heigh: '100%', flexDirection: 'row' }}>
            <TouchableHighlight
              onPress={this.onDisconect}
              style={{ width: '100%' }}
            >
              <View style={{ backgroundColor: '#3b91e2', justifyContent: 'center', alignItems: 'center', width: '100%', height: 50 }}>
                <Text style={{ fontWeight: 'bold', color: 'white' }}>
                  Connected on: WKWK
                </Text>
                <Text>
                  Tap to disconect
                </Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={{ flex: 1, heigh: '100%', justifyContent: 'center', alignItems: 'center' }}>

          </View>
          <View style={{ flex: 1, height: '100%', width: '100%', alignItems: 'center' }}>
            <View>
              <Button style={{ width: 100, justifyContent: 'center', backgroundColor: 'wheat' }} rounded onPress={this.saveValue}>
                <Text style={{ fontWeight: 'bold' }}>Save</Text>
              </Button>
            </View>
          </View>
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   alignItems: 'center',
  //   justifyContent:'center'
  // },
  // value: {
  //   alignItems: 'center',
  //   color: 'red',
  //   position: 'absolute',
  //   top: 210,
  //   fontWeight: 'bold',
  //   fontSize: 50
  // },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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
