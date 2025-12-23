import { View, Text, StyleSheet, FlatList } from "react-native";

const dummyHistory = [
  { id: "1", title: "Business Fraud Case" },
  { id: "2", title: "Property Dispute" },
];

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyHistory}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>{item.title}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No cases analyzed yet.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 16,
  },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#e2e8f0",
    borderWidth: 1,
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
  },
  text: {
    color: "#0f172a",
    fontSize: 16,
  },
  empty: {
    color: "#64748b",
    textAlign: "center",
    marginTop: 40,
  },
});
