import React, {Component} from 'react';
import {View,Alert,Text,Button,StyleSheet,ScrollView,TouchableOpacity,SafeAreaView,FlatList,ActivityIndicator} from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'

export default class ContentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: ''
        }
      }
      componentDidMount () {
        const {idx} = this.props.route.params || ''
        return fetch('http://115.85.183.157:3000/read/free_board/'+idx,{method: 'GET'})//get http://facebook.github.io/react-native/movies.json
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            dataSource: response, //list 형태
          })
        })
        .catch((error) => {
          console.log(error)
        });
      }
    render(){
        return (
            <View style={styles.setting}>
        <Text style={styles.user}>작성자: {this.state.dataSource.writer}</Text>
        <View style={{marginTop:10,justifyContent:'space-around'}}>
        <Text>{this.state.dataSource.updated} 조회수: {this.state.dataSource.hit} </Text>
        </View>
        <Text style={styles.htitle}>제목: {this.state.dataSource.title}</Text>
        <Text style={styles.hcontent}>{this.state.dataSource.content}</Text>
        </View>
        )
}
}
const styles = StyleSheet.create({
    setting: {
      paddingTop: Constants.statusBarHeight, //statusbar 안겹치게
    },
    user: {
        fontSize:20,
        marginTop:20,
    },
    htitle: {
        marginTop: 10,
        fontSize: 25,
        fontWeight: 'bold',
        borderBottomWidth: 1
    },
    hcontent: {
        marginTop:15,
        fontSize:17
    }
})