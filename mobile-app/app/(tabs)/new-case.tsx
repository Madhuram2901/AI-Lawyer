import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function NewCaseScreen() {
  const [caseText, setCaseText] = useState("");
  const router = useRouter();

  const handleAnalyze = () => {
    if (!caseText.trim()) {
      Alert.alert("Validation Error", "Please enter case details.");
      return;
    }
    router.push("/results");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Case Summary</Text>

      <TextInput
        style={styles.input}
        multiline
        placeholder="Paste FIR summary, case brief, or legal notes..."
        placeholderTextColor="#64748b"
        value={caseText}
        onChangeText={setCaseText}
      />

      <TouchableOpacity style={styles.button} onPress={handleAnalyze}>
        <Text style={styles.buttonText}>Analyze Case</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  label: {
    color: "#0f172a",
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    color: "#0f172a",
    height: 220,
    marginBottom: 20,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#9333ea",
    padding: 16,
    borderRadius: 10,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
});
