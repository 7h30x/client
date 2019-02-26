import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'
ReactChartkick.addAdapter(Chart)
import React, { Component } from 'react'
import { Text, WebView } from 'react-native'

export default class Chart extends Component {
  render() {
    return (
      <WebView source={{html: '<LineChart data={{"2017-05-13": 2, "2017-05-14": 5}} />'}}>
      </WebView>
    )
  }
}
