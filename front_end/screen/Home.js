import React, {Component} from 'react';
import {View, /*Button, FlatList,  */StyleSheet, Modal} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Header, Container, Title, Content, Button, Left, Right, Text, Fab, Form, Input, DatePicker, Item, Label, Picker} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AddIncome from './AddIncome'
import moment from 'moment'

class Home extends Component{
    
    constructor(props){
        super(props)
        this.state = {
            name: "",
            balance: 0,
            active: false,
            add_income: false,
            add_spending: false,
            spending_list_category: [],
            income_list_category: [],
            spending_category_selected: "",
            spending_type_selected: 1,
            spending_value: 0,
            spending_date: new Date(),
            income_category_selected: "",
            income_type_selected: 1,
            income_value: 0,
            income_date: new Date(),
            new_category: "",
            add_new_category: false,
            new_type: 0
        }
    }
    
    render(){
        let spending_category_item = this.state.spending_list_category.map((s, i) =>{
            return <Picker.Item key = {i} value = {s.idcategory} label = {s.name} />
        })

        let income_category_item = this.state.income_list_category.map((s,i) => {
            return <Picker.Item key = {i} value = {s.idcategory} label = {s.name} />
        })
        return(
            <Container style = {{flex: 1, flexDirection: 'column'}}>
                <Modal 
                    animationType = 'fade'
                    transparent = {true}
                    visible = {this.state.add_new_category}
                >
                    <View style = {styles.modalview_mini}>
                        <View style = {styles.reactangle}>
                            <Text style = {{color: "#ffffff", fontSize: 28, fontFamily: 'notoserif'}}>New category</Text>
                        </View>
                        <Form style = {styles.form}>
                            <Item floatingLabel style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Name</Label>
                                <Input onChangeText = {(value)=> this.setState({new_category: value})}/>
                            </Item>
                        </Form>
                        <View style = {{flexDirection: 'row', margin: 50}}>
                            <Left>
                                <Button onPress = {() => {this.add_new_category(this.state.new_type)}} style = {styles.button}><Text>OK</Text></Button>
                            </Left>
                            <Right>
                                <Button onPress = {() => this.setState({add_new_category: false, new_category: ""})} style = {styles.button}><Text>Cancel</Text></Button>
                            </Right>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType = 'slide'
                    transparent  = {true}
                    visible = {this.state.add_income}
                >
                    <View style={styles.modalview}>
                        <View style = {styles.reactangle}>
                            <Icon name="money-check-alt" color = '#ffffff' size = {28}/>
                            <Text style = {{color: '#ffffff', fontSize: 28, fontFamily: 'notoserif', fontWeight: 'bold'}}>ADD INCOME</Text>
                        </View>
                        <Form style = {styles.form}>
                            <Item floatingLabel style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Value</Label>
                                <Input keyboardType = 'number-pad'
                                onChangeText= {(value) => this.setState({income_value: value})} />
                            </Item>
                            <Item style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Category</Label>
                                <Picker
                                    note
                                    mode = 'dropdown'
                                    placeholder = "Choose Category"
                                    placeholderStyle = {{color: "#bfc6ea"}}
                                    selectedValue = {this.state.income_category_selected}
                                    onValueChange = {(value) => this.onIncomeCategoryChange(value)}
                                >
                                    {income_category_item}
                                    <Picker.Item key = {0} label = 'Another...' value = {0}><Icon name='plus'></Icon></Picker.Item>
                                </Picker>
                            </Item>
                            <Item style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Type</Label>
                                <Picker
                                    note
                                    mode = 'dropdown'
                                    placeholder = "Choose type"
                                    placeholderStyle = {{color:"#bfc6ea"}}
                                    selectedValue = {this.state.spending_type_selected}
                                    onValueChange = {(value) => this.IncomeTypeChange(value)}
                                >
                                    <Picker.Item label = "Dinh ki" value = "1"></Picker.Item>
                                    <Picker.Item label = "Bat thuong" value = "0"></Picker.Item>
                                </Picker>
                            </Item>
                            <Item style = {styles.item} last>
                                <Label style = {{fontSize: 20}}>Date</Label>
                                <DatePicker
                                    defaultDate = {new Date()}
                                    onDateChange = {(newDate) => {this.setState({income_date: newDate})}}
                                ></DatePicker>
                            </Item>
                        </Form>
                        <View style = {{flexDirection: 'row', margin: 50}}>
                            <Left>
                                <Button onPress = {() => this.add_Income()} style = {styles.button}><Text>Add</Text></Button>
                            </Left>
                            <Right>
                                <Button onPress = {() => this.setState({add_income: false})} style = {styles.button}><Text>Cancel</Text></Button>
                            </Right>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType = 'slide'
                    transparent  = {true}
                    visible = {this.state.add_spending}
                >
                    <View style={styles.modalview}>
                        <View style = {styles.reactangle}>
                            <Icon name="wallet" color = '#ffffff' size = {28}/>
                            <Text style = {{color: '#ffffff', fontSize: 28, fontFamily: 'notoserif', fontWeight: 'bold'}}>ADD SPENDING</Text>
                        </View>
                        <Form style = {styles.form}>
                            <Item floatingLabel style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Value</Label>
                                <Input keyboardType = 'number-pad'
                                onChangeText= {(value) => this.setState({spending_value: value})} />
                            </Item>
                            <Item style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Category</Label>
                                <Picker
                                    note
                                    mode = 'dropdown'
                                    placeholder = "Choose Category"
                                    placeholderStyle = {{color: "#bfc6ea"}}
                                    selectedValue = {this.state.spending_category_selected}
                                    onValueChange = {(value) => this.onSpendingCategoryChange(value)}
                                >
                                    {spending_category_item}
                                    <Picker.Item key = {0} label = 'Another...' value = {0}><Icon name='plus'></Icon></Picker.Item>
                                </Picker>
                            </Item>
                            <Item style = {styles.item}>
                                <Label style = {{fontSize: 20}}>Type</Label>
                                <Picker
                                    note
                                    mode = 'dropdown'
                                    placeholder = "Choose type"
                                    placeholderStyle = {{color:"#bfc6ea"}}
                                    selectedValue = {this.state.spending_type_selected}
                                    onValueChange = {(value) => this.onSpendingTypeChange(value)}
                                >
                                    <Picker.Item label = "Dinh ki" value = "1"></Picker.Item>
                                    <Picker.Item label = "Bat thuong" value = "0"></Picker.Item>
                                </Picker>
                            </Item>
                            <Item style = {styles.item} last>
                                <Label style = {{fontSize: 20}}>Date</Label>
                                <DatePicker
                                    defaultDate = {new Date()}
                                    onDateChange = {(newDate) => {this.setState({spending_date: newDate})}}
                                ></DatePicker>
                            </Item>
                        </Form>
                        <View style = {{flexDirection: 'row', margin: 50}}>
                            <Left>
                                <Button onPress = {() => this.add_Spending()} style = {styles.button}><Text>Add</Text></Button>
                            </Left>
                            <Right>
                                <Button onPress = {() => this.setState({add_spending: false})} style = {styles.button}><Text>Cancel</Text></Button>
                            </Right>
                        </View>
                    </View>
                </Modal>
                <Content contentContainerStyle = {{height: '100%', alignItems: 'center', flex: 1, justifyContent: 'center'}}>
                    <View style = {styles.circle}>
                        <Text style = {{alignContent: 'center', fontFamily: 'notoserif', fontSize: 35,fontWeight: 'bold', color: '#ffffff'}}>{this.state.balance}</Text>
                        <Text style = {{alignContent: 'center', fontFamily: 'notoserif', fontSize: 35,fontWeight: 'bold', color: '#ffffff'}}>VND</Text>
                    </View>
                </Content>
                <View>
                        <Fab active={this.state.active}
                            direction="up"
                            containerStyle={{ }}
                            style={styles.fab}
                            position="bottomRight"
                            onPress = {() => this.setState({active: !this.state.active})} >
                            <Icon name = "plus"></Icon>
                            <Button style = {{backgroundColor: "#23596e", width: 40, height: 40, borderRadius: 20}} onPress = {() => this.setState({add_spending: true})}><Icon name="wallet" color = '#ffffff'/></Button>
                            <Button style = {{backgroundColor: "#23596e", width: 40, height: 40, borderRadius: 20}} onPress = {() => this.setState({add_income: true})}><Icon name = 'money-check-alt' color = "#ffffff"/></Button>
                        </Fab>
                </View>
            </Container>
        )
    }

