import React, { Component } from 'react'
import * as Expo from 'expo'
import { Text, TextInput, Alert, View, StyleSheet, Image, TouchableHighlight, KeyboardAvoidingView  } from 'react-native'
import LoginForm from '../components/LoginForm'

export default class Login extends Component {

    signInWithGoogleAsync = async () => {
        try {
          const result = await Expo.Google.logInAsync({
            androidClientId: '98709813526-19jk37u0ovmktjcqlukd7tkv98h1pjt1.apps.googleusercontent.com',
            scopes: ['email'],
          });
    
          if (result.type === 'success') {
            console.log('result', result)
            await AsyncStorage.setItem('user', JSON.stringify(result.user))
            this.props.navigation.navigate('Main')
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log('error', e)
          return { error: true };
        }
    }

    render() {
      const {navigate} = this.props.navigation
        return (
        <View style={styles.container}>

            <View style={styles.loginContainer}>
                <Image resizeMode="contain" style={styles.logo} source={{uri: 'https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-01-512.png'}} />
            </View>
            <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
                <LoginForm navigation={this.props.navigation}/>
            </KeyboardAvoidingView>
            <TouchableHighlight style={styles.textContainer}
                onPress={() => navigate('Register')}
            >
              <Text> Belum punya akun daftar? <Text style={{color: '#ff8c00', fontWeight: 'bold'}}> Daftar sekarang juga </Text></Text>
            </TouchableHighlight>
    
        </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#b5deff',
    },
    title: {
      color: '#fff',
      fontSize: 20
    },
    loginContainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    formContainer:{
      flex: 1,
      width: 300,
      justifyContent: 'center'
    },
    textContainer: {
      flex: 1,
      height: 30,
      justifyContent: 'flex-start',
      alignItems: 'flex-start'
    },
    logo: {
        position: 'absolute',
        width: 300,
        height: 100
    }
});