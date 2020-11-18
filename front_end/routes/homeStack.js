import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createAppContainer} from 'react-navigation';
import Home from '../screen/Home'
import AccountSetting from '../screen/AccountSetting'
import AddSpending from '../screen/AddSpending';
import AddIncome from '../screen/AddIncome';

const screens = {
    Home: {
        screen: Home,
    },
    AccountSetting: {
        screen: AccountSetting
    },
    AddSpending: {
        screen: AddSpending
    },
    AddIncome: {
        screen: AddIncome
    }
}

const HomeTab = createBottomTabNavigator(screens);

export default createAppContainer(HomeTab);