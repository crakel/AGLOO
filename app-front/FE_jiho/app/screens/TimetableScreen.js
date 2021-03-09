import React, { Component, useState } from "react";
import {
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
} from "react-native-table-component";
import AsyncStorage from "@react-native-community/async-storage";
import { Ionicons } from "@expo/vector-icons";

export default class TimetableScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isTableLoading: false,
      tableHead: ["", "월", "화", "수", "목", "금"],
      tableTitle: ["A", "B", "C", "D", "E", "F", "G"],
      tableData: [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
      ],
      modalVisible: false,
      day: "wed",
      class: "c",
      userSub: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    var user_tableData = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];
    fetch(`http://115.85.183.157:3000/time?id=${this.props.userID}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        user_tableData = [
          [response.a0, response.a1, response.a2, response.a3, response.a4],
          [response.b0, response.b1, response.b2, response.b3, response.b4],
          [response.c0, response.c1, response.c2, response.c3, response.c4],
          [response.d0, response.d1, response.d2, response.d3, response.d4],
          [response.e0, response.e1, response.e2, response.e3, response.e4],
          [response.f0, response.f1, response.f2, response.f3, response.f4],
          [response.g0, response.g1, response.g2, response.g3, response.g4],
        ];
        this.setState({ tableData: user_tableData });
        this.setState({ isTableLoading: true });
      })
      .catch((error) => Alert.alert("시간표를 등록하세요 !"))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  addSubject() {
    let i = 0;
    let j = 0;
    this.setState({ userSub: this.state.userSub });
    this.setState({ day: this.state.day });
    this.setState({ class: this.state.class });
    if (this.state.userSub !== "") {
      switch (this.state.day) {
        case "mon":
          i = 0;
          switch (this.state.class) {
            case "a":
              j = 0;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "b":
              j = 1;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "c":
              j = 2;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "d":
              j = 3;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "e":
              j = 4;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "f":
              j = 5;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "g":
              j = 6;
              this.state.tableData[j][i] = this.state.userSub;
              break;
          }
          Alert.alert(`[${this.state.userSub}]과목이 추가되었습니다.`);
          break;
        case "tue":
          i = 1;
          switch (this.state.class) {
            case "a":
              j = 0;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "b":
              j = 1;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "c":
              j = 2;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "d":
              j = 3;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "e":
              j = 4;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "f":
              j = 5;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "g":
              j = 6;
              this.state.tableData[j][i] = this.state.userSub;
              break;
          }
          Alert.alert(`[${this.state.userSub}]과목이 추가되었습니다.`);
          break;
        case "wed":
          i = 2;
          switch (this.state.class) {
            case "a":
              j = 0;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "b":
              j = 1;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "c":
              j = 2;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "d":
              j = 3;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "e":
              j = 4;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "f":
              j = 5;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "g":
              j = 6;
              this.state.tableData[j][i] = this.state.userSub;
              break;
          }
          Alert.alert(`[${this.state.userSub}]과목이 추가되었습니다.`);
          break;
        case "thu":
          i = 3;
          switch (this.state.class) {
            case "a":
              j = 0;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "b":
              j = 1;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "c":
              j = 2;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "d":
              j = 3;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "e":
              j = 4;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "f":
              j = 5;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "g":
              i = 6;
              this.state.tableData[j][i] = this.state.userSub;
              break;
          }
          Alert.alert(`[${this.state.userSub}]과목이 추가되었습니다.`);
          break;
        case "fri":
          i = 4;
          switch (this.state.class) {
            case "a":
              j = 0;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "b":
              j = 1;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "c":
              j = 2;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "d":
              j = 3;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "e":
              j = 4;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "f":
              j = 5;
              this.state.tableData[j][i] = this.state.userSub;
              break;
            case "g":
              j = 6;
              this.state.tableData[j][i] = this.state.userSub;
              break;
          }
          Alert.alert(`[${this.state.userSub}]과목이 추가되었습니다.`);
          break;
      }
    } else if (this.state.userSub === "") {
      switch (this.state.day) {
        case "mon":
          i = 0;
          switch (this.state.class) {
            case "a":
              j = 0;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "b":
              j = 1;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "c":
              j = 2;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "d":
              j = 3;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "e":
              j = 4;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "f":
              j = 5;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "g":
              j = 6;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
          }
          this.state.tableData[j][i] = null;
          break;
        case "tue":
          i = 1;
          switch (this.state.class) {
            case "a":
              j = 0;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "b":
              j = 1;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "c":
              j = 2;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "d":
              j = 3;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "e":
              j = 4;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "f":
              j = 5;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "g":
              j = 6;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
          }
          this.state.tableData[j][i] = null;
          break;
        case "wed":
          i = 2;
          switch (this.state.class) {
            case "a":
              j = 0;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "b":
              j = 1;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "c":
              j = 2;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "d":
              j = 3;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "e":
              j = 4;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "f":
              j = 5;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "g":
              j = 6;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
          }
          this.state.tableData[j][i] = null;
          break;
        case "thu":
          i = 3;
          switch (this.state.class) {
            case "a":
              j = 0;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "b":
              j = 1;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "c":
              j = 2;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "d":
              j = 3;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "e":
              j = 4;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "f":
              j = 5;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "g":
              j = 6;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
          }
          this.state.tableData[j][i] = null;
          break;
        case "fri":
          i = 4;
          switch (this.state.class) {
            case "a":
              j = 0;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "b":
              j = 1;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "c":
              j = 2;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "d":
              j = 3;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "e":
              j = 4;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "f":
              j = 5;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
            case "g":
              j = 6;
              Alert.alert(
                `[${this.state.tableData[j][i]}]과목이 삭제되었습니다.`
              );
              break;
          }
          this.state.tableData[j][i] = null;
          break;
      }
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible }), this.setState({ userSub: "" });
  };

  save = () => {
    if (!this.state.isTableLoading) {
      fetch("http://115.85.183.157:3000/time", {
        method: "POST",
        headers: {
          'Accept' : 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.props.userID,
          a0: this.state.tableData[0][0],
          a1: this.state.tableData[0][1],
          a2: this.state.tableData[0][2],
          a3: this.state.tableData[0][3],
          a4: this.state.tableData[0][4],
          b0: this.state.tableData[1][0],
          b1: this.state.tableData[1][1],
          b2: this.state.tableData[1][2],
          b3: this.state.tableData[1][3],
          b4: this.state.tableData[1][4],
          c0: this.state.tableData[2][0],
          c1: this.state.tableData[2][1],
          c2: this.state.tableData[2][2],
          c3: this.state.tableData[2][3],
          c4: this.state.tableData[2][4],
          d0: this.state.tableData[3][0],
          d1: this.state.tableData[3][1],
          d2: this.state.tableData[3][2],
          d3: this.state.tableData[3][3],
          d4: this.state.tableData[3][4],
          e0: this.state.tableData[4][0],
          e1: this.state.tableData[4][1],
          e2: this.state.tableData[4][2],
          e3: this.state.tableData[4][3],
          e4: this.state.tableData[4][4],
          f0: this.state.tableData[5][0],
          f1: this.state.tableData[5][1],
          f2: this.state.tableData[5][2],
          f3: this.state.tableData[5][3],
          f4: this.state.tableData[5][4],
          g0: this.state.tableData[6][0],
          g1: this.state.tableData[6][1],
          g2: this.state.tableData[6][2],
          g3: this.state.tableData[6][3],
          g4: this.state.tableData[6][4],
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("저장되었습니다.");
          this.setState({ isTableLoading: true });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch("http://115.85.183.157:3000/time", {
        method: "PATCH",
        headers: {
          //'Accept' : 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: this.props.userID,
          a0: this.state.tableData[0][0],
          a1: this.state.tableData[0][1],
          a2: this.state.tableData[0][2],
          a3: this.state.tableData[0][3],
          a4: this.state.tableData[0][4],
          b0: this.state.tableData[1][0],
          b1: this.state.tableData[1][1],
          b2: this.state.tableData[1][2],
          b3: this.state.tableData[1][3],
          b4: this.state.tableData[1][4],
          c0: this.state.tableData[2][0],
          c1: this.state.tableData[2][1],
          c2: this.state.tableData[2][2],
          c3: this.state.tableData[2][3],
          c4: this.state.tableData[2][4],
          d0: this.state.tableData[3][0],
          d1: this.state.tableData[3][1],
          d2: this.state.tableData[3][2],
          d3: this.state.tableData[3][3],
          d4: this.state.tableData[3][4],
          e0: this.state.tableData[4][0],
          e1: this.state.tableData[4][1],
          e2: this.state.tableData[4][2],
          e3: this.state.tableData[4][3],
          e4: this.state.tableData[4][4],
          f0: this.state.tableData[5][0],
          f1: this.state.tableData[5][1],
          f2: this.state.tableData[5][2],
          f3: this.state.tableData[5][3],
          f4: this.state.tableData[5][4],
          g0: this.state.tableData[6][0],
          g1: this.state.tableData[6][1],
          g2: this.state.tableData[6][2],
          g3: this.state.tableData[6][3],
          g4: this.state.tableData[6][4],
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("수정되었습니다.");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  delete = () => {
    const _init_data = [
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
      [null, null, null, null, null],
    ];

    fetch(`http://115.85.183.157:3000/time?id=${this.props.userID}`, {
      method: "DELETE",
      headers: {
        //'Accept' : 'application/json',
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ tableData: _init_data });
        Alert.alert("삭제완료");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const state = this.state;
    const { modalVisible } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={{ uri: null }} style={styles.background}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setModalVisible(!modalVisible);
            }}
          >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
              <View style={styles.centeredView}>
                <View style={styles.section}>
                  <TextInput
                    style={styles.input}
                    placeholder="미입력시 과목 제거"
                    onChangeText={(text) => this.setState({ userSub: text })}
                  />

                  <TouchableOpacity
                    style={styles.plusButton}
                    onPress={() => this.addSubject()}
                  >
                    <Ionicons name="add-circle" size={40} color="#24A6D9" />
                  </TouchableOpacity>
                </View>

                <View style={styles.pickerView}>
                  <Picker
                    selectedValue={this.state.day}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue) =>
                      this.setState({ day: itemValue })
                    }
                  >
                    <Picker.Item label="Monday" value="mon" />
                    <Picker.Item label="Tuesday" value="tue" />
                    <Picker.Item label="Wednesday" value="wed" />
                    <Picker.Item label="Thursday" value="thu" />
                    <Picker.Item label="Friday" value="fri" />
                  </Picker>
                  <Picker
                    selectedValue={this.state.class}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(itemValue) =>
                      this.setState({ class: itemValue })
                    }
                  >
                    <Picker.Item label="A" value="a" />
                    <Picker.Item label="B" value="b" />
                    <Picker.Item label="C" value="c" />
                    <Picker.Item label="D" value="d" />
                    <Picker.Item label="E" value="e" />
                    <Picker.Item label="F" value="f" />
                    <Picker.Item label="G" value="g" />
                  </Picker>
                </View>
                <View style={styles.modalView}>
                  <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => this.setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
          </Modal>
          {this.state.isLoading ? (
            <ActivityIndicator />
          ) : (
            <View>
              <Table borderStyle={{ borderWidth: 0.2 }}>
                <Row
                  data={state.tableHead}
                  flexArr={[1, 2, 2, 2, 2, 2]}
                  style={styles.head}
                  textStyle={styles.text}
                />

                <TableWrapper style={styles.wrapper}>
                  <Col
                    data={state.tableTitle}
                    style={styles.title}
                    textStyle={styles.text}
                  />
                  <Rows
                    data={state.tableData}
                    flexArr={[2, 2, 2, 2, 2]}
                    style={styles.row}
                    textStyle={styles.text}
                  />
                </TableWrapper>
              </Table>
              <View style={styles.addbuttonArea}>
                <TouchableOpacity
                  style={styles.addbutton}
                  onPress={() => this.setModalVisible(true)}
                >
                  <Text style={styles.addbuttonText}>시간표 수정</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.savebutton}
                  onPress={() => this.save()}
                >
                  <Text style={styles.savebuttonText}>저장</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deletebutton}
                  onPress={() => this.delete()}
                >
                  <Text style={styles.deletebuttonText}>삭제</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    paddingTop: 50,
    alignContent: "center",
    backgroundColor: "#fff",
  },
  background: { width: "100%", height: "92%" },
  head: { height: 40, backgroundColor: "#f1f8ff" },
  wrapper: { flexDirection: "row" },
  title: { backgroundColor: "#f6f8fa" },
  row: { height: 80 },
  text: { textAlign: "center", fontWeight: "700", fontSize: 15 },
  centeredView: {
    alignItems: "center",
    height: "50%",
    marginTop: "auto",
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "#24A6D9",
    borderRadius: 6,
    width: "70%",
    height: 50,
    marginTop: 8,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  modalView: {
    margin: 100,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
  },
  section: {
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  plusButton: {},
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#24A6D9",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  pickerView: {
    flexDirection: "row",
  },
  addbuttonArea: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  addbutton: {
    backgroundColor: "#FFFAFA",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "50%",
    height: 50,
    marginTop: 8,
  },
  addbuttonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#708090",
  },
  savebutton: {
    backgroundColor: "#FFFAFA",
    borderColor: "#C0C0C0",
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: 50,
    marginTop: 8,
  },
  savebuttonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "#708090",
  },
  deletebutton: {
    backgroundColor: "#B22222",
    borderColor: "#B22222",

    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    height: 50,
    marginTop: 8,
  },
  deletebuttonText: {
    fontSize: 15,
    fontWeight: "800",
    color: "white",
  },
});
