import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloProvider } from 'react-apollo'
import { client } from './graphql/config'
import { Root } from 'native-base'
import RootNav from './navigations/RootNavigator'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost'
const client = new ApolloClient({ uri: 'https://timol-server.hafrizresa.pro/graphql' })

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
<<<<<<< HEAD
<<<<<<< HEAD
        <Root>
          <RootNav />
        </Root>
=======
        <RootNav/>
>>>>>>> profile page v1
=======
        <RootNav/>
>>>>>>> e1053e9f583a4dce1b7b1a9a13d4f62152105ea3
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
