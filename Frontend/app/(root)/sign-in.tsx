import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput style={styles.input} placeholder="Username: " placeholderTextColor="#000000"/>
      <TextInput style={styles.input} placeholder="Password: " secureTextEntry placeholderTextColor="#000000"/>
      <TouchableOpacity style={styles.button}>
        <Link href="/(root)/(tabs)/profile">
          <Text style={styles.buttonText}>Connect</Text>
        </Link>
      </TouchableOpacity>
      <Link href="/sign-up">
        <Text style={styles.link}>Don't have an account? Sign Up</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#d3f2ff'},
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20},
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
    color : '#000000',
  },
  button: { backgroundColor: "#007bff", padding: 15, borderRadius: 5, marginBottom: 20 },
  buttonText: { color: "#fff", fontSize: 16, marginBottom: 20 },
  link: { color: "#007bff", marginTop: 20, marginBottom: 50},
});

