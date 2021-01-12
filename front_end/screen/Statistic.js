import {Container,TabHeading,Tab, Text, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker, Tabs} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {View, RefreshControl, StyleSheet, FlatList, Modal, Dimensions} from 'react-native';
import Statistic_per_month from './statistic_per_month';
import Statistic_per_cate from './statistic_per_cate';

class Statistic extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return(
            <Container>
                <Tabs>
                    <Tab heading={ <TabHeading style = {{backgroundColor: "#327e9c"}}><Text style = {{fontWeight: 'bold'}}>Per Month</Text></TabHeading>}>
                        <Statistic_per_month  userid = {this.props.route.params.userid}/>
                    </Tab>
                    <Tab heading={ <TabHeading style = {{backgroundColor: "#327e9c"}}><Text style = {{fontWeight: 'bold'}}>Per Category</Text></TabHeading>}>
                        <Statistic_per_cate userid = {this.props.route.params.userid}/>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default Statistic;