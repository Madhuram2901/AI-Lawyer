import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function ResultsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Case Type</Text>
      <View style={styles.card}><Text>Criminal</Text></View>

      <Text style={styles.heading}>Key Issues</Text>
      <View style={styles.card}><Text>Cheating, Breach of Trust</Text></View>

      <Text style={styles.heading}>Applicable Laws</Text>
      <View style={styles.card}><Text>IPC Section 420</Text></View>

      <Text style={styles.heading}>Risk Flags</Text>
      <View style={[styles.card, styles.danger]}>
        <Text style={{ color: "#dc2626" }}>Weak documentary evidence</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  heading: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 6,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
  },
  danger: {
    borderColor: "#fecaca",
  },
});
