import React, {Component} from 'react';
import {View,FlatList,  StyleSheet, TouchableHighlight} from 'react-native';
import {TouchableOpacity } from 'react-native-gesture-handler';
import {Header, Container, Title, Content, Footer, Button, FooterTab, Left, Right, Text, Tab, Tabs, Body} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconicons from 'react-native-vector-icons/Ionicons';
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            category_list: [{"idcategory": -1, "name": " "}],
        }
    }
    async componentDidMount(){
        let response = await fetch("http://10.0.2.2:5000/get/category/1")
        let data = await response.json();
        this.setState(
            {
                category_list: data,
            }
        )
    }

    render(){
        return(
            <Container>
                <View>
                    <FlatList
                    data={this.state.category_list}
                    renderItem={({ item, index, separators }) => (
                        <View style = {styles.content}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Text style={{fontSize: 18, fontWeight: 'bold'}}>{item.name}</Text>
                                <Right>
                                    <Iconicons name = 'trash' size = {20}/>
                                </Right>
                            </Body>
                        </View>)}
                    keyExtractor = {item => item.idcategory.toString()} >
                    </FlatList>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    content: {
        margin: 5, 
        height: 70, 
        paddingLeft: 10,
        paddingRight: 10, 
        paddingHorizontal:5,
        backgroundColor: '#d9e6fa',
        borderColor: 'black',
        borderWidth: 3,
        borderRadius: 10
    },
})

export default Home