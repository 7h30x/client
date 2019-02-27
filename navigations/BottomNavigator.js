import React from 'react';
import {createBottomTabNavigator} from 'react-navigation'
import DashboardNav from './DashboardNav'
import Profile from './ProfileNav'
import Timbangan from './TimbanganNav'
import {Ionicons, FontAwesome, MaterialCommunityIcons} from 'react-native-vector-icons'


export default createBottomTabNavigator({
    Home: DashboardNav,
    Measure: Timbangan,
    Profile: Profile,
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
  