
import {createSwitchNavigator} from 'react-navigation'
import Input from '../screens/Timbangan/Input'
import Timbangan from '../screens/Timbangan/Timbangan'

export default createSwitchNavigator({
    InputTimbangan: Input,
    Timbangan: Timbangan,
}, {
    initialRouteKey:'InputTimbangan'
})