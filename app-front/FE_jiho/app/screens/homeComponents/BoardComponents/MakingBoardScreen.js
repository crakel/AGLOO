import React,{Component} from "react";
import {View,Image,Text,TextInput,Keyboard,StyleSheet,Button,TouchableOpacity} from "react-native";
import axios from "axios";
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export default class Write extends Component {
    state = {
        title: '',
        content: '',
        image: []
    };
    askForPermission = async () => {
        const permissionResult = 
        await Permissions.askAsync(Permissions.CAMERA)
        if(permissionResult.status !== 'granted'){
            Alert.alert('no permissions to access camera!',
            [{text:'ok'}])
            return false
        }
        return true
    }
    takeImage = async () => {
		// make sure that we have the permission
		const hasPermission = await this.askForPermission()
		if (!hasPermission) {
			return
		} else {
			// launch the camera with the following settings
			let image = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images,
				allowsEditing: true,
				aspect: [3, 3],
				quality: 1,
				base64: true,
                
			})
            this.state.image.push(image.base64)
			return image
		}
        
	}
    postBoard = () => {
        const{title,content} = this.state;

        if(title == ''){
            this.setState({alarm:'제목을 입력하세요'})
        }
        else if(content == ""){
            this.setState({alarm:'내용을 입력하세요'})
        }
        else{
        fetch('',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                title : this.state.title,
                content: this.state.content,
                image: this.state.image
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
        // const post = await axios.post('',{
        //     title,
        //     content,
        // });
        Keyboard.dismiss();
        // this.setState({
        //     title: '',
        //     content: '',
        // });
        //console.log(post);
    };
    // handleChange = (e) => {
    //     const {name,value} = e.target;
    //     this.setState({
    //         [name]: value,
    //     });
    // };
    render() {
        
        return(
                <View style={styles.setting}>
                    <Text style={{fontSize: 25, marginTop: 10,marginBottom:5,borderBottomWidth:2,width:"100%",textAlign: 'center'}}>게시글 작성</Text>
                <View>
                    <Text style={{color:'red',alignSelf: 'center'}}>{this.state.alarm}</Text>
                </View>
                <View style={styles.writingform}>
                    <TextInput style={styles.input} 
                    placeholder = "제목" 
                    onChangeText={title => this.setState({title})}/>

                    <TextInput style={styles.contentinput} 
                    placeholder = {"\n * 부적절한 용어 사용시 이용 제한 ! *" }
                    multiline = {true} 
                    blurOnSubmit={true}
                    onChangeText={content => this.setState({content})}
                    />
                </View>
                <View style={styles.buttonarea}>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {this.postBoard}
                    >
                        <Text style = {styles.buttonText}>🖍  작성</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style = {styles.button}
                    onPress = {()=>this.takeImage()}
                    >
                        <Text style = {styles.buttonText}>🔗  사진</Text>
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
        flexDirection: "row"
      },
      buttonText: {
        fontSize : 20,
      }
  });