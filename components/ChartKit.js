import React, { Component } from 'react'
import { ScrollView, View, StyleSheet } from 'react-native' 
import {ButtonGroup} from 'react-native-elements'
import {
    LineChart
} from 'react-native-chart-kit'
import moment from 'moment'

export default class ChartKit extends Component {
  
  constructor () {
    super()
    this.state = {
      labels: ['1'],
      data: [10],
      selectedIndex: 0,
      widthGrafik: 900
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentDidMount = () => {
    this.fetchWeightToAllGraphics()
  }
  componentDidUpdate = (prevProps, nextProps) => {
    if(prevProps.weights.data !== this.props.weights.data){
      this.fetchWeightToAllGraphics()
    }
  }
  
  fetchWeightToAllGraphics = () => {
    const weights = this.props.weights.data
    const labels = []
    const value = []
    // all history weigth
    weights.forEach(weight => {
      const formated_date = moment(weight.createdAt, 'MM-DD-YYYY').format("DD-MMM")
      value.push(weight.value)
      labels.push(formated_date)
    });
    this.setState({
      data: value,
      labels,
      widthGrafik: 900
    })
  }

  fetchWeightToWeeklyGraphics () {
    //weekly weight
    const weights = this.props.weights.data
    const labels = []
    const value = []
    let firstDate = moment(weights[0].createdAt,'MM-DD-YYYY')
    let lastDate = moment(weights[weights.length -1].createdAt,'MM-DD-YYYY')
    const totalWeek =  Math.ceil(lastDate.diff(firstDate, 'weeks', true))
    let day1 =  moment(weights[0].createdAt,'MM-DD-YYYY').format('YYYY-MM-DD')
    for (let i = 0; i < totalWeek; i++) {
      let tempValue = []
      let afterOneWeek = firstDate.add(7, 'd').format('YYYY-MM-DD')
      weights.forEach((e) => {
        const currentDate = moment(e.createdAt, 'MM-DD-YYYY').format('YYYY-MM-DD')
        if(moment(currentDate) >= moment(day1) && moment(currentDate) <= moment(afterOneWeek)){
          tempValue.push(e.value)
        }
      })
      day1 = moment(afterOneWeek).add(1, 'd').format('YYYY-MM-DD')
      var sum = tempValue.reduce(function(a, b) { return a + b; }, 0);
      var average = sum / tempValue.length
      labels.push(`week ${i+1}`)
      value.push(average)
    }
    this.setState({
      labels,
      data: value,
      widthGrafik: 400
    })
  }

  fetchWeightToMonthlyGraphics () {
    //weekly weight
    const weights = this.props.weights.data
    const labels = []
    const value = []
    let firstDate = moment(weights[0].createdAt,'MM-DD-YYYY')
    let lastDate = moment(weights[weights.length -1].createdAt,'MM-DD-YYYY')
    const totalMonths =  Math.ceil(lastDate.diff(firstDate, 'months', true))
    console.log(totalMonths,"total months")
    let day1 =  moment(weights[0].createdAt,'MM-DD-YYYY').format('YYYY-MM-DD')
    for (let i = 0; i < totalMonths; i++) {
      let tempValue = []
      let afterOneMonths = firstDate.add(1, 'M').format('YYYY-MM-DD')
      // console.log(afterOneMonths,"ini setelah tambah satu bulan")
      weights.forEach((e) => {
        const currentDate = moment(e.createdAt, 'MM-DD-YYYY').format('YYYY-MM-DD')
        if(moment(currentDate) >= moment(day1) && moment(currentDate) <= moment(afterOneMonths)){
          console.log("masuk ke sini", currentDate," << ini current date", day1,"<< batas awah tanggal", afterOneMonths,"<< batas atas tanggal")
          tempValue.push(e.value)
        }
      })
      day1 = moment(afterOneMonths).add(1, 'd').format('YYYY-MM-DD')
      var sum = tempValue.reduce(function(a, b) { return a + b; }, 0);
      var average = sum / tempValue.length
      labels.push(`month ${i+1}`)
      value.push(average)
    }
    this.setState({
      labels,
      data: value,
      widthGrafik: 400
    })
  }


  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if(selectedIndex == 0){
      this.fetchWeightToAllGraphics()
    } else if(selectedIndex == 1){
      this.fetchWeightToWeeklyGraphics()
    } else if(selectedIndex == 2) {
      this.fetchWeightToMonthlyGraphics()
    }
  }
  
  render() {
    const { selectedIndex, widthGrafik} = this.state
    const buttons = ['All', 'Weekly', 'Monthly']
    return (
      <View style={styles.grafik}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{height: 30, width: 200}}
        />
        <ScrollView horizontal>
           <LineChart
              data={{
                  labels: this.state.labels,
                  datasets: [{
                      data: this.state.data
                  }]
              }}
              width={widthGrafik} // from react-native
              height={220}
              chartConfig={{
                  backgroundGradientFrom: '#b2905b',
                  backgroundGradientTo: '#efd1a2',
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
      </View>
    )
  }
}
const styles = StyleSheet.create({
  grafik: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  }
})