    onSpendingCategoryChange(value){
        if(value == 0){
            this.setState({
                add_new_category: true,
                new_type: 0
            })
        }
        else{
            this.setState({
                spending_category_selected: value
            })
        }
    }

    async add_new_category(type){
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
        let data = await response.json()
        if(type == 1){
            this.setState({
                income_list_category: data,
                add_new_category: false
            })
            this.onIncomeCategoryChange(data[data.length - 1].idcategory)
        }
        else if (type == 0){
            this.setState({
                spending_list_category: data,
                add_new_category: false
            })
            this.onSpendingCategoryChange(data[data.length - 1].idcategory)
        }
    }

    async onIncomeCategoryChange(value){
        if(value == 0){
            this.setState({
                add_new_category: true,
                new_type: 1
            })
        }
        else
        this.setState({
            income_category_selected: value
        })
    }

    onSpendingTypeChange(value){
        this.setState({
            spending_type_selected: value,
        })
    }

    onIncomeTypeChange(value){
        this.setState({
            income_type_selected: value,
        })
    }

    async add_Income(){
        if(this.state.income_value != 0){
            await fetch('http://10.0.2.2:5000/post/income', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "categoryid": this.state.income_category_selected,
                    "value": this.state.income_value,
                    "date": moment(this.state.income_date).format("YYYY-MM-DD"),
                    "type": this.state.income_type_selected,
                    "userid": 1
                })
            })

            await this.setState({
                balance: parseInt(this.state.balance) + parseInt(this.state.income_value),
                income_value: 0,
                income_date: new Date(),
                income_category_selected: this.state.income_list_category[0].idcategory,
                income_type_selected: 1,
            })
            await fetch('http://10.0.2.2:5000/update/balance', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "value": this.state.balance,
                    "id": 1
                })
            })
            await this.setState({add_income: false})
        }
        else{
            alert('Enter Value')
        }
    }

    async add_Spending(){
        if(this.state.spending_value != 0){
            await fetch('http://10.0.2.2:5000/post/spending', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "categoryid": this.state.spending_category_selected,
                    "value": this.state.spending_value,
                    "date": moment(this.state.spending_date).format("YYYY-MM-DD"),
                    "type": this.state.spending_type_selected,
                    "userid": 1
                })
            })
            
            await this.setState({
                balance: this.state.balance - this.state.spending_value,
                spending_value: 0,
                spending_date: new Date(),
                spending_category_selected: this.state.spending_list_category[0].idcategory,
                spending_type_selected: 1,
            })
            await fetch('http://10.0.2.2:5000/update/balance', {
                method: 'post',
                mode: 'no-cors',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    "value": this.state.balance,
                    "id": 1
                })
            })
            await this.setState({add_spending: false})
            }
        else{
            alert("Enter Value")
        }
    }

    async componentDidMount(){
        let response = await fetch("http://10.0.2.2:5000/get/user/1")
        let data = await response.json();
        this.setState({
            name: data.account,
            balance: data.balance
        })
        let res = await fetch("http://10.0.2.2:5000/get/category/0")
        let cate = await res.json();
        let res2 = await fetch("http://10.0.2.2:5000/get/category/1")
        let cate2 = await res2.json();
        this.setState({
            spending_list_category: cate,
            income_list_category: cate2,
            spending_category_selected: cate[0].idcategory,
            income_category_selected: cate2[0].idcategory
        })
    }
}

const styles = StyleSheet.create({
    circle: {
        width: 250,
        height: 250,
        borderRadius: 250/2,
        backgroundColor: "#23596e",
        justifyContent: 'center',
        alignItems: 'center'
    },
    fab: {
        backgroundColor: '#23596e', 
        width: 60,
        height: 60,
        borderRadius: 30
    },
    centerview: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    modalview:{
        height: 638,
        marginTop: 56,
        marginBottom: 20,
        backgroundColor: "white",
        borderRadius: 20,
        //padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        //justifyContent: "center",
        alignItems: "center"
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
    button: {
        backgroundColor: "#23596e",
        borderRadius: 5
    },
    form: {
        width: 300
    },
    item: {
        height: 60,
        padding: 5
    },
    reactangle: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#23596e"
    }
})
export default Home