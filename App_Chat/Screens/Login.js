import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");

  const onHandleLogin = async () => {
    console.log({ email, passWord });
    if (email !== "" && passWord !== "") {
      signInWithEmailAndPassword(auth, email, passWord)
        .then(() => Alert.alert("Success", "Login successful"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };
  // const onHandleLogin = () => {
  //   console.log(email);
  //   console.log(passWord);
  // };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logoChat.png")} />

      <TextInput
        placeholder="email"
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      ></TextInput>
      <TextInput
        placeholder="password"
        onChangeText={(text) => setPassWord(text)}
        secureTextEntry={true}
        style={styles.input}
      />

      <CustomButton
        title="login"
        onPress={() => onHandleLogin()}
        type="PRIMARY"
      />
      <CustomButton
        title="Register"
        type="GRAY"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffff",
    padding: 20,
    alignItems: "center",
  },
  logo: {
    width: "70%",
    maxHeight: 200,
    maxWidth: 300,
  },
  button: {
    width: "100%",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    borderColor: "#e8e8e8",
    padding: 10,
  },
});
