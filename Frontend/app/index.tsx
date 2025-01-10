import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function WelcomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to VHAS</Text>
      <Text style={styles.title1}>Drive smarter, Drive safer</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Link href="/sign-in">
            <Text style={styles.buttonText}>Get Connected</Text>
          </Link>
        </TouchableOpacity>
        
        {/*<TouchableOpacity style={styles.button}>
          <Link href="/sign-up">
            <Text style={styles.buttonText}>SignUp</Text>
          </Link>
  </TouchableOpacity>*/}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#d3f2ff',
  },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 5 },
  title1: { fontSize: 15, fontWeight: "light", marginBottom: 50},
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: { color: "#fff", fontSize: 16 },
});

