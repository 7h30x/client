import React, { Component } from 'react'
import {TouchableHighlight, TouchableOpacity, StyleSheet, ActivityIndicator} from'react-native'
import { Container, Header, Content, Card, CardItem, Text, Icon, Right, Left } from 'native-base';

import moment from 'moment'
import gql from 'graphql-tag'
import {Mutation} from 'react-apollo'

import Loading from '../screens/Timbangan/Loading'

const DELETE_MUTATION = gql`
  mutation Delete($dataId: String!, $token: String!) {
    deleteData(dataId: $dataId, token: $token) {
      message
    }
  }
`
const CLEAR_MUTATION = gql`
  mutation CLEAR($token: String!) {
    clearData(token: $token) {
      message
    }
  }
`

export default class History extends Component {

    state = {  
        loading: false
    }

    render() {
        const {histories, token} = this.props
        const {loading} = this.state
        
        return (
            <Container>
                {
                    loading &&
                    <Loading/>
                }
                <Content>
                    <Card>
                        <CardItem header bordered>
                            <Left>
                                <Text style={{color: '#0f8bc4', fontWeight: 'bold'}}>Weight History</Text>
                            </Left>
                            <Right>
                                <Mutation mutation={CLEAR_MUTATION}>
                                    {(Clear) => (
                                            <TouchableOpacity onPress={()=> this.onPressClearData(Clear)}>
                                                <Text style={{color: '#dd7630', fontWeight: 'bold'}}>clear histories</Text>
                                            </TouchableOpacity>
                                        )
                                    }
                                </Mutation>
                            </Right>
                        </CardItem>
                        {
                            histories &&
                            histories.data.map((history) => {
                                return (
                                    <CardItem bordered>
                                        <Left>
                                            <Text>{moment(history.createdAt).format("DD-MM-YYYY")}</Text>
                                            <Text style={{marginLeft: 50}}>{history.value} KG</Text>
                                        </Left>
                                        <Right>
                                            <Mutation mutation={DELETE_MUTATION}>
                                                {(Delete) => (
                                                        <TouchableOpacity underlayColor="#d89324" onPress={()=> this.onPressDeleteData(Delete, history._id)}>
                                                            <Icon name="trash" />
                                                        </TouchableOpacity>
                                                    )
                                                }
                                            </Mutation>
                                        </Right>
                                    </CardItem>
                                )
                            })
                        }
                    </Card>
                </Content>
            </Container>
        )
    }

    onPressDeleteData = async (mutation, id) => {
        const dataId = id
        const {token} = this.props
        this.props.toogleLoading(true)
        const message = await mutation({variables: {dataId, token}, refetchQueries: [{
            query: gql`{
                        getData(token: "${token}"){
                            data
                        }
                    }`
        }]
        })
        this.props.toogleLoading(false)
        console.log(message,"-------")
    }
    onPressClearData = async (mutation) => {
        const {token} = this.props
        this.props.toogleLoading(true)
        const message = await mutation({variables: {token}, refetchQueries: [{
            query: gql`{
                        getData(token: "${token}"){
                            data
                        }
                    }`
        }]
        })
        this.props.toogleLoading(false)
        console.log(message,"-------")
    }


}

const styles = StyleSheet.create({
    appLoader : {
        position: 'absolute',
        flex: 1,
        justifyContent: 'center'
    }
})
