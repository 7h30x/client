import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Root} from 'native-base'
import RootNav from './navigations/RootNavigator'

export default class App extends React.Component {
  render() {
    return (
      <Root>
      <RootNav/>
      </Root>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
