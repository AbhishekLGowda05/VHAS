import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import axios from "axios";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // To store the message
  const [messageType, setMessageType] = useState(""); // To define the type of message (e.g., success or fail)

  const handleSignin = () => {
    const url = "http://localhost:8000/api/user/signup";
    const credentials = { username, password };

    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { msg, status } = result;

        setMessage(msg); // Update the message from the response
        setMessageType(status === "success" ? "success" : "fail"); // Set type based on status
      })
      .catch((error) => {
        console.error(error);
        setMessage("An error occurred. Please try again.");
        setMessageType("fail");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#000000"
        value={username}
        onChangeText={setUsername} // Update username state
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#000000"
        value={password}
        onChangeText={setPassword} // Update password state
      />
      {/* Display the message */}
      {message ? (
        <Text style={[styles.msgBox, messageType === "success" ? styles.success : styles.fail]}>
          {message}
        </Text>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSignin}>
        <Text style={styles.buttonText}>Connect</Text>
      </TouchableOpacity>
      <Link href="/sign-up">
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d3f2ff",
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    height: 50,
    borderWidth: 1,
    borderColor: "#d3f2ff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#6bd7ff",
    color: "#000000",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  link: { color: "#007bff", marginTop: 20 },
  msgBox: {
    width: "80%",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 16,
  },
  success: { backgroundColor: "#d4edda", color: "#155724" },
  fail: { backgroundColor: "#f8d7da", color: "#721c24" },
});