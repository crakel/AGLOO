import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList } from 'react-native'
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
  } from "react-native-table-component";
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default class MembersTableScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          isTableLoading: false,
          tableHead: ["", "월", "화", "수", "목", "금"],
          tableTitle: ["A", "B", "C", "D", "E", "F", "G"],
          name_list : [],
        tableData: [
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
                [null, null, null, null, null],
              ],
        };
      }
      componentDidMount(){
          this.setState({
              tableData : this.props.route.params.tableData
          })
          this.setState({
            name_list : this.props.route.params.name_list
          })
      }

    

    render() {
        for(var i = 0;i<7;i++){
            for(var j = 0;j<5;j++){
                if(this.state.tableData[i][j] == true){
                    this.state.tableData[i][j] = <View style = {{alignItems : 'center', justifyContent : 'center'}}><FontAwesome name = 'check' size = {24} color = 'grey'/></View>
                }
            }
        }
        return (
            <View style = {{flex : 1,backgroundColor : '#fff'}}>
            <View style = {{marginTop : 40}}>
                <Table borderStyle={{ borderWidth: 0.2 }}>
                <Row
                  data={this.state.tableHead}
                  flexArr={[1, 2, 2, 2, 2, 2]}
                  style={styles.head}
                  textStyle={styles.text}
                />

                <TableWrapper style={styles.wrapper}>
                  <Col
                    data={this.state.tableTitle}
                    style={styles.title}
                    textStyle={styles.text}
                  />
                  <Rows
                    data={this.state.tableData}
                    flexArr={[2, 2, 2, 2, 2]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
              <View>
                <View style = {{justifyContent : 'center', alignItems : 'center', marginTop : 14}}>
                  <Text style = {{fontSize : 20, fontWeight : '700'}}>
                    공강시간표 멤버
                  </Text>
                </View>
                <View style = {{flex: 1,
                borderBottomColor : "#32606b",
                paddingTop : 10,
              alignSelf: "stretch",
              justifyContent: "flex-end",
              marginHorizontal : 100,
              borderBottomWidth: 2}}>
                
              </View>
              <View style = {{flexDirection : 'row', marginTop : 10, marginLeft :10, marginBottom : 20}}>
              <View><Ionicons name = 'people' size = {33} color = 'black'/></View>
              <View>
                <FlatList
                      data={this.state.name_list}
                      keyExtractor={(item, index) => index.toString()}
                      horizontal = {true}
                      showsHorizontalScrollIndicator = {false}
                      renderItem={({item}) => <View style = {{marginLeft : 15, marginTop : 6, justifyContent : 'center', alignItems : 'center'}}><Text style = {{fontSize : 20, fontWeight : '500', color : 'black'}}>{item}</Text></View>}
                    />
              </View>
              </View>
              </View>
            </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: "#ebf4f6" },
  wrapper: { flexDirection: "row", backgroundColor : '#fff' },
  title: { backgroundColor: "#ebf4f6" },
  row: { height: 80 },
  text: { textAlign: "center", fontWeight: "700", fontSize: 15 },
})
