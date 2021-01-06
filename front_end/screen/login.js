import {Container, Text,Header, Content, Body, Right, Left, Button, Form, Item, Label, Input, Picker} from 'native-base';
import React, {Component} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import { TextInput } from 'react-native-gesture-handler';

class Login extends Component {
    render(){
        return(
            <Container style = {styles.main}>
                <View style = {{justifyContent: 'center', flexDirection: 'row'}}>
                    <Icon name='won-sign' color='white' size = {30} style={{padding: 10}}></Icon>
                    <Text style = {{fontSize: 25,fontWeight: 'bold', color: '#ffffff'}}>Financial Management App</Text>
                </View>
                <View style = {{justifyContent: 'center'}}>
                    <View style = {{alignContent: 'center', alignItems: 'center'}}>
                        <Text style = {styles.text}>LOGIN</Text>
                    </View>
                    <Form style = {{width: 200}}>
                        <Item>
                            <Label style = {styles.text}>Username</Label>
                            <TextInput style = {{color: 'white', width: 100}}></TextInput>
                        </Item>
                        <Item>
                            <Label style = {styles.text}>Password</Label>
                            <TextInput secureTextEntry = {true} style={{color: 'white', width: 100}} ></TextInput>
                        </Item>
                    </Form>
                </View>
            </Container>
        )
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