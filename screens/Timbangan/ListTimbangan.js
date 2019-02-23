import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Icon } from 'native-base'

export default class ListTimbangan extends Component {
  render() {
    return (
      <View style={styles.history}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() => this.props.onAction(this.props.timbangan)}
            rounded
            style={{ width: '100%', justifyContent: 'center', backgroundColor: '#eee', marginLeft: 15 }}
          >
            <Text>
              {this.props.timbangan}
            </Text>
          </Button>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View>
            <Button
              rounded
              style={{ backgroundColor: 'red' }}
            >
              <Icon name="trash" />
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

