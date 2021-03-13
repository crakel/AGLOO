import React, {Component} from 'react';
import {View,ImageBackground,Alert,Text,Modal,Pressable,StyleSheet,ScrollView,TouchableOpacity,SafeAreaView,FlatList,ActivityIndicator} from "react-native";
import axios from 'axios';
import Constants from 'expo-constants'

import { TextInput } from 'react-native-gesture-handler';

export default class ContentScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          dataSource: '',
          inputcomment: '',
          ccomment: '',
          modalVisible: false,
          patchidx: ''
        }
      }

      componentDidMount () {
        const {idx} = this.props.route.params || ''
        return (fetch('http://115.85.183.157:3000/post/free_board/'+idx,{method: 'GET'})
        .then((response) => response.json())
        .then((response) => {
          this.setState({
            dataSource: response, //list 형태
          })
        })
        .catch((error) => {
          console.log(error)
        }),
        fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idx,{method: 'GET'})
        .then((response)=>response.json())
        .then((response) => {
          this.setState({
            ccomment: response
          })
        })
        .catch((error) => {
          console.log(error)
        })
        )
      }

      postcontent() {
        const{inputcomment} = this.state;
        const {user_id} = this.props.route.params
        const {idx} = this.props.route.params
        if(inputcomment == ''){
          alert('댓글을 입력하세요')
        }
        else{
          fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idx,{
            method:'POST',
            headers:{
              'Accept' : 'application/json',
              'Content-Type' : 'application/json'
          },
          body:JSON.stringify({
              id: user_id,
              comment: inputcomment
          }),
        })
        .then((response) => response.json())
        .then((response)=>{
            if(response.success){
              fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idx,{method: 'GET'})
                    .then((response) => response.json())
                    .then((response) => {
                      this.setState({
                        ccomment: response
                      })
                    })
                    .catch((error) => {
                      console.log(error)
                    });
            }else{
                alert(response.msg);
            }
        })
        .catch((error) => {
            console.error(error);
        });
        }
      }
      updateComment = (dx) => {
        const {idx} = this.props.route.params
        const{inputcomment} = this.state;
          if(inputcomment == ''){
            alert('댓글을 입력하세요')
          }
          else{
          fetch('http://115.85.183.157:3000/cmnt/free_comment/'+dx,{
              method: 'PATCH',
              headers:{
                  'Accept' : 'application/json',
                  'Content-Type' : 'application/json'
              },
              body:JSON.stringify({
                comment: inputcomment
              }),
          })
          .then((response) => response.json())
          .then((response)=>{
              if(response.success){
                fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idx,{method: 'GET'})
                .then((response) => response.json())
                .then((response) => {
                  this.setState({
                    ccomment: response
                  })
                })
                .catch((error) => {
                  console.log(error)
                });
              }else{
                  alert(response.msg);
              }
          })
          .catch((error) => {
              console.error(error);
          });
      }
      };
      deleteComments = (idxx) => {
        const {idx} = this.props.route.params
        Alert.alert(
          "댓글을 지우겠습니까?",
          "",
          [
            {
              text: "예",
              onPress: () =>{
                fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idxx,{
                  method:'DELETE',
                }).then((response) => response.json()).then((response) => {
                  if(response.success){
                    fetch('http://115.85.183.157:3000/cmnt/free_comment/'+idx,{method: 'GET'})
                    .then((response) => response.json())
                    .then((response) => {
                      this.setState({
                        ccomment: response
                      })
                    })
                    .catch((error) => {
                      console.log(error)
                    });
                    alert('댓글을 삭제했습니다.')
    
                }
                else{
                  console.log(idx)
                    alert(response.msg);
                }
                })
              }
            },
            {
              text: "아니요",
              style: "cancel"
            }
          ],
          {cancelable: true}
        );
      }
    
      setModalVisible = (visible,idx) => {
        this.setState({ modalVisible: visible ,patchidx: idx});
      }

    render(){
      const {user_id} = this.props.route.params
      const {member} = this.props.route.params
      const { modalVisible } = this.state;
      const rendercomment = ({item}) => (
        <View>
          <View style = {styles.item}> 
            <Text style={{fontWeight:'bold',fontSize:18}}>{item.id}: </Text>
            <Text style={{fontSize:18}}>{item.comment}</Text>
            {((member == 'admin') || (item.id == user_id)) &&  <View style={{flex:1,alignItems:"flex-end" ,justifyContent:"flex-end"}}>
        <View style={{justifyContent:'space-around' ,flexDirection:'row'}}>
              <TouchableOpacity style={styles.bbutton}
      onPress = {()=>this.deleteComments(item.idx)}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>삭제</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.bbutton}
      onPress = {()=>this.setModalVisible(true,item.idx)}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>수정</Text>
      </TouchableOpacity>
      </View>
      </View>}
      </View>
      {item.updated === item.created ? (<Text style={{borderBottomWidth : 1,
      borderBottomColor : "#a7b4c9"}}>생성: {item.created}</Text>) : 
      (<Text style={{borderBottomWidth : 1,
        borderBottomColor : "#a7b4c9"}}>수정: {item.updated}</Text>)}
      </View>
    )
        return (
          <View style={{flex: 1, backgroundColor:"#ebf4f6"}}>
          <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput style={styles.input} placeholder = "수정하기" 
              onChangeText={inputcomment => this.setState({inputcomment})}/>
              
              <View style={{flexDirection:'row',marginTop: 20}}>
              <TouchableOpacity style={styles.bbbutton}
      onPress = {()=>this.updateComment(this.state.patchidx)}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>수정</Text>
      </TouchableOpacity>
      <Text>  </Text>
      <TouchableOpacity style={styles.bbbutton}
      onPress = {()=>this.setModalVisible(!modalVisible)}
      >
      <Text style={{color:'white',fontSize:18,fontWeight: 'bold'}}>취소</Text>
      </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
            <View style={styles.setting}>
            <ImageBackground source={require('../../../../assets/pp.png')} style={styles.background}/>
            <Text style={styles.htitle}>{this.state.dataSource.title}</Text>
        <Text style={styles.user}>작성자: {this.state.dataSource.writer}</Text>
        <View style={{marginTop:10,justifyContent:'space-around'}}>
          <View style={{flexDirection:'column'}}>
        <Text>생성: {this.state.dataSource.created} </Text>
        {this.state.dataSource.updated != this.state.dataSource.created && <Text>수정: {this.state.dataSource.updated}</Text>}
        <Text>조회수: {this.state.dataSource.hit} </Text>
        </View>
        </View>
        </View>
        <Text style={styles.hcontent}>{this.state.dataSource.content}</Text>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginBottom:5}}>
                            <TextInput style={styles.input} placeholder = "댓글" 
                            
                            onChangeText={inputcomment => this.setState({inputcomment})}/>
                           <TouchableOpacity style = {styles.button} onPress = {()=>{this.postcontent()}}>
                       <Text style={styles.buttonText}>작성</Text>
                       </TouchableOpacity>
                       </View>
        {
                        this.state.ccomment.length !== 0 ?
                        (
                        <FlatList data={this.state.ccomment}
                            renderItem = {rendercomment} keyExtractor = {(item,index) => index.toString()}

                        />

                        ) : (
                          <View>
                       <Text style={{fontSize:20,textAlign:'center'}}>댓글이 없습니다</Text>
                        </View>)
                    }
 
        </View>
        )
}
}
const styles = StyleSheet.create({
    setting: {
      paddingTop: Platform.OS === `ios` ? 0 : Constants.statusBarHeight, //statusbar 안겹치게
      borderWidth:2,
      borderColor:'#76b0be', 
      backgroundColor:'#76b0be', 
    },
    background:{
      width: 100,
      height: 100,
      position:'absolute',
      alignSelf:'flex-end',
      bottom: 10,
      right: 15,
      opacity: 0.5
    },
    user: {
        fontSize:20,
        marginTop:20,
        fontWeight: 'bold',
    },
    htitle: {
      textAlign:'center',
        marginTop: 10,
        fontSize: 30,
        fontWeight: 'bold',
        borderColor : "#3A445D",
         backgroundColor: "#3A445D",
         color:'white',
         opacity: 0.8
    },
    hcontent: {
        marginTop:15,
        fontSize:17,
        marginBottom: 40
    },
    input:{
      borderWidth:1,
      borderColor: "black",
      backgroundColor: '#aaced7',
      width: '90%',
      height: 39,
      paddingHorizontal: 20,
      fontSize: 25
    },
    buttonText:{
      fontSize : 23,
      color: 'white'
    },
    button:{
      justifyContent: "center",
      alignItems: "center",
      height:39,
      borderColor : "#3A445D",
    backgroundColor: "#3A445D",
    },
    commentbox:{
      borderColor:'#76b0be', 
      backgroundColor:'#76b0be',
    },
    bbutton:{
      borderWidth: 1,
      borderColor : "#3A445D",
      backgroundColor: "#3A445D",
      opacity:0.7,
      justifyContent: "center",
      alignItems: "center",
    },
    item: {
      flexDirection: "row",
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      width: '100%',
      borderRadius: 20,
      padding: 30,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    bbbutton:{
      justifyContent: "center",
      alignItems: "center",
      width: '30%',
      borderColor : "#3A445D",
    backgroundColor: "#3A445D",
    },
})