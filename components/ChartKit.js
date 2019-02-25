import React, { Component } from 'react'
import { Text, ScrollView, View, Dimensions } from 'react-native'
import {
    LineChart
} from 'react-native-chart-kit'

export default class ChartKit extends Component {
  render() {
    return (
      <ScrollView horizontal>
         <LineChart
            data={{
                labels: ['21 Jan', '21 Feb', 'March', 'April', 'May', 'June', 'Aug', 'Sept', 'Oct'],
                datasets: [{
                    data: [
                    65,
                    65.5,
                    65.7,
                    66,
                    66.5,
                    66.8,
                    67.7,
                    67,
                    67.2
                    ]
                }]
            }}
            width={500} // from react-native
            height={220}
            chartConfig={{
                backgroundGradientFrom: '#e87c3a',
                backgroundGradientTo: '#b74d07',
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16
                }
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16
            }}
        />
      </ScrollView>
    )
  }
}
