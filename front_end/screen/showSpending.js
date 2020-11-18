import { Container, Text , Content, Body, Right, Left} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {Alert, FlatList, RefreshControl, View} from 'react-native';

class ShowSpending extends Component{
    constructor(props){
        super(props);
        this.state = {
            spending_list: [],
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
                        let remove = this.state.spending_list.indexOf(this.state.spending_list.find(element => element.idspending == value))
                        this.state.spending_list.splice(remove, 1)
                        this.setState({})
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
                    <FlatList
                    data={this.state.spending_list}
                    refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
                    renderItem={({ item, index, separators }) => (
                        <Content style = {{height: 50, paddingLeft: 10,
                        paddingRight: 10, paddingHorizontal:5}}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Left  style = {{flex: 0.5}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                </Left>
                                <Body style = {{flexDirection: 'row'}}>
                                    <Left>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.Date}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.value}</Text>
                                    </Right>
                                </Body>
                                <Right style = {{flex: 0.3}}>
                                    <Iconicons name = 'trash' value = {item.idspending} size = {20} onPress = {() => this.delete_hist(item.idspending)}/>
                                </Right>
                            </Body>
                        </Content>)}
                    keyExtractor = {item => item.idspending.toString()} >
                    </FlatList>
                </View>
            </Container>
        )
    }

    async componentDidMount(){
        let response = await fetch('http://10.0.2.2:5000/get/spending');
        let data = await response.json();
        this.setState({
            spending_list: data,
        })

    }
}

export default ShowSpending;