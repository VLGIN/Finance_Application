import React, {Component} from 'react';
import {View, /*Button, FlatList,  */StyleSheet} from 'react-native';
import {Header, TabHeading, Container, Title, Content, Footer, Button, FooterTab, Left, Right, Text, Tab, Tabs} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ShowIncome from './showIncome';
import ShowSpending from './showSpending';

class Home extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <Container>
            <Tabs>
                <Tab heading={ <TabHeading style = {{backgroundColor: "#327e9c"}}><Icon name="wallet" size= {20} color = '#ffffff'/><Text style = {{fontWeight: 'bold'}}>Spending</Text></TabHeading>}>
                    <ShowSpending />
                </Tab>
                <Tab heading={ <TabHeading style = {{backgroundColor: "#327e9c"}}><Icon name = 'money-check-alt' size = {20} color = "#ffffff"/><Text style = {{fontWeight: 'bold'}}>Income</Text></TabHeading>}>
                    <ShowIncome />
                </Tab>
            </Tabs>
        </Container>
        )
            
    }

    async componentDidMount(){
    }

}
export default Home