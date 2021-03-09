import React, { Component } from 'react'
import { Text, StyleSheet, View,FlatList } from 'react-native'
import {
    Table,
    TableWrapper,
    Row,
    Rows,
    Col,
  } from "react-native-table-component";
import {FontAwesome} from '@expo/vector-icons'
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

export default class MembersTableScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
          isTableLoading: false,
          tableHead: ["", "월", "화", "수", "목", "금"],
          tableTitle: ["A", "B", "C", "D", "E", "F", "G"],
        //   tableData: [
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //     [null, null, null, null, null],
        //   ],
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
      }

    

    render() {
        for(var i = 0;i<7;i++){
            for(var j = 0;j<5;j++){
                if(this.state.tableData[i][j] == true){
                    this.state.tableData[i][j] = <View style = {{alignItems : 'center', justifyContent : 'center'}}><FontAwesome name = 'check' size = {24}/></View>
                }
            }
        }
        return (
            <View>
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
            </View>
            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    head: { height: 40, backgroundColor: "#ebf4f6" },
  wrapper: { flexDirection: "row" },
  title: { backgroundColor: "#ebf4f6" },
  row: { height: 80 },
  text: { textAlign: "center", fontWeight: "700", fontSize: 15 },
})
