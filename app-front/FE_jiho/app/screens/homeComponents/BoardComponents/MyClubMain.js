import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";

export default class MyClubMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my_token: "",
      userID: "",
      club_name: "",
      sort: "",
      locate: "",
      time: "",
      phone: "",
      insta: "",
      intro: "",
      img: "",
      isLoading: true,
      modalVisible: false,
      adminIndex: 2,
    };
  }

  async componentDidMount() {
    const club_id = this.props.club_id;

    await AsyncStorage.getItem("user_token").then((value) => {
      if (value) {
        this.setState({ my_token: JSON.parse(value).token });
      }
    });

    await fetch("http://115.85.183.157:3000/auth", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: this.state.my_token,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          this.setState({ userID: response.id });
        } else {
          this.props.navigation.navigate("Login");
          AsyncStorage.clear();
        }
      })
      .catch((error) => {
        //alert("tokenError")
      });

    fetch(
      `http://115.85.183.157:3000/isMember/${club_id}/${this.state.userID}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        //0 : admin(회장) , 1: true(동아리원), 2 : false(가입안한사람)
        if (response.member == "admin") {
          this.setState({ adminIndex: 0 });
        } else if (response.member == true) {
          this.setState({ adminIndex: 1 });
        } else if (response.member == false) {
          this.setState({ adminIndex: 2 });
        }
      })
      .catch((error) => Alert.alert("error"))
      .finally(() => {
        this.setState({ isLoading: false });
      });

    fetch(`http://115.85.183.157:3000/club/${club_id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ club_name: response.club_name });
        this.setState({ img: response.img });
        this.setState({ sort: response.sort });
        this.setState({ locate: response.locate });
        this.setState({ time: response.time });
        this.setState({ phone: response.phone });
        this.setState({ insta: response.insta });
        this.setState({ intro: response.intro });
      })
      .catch((error) => Alert.alert("error"))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  };

  joinClub() {
    if (this.state.adminIndex == 2) {
      fetch("http://115.85.183.157:3000/join", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: this.props.club_id,
          id: this.state.userID,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("가입을 축하드립니다!");
          this.setState({ adminIndex: 1 });
          this.props.navigation.replace("HomeMain");
        })
        .catch((error) => {
          //error
        });
    } else if (this.state.adminIndex == 1) {
      fetch("http://115.85.183.157:3000/unjoin", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          club_id: this.props.club_id,
          id: this.state.userID,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("동아리를 탈퇴했습니다.");
          this.setState({ adminIndex: 2 });

          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "HomeMain" }],
          });
        })
        .catch((error) => {
          //error
        });
    } else if (this.state.adminIndex == 0) {
      fetch(`http://115.85.183.157:3000/club/${this.props.club_id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          Alert.alert("동아리가 폐쇄되었습니다.");
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "HomeMain" }],
          });
          this.props.navigation.reset({
            index: 0,
            routes: [{ name: "SearchMain" }],
          });
        })
        .catch((error) => {
          //error
        });
    }
  }

  render() {
    const { modalVisible } = this.state;
    const adminText = ["동아리폐쇄", "회원탈퇴", "가입신청"];
    return (
      <View style={styles.container}>
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
              <Text style={{ fontSize: 25, fontWeight: "800" }}>
                {this.state.club_name}
              </Text>
              <View style={styles.header}></View>
              <Text style={styles.modalText}>{this.state.intro}</Text>
              <Pressable
                style={[styles.modalbutton, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <AntDesign name="closesquareo" size={30} />
              </Pressable>
            </View>
          </View>
        </Modal>
        <View style={{ flexDirection: "row", backgroundColor: "#ebf4f6" }}>
          <View style={{ marginTop: 40 }}>
            <Image
              source={{ uri: `http://115.85.183.157:3000${this.state.img}` }}
              style={styles.image}
            />
          </View>
          <View
            style={{
              marginTop: 43,
              justifyContent: "space-between",
              marginLeft: 5,
            }}
          >
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <AntDesign name="tago" size={20} style={{ color: "#3e3e3e" }} />
              <Text style={{ fontSize: 22, fontWeight: "700", marginLeft: 7 }}>
                {this.state.sort}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-location-outline"
                size={15}
                style={{ paddingTop: 3 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 7,
                  color: "#3e3e3e",
                }}
              >
                {this.state.locate}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign
                name="clockcircleo"
                size={15}
                style={{ paddingTop: 2 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 7,
                  color: "#3e3e3e",
                }}
              >
                {this.state.time}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="phone" size={15} style={{ paddingTop: 2.5 }} />
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "600",
                  marginLeft: 7,
                  color: "#3e3e3e",
                }}
              >
                {this.state.phone}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <AntDesign name="instagram" size={15} style={{ paddingTop: 5 }} />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginLeft: 7,
                  marginBottom: 5,
                  color: "#3e3e3e",
                }}
              >
                {this.state.insta}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.7,
            shadowRadius: 4,
          }}
        >
          <Text style={styles.text}>{this.state.club_name}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: 10,
            justifyContent: "space-evenly",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.joinClub()}
          >
            <Text style={styles.buttonText}>
              {adminText[this.state.adminIndex]}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.setModalVisible(true)}
          >
            <Text style={styles.buttonText}>동아리소개</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>공지사항</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.props.navigation.navigate("BoardScreen");
              }}
            >
              <Text style={styles.buttonText}>자유게시판</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-evenly" }}
          >
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>사진갤러리</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>활동게시판</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.button} onPress = {()=>this.props.navigation.navigate("clubtablescreen")}>
            <Text style={styles.buttonText}>공강시간표</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#ebf4f6",
  },
  image: {
    borderRadius: 10,
    marginTop: 10,
    marginHorizontal: 10,
    width: 140,
    height: 140,
  },
  text: {
    paddingVertical: 10,
    opacity: 1,
    color: "white",
    fontSize: 40,
    fontWeight: "600",
    textAlign: "center",
    backgroundColor: "#aecbd3",
  },
  button: {
    opacity: 0.7,
    borderColor: "#3A445D",
    backgroundColor: "#3A445D",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    height: 50,
    marginTop: 10,
  },
  buttonText: {
    fontWeight: "700",
    fontSize: 14,
    color: "white",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalbutton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "white",
  },
  modalText: {
    marginBottom: 15,
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
  header: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
    borderBottomWidth: 3.5,
    borderBottomColor: "#3e91b5",
    marginVertical: 5,
    marginHorizontal: 10,
  },
});
