import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚖️ AI-Lawyer</Text>
      <Text style={styles.subtitle}>
        AI-powered legal assistance made simple
      </Text>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/new-case")}
      >
        <Text style={styles.buttonText}>New Case Analysis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/history")}
      >
        <Text style={styles.buttonText}>Case History</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          Alert.alert(
            "About",
            "This is an early MVP. Authentication and real AI analysis will be added soon."
          )
        }
      >
        <Text style={styles.infoText}>About this app</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 8,
  },
  subtitle: {
    color: "#475569",
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 10,
    width: "100%",
    marginBottom: 14,
  },
  secondaryButton: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 10,
    width: "100%",
    marginBottom: 20,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  infoText: {
    color: "#2563eb",
    fontSize: 14,
  },
});
