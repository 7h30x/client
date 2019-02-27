import {createStackNavigator} from 'react-navigation'
import DashboardPage from '../screens/Dashboard'


export default createStackNavigator({
    Dashboard: DashboardPage
}, {
    initialRouteName: 'Dashboard'
})