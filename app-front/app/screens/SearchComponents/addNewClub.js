import React, { Component, useState, useEffect } from "react";
import {
    Text,
    StyleSheet,
    View,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    Image,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-community/async-storage";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default class addNewClub extends Component {
    constructor(props) {
        super(props);
        this.state = {
            my_token: "",
            userID: "",
            img: null,
            club_name: null,
            depart: "1",
            sort: null,
            locate: null,
            time: null,
            phone: null,
            insta: null,
            intro: null,
            memo: null,
            setSelected: "",
        };
    }

    async componentDidMount() {
        await AsyncStorage.getItem("user_token").then((value) => {
            if (value) {
                this.setState({ my_token: JSON.parse(value).token });
            }
        });

        fetch("http://115.85.183.157:3000/auth", {
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
    }

    changeDepart(item) {
        this.setState({
            depart: item.value,
        });
    }
    saveTest() {
        fetch("http://115.85.183.157:3000/creator", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: this.state.userID,
                club_name: this.state.club_name,
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                Alert.alert("저장되었습니다.");
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
                console.error(error);
            });
    }

    saveClub() {
        const data = new FormData();
        if(this.state.img != null){
        let localUri = this.state.img.uri;
        let filename = localUri.split("/").pop();
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        data.append("img", {
            uri: localUri,
            name: filename,
            type,
        });}
        data.append("club_name", this.state.club_name);
        data.append("depart", this.state.depart);
        data.append("sort", this.state.sort);
        data.append("locate", this.state.locate);
        data.append("time", this.state.time);
        data.append("phone", this.state.phone);
        data.append("insta", this.state.insta);
        data.append("intro", this.state.intro);
        data.append("memo", this.state.memo);

        fetch("http://115.85.183.157:3000/club", {
            method: "POST",
            body: data,
            headers: {
                "content-type": "multipart/form-data",
            },
        })
            .then((response) => response.json())
            .then((response) => {
                fetch("http://115.85.183.157:3000/creator", {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id: this.state.userID,
                        club_name: this.state.club_name,
                    }),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        Alert.alert("저장되었습니다.");
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
                        console.error(error);
                    });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            this.setState({ img: result });
        }
    };

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#aaced7" }}>
                <View style={{ flex: 1, backgroundColor: "#aaced7" }}>
                    <Text
                        style={{
                            marginTop: 10,
                            marginLeft: 25,
                            color: "white",
                            fontSize: 30,
                            fontWeight: "800",
                        }}
                    >
                        동아리 생성
                    </Text>
                </View>

                <View
                    style={{
                        flex: 2,
                        backgroundColor: "#ebf4f6",
                        borderTopRightRadius: 40,
                        borderTopLeftRadius: 40,
                    }}
                ></View>

                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <View
                        style={{
                            flex: 0.8,
                            width: "90%",
                            marginTop: -700,
                            backgroundColor: "white",
                            borderRadius: 20,
                        }}
                    >
                        <KeyboardAvoidingView
                            style={{
                                flex: 1,
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                            behavior="padding"
                            enabled
                            keyboardVerticalOffset={180}
                        >
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <View
                                    style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 20,
                                    }}
                                >
                                    <View
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderWidth: 3,
                                            borderRadius: 20,
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={this.pickImage}
                                        >
                                            <Image
                                                source={{
                                                    uri: this.state.img
                                                        ? this.state.img.uri
                                                        : "https://i.imgur.com/Mss2HGx.png",
                                                }}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    borderColor: "#aaced7",
                                                    borderWidth: 3,
                                                    borderRadius: 20,
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        동아리명
                                    </Text>
                                    <View style={{ marginLeft: 10 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)아주축구단"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(club_name) =>
                                                this.setState({ club_name })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 20,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                            paddingTop: 12,
                                            paddingLeft: 12,
                                        }}
                                    >
                                        분과
                                    </Text>
                                </View>
                                <DropDownPicker
                                    items={[
                                        { label: "체육", value: "1" },
                                        { label: "연행예술", value: "2" },
                                        { label: "사회활동", value: "3" },
                                        { label: "레저스포츠", value: "4" },
                                        { label: "과학기술", value: "5" },
                                        { label: "학술언론", value: "6" },
                                        { label: "창작전시", value: "7" },
                                        { label: "종교", value: "8" },
                                    ]}
                                    defaultValue={"1"}
                                    containerStyle={{
                                        position: "absolute",
                                        marginLeft: 100,
                                        marginTop: 192,
                                        height: 40,
                                        width: 140,
                                    }}
                                    dropDownStyle={{ backgroundColor: "#fff" }}
                                    onChangeItem={(item) =>
                                        this.changeDepart(item)
                                    }
                                />

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 28,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        oo동아리
                                    </Text>
                                    <View style={{ marginLeft: 5 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)축구동아리"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(sort) =>
                                                this.setState({ sort })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                            paddingLeft: 8,
                                        }}
                                    >
                                        위치
                                    </Text>
                                    <View style={{ marginLeft: 40 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)구학생회관101동101호"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(locate) =>
                                                this.setState({ locate })
                                            }
                                        />
                                        <View style={[styles.header]} />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        모임시간
                                    </Text>
                                    <View style={{ marginLeft: 10 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)월요일,수요일 18:30"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(time) =>
                                                this.setState({ time })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        전화번호
                                    </Text>
                                    <View style={{ marginLeft: 10 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)010-1234-5678"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(phone) =>
                                                this.setState({ phone })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>

                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        인스타그램
                                    </Text>
                                    <View style={{ marginLeft: 0 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)@ajou_abc"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(insta) =>
                                                this.setState({ insta })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                        }}
                                    >
                                        동아리소개
                                    </Text>
                                    <View>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="소개글을 작성해주세요"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(intro) =>
                                                this.setState({ intro })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        marginTop: 25,
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 10,
                                            fontSize: 20,
                                            fontWeight: "700",
                                            color: "#3f7886",
                                            paddingLeft: 9,
                                        }}
                                    >
                                        메모
                                    </Text>
                                    <View style={{ marginLeft: 42 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            placeholder="ex)상시모집"
                                            placeholderTextColor="grey"
                                            style={{
                                                fontSize: 15,
                                                marginLeft: 10,
                                                fontWeight: "500",
                                                borderRadius: 5,
                                                opacity: 0.6,
                                            }}
                                            onChangeText={(memo) =>
                                                this.setState({ memo })
                                            }
                                        />
                                        <View style={styles.header} />
                                    </View>
                                </View>

                                <View style={{ alignItems: "center" }}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.saveClub()}
                                    >
                                        <Text style={styles.buttonText}>
                                            저장
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>
                    </View>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        width: 220,
        alignSelf: "stretch",
        justifyContent: "flex-end",
        marginLeft: 9,
        marginTop: 7,
        borderBottomWidth: 1.5,
        borderBottomColor: "grey",
        opacity: 0.3,
    },
    button: {
        borderWidth: 2,
        borderColor: "#aaced7",
        backgroundColor: "#fff",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        width: "30%",
        height: 50,
        marginTop: 30,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 15,
        color: "#aaced7",
    },
});
