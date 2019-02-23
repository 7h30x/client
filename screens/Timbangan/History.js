import React, { Component } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import { Button, Icon } from 'native-base'
import ListTimbangan from './ListTimbangan'

export default class History extends Component {
  render() {
    const data = ['Timbangan01', 'Timbangan02']
    return (
      <View style={styles.container} >
        {
          data.map((val, index) => {
            return <ListTimbangan
              timbangan={val}
              key={index}
              onAction={this.props.val}
            />
          })
        }
        <View style={{ position: 'absolute', width: '100%', height: '100%', zIndex: -1, alignItems: 'flex-end' }}>
          <View style={{ margin: 30, }}>

            <Button
              rounded
              onPress={this.props.modal}
            >
              <Icon name="close" />
            </Button>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 50
  }
})
