import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import {DrawerAction} from 'react-navigation-drawer';
import Home from './screen/Home';
import Plan from './screen/Plan';
import Category from './screen/Category';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import History from './screen/History';
import {Body, Container, Header, Left, Text} from 'native-base';
import Statistic from './screen/Statistic';

const Tab = createBottomTabNavigator();
class App1 extends Component {
    constructor(props){
        super(props);
    }

  render() {
    return(
    <Container>
      <Header style = {{backgroundColor: "#23596e"}} androidStatusBarColor="#23596e">
        <Left>
          <Icon  name = 'accusoft' size = {26} color = '#ffffff' onPress = {() =>{this.props.navigation.toggleDrawer()}}></Icon>
        </Left>
        <Body>
          <Text style =  {{fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold', color: '#ffffff'}}>Financial Management</Text>
        </Body>
      </Header>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          tabBarOptions={{
                activeTintColor: '#ffffff',
                labelStyle: {fontSize: 12, fontFamily: 'notoserif'},
                activeBackgroundColor: '#43a0c4',
                inactiveBackgroundColor: '#23596e',
          }}
          initialRouteName = 'Home'
        >
          <Tab.Screen name="Home" component={Home} options = {{
            tabBarLabel: 'Home',
            tabBarIcon: () => (<Iconicons name = 'home'size = {20} color = '#ffffff'/>),
            unmountOnBlur: false
          }}
            initialParams={{"userid": this.props.route.params.userid}}
          />
          <Tab.Screen name = "Statistic" component={Statistic} options = {{
            tabBarLabel: 'Statistic',
            tabBarIcon: () => (<Iconicons name = 'bar-chart'size = {20} color = '#ffffff'/>),
            unmountOnBlur: true
          }}
          initialParams={{"userid": this.props.route.params.userid}}
          />
          <Tab.Screen name = "Plan" component = {Plan} options = {{
            tabBarLabel: 'Plan',
            tabBarIcon: () => (<Icon name = 'clipboard-list' size = {20} color = '#ffffff'/>),
            unmountOnBlur: true
          }}
          initialParams={{"userid": this.props.route.params.userid}}
          />
          <Tab.Screen name = "History" component = {History} options = {{
            tabBarLabel: 'History',
            tabBarIcon: () => (<Icon name = 'history' size = {20} color = '#ffffff'/>),
            unmountOnBlur: true
          }} 
          initialParams={{"userid": this.props.route.params.userid}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Container>
    )
  }
}

export default App1;