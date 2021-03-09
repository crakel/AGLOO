import React, { Component } from "react";
import { Text, StyleSheet, View, Image } from "react-native";

export default class Category extends Component {
    render() {
        return (
            <View
                style={{
                    borderWidth: 1,
                    borderColor: "#fff",
                    borderRadius: 16,
                    height: 170,
                    width: 130,
                    marginLeft: 20,
                }}
            >
                <View style={{ flex: 1 }}>
                    <Image
                        source={this.props.imageUri}
                        style={{
                            flex: 1,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                            width: null,
                            height: null,
                            resizeMode: "cover",
                        }}
                    />
                </View>
                <View
                    style={{
                        borderBottomLeftRadius: 15,
                        borderBottomRightRadius: 15,
                        paddingVertical: 6,
                        backgroundColor: "#ebf4f6",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Text
                        style={{
                            color: "black",
                            fontSize: 15,
                            fontWeight: "700",
                        }}
                    >
                        {this.props.name}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
