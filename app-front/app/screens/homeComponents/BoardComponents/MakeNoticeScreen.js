import React,{Component} from "react";
import {View,Image,Text,TextInput,Keyboard,StyleSheet,Button,TouchableOpacity,FlatList} from "react-native";
import axios from "axios";
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'
import { ScrollView } from "react-native-gesture-handler";


export default class MakeNoticeScreen extends Component {
    constructor(props){
		super(props)

		this.state={
		title: '',
        content: '',
        image: [], 
        setSelected: []
		}
	}
    
    openImage = async() => {
        let permission = await ImagePicker.requestCameraPermissionsAsync();

        if(permission.granted === false){
            return;
        }
        
        let picker = await ImagePicker.launchImageLibraryAsync()
        
        if(picker.cancelled ===true){
            return;
        }
        const {setSelected} = this.state
        this.setState({setSelected: setSelected.concat(picker.uri)})
        console.log(picker)
    }
    
    postBoard = () => {
        const{title,content} = this.state;
        const user_id = this.props.route.params.user_id

        if(title == ''){
            this.setState({alarm:'제목을 입력하세요'})
        }
        else if(content == ""){
            this.setState({alarm:'내용을 입력하세요'})
        }
        else{
        fetch('http://115.85.183.157:3000/post/1/notice_board',{
            method: 'POST',
            headers:{
                'Accept' : 'application/json',
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                id: user_id,
                title : this.state.title,
                content: this.state.content,
            }),
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.success){
                this.props.navigation.navigate("NoticeBoardScreen");
        
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
        const renderImage = ({item}) => (
            <View>
                <Image source = {{uri:item}} style = {styles.image}></Image>
            </View>
        )
        return(
            <View style={{flex: 1, backgroundColor:"#ebf4f6"}}>
            <ScrollView>
                <View style={styles.setting}>
                    <Text 
                    style={styles.topp}>
                        공지사항 작성</Text>
                <View>
                    <Text style={{color:'red',alignSelf: 'center'}}>{this.state.alarm}</Text>
                </View>
                <View style={styles.writingform}>
                {
                        this.state.setSelected.length ?
                        (<FlatList data={this.state.setSelected} horizontal = {true} 
                            renderItem = {renderImage} keyExtractor = {(item,index) => index.toString()} />
        
                        ) : <Text>사진을 추가하세요!!</Text>
                    }
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
                    onPress = {this.openImage}
                    >
                        <Text style = {styles.buttonText}>🔗  사진</Text>
                    </TouchableOpacity>
                </View>
                </View>
                </ScrollView>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    setting: {
      alignItems :"center",
      paddingTop: Constants.statusBarHeight
    },
    topp: {
        fontSize: 25, 
        borderWidth:2,
        borderColor:'#76b0be', 
        backgroundColor:'#76b0be', 
        width:"100%",
        textAlign: 'center',
        color: 'white',
        fontWeight: "bold",
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
        borderColor : "#3A445D",
        backgroundColor: "#3A445D",
        opacity:0.7,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        width: "100%"
      },
      buttonarea:{
        width : '30%',
        alignItems :"center",
        justifyContent: "center",
        flexDirection: "row"
      },
      buttonText: {
        fontSize : 20,
        color: 'white'
      },
      image: {
          width:150,
          height: 150,
          resizeMode: 'contain'
      }
  });