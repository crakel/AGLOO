import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
export default class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userPassword: "",
        };
    }

    state = {
        _isLogin: false,
    };

    login = () => {
        //this.props.navigation.navigate("main");
        const { userId, userPassword } = this.state;

        if (userId == "") {
            this.setState({ id: "Please enter ID" });
        } else if (userPassword == "") {
            this.setState({ id: "Please enter password" });
        } else {
            fetch("http://115.85.183.157:3000/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: this.state.userId,
                    pw: this.state.userPassword,
                }),
            })
                .then((response) => response.json())
                .then((response) => {
                    if (response.success) {
                        AsyncStorage.setItem(
                            "user_token",
                            JSON.stringify({ token: response.token })
                        );
                        this.props.navigation.replace("main");
                    } else {
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
        return (
            //https://i.imgur.com/Fhkzs6Q.png
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ImageBackground
                    source={{ uri: "https://i.imgur.com/zX4uhuc.jpg" }}
                    style={styles.background}
                >
                    <View>
                        <Text style={styles.title}></Text>
                    </View>
                    <View style={styles.inputForm}>
                        <Text
                            style={{
                                paddingTop: 3,
                                fontWeight: "700",
                                color: "#DD4D07",
                                alignSelf: "center",
                            }}
                        >
                            {this.state.id}
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="ID"
                            onChangeText={(userId) => this.setState({ userId })}
                        />
                        <TextInput
                            secureTextEntry={false}
                            style={styles.input}
                            placeholder="PASSWORD"
                            onChangeText={(userPassword) =>
                                this.setState({ userPassword })
                            }
                        />
                    </View>
                    <View style={styles.buttonArea}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={this.login}
                        >
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.registerbutton}
                            onPress={() =>
                                this.props.navigation.navigate("register")
                            }
                        >
                            <Text style={styles.registerbuttonText}>
                                Register Now !
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        //alignItems: 'center',
        justifyContent: "center",
    },
    background: {
        //resizeMode: "cover",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    title: {
        fontSize: 50,
        fontWeight: "800",
        color: "#808000",
        alignSelf: "center",
        marginBottom: 20,
    },
    inputForm: {
        paddingTop: 100,
        width: "100%",
        alignItems: "center",
    },
    input: {
        borderWidth: 2,
        borderColor: "#3A445D",
        backgroundColor: "white",
        opacity: 0.7,
        borderRadius: 6,
        width: "70%",
        height: 50,
        marginTop: 8,
        paddingHorizontal: 20,
        fontSize: 18,
    },
    buttonArea: {
        width: "100%",
        alignItems: "center",
    },
    button: {
        opacity: 0.7,
        borderWidth: 2,
        borderColor: "#3A445D",
        backgroundColor: "#3A445D",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: 50,
        marginTop: 8,
    },
    buttonText: {
        fontWeight: "700",
        fontSize: 17,
        color: "white",
    },
    registerbutton: {
        opacity: 0.7,
        borderWidth: 2,
        borderColor: "#3A445D",
        backgroundColor: "#3A445D",
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        width: "70%",
        height: 50,
        marginTop: 8,
    },
    registerbuttonText: {
        fontWeight: "700",
        fontSize: 17,
        color: "white",
    },
});
