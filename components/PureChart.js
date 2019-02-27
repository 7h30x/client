import React, { Component } from 'react'
import { Text, View } from 'react-native'
import PureChart from 'react-native-pure-chart';

export default class Chart extends Component {
  render() {
    let sampleData = [
        {x: '2018-01-01', y: 30},
        {x: '2018-01-02', y: 200},
        {x: '2018-01-03', y: 170},
        {x: '2018-01-04', y: 250},
        {x: '2018-01-05', y: 300},
        {x: '2018-01-02', y: 200},
        {x: '2018-01-03', y: 170},
        {x: '2018-01-04', y: 250},
        {x: '2018-01-05', y: 300}
    ]
    return (
        
      <View style={{marginTop : 20}}>
         <PureChart  data={sampleData} interpolation='spline' type='line' />
      </View>
    )
  }
}
