import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet ,StatusBar} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

var radio_props = [
    {label: 'Laki-laki', value: 'Laki-laki' },
    {label: 'Perempuan', value: 'Perempuan' }
];

const REGISTER_MUTATION = gql`
  mutation Register($email: String!, $password: String!, $name: String!, $gender: String, $age: Int, $height: Int) {
    register(input:{email: $email, password: $password, name: $name, gender: $gender, age: $age, height: $height}) {
      token
      error
    }
  }
`

export default class RegisterForm extends Component {
    state = {
        gender: null,
        email: null,
        password: null,
        name: null,
        age: null,
        height: null
    }

    onRegisterButtonPress = async(mutation) => {
        console.log(mutation)
        const {email, password, name, gender, height, age}  = this.state
        console.log (email, "email", password, "password", age, "age", gender, "gender", height, "height")
    };
    render() {
        const {gender} = this.state
        return ( 
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                    autoCapitalize="none" 
                    onSubmitEditing={() => this.passwordInput.focus()}
                    onChangeText={(email) => this.setState({email: email})}  
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Email' 
                    placeholderTextColor='rgba(63,60,60,0.5)'/>

                <TextInput style = {styles.input}   
                    returnKeyType="next" 
                    ref={(input)=> this.passwordInput = input}
                    onChangeText={(password) => this.setState({password: password})}  
                    placeholder='Password' 
                    placeholderTextColor='rgba(63,60,60,0.5)' 
                    secureTextEntry/>
                <View style={styles.horizontalInput}>
                    <TextInput style = {styles.input2} 
                        autoCorrect={false} 
                        ref={(input)=> this.nameInput = input} 
                        onSubmitEditing={() => this.ageInput.focus()}
                        onChangeText={(name) => this.setState({name: name})}  
                        returnKeyType="next" 
                        placeholder='Name' 
                        placeholderTextColor='rgba(63,60,60,0.5)'/>
                    <TextInput style = {[styles.input2, {marginLeft: 20}]}
                        keyboardType="number-pad"
                        ref={(input)=> this.ageInput = input} 
                        onChangeText={(age) => this.setState({age: age})} 
                        autoCorrect={false} 
                        returnKeyType="next" 
                        placeholder='Age' 
                        placeholderTextColor='rgba(63,60,60,0.5)'/>
                </View>
                <View style={styles.horizontalInput}>
                    <Text> Gender : </Text>
                    <RadioForm
                        formHorizontal={true}
                        labelStyle={{marginRight: 10}}
                        radio_props={radio_props}
                        initial={0}
                        onPress={(value) => {this.setState({gender})}}
                    />

                </View>
                <View style={styles.horizontalInput}>
                    <TextInput style = {[styles.input2]}
                        keyboardType="number-pad"
                        onChangeText={(height) => this.setState({height: height})} 
                        autoCorrect={false} 
                        returnKeyType="go" 
                        placeholder='Your Current Height' 
                        placeholderTextColor='rgba(63,60,60,0.5)'/>
                </View>
                <Mutation mutation={REGISTER_MUTATION}>
                    {(Register) => (
                        <TouchableOpacity style={styles.buttonContainer} onPress={this.onRegisterButtonPress(Register)}>
                            <Text  style={styles.buttonText}>REGISTER</Text>
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
    input2:{
        height: 40,
        backgroundColor: 'rgba(225,225,225, 0.8)',
        marginBottom: 10,
        padding: 10,
        width: 140,
        color: '#3f3c3c'
    },
    horizontalInput: {
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center'
    },
    buttonContainer:{
        backgroundColor: '#2980b6',
        paddingVertical: 15,
        marginTop: 10,
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
