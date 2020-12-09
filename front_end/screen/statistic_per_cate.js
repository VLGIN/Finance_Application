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
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
                strokeWidth: 2, // optional, default 3
                barPercentage: 0.5,
                useShadowColorFromDataset: false // optional
              },
            screenHeight: Dimensions.get("window").height,
            screenWidth: Dimensions.get("window").width,
            data: [],
            data_income: []
        }
    }
    
    render(){
        return(
            <Container>
                <View style = {{margin: 10, borderRadius: 20, backgroundColor: '#23596e'}}>
                    <PieChart 
                        data = {this.state.data}
                        width={this.state.screenWidth*0.95}
                        height={this.state.screenHeight * 0.3}
                        chartConfig={this.state.chartConfig}
                        accessor={"value"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        paddingBottom = {"30"}
                        center={[0, 0]}
                        absolute
                        borderRadius = {20}
                    />
                    
                </View>
                <View style = {{margin: 10, borderRadius: 20, backgroundColor: '#23596e'}}>
                <PieChart 
                        data = {this.state.data_income}
                        width={this.state.screenWidth*0.95}
                        height={this.state.screenHeight * 0.3}
                        chartConfig={this.state.chartConfig}
                        accessor={"value"}
                        backgroundColor={"transparent"}
                        paddingLeft={"15"}
                        paddingBottom = {"30"}
                        center={[0, 0]}
                        absolute
                    />
                </View>
            </Container>
        )
    }

    async componentDidMount(){
        let res = await fetch('http://10.0.2.2:5000/spending/per/cate');
        let spending_cate = await res.json();
        
        let res2 = await fetch('http://10.0.2.2:5000/income/per/cate');
        let income_cate = await res2.json();
        console.log(income_cate);
        for (let i = 0; i<income_cate.length; i++){
            income_cate[i]["color"] = this.state.color[i];
            income_cate[i]["legendFontColor"] = "#000000";
            income_cate[i]["legendFontSize"] = 15;
        }
        console.log(spending_cate);
        for (let i = 0; i< spending_cate.length; i++){
            spending_cate[i]["color"] = this.state.color[i];
            spending_cate[i]["legendFontColor"] = "#000000";
            spending_cate[i]["legendFontSize"] = 15;
        }
        this.setState({
            data: spending_cate,
            data_income: income_cate
        })
    }
}

export default Statistic_per_cate;