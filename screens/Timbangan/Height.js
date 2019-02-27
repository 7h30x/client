import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress'

export default class Height extends Component {
  render() {
    return (
      <View style={{marginTop: 30, backgroundColor:'rgba(255,255,255,0.5)', height:350}}>
        <View style={{flex: 1, marginTop: 20, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold', fontSize: 20,}}>
            {this.props.actualHeight}
          </Text>
        </View>
        <View style={{ flex: 9, marginTop: -70, justifyContent: 'center', transform: [{ rotate: '270deg' }]}}>
          <Progress.Bar progress={this.props.heightValue} width={200} />
        </View>
        
      </View>
    )
  }
}
