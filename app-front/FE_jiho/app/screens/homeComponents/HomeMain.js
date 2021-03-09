import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Category from "./Category";
import AsyncStorage from "@react-native-community/async-storage";

export default class HomeMain extends Component {
  UNSAFE_componentWillMount() {
    this.starHeaderHeight = 80;
    if (Platform.OS == "android") {
      this.starHeaderHeight = 100 + StatusBar.currentHeight;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      my_token: "",
      userID: "",
      user_name : "",
      data: [],
    };
  }

  async componentDidMount() {
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
          this.setState({user_name : response.name})
        } else {
          this.props.navigation.navigate("Login");
          AsyncStorage.clear();
        }
      })
      .catch((error) => {
        //alert("error")
      });

    fetch(`http://115.85.183.157:3000/myclub/${this.state.userID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        this.setState({ data: response });
      })
      .catch((error) => Alert.alert("error"))
      .finally(() => {
        //this.setState({ isLoading : false });
      });
  }

  render() {
    const { data } = this.state;
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#aaced7" }}>
        <View style={{ flex: 1, backgroundColor: "#aaced7" }}>
          <View
            style={{
              height: this.starHeaderHeight,
              backgroundColor: "#aaced7",
              borderBottomWidth: 1,
              borderBottomColor: "#dddddd",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                padding: 10,
                backgroundColor: "white",
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: "#000",
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS == "android" ? 30 : null,
              }}
            >
              <Icon name="ios-search" size={20} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder=" 동아리를 검색하세요"
                placeholderTextColor="grey"
                style={{
                  flex: 1,
                  fontWeight: "700",
                  backgroundColor: "white",
                  borderRadius: 5,
                }}
              />
            </View>
          </View>
          <ScrollView scrollEventThrottle={16}>
            <View
              style={{ flex: 1, backgroundColor: "#7dacb7e", paddingTop: 20 }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "700",
                  paddingHorizontal: 20,
                  color : '#fff'
                }}
              >
                {`${this.state.user_name}님의 동아리`}
              </Text>

              <View
                style={{
                  height: 280,
                  marginTop: 20,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.7,
                  shadowRadius: 4,
                }}
              >
                <FlatList
                  data={data}
                  keyExtractor={(item) => item.club_id.toString()}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate("MyClub", {
                          id: item.club_id,
                        })
                      }
                    >
                      <Category
                        imageUri={{
                          uri: `http://115.85.183.157:3000${item.img}`,
                        }}
                        name={item.club_name}
                      />
                    </TouchableOpacity>
                  )}
                  keyboardShouldPersistTaps="always"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
