import React, { Component } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'

export default class Loading extends Component {
  render() {
    return (
      <View
        style={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', zIndex: 10, backgroundColor: 'black', opacity: 0.5 }}
      >
        {
          this.props.timbangan
            ? <Text
              style={{ color: 'green', fontWeight:'900' }}>
              Pairing on Timbangan <Text style={{ fontWeight: 'bold', color: 'green' }}>{this.props.timbName}</Text>
            </Text>
            : null
        }
  
        <ActivityIndicator size="large" color="wheat" />

      </View>
    )
  }
}
