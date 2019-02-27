import React, { Component } from 'react'
import CardFlip from 'react-native-card-flip'
import styles from './styles'
import {
  Text,
  View,
  TouchableOpacity,
  SegmentedControlIOS,
  AsyncStorage
} from 'react-native'
import { Icon, Slider } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
const EDIT_TARGETS = gql`
  mutation ($weight: Int! , $days: Int! , $token: String!) {
    editTarget(weight: $weight, days: $days, token: $token) {
      error,
      message
    }
  }
  `

class FlippedCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 0,
      selectedPolarityIndex: 0,
      selectedSpeedIndex: 0,
      spinner: false,
      submitted: false
    }
    //user target weight change defaults to 0 
    this.targetInputs = {
      weight: 0,
      days: 0
    }
  }

  renderFront(target) {
    return (
      <View style={{ width: '95%', flexDirection: 'row' }}>
        <TouchableOpacity
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
        </TouchableOpacity>
        <View style={{ ...styles.squarebox, width: '80%', height: 60}}>
          <View style={{flexDirection:'row'}}>
          <Text style={styles.squareboxText}> {target.weight} KG</Text>
            <Text style={{ ...styles.captionText, color: 'white', fontSize: 15, top:4 }}> {`by ${target.date}`}</Text>
          </View>
        </View>
      </View>
    )
  }
   updateTargetInputs(weight, days) {
    this.targetInputs.weight = weight
    this.targetInputs.days = days
  }
  renderBack(user ,token) {
    const renderMessage = () => {
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
      this.updateTargetInputs(targetTotalKG, daysFromToday)
      return `Final weight @ ${perWeekKG()}kg per week : \n ${targetTotalKG} KG in ${timeInWeeks} weeks.`
    }
   
    const renderSubmitButton= () => {
      if (this.state.submitted === true) {
        return (
          <>
            <Icon
              name='md-checkbox'
              type='ionicon'
              size={40}
              color='gold'
            />
          </>
        )
      } else {
        return (
          <Text style={{ ...styles.normalText, color: 'rgb(104, 188, 255)', left: 35, backgroundColor:'white', padding:10, borderRadius: 20 }}>Submit</Text>
        )
      }
    }
    return (
      <Mutation mutation={EDIT_TARGETS}>
        {(submitMutation, { loading, error, data }) => {
          const GET_USER_DATA = gql`
            query {
              getData(token:"${this.props.token}") {
                data
              }
            }
          `

          return (
            <View style={{ ...styles.row, width: '100%', height: 460 }} >
              <Spinner
                visible={this.state.spinner}
              />
              <TouchableOpacity
                onPress={event => {
                  this.setState({ submitted: false })
                  this.card.flip()
                }}
              >
                <Icon
                  name='settings'
                  type='material'
                  size={15}
                  color='rgb(104,188,255)'
                  reverse
                  raised
                />
              </TouchableOpacity>
              <View style={{ flex: 1, top: 20, height: '30%', alignItems: 'stretch' }}>
                <Text style={styles.captionText} >
                  how much weight do you want to lose / gain ?
                </Text>
                <Text style={{ ...styles.squareboxText, fontSize: 18, marginTop: 5, color:'rgb(45,55,64)'  }}>
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
                    tintColor='rgb(104,188,255)'
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
                    tintColor='rgb(104,188,255)'
                    selectedIndex={this.state.selectedSpeedIndex}
                    onChange={(event) => {
                      this.setState({ selectedSpeedIndex: event.nativeEvent.selectedSegmentIndex });
                    }}
                  />
                </View>
                <View style={{ ...styles.squarebox, right: 15, width: '95%' }}>
                  <Text style={{ ...styles.squareboxText, paddingHorizontal: 4, textAlign: 'center', fontSize: 15 }}>
                    {renderMessage()}
                  </Text>
                </View>
                
                <TouchableOpacity
                  style={{flexDirection:'row', alignItems:'center', marginTop: 15, padding:5, width:'auto', borderRadius:20}}                  
                  onPress={event => {
                    // console.log(this.targetInputs , token)
                    this.setState({ spinner: true })
                    submitMutation({ variables: { ...this.targetInputs, token }, refetchQueries: [{ query: GET_USER_DATA }] })
                      .then(res => {
                      console.log('result',res)
                      setTimeout(() => {
                        this.setState({submitted: true})
                        this.setState({ spinner: false })
                      }, 600)
                    })
                    .catch(err => {
                      
                      console.log('err',err)
                      setTimeout(() => {
                        this.setState({ spinner: false }), 800
                      })
                    })
                  }}
                >
                  {renderSubmitButton()}
                </TouchableOpacity>
              </View>
            </View>
          )
        }}
      </Mutation>
    )
  }
  render() {
    
    return (
      <CardFlip style={{ ...styles.row, backgroundColor: 'rgba(181,222,255,0.1)' }} ref={card => this.card = card}>
        {this.renderFront(this.props.user.target)}
        {this.renderBack(this.props.user , this.props.token )}
      </CardFlip>
    )
  }
}

export default FlippedCard