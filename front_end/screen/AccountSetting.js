import {Container, Text,Header, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome5';
import numbro from 'numbro';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Line } from 'react-native-svg';

class Statistic_per_cate extends Component{
    constructor(props){
        super(props);
        
    }
    
    render(){
        return(
            <Container>
                <Header style = {{backgroundColor: "#23596e"}} androidStatusBarColor="#23596e">
                    <Left>
                        <Icon  name = 'backward' size = {26} color = '#ffffff' onPress = {() =>{this.props.navigation.navigate('Home')}}></Icon>
                    </Left>
                <Body>
                    <Text style =  {{fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold', color: '#ffffff'}}>Financial Management</Text>
                </Body>
                </Header>
            </Container>
        )
    }

    async componentDidMount(){
        
    }
}

export default Statistic_per_cate;