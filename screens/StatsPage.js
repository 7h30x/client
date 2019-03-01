import React, { Component } from 'react'
import FlippedCard from '../components/FlippedCard'
import styles from '../components/styles'
import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
  AsyncStorage
} from 'react-native'
import { Icon } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import { Button } from 'native-base'

export default class StatsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      fetchingToken: true,
      currentToken: ''
    }
    this.barWidth = new Animated.Value(0)
  }

  calculateCurrentWeight(weightData) {
    if (weightData.length === 0) return 'no data yet!'
    else return weightData[weightData.length - 1].value
  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation)
    return {
      title: 'My Profile',
      headerStyle: {
        backgroundColor: 'rgb(52,94,127)',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
      headerRight: (

        <Button transparent
          style={{ height: '90%', marginTop: 1, marginRight: 5, fontWeight: 'bold' }}
          onPress={async () => {
            await AsyncStorage.removeItem('user')
            navigation.navigate('AuthLoad')
          }}
        >
          <Text style={{ margin: 2, color: "white" }}>log out</Text>
        </Button>
      )
    }
  }
  componentDidMount = async () => {
    this.animateBar()
    console.log('zzzz')
    const currentToken = await AsyncStorage.getItem('user')
    //SETTING STATE TRIGGERS RE - RENDER
    this.setState({
      // isSuccess: this.checkSuccess(userData),
      // targetWeight: userData.target.weight,
      // name: userData.name,
      fetchingToken: false,
      currentToken
    })
    console.log('yatta! SET STATE!!!!!!!!!!!!!!')
  }
  componentDidUpdate() {
    this.animateBar()
  }
  animateBar() {
    this.barWidth.setValue(0)
    Animated.timing(this.barWidth, {
      toValue: 100,
      delay: 800
    }).start()
  }
  renderStats(dataArray) {
    if (dataArray.length === 0) return (<Text> No data yet! Start weighing!</Text>)
    let stats = calculateStats(dataArray)
    return (
      <>
        <View style={{ ...styles.squarebox, backgroundColor: '#91764d' }}><Text style={styles.squareboxTextMed}>{stats.loss} KG</Text><Text style={{ color: 'white' }}>loss</Text></View>
        <View style={styles.squarebox}><Text style={styles.squareboxTextMed}>{stats.net} KG</Text><Text style={{ color: 'white' }}>net</Text></View>
        <View style={{ ...styles.squarebox, backgroundColor: '#6d93b2' }}><Text style={styles.squareboxTextMed}>+{stats.gain} KG</Text><Text style={{ color: 'white' }}>gain</Text></View>
      </>
    )
    function calculateStats(arr) {
      function calculateDailyAvgs(arr) {
        let resultArr = []
        arr.map(datapoint => {
          let index = resultArr.findIndex(r => r.createdAt === datapoint.createdAt)
          if (index > -1) {
            resultArr[index].value = ((Number(resultArr[index].value) + Number(datapoint.value)) / 2).toFixed(1)
          } else {
            resultArr.push(datapoint)
          }
        })
        return resultArr
      }
      let dailyAvgs = calculateDailyAvgs(arr)
      let lastdiff = 0,
          counter = 0,
          net = 0,
          loss = 0,
          gain = 0
      dailyAvgs.reduce((a, b) => {
        let res
        if (counter === 0) {
          res = b.value - a.value
        } else {
          res = b.value - lastdiff
        }
        lastdiff = b.value
        res > 0 ? gain += res : loss += res
        counter++
        net += res
      })
      return { net: net.toFixed(1), loss: loss.toFixed(1), gain: gain.toFixed(0) }
    }
  }
  render() {
    console.log('rendering.....')
    if (this.state.fetchingToken === true) return (<Spinner visible={true} />)
    // console.log('mytoken---------->',this.state.currentToken)
    const GET_USER_DATA = gql`
        query {
          getData(token:"${this.state.currentToken}"){
            data
          }
        }
      `
    function checkSuccess(userData) {
      console.log('--> checking success.....', 'target:', Math.round(userData.target.weight), 'current', Math.round(userData.data[userData.data.length - 1].value))
      return Math.round(userData.target.weight) === Math.round(userData.data[userData.data.length - 1].value)
    }
    return (
      <Query query={GET_USER_DATA}>
        {
          ({ loading, error, data }) => {
            // console.log('loading',loading)
            if (loading) return (
              <View>
                <Spinner visible={true} />
              </View>
            )
            if (error !== undefined) return (<View></View>)
            if (data.getData.data) {
              const user = JSON.parse(data.getData.data)
              let currentWeight = this.calculateCurrentWeight(user.data)
              const stats = {
                name: user.name,
                height: user.height,
                currentWeight,
                target: user.target.weight,
                bmi: (((currentWeight * currentWeight) / (user.height * user.height)) * 100).toFixed(1)
              }
              // console.log(stats)
              if (checkSuccess(user) === true) {
                this.props.navigation.navigate('Achievement', { stats })
              }// console.log('----------------------> got NEW DATA YEAY')
              return (
                <ScrollView contentContainerStyle={styles.main}>
                  <View style={styles.row} >
                    <TouchableHighlight style={{ marginRight: 30 }}>
                      <Icon
                        name='accessibility'
                        type='material'
                        size={35}
                        color='rgb(45,55,64)'
                        reverse
                        raised
                        style={styles.iconLeft}
                      />
                    </TouchableHighlight>
                    <View>
                      <Text style={styles.darkNormalText}> {user.name.toUpperCase() + ' , ' + user.age} </Text>
                      <Text style={styles.darkNormalText}> {user.gender} </Text>
                      <Text style={styles.darkNormalText}> {`Height: ${user.height}`} </Text>
                      <Text style={styles.darkNormalText}>{`Weight: ${stats.currentWeight} kg`}</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ ...styles.darkNormalText, marginRight: 4 }}>BMI </Text>
                        <Animated.View style={{ ...styles.bar, width: this.barWidth, alignItems: 'flex-end', paddingRight: 4, marginVertical: 2 }} >
                          <Text style={styles.normalText}> {stats.bmi} </Text>
                        </Animated.View>
                      </View>
                    </View>
                  </View>
                  <Text style={styles.headerText}>My Weight-Totals</Text>
                  <View style={styles.row}>
                    {this.renderStats(user.data)}
                  </View>
                  <Text style={styles.headerText}>My Target Weight</Text>
                  <FlippedCard user={user} token={this.state.currentToken} />
                </ScrollView>
              )
            }
          }
        }
      </Query>
    )
  }
}
