import {Container, Text, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {View, RefreshControl, StyleSheet, FlatList, Modal, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import YearPicker from 'react-native-month-year-picker';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Line } from 'react-native-svg';

class Statistic_per_month extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            data_income: [0,0,0,0,0,0,0,0,0,0,0,0]
        }
    }
    
    render(){
        let data = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data
                }
            ]
        }
        let data_income = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data_income
                }
            ]
        }
        return(
            <Container>
                <View style = {{backgroundColor: "#23596e", height: this.state.height}}>
                    <View style = {{backgroundColor: "#23596e"}}>
                        <View style = {{alignContent: 'center', alignItems: 'center', backgroundColor: "#23596e"}}>
                            <Text style =  {styles.text}>SPENDING</Text>
                        </View>
                        <LineChart
                            data={data}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                            //backgroundColor: "#e26a00",
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: "#8299bd",
                            backgroundGradientTo: "#d9e6fa",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>
                    <View style = {{backgroundColor: "#23596e"}}>
                        <View style = {{alignContent: 'center', alignItems: 'center', backgroundColor: "#23596e"}}>
                            <Text style =  {styles.text}>INCOME</Text>
                        </View>
                        <LineChart
                            data={data_income}
                            width={Dimensions.get("window").width} // from react-native
                            height={220}
                            yAxisLabel=""
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                            //backgroundColor: "#e26a00",
                            backgroundColor: '#ffffff',
                            backgroundGradientFrom: "#8299bd",
                            backgroundGradientTo: "#d9e6fa",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                            }}
                            bezier
                            style={{
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>
                </View>
            </Container>
        )
    }

    async componentDidMount(){
        let res = await fetch('http://10.0.2.2:5000/spending/per/month');
        let spending_month = await res.json();
        for(let i = 0; i<spending_month.length; i++){
            this.state.data[spending_month[i].month - 1]= spending_month[i].value / 1000;
        }


        let res2 = await fetch('http://10.0.2.2:5000/income/per/month');
        let income_month = await res2.json();
        for (let i = 0; i<income_month.length; i++){
            this.state.data_income[income_month[i].month - 1] = income_month[i].value / 1000;
        }
        this.setState({
            data: this.state.data,
            data_income: this.state.data_income
        })
    }
}

const styles = StyleSheet.create({
    text: {
        alignContent: 'center',
        padding: 5,
        color: "#ffffff",
        fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold'
    }
})
export default Statistic_per_month;