import {Container, Text, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {View, RefreshControl, StyleSheet, FlatList, Modal, Dimensions} from 'react-native';
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
        this.state = {
            color: ["#5e90e0", "#2c9c4b","#f5d63b","#07214a","#f5d63b", "#eb2842", "#b0daeb"],
            chartConfig: {
                backgroundGradientFrom: "#1E2923",
                backgroundGradientFromOpacity: 0,
                backgroundGradientTo: "#08130D",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 0.1) => `rgba(12, 12, 12, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false // optional
              },
            screenHeight: Dimensions.get("window").height,
            screenWidth: Dimensions.get("window").width,
            data: []
        }
    }
    
    render(){
        return(
            <Container>
                <View>
                    <PieChart 
                        data = {this.state.data}
                        width={this.state.screenWidth}
                        height={this.state.screenHeight * 0.4}
                        chartConfig={this.state.chartConfig}
                        accessor={"value"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        center={[10, 50]}
                        absolute
                    />
                    
                </View>
            </Container>
        )
    }

    async componentDidMount(){
        let res = await fetch('http://10.0.2.2:5000/spending/per/cate');
        let spending_cate = await res.json();
        console.log(spending_cate);
        for (let i = 0; i< spending_cate.length; i++){
            spending_cate[i]["color"] = this.state.color[i];
            spending_cate[i]["legendFontColor"] = this.state.color[i];
            spending_cate[i]["legendFontSize"] = 15;
        }
        this.setState({
            data: spending_cate
        })
    }
}

export default Statistic_per_cate;