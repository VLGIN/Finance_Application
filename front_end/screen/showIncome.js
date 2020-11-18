import { Container, Text , Content, Body, Right, Left} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {FlatList, RefreshControl, View, Alert} from 'react-native';


class showIncome extends Component{
    constructor(props){
        super(props);
        this.state = {
            income_list: [],
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
            "Are you sure to delete this income?",
            [
                {
                    text: "Cancel",
                    onPress: () => {},
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () =>{
                        await fetch('http://10.0.2.2:5000/delete/income', {
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
                        let remove = this.state.income_list.indexOf(this.state.income_list.find(element => element.idincome == value))
                        this.state.income_list.splice(remove, 1)
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
                    data={this.state.income_list}
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
                                    <Iconicons name = 'trash' size = {20} onPress = {() => this.delete_hist(item.idincome)}/>
                                </Right>
                            </Body>
                        </Content>)}
                    keyExtractor = {item => item.idincome.toString()} >
                    </FlatList>
                </View>
            </Container>
        )
    }

    async componentDidMount(){
        let response = await fetch('http://10.0.2.2:5000/get/income');
        let data = await response.json();
        this.setState({
            income_list: data,
        })

    }
}



export default showIncome;