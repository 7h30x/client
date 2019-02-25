import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RootNav from './navigations/RootNavigator'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({ uri: 'https://timol-server.hafrizresa.pro/graphql' })

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootNav/>
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
