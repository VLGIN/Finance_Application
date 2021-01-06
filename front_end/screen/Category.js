import React, {Component} from 'react';
import {View,FlatList,  StyleSheet, TouchableHighlight, Modal, Alert, Dimensions} from 'react-native';
import {ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {Header, Container, Form, Item, Label, Input, Footer, Button, FooterTab, Left, Right, Text, Body, Picker, Card, CardItem} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Iconicons from 'react-native-vector-icons/Ionicons';
class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            category_list: [{"idcategory": -1, "name": " "}],
            category_spending_list: [{"idcategory": -1, "name": " "}],
            add_new_category: false,
            new_category: "",
            type_selected: "Spending"
        }
    }
    async componentDidMount(){
        let response = await fetch("http://10.0.2.2:5000/get/category/1")
        let data = await response.json();
        let response2 = await fetch("http://10.0.2.2:5000/get/category/0")
        let data_spending = await response2.json();
        this.setState(
            {
                category_spending_list: data_spending,
                category_list: data,
            }
        )
    }

    async delete_category(idcategory){
        let response = await fetch('http://10.0.2.2:5000/delete/category', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "id": idcategory
            })
        })
        if(response.status == 500){
            alert("Cannot delete this category.\nDelete all histories related to this catogory first.")
        }
        else this.componentDidMount();

    }

    async add_category(){
        let type
        if(this.state.type_selected == "Spending"){
            type = 0
        }
        else type = 1
        let response = await fetch('http://10.0.2.2:5000/add/category', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "name": this.state.new_category,
                "type": type
            })
        })
        let data = await response.json();
        if(type == 1){
            this.setState({
                category_list: data
            })
        }
        else {
            this.setState({category_spending_list: data})
        }
        this.setState({
            add_new_category: false
        })
    }

    render(){
        return(
            <Container>
                <Header style = {{backgroundColor: "#23596e"}} androidStatusBarColor="#23596e">
                    <Left>
                        <Icon  name = 'backward' size = {26} color = '#ffffff' onPress = {() =>{this.props.navigation.navigate('Home')}}></Icon>
                    </Left>
                <Body>
                    <Text style =  {{fontFamily: 'notoserif', fontSize: 18,fontWeight: 'bold', color: '#ffffff'}}>Financial Management</Text>
                </Body>
                </Header>
                <Modal 
                    animationType = 'fade'
                    transparent = {true}
                    visible = {this.state.add_new_category}
                >
                    <View style = {styles.modalview_mini}>
                        <View style = {styles.reactangle_cate}>
                            <Text style = {{color: "#ffffff", fontSize: 28, fontFamily: 'notoserif'}}>New category</Text>
                        </View>
                        <Form style = {styles.form}>
                            <Item floatingLabel style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Name</Label>
                                <Input onChangeText = {(value)=> this.setState({new_category: value})}/>
                            </Item>
                            <Picker
                                note
                                mode = 'dropdown'
                                placeholder = ""
                                placeholderStyle = {{color: "#bfc6ea"}}
                                selectedValue = {this.state.type_selected}
                                onValueChange = {(value) => this.setState({type_selected: value})}
                            >
                                <Picker.Item key = {0} value = "Spending" label = "Spending"></Picker.Item>
                                <Picker.Item key = {0} value = "Income" label = "Income"></Picker.Item>
                            </Picker>
                        </Form>
                        <View style = {{flexDirection: 'row', margin: 50}}>
                            <Left>
                                <Button onPress = {() => this.add_category()} style = {styles.button}><Text>OK</Text></Button>
                            </Left>
                            <Right>
                                <Button onPress = {() => this.setState({add_new_category: false, new_category: ""})} style = {styles.button}><Text>Cancel</Text></Button>
                            </Right>
                        </View>
                    </View>
                </Modal>
                    <View>
                        <Text style = {{color:'#23596e', padding: 4, fontSize: 22, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>SPENDING</Text>
                    </View>
                    <FlatList
                    style = {{height: Dimensions.get("window").height * 0.8}}
                    data={this.state.category_spending_list}
                    renderItem={({ item, index, separators }) => (
                        <Card style={styles.card}>
                        <CardItem style = {styles.content}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Left>
                                <Text style={{fontSize: 18, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.name}</Text>
                                </Left>
                                <Right>
                                    <Iconicons name = 'trash' onPress = {()=> this.delete_category(item.idcategory)} size = {20}/>
                                </Right>
                            </Body>
                        </CardItem>
                        </Card>
                        )}
                    keyExtractor = {item => item.idcategory.toString()} >
                    </FlatList>
                    <View>
                        <Text style = {{color:'#23596e', padding: 4, fontSize: 22, fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>INCOME</Text>
                    </View>
                    <FlatList
                    style = {{height: Dimensions.get("window").height * 0.2}}
                    style = {{marginBottom: 80}}
                    data={this.state.category_list}
                    renderItem={({ item, index, separators }) => (
                        <Card style = {styles.card}>
                        <CardItem style = {styles.content}>
                            <Body style = {{flexDirection: 'row'}}>
                                <Left>
                                <Text style={{fontSize: 18 , fontFamily: 'sans-serif-condensed', fontWeight: 'bold'}}>{item.name}</Text>
                                </Left>
                                <Right>
                                    <Iconicons name = 'trash' onPress = {()=> this.delete_category(item.idcategory)} size = {20}/>
                                </Right>
                            </Body>
                        </CardItem>
                        </Card>)}
                    keyExtractor = {item => item.idcategory.toString()} >
                    </FlatList>

                <Button style = {styles.button1} onPress = {() => {this.setState({add_new_category: true})}}>
                    <Icon name = 'plus' color = '#ffffff' size = {20}></Icon>
                </Button>
            </Container>
        )
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
    button1: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        backgroundColor: '#23596e', 
        width: 60,
        height: 60,
        borderRadius: 30
    },
    text: {
        fontWeight: 'bold',
        color: "white",
        margin: 10,
        alignItems: 'center',
        alignContent: 'center'
    },
    textt: {
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#23596e'
    },
    modalview_mini: {
        marginTop: 150,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    reactangle_cate: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#23596e",
        borderRadius: 20
    },
    form: {
        width: 300
    },
    item: {
        height: 60,
        padding: 5
    },
    button: {
        backgroundColor: "#23596e",
        borderRadius: 5
    }
})

export default Home