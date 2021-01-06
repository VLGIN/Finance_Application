import { Container, Text , Content, Body, Right, Left, Card, CardItem} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {Alert, FlatList, RefreshControl, View, StyleSheet, Dimensions} from 'react-native';
import numbro from 'numbro';

class ShowSpending extends Component{
    constructor(props){
        super(props);
        this.state = {
            spending_list: [],
            height: Dimensions.get("window").height,
            spending_list_monthly: [],
            resfreshing: false
        }
    }

    async onRefresh(){
        this.setState({resfreshing: true});
        await this.componentDidMount();
        this.setState({refreshing: false})
    }

    async delete_hist(value){
        await Alert.alert(
            "Confirm",
            "Are you sure to delete this speding?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () =>{
                        await fetch('http://10.0.2.2:5000/delete/spending', {
                            method: 'post',
                            mode: 'no-cors',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },

                            body: JSON.stringify({
                            "id": value
                            })
                        })
                        this.componentDidMount();
                    },
                }
            ],
            {cancelable: false}
        );
    }

    render(){
        return(
            <Container>
                <View>
                    <Text style = {{color:'#23596e', padding: 4, fontSize: 22, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>Daily</Text>
                </View>
                
                    <FlatList
                    style = {{height: this.state.height * 0.2}}
                    data={this.state.spending_list}
                    refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
                    renderItem={({ item, index, separators }) => (
                        <Card style = {styles.card}>
                        <CardItem style = {styles.content}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Left  style = {{flex: 0.5}}>
                                    <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.name}</Text>
                                </Left>
                                <Body style = {{flexDirection: 'row'}}>
                                    <Left>
                                        <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.Date}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{numbro(item.value).format({thousandSeparated: true})}</Text>
                                    </Right>
                                </Body>
                                <Right style = {{flex: 0.3}}>
                                    <Iconicons name = 'trash' value = {item.idspending} size = {20} onPress = {() => this.delete_hist(item.idspending)}/>
                                </Right>
                            </Body>
                        </CardItem>
                        </Card>)}
                    keyExtractor = {item => item.idspending.toString()} >
                    </FlatList>
                
                <View>
                    <Text style = {{color:'#23596e', padding: 4, fontSize: 22, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>Monthly</Text>
                </View>
                
                    <FlatList
                    style = {{height: this.state.height * 0.2}}
                    data={this.state.spending_list_monthly}
                    renderItem={({ item, index, separators }) => (
                        <Card style = {styles.card}>
                        <CardItem style = {styles.content}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Left  style = {{flex: 0.5}}>
                                    <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.name}</Text>
                                </Left>
                                <Body style = {{flexDirection: 'row'}}>
                                    <Left>
                                        <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.Date}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{numbro(item.value).format({thousandSeparated: true})}</Text>
                                    </Right>
                                </Body>
                                <Right style = {{flex: 0.3}}>
                                    <Iconicons name = 'trash' value = {item.idspending} size = {20} onPress = {() => this.delete_hist(item.idspending)}/>
                                </Right>
                            </Body>
                        </CardItem>
                        </Card>)}
                    keyExtractor = {item => item.idspending.toString()} >
                    </FlatList>
                
            </Container>
        )
    }

    async componentDidMount(){
        let response = await fetch('http://10.0.2.2:5000/spending/type/0');
        let data = await response.json();
        let response2 = await fetch('http://10.0.2.2:5000/spending/type/1');
        let data2 = await response2.json();
        this.setState({
            spending_list: data,
            spending_list_monthly: data2
        })
    }
}

const styles = StyleSheet.create({
    card: {
        backgroundColor:'#d9e6fa'
    },
    content: {
        margin: 5, 
        height: 70, 
        paddingLeft: 10,
        paddingRight: 10, 
        paddingHorizontal:5,
        backgroundColor: '#d9e6fa',
    },
})
export default ShowSpending;