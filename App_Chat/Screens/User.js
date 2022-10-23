import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { auth } from "../firebase";

export default function User({ navigation }) {
  const signOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {});
  };
  return (
    <View style={styles.container}>
      <Button onPress={signOut} title="Log Out"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffff",
    paddingTop: 35,
  },
});
