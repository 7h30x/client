import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet ,StatusBar} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';

const onButtonPress = () => {
    Alert.alert('Button has been pressed!');
};

var radio_props = [
    {label: 'Laki-laki', value: 'Laki-laki' },
    {label: 'Perempuan', value: 'Perempuan' }
];

export default class RegisterForm extends Component {
    state = {
        gender: null
    }
    render() {
        const {gender} = this.state
        return ( 
            <View style={styles.container}>
                <StatusBar barStyle="light-content"/>
                <TextInput style = {styles.input} 
                    autoCapitalize="none" 
                    onSubmitEditing={() => this.passwordInput.focus()} 
                    autoCorrect={false} 
                    keyboardType='email-address' 
                    returnKeyType="next" 
                    placeholder='Email' 
                    placeholderTextColor='rgba(63,60,60,0.5)'/>

                <TextInput style = {styles.input}   
                    returnKeyType="next" 
                    ref={(input)=> this.passwordInput = input} 
                    placeholder='Password' 
                    placeholderTextColor='rgba(63,60,60,0.5)' 
                    secureTextEntry/>
                <View style={styles.horizontalInput}>
                    <TextInput style = {styles.input2} 
                        onSubmitEditing={() => this.passwordInput.focus()} 
                        autoCorrect={false} 
                        ref={(input)=> this.nameInput = input} 
                        onSubmitEditing={() => this.ageInput.focus()} 
                        returnKeyType="next" 
                        placeholder='Name' 
                        placeholderTextColor='rgba(63,60,60,0.5)'/>
                    <TextInput style = {[styles.input2, {marginLeft: 20}]}
                        keyboardType="number-pad"
                        ref={(input)=> this.ageInput = input} 
                        onSubmitEditing={() => this.ageInput.focus()} 
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
                {/*   <Button onPress={onButtonPress} title = 'Login' style={styles.loginButton} /> */}
                <TouchableOpacity style={styles.buttonContainer} onPress={onButtonPress}>
                    <Text  style={styles.buttonText}>REGISTER</Text>
                </TouchableOpacity> 
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
