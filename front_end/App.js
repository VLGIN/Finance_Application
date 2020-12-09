import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer'
import Home from './screen/Home';
import Plan from './screen/Plan';
import Category from './screen/Category';
import AccountSetting from './screen/AccountSetting';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import History from './screen/History';
import {Body, Container, Header, Left, Text} from 'native-base';
import Statistic from './screen/Statistic';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
export default class App extends Component {

  render() {
    return(
    <Container>

      <Header style = {{backgroundColor: "#23596e"}} androidStatusBarColor="#23596e">
        <Left>
          <Iconicons  name = 'menu' size = {26} color = '#ffffff' onPress = {() =>{navigation.openDrawer()}}></Iconicons>
        </Left>
        <Body>
          <Text style =  {{fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold', color: '#ffffff'}}>Financial Management</Text>
        </Body>
      </Header>
      <NavigationContainer>
        <Tab.Navigator
          tabBarOptions={{
                activeTintColor: '#ffffff',
                labelStyle: {fontSize: 12, fontFamily: 'notoserif'},
                activeBackgroundColor: '#43a0c4',
                inactiveBackgroundColor: '#23596e',
          }}
        >
          <Tab.Screen name="Home" component={Home} options = {{
            tabBarLabel: 'Home',
            tabBarIcon: () => (<Iconicons name = 'home'size = {20} color = '#ffffff'/>)
          }}/>
          <Tab.Screen name = "Statistic" component={Statistic} options = {{
            tabBarLabel: 'Statistic',
            tabBarIcon: () => (<Iconicons name = 'bar-chart'size = {20} color = '#ffffff'/>)
          }} />
          <Tab.Screen name = "Plan" component = {Plan} options = {{
            tabBarLabel: 'Plan',
            tabBarIcon: () => (<Icon name = 'clipboard-list' size = {20} color = '#ffffff'/>)
          }} />
          <Tab.Screen name = "History" component = {History} options = {{
            tabBarLabel: 'History',
            tabBarIcon: () => (<Icon name = 'history' size = {20} color = '#ffffff'/>)
          }} />
          <Tab.Screen name="Settings" component={AccountSetting} options = {{
            tabBarLabel: 'Setting',
            tabBarIcon: () => (<Icon name = 'cogs'size = {20} color = '#ffffff'/>)
          }}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Container>
    )
  }
}