import React, { Component } from 'react'
import { Text, StyleSheet, View, FlatList, TouchableOpacity } from 'react-native'
import {Ionicons, AntDesign} from "@expo/vector-icons";


export default class ClubTableScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            list : [],
            name_list : [],
            data : [],
            tableData: [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
              ],
        }
    }

    componentDidMount(){
        fetch(`http://115.85.183.157:3000/club/${this.props.club_id}/member`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then(response => {response.map(item=>{
          item.isSelect = false;
             return item
      });
        this.setState({data : response})
      })
      .catch((error) => Alert.alert("error"))
      .finally(() => {
        //this.setState({ isLoading: false });
      });
  };

    saveClubTable(){
        
    fetch("http://115.85.183.157:3000/clubtime", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
       id : this.state.list
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        this.state.tableData = [
            [response.a0, response.a1, response.a2, response.a3, response.a4],
            [response.b0, response.b1, response.b2, response.b3, response.b4],
            [response.c0, response.c1, response.c2, response.c3, response.c4],
            [response.d0, response.d1, response.d2, response.d3, response.d4],
            [response.e0, response.e1, response.e2, response.e3, response.e4],
            [response.f0, response.f1, response.f2, response.f3, response.f4],
            [response.g0, response.g1, response.g2, response.g3, response.g4],
          ];
        this.props.navigation.navigate('Memberstablescreen',{tableData:this.state.tableData,name_list:this.state.name_list})
        
      })
      .catch((error) => {
        //alert
      });
    }


    checkMember = (item,index) =>{
        item.isSelect = !item.isSelect
        if(!this.state.list.includes(item.id)){
        this.state.list.push(item.id)
        this.state.name_list.push(item.name)
        }
        else{
            this.state.list = this.state.list.filter((Element)=>Element !== item.id)
            this.state.name_list = this.state.name_list.filter((Element)=>Element !== item.name)
        }
        this.setState({item:item})
        
    }



    renderItem=(item,index)=>{
        return(
        <TouchableOpacity
            onPress={() =>this.checkMember(item,index)}
        >
        <View style = {styles.memberList}>
        <View>
        <Text style = {{fontSize : 14, fontWeight : '700'}}>{item.name}</Text>
        <View style = {{flexDirection : 'row', marginTop : 4}}>
        <Text style = {{fontSize : 12, fontWeight : '500', color : 'grey'}}>{item.st_id}</Text>
        <Text style = {{marginLeft : 10, paddingTop : 3, fontSize : 12, fontWeight : '500', color : 'grey'}}>{item.major}</Text>
        </View>
        </View>
        <View style = {{position : 'absolute', marginLeft : 270, marginTop : 24}}>
        <Ionicons name = {item.isSelect? "ios-square" : 'ios-square-outline' } size = {24} color = "grey" />
        </View>
        </View>
        </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style = {{flex : 1}}>
            <View style ={{flex : 1, backgroundColor : "#aaced7", borderBottomLeftRadius : 40, borderBottomRightRadius : 40}}>
                <Text style={{
                            marginTop: 60,
                            marginLeft: 25,
                            color: "white",
                            fontSize: 30,
                            fontWeight: "800",
                        }}>공강시간표</Text>
                    
            </View>
            <View style = {{flex : 2, backgroundColor : '#ebf4f6', justifyContent : 'center', alignItems : 'center'}}>
            <View style = {{flex : 0.8,width :"90%",backgroundColor : 'white', marginTop : -180, borderRadius : 20}}>
            <FlatList
                  data={this.state.data}
                  keyExtractor={(item) => item.id.toString()}
                  horizontal={false}
                  showsVerticalScrollIndicator = {false}
                  renderItem={({item,index}) => this.renderItem(item,index)}
                  keyboardShouldPersistTaps="always"
                />


            </View>
            <View style = {{marginBottom : -40, marginTop : 20}}>
            <TouchableOpacity onPress = {()=>this.saveClubTable()} style = {{borderWidth : 2, borderColor : 'grey', borderRadius : 10, backgroundColor : "#fff"}}>
                    <View style = {{padding : 5}}>
                <Text style = {{fontWeight : '700', fontSize :10, color : 'grey'}}>시간표 만들기</Text>
                <View style = {{justifyContent : 'center', alignItems : 'center'}}>
                        <AntDesign name = 'table' size = {30} color = 'grey'/>
                </View>
                </View>
            </TouchableOpacity>           
            </View>            
            </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    memberList: {
        flexDirection : 'row',
        borderRadius : 10,
        borderWidth : 2,
        borderColor : "grey",
        backgroundColor: '#fff',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
      },
})
