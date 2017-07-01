import React, {Component} from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableHighlight
} from 'react-native';
import Profile from './Profile';
import Repositories from './Repositories';
import api from '../Utils/api';
import Notes from './Notes';

export default class Dashboard extends React.Component{

 makeBackGround(btn){
     var obj = {
         flexDirection: 'row',
         alignSelf: 'stretch',
         justifyContent: 'center',
         flex: 1
    }

    if (btn === 0) {
        obj.backgroundColor = '#48BBCE'
    } else if (btn === 1) {
        obj.backgroundColor = '#E77AAE'
    } else {
        obj.backgroundColor = '#758BF4' 
    }
  return obj;
 }

 goToProfile(){
    this.props.navigator.push({
      component: Profile,
      title: 'Profile Page',
      passProps: {userInfo: this.props.userInfo}
    })
  }

 
     goToRepos(){
    api.getRepos(this.props.userInfo.login)
      .then((jsonRes) => {
        this.props.navigator.push({
          component: Repositories,
          title: "Repositories Page",
          passProps: {
            repos: jsonRes,
            userInfo: this.props.userInfo
          }
        });
      })
  }
 

 goToNotes(){
    api.getNotes(this.props.userInfo.login)
      .then((jsonRes) => {
        jsonRes = jsonRes || {};
        this.props.navigator.push({
          component: Notes,
          title: 'Notes',
          passProps: {
            notes: jsonRes,
            userInfo: this.props.userInfo
          }
        });
      });
  }
 
 render(){
     return(
        <View style={styles.container}>
        <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
       <TouchableHighlight 
                  style={this.makeBackGround(0)}
                  onPress={this.goToProfile.bind(this)}
                  underlayColor='#88D4F5'>
                   <Text style={styles.buttonText}> View Profile </Text>
                </TouchableHighlight>
        <TouchableHighlight 
                   style={this.makeBackGround(1)}
                  onPress={this.goToRepos.bind(this)}
                  underlayColor='#88D4F5'>
                   <Text style={styles.buttonText}> View Repos</Text>
                </TouchableHighlight>
        <TouchableHighlight
            style={this.makeBackGround(2)}
            onPress={this.goToNotes.bind(this)}
            underlayColor="#9BAAF3">
              <Text style={styles.buttonText}>Take Notes</Text>
        </TouchableHighlight>
        </View>
     )
  }

}

const styles =  StyleSheet.create({
    container: {
        marginTop: 65,
        flex: 1
    },
    image:{
        height : 350
    },
    buttonText: {
        fontSize: 24,
        color: 'white',
        alignSelf: 'center'
    }
});
