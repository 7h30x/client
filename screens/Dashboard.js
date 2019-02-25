import React, { Component } from 'react'
import { Text, View, AsyncStorage } from 'react-native'
import ChartKit from '../components/ChartKit'
import {ButtonGroup} from 'react-native-elements'
import ProgressWeight from '../components/ProgressWeight';

export default class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: 'Home'
  }
  constructor () {
    super()
    this.state = {
      selectedIndex: 2
    }
    this.CheckLogin()
    this.updateIndex = this.updateIndex.bind(this)
  }

  CheckLogin = async () => {
    console.log('masuk check login')
    const userToken = await AsyncStorage.getItem('token');
    if(!userToken){
      this.props.navigation.navigate('Login');
    }
  };

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['All', 'Weekly', 'Monthly']
    const { selectedIndex } = this.state
    return (
      <View style={{flex: 1}}>
        <Text> Grafik Berat Badanmu </Text>
        <View style={{alignItems: 'flex-end'}}>
          <ButtonGroup
            onPress={this.updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30, width: 200}}
          />
        </View>
        <ChartKit/>
        <ProgressWeight/>
      </View>
    )
  }
}
