import React, { Component } from 'react'
import { Text, View } from 'react-native'
import * as Progress from 'react-native-progress'

export default class Height extends Component {
  render() {
    return (
      <View>
        <View style={{ transform: [{ rotate: '270deg' }] }}>
            <Progress.Bar progress={this.props.heightValue} width={200} />
          </View>
          <Text>
            {this.props.actualHeight}
          </Text>
      </View>
    )
  }
}
