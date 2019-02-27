import React, { Component } from 'react'
import styles from '../components/styles'
import {
  Text,
  View,
  WebView,
  Modal
} from 'react-native'
import { Icon } from 'react-native-elements'
const HTML = require('./achievement.html')
class AchievementModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }
  //CHECK ASYNC STORAGE FOR USER CURRENT = TARGET ; IF NO, NAVIGATE TO NEXT SCREEN (STATS)
  //THIS SCREEN IS ONLY IF USER HAS REACHED WEIGHT TARGET
  render() {
    const toggleModal = () => {
      this.setState({visible: false})
    }
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.visible}
        >
          <View>
            <Icon
              name='close'
              type='material'
              size={15}
              color='rgb(104,188,255)'
              raised
              onPress={() => {
                toggleModal()
                this.props.navigation.navigate('Stats')
              }}
            />
          </View>
          <WebView
            source={HTML}
            style={{ height: '100%', width: '100%' }}
          >

          </WebView>
        </Modal>
      </View>
    )
  }
}
export default AchievementModal