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
import { ScrollView } from 'react-native-gesture-handler';

class Statistic_per_month extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            data_income: [0,0,0,0,0,0,0,0,0,0,0,0],
            refresh: false,
            year_selected: new Date().getFullYear(),
            data_first_fig: {
                labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        data: [0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ]
            },
            data_second_fig: {
                labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                datasets: [
                    {
                        data: [0,0,0,0,0,0,0,0,0,0,0,0]
                    }
                ]
            },
            year: []
        }
    }
    
    render(){
        let year_item = this.state.year.map((s, i) => {
            return <Picker.Item key = {i} value = {s.YEAR} label = {s.YEAR.toString()} />
        })
        return(
            <Container>
                <ScrollView
                    refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
                >
                <View style = {{backgroundColor: "#23596e", height: this.state.height}}>
                    <View style = {{padding: 5}}>
                        <View style = {{alignContent: 'center', alignItems: 'center', backgroundColor: "#23596e"}}>
                            <Text style =  {styles.text}>SPENDING</Text>
                        </View>
                        <LineChart
                            data={this.state.data_first_fig}
                            width={Dimensions.get("window").width*0.98} // from react-native
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
                    <View style = {{padding: 5}}>
                        <View style = {{alignContent: 'center', alignItems: 'center', backgroundColor: "#23596e"}}>
                            <Text style =  {styles.text}>INCOME</Text>
                        </View>
                        <LineChart
                            data={this.state.data_second_fig}
                            width={Dimensions.get("window").width*0.98} // from react-native
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
                    <View >
                        <Body style =  {styles.bottom}>
                            <Left style = {{marginLeft: 50}}>
                                <Text style = {styles.text}>Year</Text>
                            </Left>
                                <Picker
                                    note
                                    mode = 'dropdown'
                                    placeholder = "Choose Category"
                                    placeholderStyle = {{color: "#bfc6ea"}}
                                    selectedValue = {this.state.year_selected}
                                    onValueChange = {(value) => this.onYearChange(value)}
                                >
                                    {year_item}
                                </Picker>
                        </Body>
                    </View>
                </View>
                </ScrollView>
            </Container>
        )
    }

    async onYearChange(value){
        this.setState({
            year_selected: value,
            data: [0,0,0,0,0,0,0,0,0,0,0,0],
            data_income: [0,0,0,0,0,0,0,0,0,0,0,0]
        })
        let res = await fetch('http://10.0.2.2:5000/spending/per/month/' + value.toString() + '/' + this.props.userid);
        let spending_month = await res.json();
        for(let i = 0; i<spending_month.length; i++){
            this.state.data[spending_month[i].month - 1]= spending_month[i].value / 1000;
        }


        let res2 = await fetch('http://10.0.2.2:5000/income/per/month/' + value.toString() + '/' + this.props.userid);
        let income_month = await res2.json();
        for (let i = 0; i<income_month.length; i++){
            this.state.data_income[income_month[i].month - 1] = income_month[i].value / 1000;
        }

        let data_first = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data
                }
            ]
        }

        let data_second = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data_income
                }
            ]
        }

        this.setState({
            data_first_fig: data_first,
            data_second_fig: data_second
        })

    }

    async onRefresh(){
        this.setState({resfreshing: true});
        await this.componentDidMount();
        this.setState({refreshing: false})
    }

    async componentDidMount(){
        let cur_year = new Date().getFullYear();
        let res = await fetch('http://10.0.2.2:5000/spending/per/month/' + cur_year.toString() + '/' + this.props.userid);
        let spending_month = await res.json();
        for(let i = 0; i<spending_month.length; i++){
            this.state.data[spending_month[i].month - 1]= spending_month[i].value / 1000;
        }


        let res2 = await fetch('http://10.0.2.2:5000/income/per/month/' + cur_year.toString() + '/' + this.props.userid);
        let income_month = await res2.json();
        for (let i = 0; i<income_month.length; i++){
            this.state.data_income[income_month[i].month - 1] = income_month[i].value / 1000;
        }
        
        let response = await fetch('http://10.0.2.2:5000/get/year/' + this.props.userid);
        let year_list = await response.json();
        let data_first = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data
                }
            ]
        }

        let data_second = {
            labels: ["Jan", "Feb", "Mar", "Apr", "M", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    data: this.state.data_income
                }
            ]
        }

        this.setState({
            data_first_fig: data_first,
            data_second_fig: data_second,
            year: year_list
        })
    }
}

const styles = StyleSheet.create({
    text: {
        alignContent: 'center',
        padding: 5,
        color: "#ffffff",
        fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold'
    },
    bottom: {
        margin: 10,
        flexDirection: 'row'
    }
})
export default Statistic_per_month;