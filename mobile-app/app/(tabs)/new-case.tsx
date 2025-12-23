import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import api from "../../services/api";

export default function NewCaseScreen() {
  const [caseText, setCaseText] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!caseText.trim()) {
      Alert.alert("Validation Error", "Please enter case details.");
      return;
    }

    try {
      setLoading(true);
      console.log("🔄 Starting case analysis...");
      console.log("📝 Case text length:", caseText.length);

      const response = await api.post("/case/analyze", {
        case_text: caseText,
      });

      console.log("✅ Analysis complete!");
      console.log("📊 Response:", response.data);

      router.push({
        pathname: "/results",
        params: { result: JSON.stringify(response.data) },
      });
    } catch (error: any) {
      console.error("❌ Analysis error:", error);

      const status = error?.response?.status;
      const detail = error?.response?.data?.detail;

      if (error.code === 'ECONNABORTED') {
        // Timeout error (very rare with 5 minute timeout)
        Alert.alert(
          "Analysis Timeout",
          "The analysis took longer than 5 minutes. This is unusual. Please check your network connection and try again.",
          [{ text: "OK" }]
        );
      } else if (status === 503) {
        // AI service unavailable
        Alert.alert(
          "AI Service Unavailable",
          "The AI analysis service is currently offline. Please contact support or try again later.",
          [{ text: "OK" }]
        );
      } else if (detail) {
        // Server returned error message
        Alert.alert("Error", detail);
      } else {
        // Generic error
        Alert.alert(
          "Error",
          `Unable to analyze case. ${error.message || "Please check your connection and try again."}`,
        );
      }
    } finally {
      setLoading(false);
    }
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

      <TouchableOpacity style={styles.button} onPress={handleAnalyze} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Analyze Case</Text>
        )}
      </TouchableOpacity>

      {loading && (
        <Text style={styles.loadingText}>
          🤖 AI is analyzing your case... This may take 30-60 seconds.
        </Text>
      )}
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
  loadingText: {
    color: "#6366f1",
    fontSize: 14,
    textAlign: "center",
    marginTop: 16,
    fontStyle: "italic",
  },
});
