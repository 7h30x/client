import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo';

import { Button, Icon } from 'native-base'

export default class Camera extends Component {
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permission: status === 'granted' });
  }
  state = {
    permission: null
  }

  handleBarCodeScanned = ({ type, data }) => {
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`)
    this.props.qrFunct(data)
  }

  render() {
    const { permission } = this.state
    return (
      <View style={styles.container}>
        {
          permission === null
            ? <Text>Requesting for camera permission</Text>
            : permission === false
              ? <Text>No access to camera</Text>
              : <View style={styles.container}><BarCodeScanner
                onBarCodeScanned={this.handleBarCodeScanned}
                style={styles.Camera}
              />
                <View>
                  <Button
                    onPress={this.props.toggleCam}
                    rounded
                    style={{ backgroundColor: '#ff3232', margin: 5 }}
                  >
                    <Icon name="close" />
                  </Button>
                </View>
              </View>
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  Camera: {
    width: '100%',
    height: 400
  }
})