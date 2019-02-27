import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet ,StatusBar, AsyncStorage} from 'react-native';
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      error
    }
  }
`

export default class LoginForm extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: '',
            status: false
        }
    }

    onLoginButtonPress = async (Login) => {
        const {navigate} = this.props.navigation
        // console.log(this.props)
        // console.log(Login)
        const {email, password} = this.state
        console.log(email,"input")
        Login({variables: {email, password}})
        .then( async (data) => {
            console.log(data.data.login.token, "data")
            try {
                const value = await AsyncStorage.setItem('user', data.data.login.token );
                console.log(await AsyncStorage.getItem('user'), "ini localstorage")
                navigate('AuthLoad')
              } catch (error) {
                // Error retrieving data
              }
        })
        .catch((err) => {
            console.log(err,"errror")
        })
        console.log(data,"=====")
    };
    render() {
        const {email, password} = this.state
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                    autoCapitalize="none"
                    onChangeText={(email) => this.setState({email: email})} 
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Email' 
                    placeholderTextColor='rgba(63,60,60,0.5)'/>

                <TextInput style = {styles.input}   
                    returnKeyType="go" 
                    ref={(input)=> this.passwordInput = input} 
                    onChangeText={(password) => this.setState({password})} 
                    placeholder='Password' 
                    placeholderTextColor='rgba(63,60,60,0.5)' 
                    secureTextEntry/>
                
                {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
                
                
                
                    <Mutation mutation={LOGIN_MUTATION}>
                            {(Login) => (
                                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onLoginButtonPress(Login)}>
                                    <Text  style={styles.buttonText}>LOGIN</Text>
                                </TouchableOpacity>
                            )}
                    </Mutation> 
            </View>
        )
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: 0
    },
    input:{
        height: 40,
        backgroundColor: 'rgba(225,225,225, 0.8)',
        marginBottom: 10,
        padding: 10,
        color: '#3f3c3c'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15
    },
    buttonText:{
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    }, 
    loginButton:{
      backgroundColor:  '#2980b6',
       color: '#fff'
    }
   
});
