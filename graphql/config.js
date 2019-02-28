import ApolloClient from 'apollo-boost'

const client = new ApolloClient({
  uri: 'http://3.1.213.156/graphql'
})

export default client