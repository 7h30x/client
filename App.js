import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Root } from 'native-base'
import RootNav from './navigations/RootNavigator'
import { ApolloProvider } from 'react-apollo';
import client from './graphql/config'
export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Root>
          <RootNav />
        </Root>
      </ApolloProvider>
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
