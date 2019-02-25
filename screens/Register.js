import React, { Component } from 'react'
import { Text, TextInput, Alert, View, StyleSheet, Image, TouchableHighlight, KeyboardAvoidingView  } from 'react-native'
import RegisterForm from '../components/RegisterForm'

export default class Register extends Component {
  render() {
    const {navigate} = this.props.navigation
    return (
        <View style={styles.container}>

            <View style={styles.loginContainer}>
                <Image resizeMode="contain" style={styles.logo} source={{uri: 'https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-01-512.png'}} />
            </View>
            <KeyboardAvoidingView behavior="padding" style={styles.formContainer}>
                <RegisterForm />
            </KeyboardAvoidingView>
            <TouchableHighlight style={styles.textContainer}
                onPress={() => navigate('Login')}
            >
              <Text> Suda punya akun daftar? <Text style={{color: '#ff8c00', fontWeight: 'bold'}}>Login disini!</Text></Text>
            </TouchableHighlight>
    
        </View>
    )
  }
}

// define your styles
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
        flex: 2,
        width: 300,
        justifyContent: 'center'
      },
      textContainer: {
        flex: 1,
        marginTop: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      },
      logo: {
          position: 'absolute',
          width: 300,
          height: 100
      }
});
