import {Container, Text,Header, Content, Card, Body, Right, Left, Button, Form, Item, Label, Input, Picker, CardItem} from 'native-base';
import React, {Component} from 'react';
import { StyleSheet, View, TextInput, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { TextInput } from 'react-native-gesture-handler';

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username: '',
            password: ''
        }
    }
    render(){
        return(
            <Container>
                <View style = {{justifyContent: 'center',height: '20%', alignItems: 'center', alignContent: 'center'}}>
                    <Icon name = 'accusoft' color= '#23596e' size={30} style = {{padding: 5}}></Icon>
                    <Text style = {{fontFamily: 'Roboto', fontSize: 25,fontWeight: 'bold', color: '#23596e'}}>Financial Management App</Text>
                </View>
                <View style = {styles.main}>
                    <View>
                        <Form style = {{width: 300}}>
                            <Card>
                                <CardItem style = {{backgroundColor: '#23596e'}}>
                                <TextInput
                                value = {this.state.username} 
                                onChangeText = {(text) => this.setState({username: text})}
                                 placeholder={'Username'} placeholderTextColor={"#e1e9f5"} style = {{color: 'white', width: 250}}></TextInput>
                                </CardItem>
                            </Card>
                            <Card>
                            <CardItem style = {{backgroundColor: '#23596e'}}>
                                <TextInput
                                value = {this.state.password} 
                                onChangeText = {(text) => this.setState({password: text})}
                                placeholder={'Password'} placeholderTextColor={"#e1e9f5"} secureTextEntry = {true} style={{color: 'white', width: 250}} ></TextInput>
                            </CardItem>
                            </Card>
                        </Form>
                        <Button style = {{width: 300}} onPress={() => this.login()}>
                            <View style = {{alignContent: 'center', alignItems: 'center',width: 300}}>
                                <Text style={styles.text}>Login</Text>
                            </View>
                        </Button>
                    </View>
                    <View style={{margin: 10}}>
                        <Text style = {styles.text}>OR</Text>
                    </View>
                    <View>
                        <Button style = {{width: 300}} onPress = {() => this.create_new_account()}>
                            <View style = {{alignContent: 'center', alignItems: 'center',width: 300}}>
                                <Text style = {styles.text}>Create new account</Text>
                            </View>
                        </Button>
                    </View>
                </View>
            </Container>
        )
    }

    async create_new_account(){
        this.setState({
            username:  '',
            password: ''
        })
        this.props.navigation.navigate('Create_account')
    }

    async login(){
        if(this.state.username == '' || this.state.password == ''){
            alert('Enter username and password');
        }
        else{ 
            let res = await fetch('http://10.0.2.2:5000/login/' + this.state.username + '/' + this.state.password);
            let data = await res.json();
            if(data.length!=0){
                this.setState({
                    username:  '',
                    password: ''
                })
                this.props.navigation.navigate('main_screen', {userid: data[0].iduser})
            }
            else{
                alert('Wrong username or password');
            }
        }
    }

    async componentDidMount(){
        this.setState({
            username: '',
            password: ''
        })
    }
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#23596e',
        alignContent: 'center',
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    text: {
        fontFamily: 'notoserif', 
        fontSize: 18,
        fontWeight: 'bold', 
        color: '#ffffff'
    }
})

export default Login;