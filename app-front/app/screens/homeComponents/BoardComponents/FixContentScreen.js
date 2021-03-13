import React,{Component} from "react";
import {View,Text,Image,TextInput,Keyboard,FlatList,StyleSheet,Button,TouchableOpacity} from "react-native";
import axios from "axios";
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView } from "react-native-gesture-handler";

export default class Write extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: '',
          title: '',
          content: '',
          setSelected: []
        }
      }
      componentDidMount () {
        const {idx} = this.props.route.params
        return fetch('http://115.85.183.157:3000/post/free_board/'+idx,{method: 'GET'})//get http://facebook.github.io/react-native/movies.json
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

    updateBoard = () => {
      const {idx} = this.props.route.params
        if(this.state.title == ''){
            this.setState({alarm:'제목을 입력하세요'})
        }
        else if(this.state.content == ""){
            this.setState({alarm:'내용을 입력하세요'})
        }
        else{
        fetch('http://115.85.183.157:3000/post/free_board/'+idx,{
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
                this.props.navigation.navigate("BoardScreen");
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
                    <Text style={styles.topp}>게시글 수정</Text>
                <View>
                    <Text style={{color:'red',alignSelf: 'center'}}>{this.state.alarm}</Text>
                </View>
                {
                        this.state.setSelected.length ?
                        (<FlatList data={this.state.setSelected} horizontal = {true} 
                            renderItem = {renderImage} keyExtractor = {(item,index) => index.toString()} />
        
                        ) : <Text>사진을 추가하세요!!</Text>
                    }
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
                    onPress = {this.updateBoard}
                    >
                        <Text style = {styles.buttonText}>🖍  수정</Text>
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
        width : '20%',
        alignItems :"center",
        justifyContent: "center",
        flexDirection: "row"
      },
      buttonText: {
        fontSize : 20,
        color:'white',
        textAlign:'center'
      },
      image: {
        width:150,
        height: 150,
        resizeMode: 'contain'
    }
  });