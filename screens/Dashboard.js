import React, { Component } from 'react'
import { Text, View, AsyncStorage, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import {Card, CardItem } from 'native-base';
import {ButtonGroup} from 'react-native-elements'
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import History from '../components/History'
import ChartKit from '../components/ChartKit'
import ProgressWeight from '../components/ProgressWeight';
import Loading from './Timbangan/Loading';

export default class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: 'Home'
  }
  constructor () {
    super()
    this.state = {
      currentToken: '',
      selectedIndex: 0,
      loading: false
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  componentWillMount = async() => {
    const userToken = await AsyncStorage.getItem('user');
    // console.log(userToken,"token di dashboard")
    this.setState({
      currentToken: userToken
    })
  }
  toogleLoading = (data) => {
    console.log(data,"====")
    this.setState({
      loading: data
    })

  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
  }

  render() {
    const buttons = ['All', 'Weekly', 'Monthly']
    const { selectedIndex, currentToken} = this.state
    const DATA_QUERY = gql`
    {
      getData(token: "${currentToken}"){
        data
      }
    }
    `
    return (
      <Query query={DATA_QUERY}>
        {
          ({loading, error, data}) => {
            if (loading) return <Loading/>;
            if (error) return <Text>masuk error</Text>
            return(
              <ScrollView style={styles.container}>
                  {
                    this.state.loading &&
                      <Loading/>
                  }
                  <Card>
                    <CardItem header bordered>
                      <Text style={{color: '#0f8bc4', fontWeight: 'bold'}}> Your Weight Progress</Text>
                    </CardItem>
                    <CardItem cardBody style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                        <ButtonGroup
                          onPress={this.updateIndex}
                          selectedIndex={selectedIndex}
                          buttons={buttons}
                          containerStyle={{height: 30, width: 200}}
                        />
                    </CardItem>
                    <CardItem cardBody>
                      <View style={styles.grafik}>
                        <ChartKit/>
                      </View>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem header bordered>
                      <Text style={{color: '#0f8bc4', fontWeight: 'bold'}}> Your Current Weight</Text>
                    </CardItem>
                    <CardItem cardBody bordered>
                      <View style={styles.progress}>
                        <ProgressWeight/>
                      </View>
                    </CardItem>
                  </Card>
                  <History histories={JSON.parse(data.getData.data)} token={currentToken} toogleLoading={this.toogleLoading} />
              </ScrollView>
            )
          }
        } 
      </Query>
        
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    grafik: {

    },
    progress:{
      marginTop: 20,
      flex: 1,
      flexDirections: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    history:{
      flex: 1,
      width: 500,
      flexDirections: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
})
