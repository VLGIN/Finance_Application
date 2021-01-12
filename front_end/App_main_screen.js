import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList} from '@react-navigation/drawer'
import Category from './screen/Category'
import App1 from './App1';
import {StyleSheet, Text, View, Image} from 'react-native';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Body, Container, Header } from 'native-base';
import { DrawerItems } from 'react-navigation-drawer';

const Drawer = createDrawerNavigator();

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#23596e",
    height: 150,
    flexDirection: 'row'
  },
  text: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-condensed'
  }
})

export default class App_main_screen extends Component {
  constructor(props){
    super(props);
    this.state = {
      account: ''
    }
  }

  async componentDidMount(){
    console.log(this.props);
    let ac = await fetch('http://10.0.2.2:5000/get/user/' + this.props.route.params.userid);
    ac = await ac.json();
    this.setState({
      account: ac.account
    })
  }

  render() {
    return(
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="App1" drawerContent={props => {
    return (
      <DrawerContentScrollView {...props}>
        <View style ={styles.header}>
          <Image source={require('./user.png')} style = {{marginLeft: 5, height: 100, width: 100, marginTop: 50, bottom: 5}}></Image>
          <View style  = {{marginTop: 80, marginLeft: 10, marginBottom: 20}}>
            <Text style = {styles.text}>{this.state.account.toUpperCase()}</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
        <DrawerItem label="Logout" style = {{fontWeight: 'bold'}} onPress={() => this.props.navigation.navigate("Login")} />
      </DrawerContentScrollView>
    )
  }}> 
        <Drawer.Screen name= "Home" component={App1}
          options={{
            drawerIcon: config => <Icon name ="home" size = {20} color = "#23596e">

            </Icon>
          }}
          initialParams={{"userid": this.props.route.params.userid}}
        ></Drawer.Screen>
        <Drawer.Screen name="Category" component={Category}
          options={{
            drawerIcon: config => <Icon name ="elementor" size = {20} color = "#23596e">

            </Icon>
          }}
          initialParams={{"userid": this.props.route.params.userid}}
        ></Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
    )
  }
}