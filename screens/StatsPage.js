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
import gql from 'graphql-tag'
import { Query} from 'react-apollo'

const GET_USER_DATA = gql`
  query  {
    getData(token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0aW1iYW5nYW5zIjpbOV0sIl9pZCI6IjVjNzE3ZTRkMDZlYWMyMzcwNDM4ZWY3OCIsIm5hbWUiOiJhYmVkIiwiZW1haWwiOiJhYmVkbmVnb0BnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYiQxMiRKczVHWDZaNVNvS3N6bndWbXN4azRPTEJKVkdOdEN3eU1FYTF5VC5weWl1bEFsZDFOeFhYYSIsImRhdGEiOlt7Il9pZCI6IjVjNmY5ODU4ZGUxNGRlMWQ2YzBhYWZiOSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxMSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODY5OGRjOGUwMWU0MWUwN2EyMSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5ODc5MDU1YzMxMWVkMTNmMGI1NSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjpudWxsfSx7Il9pZCI6IjVjNmY5OGQwNzFiMjcxMjE4OThjNjFlYiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiVGh1IEZlYiAxNCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTAzOGM2M2YxMjMzZjZlZDU2ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiRnJpIEZlYiAxNSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTMwODYyYjZjMjNjNTg1NWI1MSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU2F0IEZlYiAxNiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5OTZhYjI3OTNhMjY4OTM0MDk4ZSIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiU3VuIEZlYiAxNyAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTEzNjlhOTA4MmFiZDAwZTE3YiIsInZhbHVlIjo2MCwiY3JlYXRlZEF0IjoiTW9uIEZlYiAxOCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTIwNjlhOTA4MmFiZDAwZTE3YyIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiVHVlIEZlYiAxOSAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YTU5YzNhZDA1MmQ2NTUzY2VhMiIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiV2VkIEZlYiAyMCAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifSx7Il9pZCI6IjVjNmY5YThlZWIwOTE5MmYwN2MwMTA1OSIsInZhbHVlIjo2OSwiY3JlYXRlZEF0IjoiRnJpIEZlYiAyMiAyMDE5IDA2OjQ1OjM0IEdNVCswMDAwIChDb29yZGluYXRlZCBVbml2ZXJzYWwgVGltZSkifV0sIl9fdiI6MCwiaWF0IjoxNTUxMDg5NzI5fQ.TQbTFw3Jzb-FoZnKVuUm_XgyhPbbLwKrI3T_QO7dTO8") {
      data
    }
  }
`

class FlippedCard extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      selectedPolarityIndex: 0,
      selectedSpeedIndex: 0
    }
  }

  renderFront(target) {
    return (
      <View style={{ width: '100%', flexDirection:'row', padding: 3 }}>
        <TouchableHighlight
          onPress={event => this.card.flip()}
        >
          <Icon
            name='settings'
            type='material'
            size='20'
            color='blue'
            reverse
            raised
          />
        </TouchableHighlight>
        <View style={{...styles.squarebox, width:'100%'}}>
          <Text style={styles.squareboxText}> {target.weight} KG</Text>
          <View >
            <Text style={{color:'white'}}> {`on ${target.date}`}</Text>
          </View>
        </View>
      </View>
    )
  }
  
  renderBack() {
    const renderTextProjections= ()=> {
      let current = 60
      let targetKG = Math.floor(this.state.value * 10)
      let targetWeight = this.state.selectedPolarityIndex === 0 ? (current - targetKG) : (current + targetKG)
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
      let time = (targetKG / perWeekKG()).toFixed(1)
      return `Projected final weight @ ${perWeekKG()}kg per week : \n ${targetWeight} kg in ${time} weeks.
    `
    }
    return (
      <View style={{...styles.row , width:'100%', height: 450}} >
        <TouchableHighlight
          onPress={event => this.card.flip()}
        >
          <Icon
            name='settings'
            type='material'
            size='15'
            color='blue'
            reverse
            raised
          />
        </TouchableHighlight>
        <View style={{ flex: 1, top: 20, height:'30%', alignItems: 'stretch' }}>
          <Slider
            style={{width:'92%'}}
            value={this.state.value}
            minimumTrackTintColor='orange'
            onValueChange={value => this.setState({ value })}
            />
          <Text style={{ ...styles.squareboxText, fontSize: 18 }}>
            {`${this.state.selectedPolarityIndex === 0 ? '- ' : '+ '} ${Math.floor(this.state.value * 10)} KG`}
          </Text>
          <View>
            <SegmentedControlIOS 
              style={styles.segmentedControlIOS}
              values={['Loss', 'Gain']}
              selectedIndex={this.state.selectedPolarityIndex}
              tintColor='orange'
              onChange={(event) => {
                console.log(event.nativeEvent.selectedSegmentIndex)
                this.setState({ selectedPolarityIndex: event.nativeEvent.selectedSegmentIndex  });
              }}
            />
            <Text>do you want to losr or gain weight ? </Text>
          </View>
          <View>
            <SegmentedControlIOS
              style={styles.segmentedControlIOS}
              values={['Slow', 'Moderate', 'Intensive']}
              selectedIndex={this.state.selectedSpeedIndex}
              onChange={(event) => {
                this.setState({ selectedSpeedIndex: event.nativeEvent.selectedSegmentIndex });
              }}
            />
            <Text>how fast do you want to lose / gain the weight ?</Text>
          </View>
          <View style={{ ...styles.squarebox, paddingHorizontal: 10, marginTop: 20, width: '90%'}}>
            <Text style={{ ...styles.squareboxText, textAlign: 'center', fontSize: 15 }}>
              {renderTextProjections()}
            </Text>
          </View>
          <Button title='Submit Changes' onPress={() => console.log('xx')}></Button>
        </View>
      </View>
    )
  }
  render() {
    return (
      <CardFlip style={{...styles.row , backgroundColor:'white'}} ref={card => this.card = card}>
          {this.renderFront(this.props.user.target)}
          {this.renderBack()}
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
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#f4511e',
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
          // let userObj2 = Object(data.getData).data
          // let user = JSON.stringify(userObj2)
          // console.log(user)
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
                      size='35'
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
                <Text style={styles.headerText}>Target</Text>
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
    // backgroundImage: 'linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,1))', 
    opacity:0.9
  },
  main: {
    backgroundColor: '#f1f1f1',
    minHeight: '180%',
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
    top: 20,
    opacity: 0.9
  },
  normalText: {
    fontSize: 15,
    color: 'white',
    opacity: 0.9,
    fontWeight: 'bold'
  },
  row: {
    backgroundColor: 'grey',
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
    top: 30,
    opacity: 1,
    paddingVertical: 10,
    paddingHorizontal:3,
    marginBottom: 15
  },
  segmentedControlIOS: {
    marginVertical: 11,
    width: '90%',
    height: 35,
    opacity: 0.9
  },
  squarebox: {
    width: '30%',
    paddingVertical: 10,
    backgroundColor: 'orange',
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