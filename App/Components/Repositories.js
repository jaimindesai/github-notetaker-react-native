import React, {Component,PropTypes} from 'react';
import {View,Text,ScrollView,StyleSheet,TouchableHighlight} from "react-native";
import Badge from "./Badge";
import Separator from './helper/Separator';

export default class Repositories extends React.Component{

    render(){
        const {repos} = this.props;

        const list = repos.map((item,index) => {
            const desc = repos[index].description ? <Text style={styles.description}>{repos[index.description]} </Text>: <View />;
            return (
                <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
             
              underlayColor='transparent'>
              <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}> Stars: {repos[index].stargazers_count} </Text>
            {desc}
          </View>
          <Separator />
        </View>

            )
        })

        return(
            <ScrollView style={styles.container}>
            <Badge userInfo={this.props.userInfo} />
            {list}
            </ScrollView>
        )
    }


};


const styles = StyleSheet.create({
     container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});


