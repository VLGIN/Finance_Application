import {Container, Text, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {View, RefreshControl, StyleSheet, FlatList, Modal, Dimensions, ScrollView} from 'react-native';
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
            color: ["#5e90e0", "#396ab8","#194791","#07214a","#f5d63b", "#eb2842", "#b0daeb"],
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
            data_income: [],
            refresh: false,
            year_selected: new Date().getFullYear(),
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
                <View style = {{alignContent: 'center', alignItems: 'center'}}>
                            <Text style =  {styles.text}>SPENDING</Text>
                </View>
                <View style = {{margin: 5, borderRadius: 20, backgroundColor: '#125c7a'}}>
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
                <View style = {{alignContent: 'center', alignItems: 'center'}}>
                            <Text style =  {styles.text}>INCOME</Text>
                </View>
                <View style = {{margin: 5, borderRadius: 20, backgroundColor: '#125c7a'}}>
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
                <View >
                    <Body style = {styles.bottom}>
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
                </ScrollView>
            </Container>
        )
    }

    async onYearChange(value){
        this.setState({
            data: [],
            data_income: [],
        })
        let res = await fetch('http://10.0.2.2:5000/spending/per/cate/' + value.toString());
        let spending_cate = await res.json();
        
        let res2 = await fetch('http://10.0.2.2:5000/income/per/cate/' + value.toString());
        let income_cate = await res2.json();
        for (let i = 0; i<income_cate.length; i++){
            income_cate[i]["color"] = this.state.color[i];
            income_cate[i]["legendFontColor"] = "#000000";
            income_cate[i]["legendFontSize"] = 15;
        }
        for (let i = 0; i< spending_cate.length; i++){
            spending_cate[i]["color"] = this.state.color[i];
            spending_cate[i]["legendFontColor"] = "#000000";
            spending_cate[i]["legendFontSize"] = 15;
            spending_cate[i]["legendFontWeight"] = "bold";
        }
        this.setState({
            data: spending_cate,
            data_income: income_cate,
            year_selected: value
        })
    }

    async onRefresh(){
        this.setState({resfreshing: true});
        await this.componentDidMount();
        this.setState({refreshing: false});
    }

    async componentDidMount(){
        let res = await fetch('http://10.0.2.2:5000/spending/per/cate/' + this.state.year_selected.toString());
        let spending_cate = await res.json();
        
        let res2 = await fetch('http://10.0.2.2:5000/income/per/cate/' + this.state.year_selected.toString());
        let income_cate = await res2.json();

        let response = await fetch('http://10.0.2.2:5000/get/year');
        let year_list = await response.json();
        for (let i = 0; i<income_cate.length; i++){
            income_cate[i]["color"] = this.state.color[i];
            income_cate[i]["legendFontColor"] = "#000000";
            income_cate[i]["legendFontSize"] = 15;
        }
        for (let i = 0; i< spending_cate.length; i++){
            spending_cate[i]["color"] = this.state.color[i];
            spending_cate[i]["legendFontColor"] = "#000000";
            spending_cate[i]["legendFontSize"] = 15;
            spending_cate[i]["legendFontWeight"] = "bold";
        }
        this.setState({
            data: spending_cate,
            data_income: income_cate,
            year: year_list
        })
    }
}

const styles = StyleSheet.create({
    text: {
        alignContent: 'center',
        padding: 5,
        color: "#23596e",
        fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold'
    },
    bottom: {
        flexDirection: 'row',
        marginBottom: 40,
        marginLeft: 10,
        marginRight: 10
    }
})

export default Statistic_per_cate;