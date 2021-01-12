import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import login from './screen/login';
import App_main_screen from './App_main_screen';
import New_Account from './screen/New_Account';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();
export default class App extends Component {

  render() {
    return(
    <NavigationContainer independent = {true}>
      <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
      >
          <Stack.Screen name = "Login" component={login} options = {{
          }}
          
          />
          <Stack.Screen name = 'main_screen' component={App_main_screen} />
          <Stack.Screen name = 'Create_account' component={New_Account} />
      </Stack.Navigator>
    </NavigationContainer>
    )
  }
}