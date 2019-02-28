import React from 'react'
import {createStackNavigator} from 'react-navigation';
import StatsPage from '../screens/StatsPage'
import AchievementModal from '../components/AchievementModal'

const ModalNav = createStackNavigator({
  Achievement: AchievementModal
}, {
    mode: 'modal',
    headerMode: 'none'
  })

const ProfileNav = createStackNavigator({
  Stats: StatsPage,
  Achievement: ModalNav
}, {
    initialRouteName: 'Achievement'
  })
export default ProfileNav