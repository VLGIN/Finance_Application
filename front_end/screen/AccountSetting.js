import React, {Component} from 'react';
import {View, Text, Button, FlatList, SectionList, StyleSheet} from 'react-native';

class AccountSetting extends Component{
    constructor(props){
        super(props);
        this.state = {
            monthly: [],
            not_monthly: [],
            data : [{title: "Dinh ki", data: []},
                    {title: "Bat thuong", data: []}]
        }
    }
    
    render(){
        return(
            <View>
                <SectionList
                sections = {this.state.data}
                keyExtractor = {(item, index) => item.idincome + index}
                renderItem={({ item }) => <Item title={item.idincome} />}
                renderSectionHeader={({ section: { title } }) => (
                    <Text>{title}</Text>
                  )}
                >
                    
                </SectionList>
            </View>
        )
    }

    async componentDidMount(){
        let response = await fetch('http://10.0.2.2:5000/get/income')
        let res = await response.json()
        var i;
        for (i = 0; i<res.length; i++){
            if(res[i].type == 1){
                this.state.monthly.push(res[i])
            }
            else{
                this.state.not_monthly.push(res[i])
            }
        }
        this.state.data[0].data = this.state.monthly
        this.state.data[1].data = this.state.not_monthly
        console.log(this.state.data[0].data)
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 16
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  
export default AccountSetting