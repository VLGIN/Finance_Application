import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer'
import AccountSetting from './screen/AccountSetting'
import Category from './screen/Category'
import App1 from './App1';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class App extends Component {

  render() {
    return(
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="App1">
        <Drawer.Screen name= "Home" component={App1}
          options={{
            drawerIcon: config => <Icon name ="home" size = {20} color = "#23596e">

            </Icon>
          }}
        ></Drawer.Screen>
        <Drawer.Screen name="Category" component={Category}
          options={{
            drawerIcon: config => <Icon name ="elementor" size = {20} color = "#23596e">

            </Icon>
          }}
        ></Drawer.Screen>
        <Drawer.Screen name="AccountSetting" component={AccountSetting}
          options={{
            drawerIcon: config => <Icon name ="cogs" size = {20} color = "#23596e">

            </Icon>
          }}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
    )
  }
}