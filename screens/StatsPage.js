import React, { Component } from 'react'
import CardFlip from 'react-native-card-flip'

import {
  Text,
  View,
  ScrollView,
  TouchableHighlight,
  Animated,
  Picker,
  Button,
  SegmentedControlIOS
} from 'react-native'
import { Icon, Slider } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import gql from 'graphql-tag'
import { Query, Mutation} from 'react-apollo'
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1iYW5nYW5zIjpbOV0sIl9pZCI6IjVjNzE3ZTRkMDZlYWMyMzcwNDM4ZWY3OCIsIm5hbWUiOiJhYmVkIiwiZW1haWwiOiJhYmVkbmVnb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiRKczVHWDZaNVNvS3N6bndWbXN4azRPTEJKVkdOdEN3eU1FYTF5VC5weWl1bEFsZDFOeFhYYSIsImRhdGEiOlt7Il9pZCI6IjVjNmY5ODU4ZGUxNGRlMWQ2YzBhYWZiOSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxMSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODY5OGRjOGUwMWU0MWUwN2EyMSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODc5MDU1YzMxMWVkMTNmMGI1NSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjpudWxsfSx7Il9pZCI6IjVjNmY5OGQwNzFiMjcxMjE4OThjNjFlYiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVGh1IEZlYiAxNCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTAzOGM2M2YxMjMzZjZlZDU2ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiRnJpIEZlYiAxNSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTMwODYyYjZjMjNjNTg1NWI1MSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU2F0IEZlYiAxNiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTZhYjI3OTNhMjY4OTM0MDk4ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU3VuIEZlYiAxNyAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTEzNjlhOTA4MmFiZDAwZTE3YiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxOCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTIwNjlhOTA4MmFiZDAwZTE3YyIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxOSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTU5YzNhZDA1MmQ2NTUzY2VhMiIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiV2VkIEZlYiAyMCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YThlZWIwOTE5MmYwN2MwMTA1OSIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiRnJpIEZlYiAyMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifV0sIl9fdiI6MCwiaWF0IjoxNTUxMDg5NzI5fQ.TQbTFw3Jzb-FoZnKVuUm_XgyhPbbLwKrI3T_QO7dTO8"

const GET_USER_DATA = gql`
  query  {
    getData(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1iYW5nYW5zIjpbOV0sIl9pZCI6IjVjNzE3ZTRkMDZlYWMyMzcwNDM4ZWY3OCIsIm5hbWUiOiJhYmVkIiwiZW1haWwiOiJhYmVkbmVnb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiRKczVHWDZaNVNvS3N6bndWbXN4azRPTEJKVkdOdEN3eU1FYTF5VC5weWl1bEFsZDFOeFhYYSIsImRhdGEiOlt7Il9pZCI6IjVjNmY5ODU4ZGUxNGRlMWQ2YzBhYWZiOSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxMSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODY5OGRjOGUwMWU0MWUwN2EyMSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODc5MDU1YzMxMWVkMTNmMGI1NSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjpudWxsfSx7Il9pZCI6IjVjNmY5OGQwNzFiMjcxMjE4OThjNjFlYiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVGh1IEZlYiAxNCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTAzOGM2M2YxMjMzZjZlZDU2ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiRnJpIEZlYiAxNSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTMwODYyYjZjMjNjNTg1NWI1MSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU2F0IEZlYiAxNiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTZhYjI3OTNhMjY4OTM0MDk4ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU3VuIEZlYiAxNyAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTEzNjlhOTA4MmFiZDAwZTE3YiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxOCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTIwNjlhOTA4MmFiZDAwZTE3YyIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxOSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTU5YzNhZDA1MmQ2NTUzY2VhMiIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiV2VkIEZlYiAyMCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YThlZWIwOTE5MmYwN2MwMTA1OSIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiRnJpIEZlYiAyMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifV0sIl9fdiI6MCwiaWF0IjoxNTUxMDg5NzI5fQ.TQbTFw3Jzb-FoZnKVuUm_XgyhPbbLwKrI3T_QO7dTO8") {
      data
    }
  }
`
const EDIT_TARGETS = gql`
  mutation ($weight: Int! , $days: Int! , $token: String!) {
    editTarget(weight: $weight, days: $days, token: $token) {
      error,
      message
    }
  }
  `

