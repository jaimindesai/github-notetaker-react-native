import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    ActivityIndicatorIOS
    } from 'react-native';

import api from '../Utils/api';
import Dashboard from './Dashboard';


class Main extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            isLoading: false,
            error: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({
            username: event.nativeEvent.text
        });
    }
    handleSubmit(){
        this.setState({
            isLoading:true
        });
        console.log('UserName', this.state.username);
        api.getBio(this.state.username)
        .then((res) => {
                console.log('Inside Name',res);
                this.props.navigator.push({
                    title: res.name || "Select an option",
                    component: Dashboard,
                    passProps: {userInfo: res}
                })
            }
        );
        
    }
    render(){
        const showError = (
            this.state.error ? <Text>{this.state.error}</Text> : <View></View>
        )
        return(
            <View style={Styles.mainContainer}>
                <Text style={Styles.title}> Search for a Github User </Text>
                <TextInput 
                    style={Styles.searchInput}
                    value={this.state.username}
                    onChange={this.handleChange} />
                <TouchableHighlight 
                  style={Styles.button}
                  onPress={this.handleSubmit}
                  underlayColor='white'>
                   <Text style={Styles.button}>Search </Text>
                </TouchableHighlight>
                {showError}
               
            </View>
        )
    }
};

const Styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        padding: 30,
        marginTop:65,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#4BBBEC'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign:'center',
        color:'#fff'
    },
    searchInput: {
        height:50,
        padding: 4,
        marginRight: 5,
        fontSize: 23,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius:8,
        color:'white'
    },
    button:{
        flexDirection: 'row',
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
       
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

export default Main;