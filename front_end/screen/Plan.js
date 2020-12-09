import {Container, Text, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import Iconicons from 'react-native-vector-icons/Ionicons';
import {View, RefreshControl, StyleSheet, FlatList, Modal, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import numbro from 'numbro';

class Plan extends Component{
    constructor(props){
        super(props);
        this.state = {
            height: Dimensions.get("window").height,
            limitation: [],
            add_new_limitation: false,
            show_hist: false,
            new_categoryid: 0,
            new_max: 0,
            list_of_category: [],
            category_selected: null,
            refreshing: false,
            hist_list: [],
            total: 0
        }
    }

    render(){
        let category_item = this.state.list_of_category.map((s, i) =>{
            return <Picker.Item key = {i} value = {s.idcategory} label = {s.name} />
        })
        return(
            <Container>
                <Modal
                    animationType = 'fade'
                    transparent = {true}
                    visible = {this.state.add_new_limitation}
                >
                    <View style = {styles.modal}>
                        <Form>
                            <Item floatingLabel>
                                <Label style = {{fontSize: 20}}>Max</Label>
                                <Input keyboardType = 'number-pad' onChangeText = {(value)=> this.setState({new_max: value})}/>
                            </Item>
                            <Picker
                                note
                                mode = 'dropdown'
                                placeholder = "Choose Category"
                                placeholderStyle = {{color: "#bfc6ea"}}
                                selectedValue = {this.state.category_selected}
                                onValueChange = {(value) => {this.setState({category_selected: value})}}
                            >
                                {category_item}
                            </Picker>
                        </Form>
                        <View style = {{flexDirection: 'row'}}>
                            <Left>
                                <Button style = {{margin: 20, backgroundColor: "#23596e"}} onPress = {() => this.add_limitation()}>
                                    <Text>Add</Text>
                                </Button>
                            </Left>
                            <Right>
                                <Button style = {{margin: 20, backgroundColor: "#23596e"}} onPress = {() => {this.setState({add_new_limitation: false})}}>
                                    <Text>Cancel</Text>
                                </Button>
                            </Right>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType = 'slide'
                    transparent = {true}
                    visible = {this.state.show_hist}
                >
                    <View style = {styles.modal_1}>
                        <View>
                            <FlatList
                            data={this.state.hist_list}
                            renderItem={({ item, index, separators }) => (
                                <View style = {styles.content}>
                                    <Body style = {{flexDirection: 'row'}} onPress = {() => {this.touch()}}>
                                        <Left  style = {{flex: 0.5}}>
                                            <Text style={styles.black}>{item.name}</Text>
                                        </Left>
                                        <Body style = {{flexDirection: 'row'}}>
                                            <Left>
                                                <Text style={styles.black}>{item.Date}</Text>
                                            </Left>
                                            <Right>
                                                <Text style={styles.black}>{numbro(item.value).format({thousandSeparated: true})}</Text>
                                            </Right>
                                        </Body>
                                        <Right style = {{flex: 0.3}}>
                                        </Right>
                                    </Body>
                                </View>)}
                            keyExtractor = {item => item.idspending.toString()} >
                            </FlatList>
                        </View>
                        <View style = {styles.content}>
                                <Body style = {{flexDirection: 'row'}} onPress = {() => {this.touch()}}>
                                    <Left  style = {{flex: 0.5}}>
                                        <Text style={styles.red}>Total</Text>
                                    </Left>
                                    <Body style = {{flexDirection: 'row'}}>
                                        <Left>

                                        </Left>
                                        <Right>
                                            <Text style={styles.red}>{numbro(this.state.total).format({thousandSeparated: true})}</Text>
                                        </Right>
                                    </Body>
                                    <Right style = {{flex: 0.3}}>
                                    </Right>
                                </Body>
                            </View>
                        <Button style = {styles.button_1} onPress = {() => {this.setState({show_hist: false})}}><Text>Back</Text></Button>
                    </View>
                </Modal>
                <View style = {{backgroundColor: "#ffffff", height: this.state.height, marginTop:1, marginBottom: 1}}>
                    <View style = {styles.content}>
                    <Body style = {{flexDirection: 'row'}} onPress = {() => {this.touch()}}>
                                <Left  style = {{flex: 0.5}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Category</Text>
                                </Left>
                                <Body style = {{flexDirection: 'row'}}>
                                    <Left>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Max</Text>
                                    </Left>
                                    <Right>
                                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Current</Text>
                                    </Right>
                                </Body>
                                <Right style = {{flex: 0.3}}>
                                    
                                </Right>
                            </Body>
                    </View>
                    <FlatList
                    data={this.state.limitation}
                    refreshControl = {<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}
                    renderItem={({ item, index, separators }) => (
                        <Button style = {styles.content} onPress = {() => this.touch(item.categoryid)}>
                            <Body style = {{flexDirection: 'row'}} onPress = {() => {this.touch()}}>
                                <Left  style = {{flex: 0.5}}>
                                    <Text style={(item.max<item.current)? styles.red : styles.black}>{item.name}</Text>
                                </Left>
                                <Body style = {{flexDirection: 'row'}}>
                                    <Left>
                                        <Text style={(item.max<item.current)? styles.red : styles.black}>{numbro(item.max).format({thousandSeparated: true})}</Text>
                                    </Left>
                                    <Right>
                                        <Text style={(item.max<item.current)? styles.red : styles.black}>{numbro(item.current).format({thousandSeparated: true})}</Text>
                                    </Right>
                                </Body>
                                <Right style = {{flex: 0.3}}>
                                    <Iconicons name = 'trash' value = {item.categoryid} style={(item.max<item.current)? styles.red : styles.black} onPress = {() => this.delete_limitation(item.categoryid)}/>
                                </Right>
                            </Body>
                        </Button>)}
                    keyExtractor = {item => item.id.toString()} >
                    </FlatList>
                </View>
                <Button style = {styles.button} onPress = {() => {this.setState({add_new_limitation: true})}}>
                    <Icon name = 'plus' color = '#ffffff' size = {20}></Icon>
                </Button>
            </Container>
        )
    }

    async onRefresh(){
        this.setState({refreshing: true});
        this.componentDidMount();
        this.setState({refreshing: false});
    }

    async add_limitation(){
        if(this.state.new_max != 0){
            await fetch('http://10.0.2.2:5000/post/limitation', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "categoryid": this.state.category_selected,
                    "max": this.state.new_max
                })
            })
            let res = await fetch('http://10.0.2.2:5000/get/limitation');                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
            let data = await res.json();
            this.setState({
                limitation: data,
                category_selected: this.state.list_of_category[0].idcategory,
                new_max: 0,
            })
        }
        this.setState({
            add_new_limitation: false
        })
    }

    async delete_limitation(id){
        await fetch('http://10.0.2.2:5000/delete/limitation', {
            method: 'post',
            mode: 'no-cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                "categoryid": id
            })
        })
        let remove = this.state.limitation.indexOf(this.state.limitation.find(element => element.categoryid == id))
        this.state.limitation.splice(remove, 1)
        this.setState({})
    }

    async touch(id){
        this.setState({
            show_hist: true
        });
        let response = await fetch('http://10.0.2.2:5000/get/spending/' + id.toString());
        let data = await response.json();
        this.setState({
            hist_list: data
        })
        let current = this.state.limitation.indexOf(this.state.limitation.find(element => element.categoryid == id));
        this.setState({total: this.state.limitation[current].current});
    }

    async componentDidMount(){
        let res = await fetch('http://10.0.2.2:5000/get/limitation');
        let data = await res.json();
        this.setState({
            limitation: data
        })
        let cate = await fetch('http://10.0.2.2:5000/get/category/0');
        let cate_list = await cate.json();
        this.setState({
            list_of_category: cate_list,
            category_selected: cate_list[0].idcategory
        })
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
    modal_1: {
        marginTop: 58,
        height: 640,
        borderWidth: 5,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white'
    },
    red: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'red'
    },
    black: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    button: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        backgroundColor: '#23596e', 
        width: 60,
        height: 60,
        borderRadius: 30
    },
    button_1: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        justifyContent: 'center',
        backgroundColor: '#23596e',
        borderRadius: 10
    },
    modal: {
        marginTop: 200,
        height: 200,
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'white',
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 10,
        shadowColor: "#ffffff",
        shadowOffset: {
        width: 2,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    }
})

export default Plan;