class FlippedCard extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      selectedPolarityIndex: 0,
      selectedSpeedIndex: 0,
      spinner: false
    }
    //user target weight change defaults to 0 
    this.targetInputs = {
      weight : 0,
      days: 0
    }
  }

  renderFront(target) {
    return (
      <View style={{ width: '95%', flexDirection:'row'}}>
        <TouchableHighlight
          onPress={event => this.card.flip()}
        >
          <Icon
            name='settings'
            type='material'
            size={20}
            color='rgb(104,188,255)'
            reverse
            raised
          />
        </TouchableHighlight>
        <View style={{ ...styles.squarebox, width: '80%', paddingVertical: 5  }}>
          <Text style={styles.squareboxText}> {target.weight} KG</Text>
          <View >
            <Text style={{ ...styles.captionText, color:'white', fontSize:13 }}> {`by ${target.date}`}</Text>
          </View>
        </View>
      </View>
    )
  }
  updateTargetInputs(weight, days) {
    this.targetInputs.weight = weight
    this.targetInputs.days = days
  }
  renderBack(user) {
    const renderMessage= ()=> {
      let currentKG = user.data[user.data.length - 1].value
      let targetKG = Math.floor(this.state.value * 10)
      let targetTotalKG = this.state.selectedPolarityIndex === 0 ? (currentKG - targetKG) : (currentKG + targetKG)
      let speed = this.state.selectedSpeedIndex
      let perWeekKG = () => {
        switch (speed) {
          case 0:
            return 0.5
          case 1:
            return 1
          case 2:
            return 1.5
        }
      }
      let timeInWeeks = (targetKG / perWeekKG()).toFixed(1)
      let daysFromToday = Math.ceil(timeInWeeks * 7)
      this.updateTargetInputs(targetTotalKG , daysFromToday)
      return `Final weight @ ${perWeekKG()}kg per week : \n ${targetTotalKG} KG in ${timeInWeeks} weeks.`
    }
    return (
      <Mutation mutation={EDIT_TARGETS}>
        {(submitMutation, { loading, error, data }) => {
          return (
            <View style={{ ...styles.row, width: '100%', height: 450 }} >
              <Spinner
                visible={this.state.spinner}
              />
              <TouchableHighlight
                onPress={event => this.card.flip()}
              >
                <Icon
                  name='settings'
                  type='material'
                  size={15}
                  color='rgb(104,188,255)'
                  reverse
                  raised
                />
              </TouchableHighlight>
              <View style={{ flex: 1, top: 20, height: '30%', alignItems: 'stretch' }}>
                <Text style={styles.captionText} >
                  how much weight do you want to lose / gain ?
            </Text>
                <Text style={{ ...styles.squareboxText, fontSize: 18 }}>
                  {`${this.state.selectedPolarityIndex === 0 ? '- ' : '+ '} ${Math.floor(this.state.value * 10)} KG`}
                </Text>
                <Slider
                  style={{ width: '92%' }}
                  value={this.state.value}
                  minimumTrackTintColor='rgb(45,55,64)'
                  onValueChange={value => this.setState({ value })}
                />
                <View>
                  <SegmentedControlIOS
                    style={styles.segmentedControlIOS}
                    values={['Loss', 'Gain']}
                    selectedIndex={this.state.selectedPolarityIndex}
                    tintColor='white'
                    onChange={(event) => {
                      console.log(event.nativeEvent.selectedSegmentIndex)
                      this.setState({ selectedPolarityIndex: event.nativeEvent.selectedSegmentIndex });
                    }}
                  />
                </View>
                <View>
                  <Text style={styles.captionText} >
                    how fast do you want to lose / gain the weight ?
              </Text>
                  <SegmentedControlIOS
                    style={styles.segmentedControlIOS}
                    values={['Slow', 'Moderate', 'Intensive']}
                    tintColor='white'
                    selectedIndex={this.state.selectedSpeedIndex}
                    onChange={(event) => {
                      this.setState({ selectedSpeedIndex: event.nativeEvent.selectedSegmentIndex });
                    }}
                  />
                </View>
                <View style={{ ...styles.squarebox, marginTop: 20, right: 15, width: '95%' }}>
                  <Text style={{ ...styles.squareboxText, paddingHorizontal: 4, textAlign: 'center', fontSize: 15 }}>
                    {renderMessage()}
                  </Text>
                </View>
                <TouchableHighlight
                  onPress={event => {
                    this.setState({spinner:true}) 
                    submitMutation({ variables: { ...this.targetInputs, token } })
                      .then(res => {
                        console.log(res)
                        setTimeout(() =>this.setState({spinner:false}) , 800)
                      })
                  }}
                >
                  <Icon
                    name='checkmark'
                    type='ionicons'
                    size={20}
                    color='red'
                    raised
                  />
                </TouchableHighlight>
              </View>
            </View>  
          )
        }} 
      </Mutation>
    )
  }
  render() {
    console.log('zzz')
    return (
      <CardFlip style={{ ...styles.row, backgroundColor:'rgba(181,222,255,0.1)'}} ref={card => this.card = card}>
        {this.renderFront(this.props.user.target)}
        {this.renderBack(this.props.user)}
      </CardFlip>
    )
  }
}
export default class StatsPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
    this.barWidth = new Animated.Value(0)
  }
  static navigationOptions = {
    title: 'My Profile',
    headerStyle: {
      backgroundColor: 'rgb(52,94,127)',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold'
    }
  }
  componentDidMount() {
    this.animateBar()
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
    let stats = calculateStats (dataArray)
    return (
      <>
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.net} KG</Text><Text style={{color: 'white'}}>nett</Text></View>
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.loss} KG</Text><Text style={{color: 'white'}}>loss</Text></View>
        <View style={styles.squarebox}><Text style={styles.squareboxText}>{stats.gain} KG</Text><Text style={{color: 'white'}}>gain</Text></View>
      </>
    )
    function calculateStats(arr) {

      function calculateDailyAvgs(arr) {
        let resultArr = []
        arr.map(datapoint => {
          let index = resultArr.findIndex(r => r.createdAt === datapoint.createdAt)
          console.log(index)
          if (index > -1) {
            resultArr[index].value = ((resultArr[index].value + datapoint.value) / 2).toFixed(1)
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
      return { net, loss, gain }
    }

  }
  render() {
    return (
        <Query
          query={GET_USER_DATA}
        >
        {({ loading, error, data }) => {
          let userObj2 = Object(data.getData).data
          let user = JSON.stringify(userObj2)
          console.log(user)
          if (loading) return null
          if (error) return `Error: ${error}`
          if ( data.getData.data ) {
            let user = JSON.parse(data.getData.data)
            return (
              <ScrollView contentContainerStyle={styles.main}>
                <View style={styles.row} >
                  <TouchableHighlight>
                    <Icon
                      name='accessibility'
                      type='material'
                      size={35}
                      color='red'
                      reverse
                      raised
                      style={styles.iconLeft}
                    />
                  </TouchableHighlight>
                  <View>
                    <Text style={styles.normalText}> { user.gender } </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style={{ ...styles.normalText, marginRight: 4 }}>BMI </Text>
                      <Animated.View style={{ ...styles.bar, width: this.barWidth, alignItems: 'flex-end', paddingRight: 4 }} >
                        <Text style={styles.normalText}> 27 </Text>
                      </Animated.View>
                    </View>
                    <Text style={styles.normalText}>{`Current Weight: ${user.data[user.data.length-1].value} kg`}</Text>
                  </View>
                </View>
                <Text style={styles.headerText}>This Week's Stats</Text>
                <View style={styles.row}>
                  {this.renderStats(user.data)}
                </View>
                <Text style={styles.headerText}>My Target Weight</Text>
                <FlippedCard user={user} />
              </ScrollView>
            )
          }
      }}
        </Query>
    )
  }
}
const styles = {
  bar: {
    height: 23,
    backgroundColor: 'red',
    marginVertical: 4,
    opacity:0.9
  },
  main: {
    backgroundColor: 'rgba(181,222,255,0.7)',
    minHeight: '170%',
    alignItems: 'center'
  },
  iconLeft: {
    paddingHorizontal: 10,
    marginRight: 10
  },
  headerText: {
    fontSize: 25,
    color: 'orange',
    fontWeight: 'bold',
    top: 30,
    marginVertical: 10
  },
  normalText: {
    fontSize: 15,
    color: 'white',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  captionText: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  row: {
    backgroundColor: 'grey',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    top: 25,
    opacity: 1,
    paddingVertical: 10,
    paddingHorizontal:3,
    marginBottom: 15
  },
  segmentedControlIOS: {
    marginTop: 15,
    marginBottom:5,
    width: '90%',
    height: 35,
    opacity: 0.9
  },
  squarebox: {
    width: '30%',
    paddingVertical: 10,
    backgroundColor: 'rgb(45,55,64)',
    alignItems: 'center',

    marginHorizontal: 5,
    opacity: 0.9,
    borderRadius: 10,
    border: 'solid 3px white'
  },
  squareboxText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  }
}