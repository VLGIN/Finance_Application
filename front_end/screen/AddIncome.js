import React, {Component} from 'react';
import {View, Text, Button, FlatList, StyleSheet} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useGestureHandlerRef } from 'react-navigation-stack';

class AddIncome extends Component{
    constructor(props){
        super(props);
        this.state= {
            categoryid: null,
            value: null,
            date: null,
            type: null
        }
    }

    styles = StyleSheet.create({
        text: {
            //flex: 1,
            backgroundColor: "#576e65",
            color: "#ffffff",
            padding: 20,
            fontSize: 20,
            borderBottomWidth: 4,
            borderColor: "#363d24"
        },

        button: {
            width: 185,
            elevation: 8,
            backgroundColor: "#009688",
            borderRadius: 20,
            paddingVertical: 10,
            paddingHorizontal: 12,
            alignSelf: "center"
        },

        textbutton: {
            textAlign: "center",
            fontSize: 20
        }
    })
    
    
    render(){
        return(
            <View>
                <TextInput
                    style = {this.styles.text}
                    onChangeText={(categoryid) => this.setState({categoryid})}
                >Category</TextInput>
                <TextInput
                     style = {this.styles.text}
                    onChangeText={(value) => this.setState({value})}
                >Value</TextInput>
                <TextInput
                    style = {this.styles.text} 
                    onChangeText={(date) => this.setState({date})}
                >Date</TextInput>
                <TextInput
                    style = {this.styles.text} 
                    onChangeText={(type) => this.setState({type})}
                >Type</TextInput>
                <View style={{ justifyContent: 'space-evenly',flexDirection: "row" ,marginLeft:20, marginRight:20}}>
                    <TouchableOpacity style = {this.styles.button} onPress = {() => {this.sendrequest()}}>
                        <Text style = {this.styles.textbutton}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style = {this.styles.button} onPress= {() =>{this.props.navigation.goBack()}}>
                        <Text style = {this.styles.textbutton}>
                            Back
                        </Text>
                    </TouchableOpacity>
                </View>
        
            </View>
        )
    }

    async sendrequest(){
        if(this.state.categoryid == null | this.state.date == null | this.state.type == null | this.state.value == null){
            alert("Form all rows")
        }else{
            try{
                let categoryid = parseInt(this.state.categoryid)
                let value = parseFloat(this.state.value)
                let type = parseInt(this.state.type)
                await fetch('http://10.0.2.2:5000/post/income', {
                    method: 'post',
                    mode: 'no-cors',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },

                    body: JSON.stringify({
                        "categoryid": categoryid,
                        "value": value,
                        "date": this.state.date,
                        "type": type,
                        "userid": 1
                    })
                })
                this.state.categoryid = null;
                this.state.date = null;
                this.state.value = null;
                this.state.type = null;
                alert("Success adding income")
                this.props.navigation.goBack()
            }
            catch(e){
                alert(e);
            }
        }
    }

    async componentDidMount(){
        //load data
    }
}
export default AddIncome