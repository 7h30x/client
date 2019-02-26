import React, { Component } from 'react'
import styles from '../components/styles'
import {
  Text,
  View,
  WebView,
  Modal
} from 'react-native'
import {Icon} from 'react-native-elements'
class AchievementModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }
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
              onPress= {() => toggleModal()}
            />
            <Text>CONGRATS YOU THE BEST</Text>
          </View>
        </Modal>

      </View>
    )
  }
}
export default AchievementModal