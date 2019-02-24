import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
import { Button, Icon, Toast } from 'native-base'

import { Mutation } from 'react-apollo'
import gpt from 'graphql-tag'

export default class ListTimbangan extends Component {
  render() {

    return (
      <View style={styles.history}>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            onPress={() => this.props.onAction('' + this.props.timbangan)}
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
            <Mutation
              mutation={
                gpt`
                mutation DelTim($token:String!, $timbanganId:Int!){
                  removeTimb(input:{token:$token, timbanganId: $timbanganId}){
                    message
                  }
            }
              `
              }
            >
              {
                (DeleteTimb, { data }) => (
                  <Button
                    rounded
                    style={{ backgroundColor: 'red' }}
                    onPress={async () => {
                      this.props.loadingToggle()
                      let user = await AsyncStorage.getItem('user')
                      await DeleteTimb({
                        variables: { token: user, timbanganId: this.props.timbangan }, refetchQueries: [{
                          query: gpt`{
                      getData(token: "${user}"){
                        data
                      }
                    }`}]
                      })
                      this.props.loadingToggle()
                    }}
                  >
                    <Icon name="trash" />
                  </Button>
                )
              }

            </Mutation>
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

