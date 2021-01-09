import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import AccountSetting from './screen/AccountSetting'
import Category from './screen/Category'
import App1 from './App1';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class App_main_screen extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return(
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="App1" drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" onPress={() => this.props.navigation.navigate("Login")} />
      </DrawerContentScrollView>
    )
  }} initialRouteName = 'Home'> 
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