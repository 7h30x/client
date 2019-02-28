import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import MainNavigator from './BottomNavigator'
import LoginPage from '../screens/Login'
import RegisterPage from '../screens/Register'
import AuthLoad from '../screens/AuthLoading'

const AppNav = createSwitchNavigator({
  AuthLoad: AuthLoad,
  Main: MainNavigator,
  Login: LoginPage,
  Register: RegisterPage
},
  {
    initialRouteName: 'AuthLoad'
  })

export default createAppContainer(AppNav);
