import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native';
import { ThemeColors } from 'react-navigation';


export default class register extends Component {

    constructor(props){
		super(props)
		this.state={
			userId:'',
      userName:'',
			userPassword:'',
      userPasswordConfirm:'',
      st_Id:'',
      major:''
		}
	}

    signUp = () =>{
    const {userId,userName,userPassword,userPasswordConfirm} = this.state;

    if(userId==""){
    this.setState({id:'Please enter ID'})
    }
    else if(userPassword==""){
    this.setState({id:'Please enter password'})
    }
    else if(userName==""){
    this.setState({id:'Please enter your name'})
    }
    else if(userPassword != userPasswordConfirm){
    this.setState({id:'Enter same passwords'})
    }
    else{
    fetch('http://115.85.183.157:3000/register',{
        method:'POST',
        headers:{
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id : this.state.userId,
            name : this.state.userName,
            pw : this.state.userPassword,
            st_id : this.state.st_Id,
            major : this.state.major
        }),
    })
    .then((response) => response.json())
    .then((response)=>{
        if(response.success){
            this.props.navigation.navigate("Login");
        }else{
            alert(response.msg);
        }
    })
    .catch((error)=>{
    console.error(error);
    });
    }


    Keyboard.dismiss();
    }

  render(){
    return (
      
      <KeyboardAvoidingView style = {styles.container} behavior = "padding">
          
          <View>
          <Text style={{padding:10,margin:10,color:'red',alignSelf: 'center'}}>{this.state.id}</Text>
          </View>
          <View style = {styles.inputForm}>
          <TextInput style = {styles.input} placeholder = "아이디" onChangeText={userId => this.setState({userId})} /> 
          <TextInput style = {styles.input} placeholder = "이름" onChangeText={userName => this.setState({userName})} />
          <TextInput secureTextEntry={false} style = {styles.input} placeholder = "비밀번호" onChangeText={userPassword => this.setState({userPassword})} />
          <TextInput secureTextEntry={false} style = {styles.input} placeholder = "비밀번호 확인" onChangeText={userPasswordConfirm => this.setState({userPasswordConfirm})} /> 
          <TextInput style = {styles.input} placeholder = "학번" onChangeText={st_Id => this.setState({st_Id})} /> 
          <TextInput style = {styles.input} placeholder = "학과" onChangeText={major => this.setState({major})} />  
            </View>
          <View style = {styles.buttonArea}>
          <TouchableOpacity
            style ={styles.button}
            onPress = {this.signUp}
            >
            <Text style = {styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          </View>
          
        
      </KeyboardAvoidingView>
    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76B0BE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputForm:{
    width: '100%',
    alignItems: "center"
  },
  input: {
    borderWidth: 2,
    borderColor: "#3A445D",
    backgroundColor: "white",
    opacity: 0.9,
    borderRadius: 6,
    width: "70%",
    height: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    fontSize: 18,
},
  buttonArea:{
    width : '100%',
    alignItems :"center"
  },
  button: {
    opacity: 0.9,
    borderWidth: 2,
    borderColor: "#3A445D",
    backgroundColor: "#3A445D",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: 50,
    marginTop: 8,
},
buttonText: {
    fontWeight: "700",
    fontSize: 17,
    color: "white",
},
});
