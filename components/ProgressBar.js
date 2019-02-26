// import React, { Component } from 'react'
// import CardFlip from 'react-native-card-flip'
// import Toast, { DURATION } from 'react-native-easy-toast'

// import styles from './styles'
// import {
//   Text,
//   View,
//   TouchableHighlight,
// } from 'react-native'
// import { AnimatedRegion } from 'react-native-maps';
// class ProgressBar extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       target: {
//         value: 80,
//         borderRightColor: 'black',
//         barWidth:'50%'
//       },
//       current: {
//         value: 70,
//         borderRightColor: 'green',
//         barWidth: '30%'
//       }
//     }
//   }
//   calculateCurrentWidth() {
//     let current = this.state.current.value
//     let target = this.state.target.value
//     // let currentPercentageOfTarget = this.state.current.value / this.state.target.value
//   }
//   componentDidMount() {

//   }
//   render() {
//     return (
//       <View style={{ height: 5, zIndex: 1, backgroundColor: 'black', width: '80%' }}>
//         <View style={{ height: 20, width: this.state.current.barWidth, marginVertical: -7, backgroundColor: 'rgba(0,0,0,0)', zIndex: 0.8, borderRightWidth: 5, borderRightColor: this.state.current.borderRightColor }}></View>
//         <View style={{ height: 20,width: this.state.target.barWidth, marginVertical: -7, backgroundColor:'rgba(0,0,0,0)',zIndex:0.8, borderRightWidth:5, borderRightColor:this.state.target.borderRightColor }}></View>
//       </View>
//     )
//   }
// }

// export default ProgressBar