import React from 'react';
import { createStackNavigator, createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from 'react-native-vector-icons'
import BlankPage from '../screens/Blank'

import Timbangan from './TimbanganNav'

import StatsPage from '../screens/StatsPage'
const DashboardNav = createStackNavigator({
  Dashboard: BlankPage
}, {
    initialRouteName: 'Dashboard'
  })
const ProfileNav = createStackNavigator({
  Stats: StatsPage
})
const MainNavigator = createBottomTabNavigator({
  Home: DashboardNav,
  Measure: Timbangan,
  Profile: ProfileNav,
}, {
    initialRouteName: 'Home',
    tabBarOptions: {
      activeTintColor: '#2e94b5',
      showLabel: false,
      style: {
        fontHeight: 'bold',
        backgroundColor: '#fff',
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        var IconComponent
        if (routeName === 'Home') {
          IconComponent = FontAwesome;
          iconName = `home`
        } else if (routeName === 'Measure') {
          IconComponent = MaterialCommunityIcons;
          iconName = `scale-bathroom`
        } else if (routeName === 'Profile') {
          var IconComponent = Ionicons;
          iconName = 'ios-contact'
        }
        return <IconComponent name={iconName} size={25} color={tintColor} />
      },
    })
  })

export default createAppContainer(MainNavigator);