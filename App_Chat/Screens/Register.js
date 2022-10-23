import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useLayoutEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import { auth, database } from "../firebase";
import { storage, ref } from "firebase/storage";
import {
  firestore,
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { launchImageLibrary } from "react-native-image-picker";

export default function Register({ navigation }) {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordConfirm, setpassWordConfirm] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const onHandleSignup = async () => {
    setLoading(true);
    if (!email || !passWord || !userName) {
      alert("please add all the field");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, passWord)
        .then(() => console.log("Signup success"))
        .catch((err) => Alert.alert("Login error", err.message));
      addDoc(collection(database, "users"), {
        name: userName,
        email: email,

        status: "online",
      });
      // collection(database, "users").doc(result.user.uid).set({
      //   name: userName,
      //   email: result.user.email,
      //   uid: result.user.uid,
      //   pic: image,
      //   status: "online",
      // });
      setLoading(false);
    } catch (err) {
      alert("something went wrong");
    }
  };
  // const pickImageAndUpload = () => {
  //   launchImageLibrary({ quality: 0.5 }, (fileobj) => {
  //     const uploadTask = storage()
  //       .ref()
  //       .child(`/userprofile/${Date.now()}`)
  //       .putFile(fileobj.uri);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         var progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         if (progress == 100) alert("image uploaded");
  //       },
  //       (error) => {
  //         alert("error uploading image");
  //       },
  //       () => {
  //         uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //           setImage(downloadURL);
  //         });
  //       }
  //     );
  //   });
  // };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/logoChat.png")} />

        <TextInput
          placeholder="Name Profile"
          onChangeText={(text) => setUserName(text)}
          style={styles.input}
        ></TextInput>
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
        ></TextInput>
        <TextInput
          placeholder="passwordConfirm"
          onChangeText={(text) => setpassWordConfirm(text)}
          secureTextEntry={true}
          style={styles.input}
        ></TextInput>

        <CustomButton
          title="choose avatar"
          type="GRAY"
          // onPress={() => pickImageAndUpload()}
        />
        <CustomButton
          title="Register"
          type="PRIMARY"
          onPress={() => onHandleSignup()}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>You have an account ?</Text>
        </TouchableOpacity>
        {/* <CustomButton
        title="Login"
        type="GRAY"
        onPress={() => navigation.navigate("Login")}
      /> */}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
