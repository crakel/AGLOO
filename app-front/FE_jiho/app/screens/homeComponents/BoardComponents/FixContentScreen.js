import React,{Component} from "react";
import {View,Text,TextInput,Keyboard,StyleSheet,Button,TouchableOpacity} from "react-native";
import axios from "axios";
import Constants from 'expo-constants'

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: '',
          title: '',
          content: '',
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

    postBoard = () => {

        if(this.state.title == ''){
            this.setState({alarm:'제목을 입력하세요'})
        }
        else if(this.state.content == ""){
            this.setState({alarm:'내용을 입력하세요'})
        }
        else{
        fetch('',{
            method: 'PATCH',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                title : this.state.title,
                content: this.state.content
            }),
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.success){
                this.props.navigation.navigate("ClubNoticeBoard");
            }else{
                alert(response.msg);
            }
        })
        .catch((error) => {
            console.error(error);
        });
    }
        Keyboard.dismiss();
    };

    render() {
        return(
                <View style={styles.setting}>
                    <Text style={{fontSize: 25, marginTop: 10,marginBottom:5,borderBottomWidth:2,width:"100%",textAlign: 'center'}}>게시글 수정</Text>
                <View>
                    <Text style={{color:'red',alignSelf: 'center'}}>{this.state.alarm}</Text>
                </View>
                <View style={styles.writingform}>
                    <TextInput style={styles.input} defaultValue={this.state.dataSource.title}
                    onChangeText={title => this.setState({title})}/>
                    <TextInput style={styles.contentinput} defaultValue={this.state.dataSource.content}
                    multiline = {true} 
                    blurOnSubmit={true}
                    onChangeText={content => this.setState({content})}/>
                </View>
                <View style={styles.buttonarea}>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {this.postBoard}
                    >
                        <Text style = {styles.buttonText}>🖍  수정</Text>
                    </TouchableOpacity>
                </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    setting: {
      alignItems :"center",
      paddingTop: Constants.statusBarHeight
    },
    writingform: {
        width: '100%',
        alignItems: "center"
    },
    input:{
        borderWidth: 2,
        borderColor: "#484a49",
        borderRadius: 6,
        width: '100%',
        height: 50,
        marginTop: 8,
        paddingHorizontal: 20,
        fontSize: 25
      },
      contentinput:{
        borderWidth: 2,
        borderColor: "#484a49",
        borderRadius: 6,
        width: '100%',
        height: 400,
        marginTop: 8,
        paddingHorizontal: 20,
        fontSize: 20,
        textAlignVertical: 'top'
      },
      button:{
        borderWidth: 2,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: "100%"
      },
      buttonarea:{
        width : '20%',
        alignItems :"center",
        justifyContent: "center",
      },
      buttonText: {
        fontSize : 20,
      }
  });