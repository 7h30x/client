import React, { Component } from 'react'
import { Text, View, AsyncStorage, StyleSheet, ActivityIndicator, ScrollView} from 'react-native'
import {Card, CardItem } from 'native-base';
import { Query, Mutation } from 'react-apollo'
import gql from 'graphql-tag'

import History from '../components/History'
import ChartKit from '../components/ChartKit'
import ProgressWeight from '../components/ProgressWeight';
import Loading from './Timbangan/Loading';

export default class Dashboard extends Component {
  static navigationOptions = {
    headerTitle: 'Home',
    headerStyle: {
      backgroundColor: 'rgb(52,94,127)',
    },
    headerTintColor: '#fff',
  }
  constructor () {
    super()
    this.state = {
      currentToken: '',
      loading: false,
      fetchingToken: true
    }
  }
  componentDidMount = async() => {
    const currentToken = await AsyncStorage.getItem('user');
    this.setState({
      currentToken,
      fetchingToken: false
    })
  }
  toogleLoading = (data) => {
    console.log(data,"====")
    this.setState({
      loading: data
    })

  }

  render() {  
    if (this.state.fetchingToken === true) {
      return (<Loading />)
    }
    const {currentToken} = this.state
    const DATA_QUERY = gql`
    {
      getData (token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0YXJnZXQiOnsid2VpZ2h0IjozLCJkYXRlIjoiMy0xMy0yMDE5In0sInRpbWJhbmdhbnMiOls5XSwiX2lkIjoiNWM3MTdlNGQwNmVhYzIzNzA0MzhlZjc4IiwibmFtZSI6ImFiZWQiLCJlbWFpbCI6ImFiZWRuZWdvQGdtYWlsLmNvbSIsImdlbmRlciI6Im1hbGUiLCJoZWlnaHQiOjE1MSwiYWdlIjoyMiwicGFzc3dvcmQiOiIkMmIkMTIkSnM1R1g2WjVTb0tzem53Vm1zeGs0T0xCSlZHTnRDd3lNRWExeVQucHlpdWxBbGQxTnhYWGEiLCJkYXRhIjpbeyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTAiLCJ2YWx1ZSI6NzEsImNyZWF0ZWRBdCI6IjEyLTIwLTIwMTgifSx7Il9pZCI6IjVjNzQwNjhlMmZlN2IzNjAwY2QwMzg1MSIsInZhbHVlIjo3NywiY3JlYXRlZEF0IjoiMTItMjUtMjAxOCJ9LHsiX2lkIjoiNWM3NDA2OGUyZmU3YjM2MDBjZDAzODUyIiwidmFsdWUiOjgxLCJjcmVhdGVkQXQiOiIxMi0zMC0yMDE4In0seyJfaWQiOiI1Yzc0YWY0YzJmZTdiMzYwMGNkMDM4NTMiLCJ2YWx1ZSI6ODAsImNyZWF0ZWRBdCI6IjEtMi0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTQiLCJ2YWx1ZSI6NjEsImNyZWF0ZWRBdCI6IjEtNC0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTUiLCJ2YWx1ZSI6NjIsImNyZWF0ZWRBdCI6IjEtNy0yMDE5In0seyJfaWQiOiI1Yzc0MDY4ZTJmZTdiMzYwMGNkMDM4NTYiLCJ2YWx1ZSI6NzEsImNyZWF0ZWRBdCI6IjEtMTMtMjAxOSJ9LHsiX2lkIjoiNWM3NDA2OGUyZmU3YjM2MDBjZDAzODU3IiwidmFsdWUiOjc3LCJjcmVhdGVkQXQiOiIxLTE5LTIwMTkifSx7Il9pZCI6IjVjNzQwNjhlMmZlN2IzNjAwY2QwMzg1OCIsInZhbHVlIjo4MSwiY3JlYXRlZEF0IjoiMS0yMy0yMDE5In0seyJfaWQiOiI1Yzc0YWY0YzJmZTdiMzYwMGNkMDM4NTkiLCJ2YWx1ZSI6ODAsImNyZWF0ZWRBdCI6IjEtMjYtMjAxOSJ9LHsiX2lkIjoiNWM3NjYwMTY5ZTMxMWUzMzk4MDY0ODQ0IiwidmFsdWUiOjIzLCJjcmVhdGVkQXQiOiIyLTUtMjAxOSJ9LHsiX2lkIjoiNWM3NjY0ZjI5ZTMxMWUzMzk4MDY0ODQ1IiwidmFsdWUiOjMzLCJjcmVhdGVkQXQiOiIyLTEwLTIwMTkifSx7Il9pZCI6IjVjNzY2NTA3OWUzMTFlMzM5ODA2NDg0NiIsInZhbHVlIjozMywiY3JlYXRlZEF0IjoiMi0xMy0yMDE5In0seyJfaWQiOiI1Yzc2NjU3NTllMzExZTMzOTgwNjQ4NDciLCJ2YWx1ZSI6MTIsImNyZWF0ZWRBdCI6IjItMTUtMjAxOSJ9LHsiX2lkIjoiNWM3NjY1ZGQ5ZTMxMWUzMzk4MDY0ODQ4IiwidmFsdWUiOjQsImNyZWF0ZWRBdCI6IjItMTctMjAxOSJ9LHsiX2lkIjoiNWM3NjY4ZTk5ZTMxMWUzMzk4MDY0ODQ5IiwidmFsdWUiOjQsImNyZWF0ZWRBdCI6IjItMjAtMjAxOSJ9LHsiX2lkIjoiNWM3NjY5MTE5ZTMxMWUzMzk4MDY0ODRhIiwidmFsdWUiOjYsImNyZWF0ZWRBdCI6IjItMjMtMjAxOSJ9LHsiX2lkIjoiNWM3NjY5Nzc5ZTMxMWUzMzk4MDY0ODRiIiwidmFsdWUiOjYsImNyZWF0ZWRBdCI6IjItMjUtMjAxOSJ9LHsiX2lkIjoiNWM3NjY5ZTQ5ZTMxMWUzMzk4MDY0ODRjIiwidmFsdWUiOjQsImNyZWF0ZWRBdCI6IjItMjYtMjAxOSJ9LHsiX2lkIjoiNWM3NjZhNWM5ZTMxMWUzMzk4MDY0ODRkIiwidmFsdWUiOjQsImNyZWF0ZWRBdCI6IjItMjctMjAxOSJ9LHsiX2lkIjoiNWM3NjZhOTU5ZTMxMWUzMzk4MDY0ODRlIiwidmFsdWUiOjQsImNyZWF0ZWRBdCI6IjItMjctMjAxOSJ9LHsiX2lkIjoiNWM3NjZiMzY5ZTMxMWUzMzk4MDY0ODRmIiwidmFsdWUiOjYsImNyZWF0ZWRBdCI6IjItMjgtMjAxOSJ9XSwiX192IjowLCJpYXQiOjE1NTEzMjEyMDl9.51BY-lx7raGUcx-NmfYvEg8lGu2_lXdThr7z7H7fLOg"){
        data
      }
    }
    `
    console.log('qeury ok')
    return (
      <Query query={DATA_QUERY}>
        {
          ({ loading, error, data }) => {
            if (loading) return <Loading/>;
            if (error) return <Text>masuk error</Text>
            return(
              <ScrollView style={styles.container}>
                  {
                    this.state.loading &&
                      <Loading/>
                  }
                  <Card>
                    <CardItem header bordered style={{backgroundColor: '#CEE9FF'}}>
                      <Text style={{color: '#0f8bc4', fontWeight: 'bold'}}> Your Weight Progress</Text>
                    </CardItem>
                    <CardItem cardBody style={{backgroundColor: 'rgba(206,233,255, 0.3)'}}>
                      <ChartKit weights={JSON.parse(data.getData.data)}/>
                    </CardItem>
                  </Card>
                  <Card>
                    <CardItem header bordered style={{backgroundColor: '#CEE9FF'}}>
                      <Text style={{color: '#0f8bc4', fontWeight: 'bold'}}> Your Current Weight</Text>
                    </CardItem>
                    <CardItem cardBody bordered style={{backgroundColor: 'rgba(206,233,255, 0.3)'}}>
                      <View style={styles.progress}>
                        <ProgressWeight weights={JSON.parse(data.getData.data)}/>
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
      flex: 1,
      backgroundColor: '#a3c8e5'
    },
    grafik: {
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
    progress:{
      marginTop: 20,
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    history:{
      flex: 1,
      width: 500,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
})
