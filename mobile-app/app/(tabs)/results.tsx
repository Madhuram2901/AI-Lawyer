import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

export default function ResultsScreen() {
  const { result } = useLocalSearchParams();

  if (!result) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>No analysis data available.</Text>
      </View>
    );
  }

  const data = JSON.parse(result as string);

  const getPriorityColor = (priority: string) => {
    switch (priority?.toLowerCase()) {
      case "high": return "#dc2626";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case "high": return "#dc2626";
      case "medium": return "#f59e0b";
      case "low": return "#10b981";
      default: return "#6b7280";
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Case Type Badge */}
      <View style={styles.typeBadge}>
        <Text style={styles.typeBadgeText}>{data.case_type}</Text>
      </View>

      {/* Case Summary */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📋 Case Summary</Text>
        <View style={styles.card}>
          <Text style={styles.summaryText}>{data.case_summary}</Text>
        </View>
      </View>

      {/* Key Facts */}
      {data.key_facts && data.key_facts.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🔍 Key Facts</Text>
          {data.key_facts.map((fact: string, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.bulletPoint}>• {fact}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Legal Issues */}
      {data.legal_issues && data.legal_issues.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚖️ Legal Issues</Text>
          {data.legal_issues.map((item: any, index: number) => (
            <View key={index} style={styles.detailedCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.issue}</Text>
                <View style={[styles.badge, { backgroundColor: getPriorityColor(item.importance) + "20" }]}>
                  <Text style={[styles.badgeText, { color: getPriorityColor(item.importance) }]}>
                    {item.importance}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Applicable Laws */}
      {data.applicable_laws && data.applicable_laws.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📜 Applicable Laws</Text>
          {data.applicable_laws.map((item: any, index: number) => (
            <View key={index} style={styles.detailedCard}>
              <Text style={styles.lawTitle}>{item.law}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
              <View style={styles.relevanceBox}>
                <Text style={styles.relevanceLabel}>Relevance:</Text>
                <Text style={styles.relevanceText}>{item.relevance}</Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Strengths */}
      {data.strengths && data.strengths.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💪 Case Strengths</Text>
          {data.strengths.map((item: any, index: number) => (
            <View key={index} style={[styles.detailedCard, styles.strengthCard]}>
              <Text style={styles.strengthTitle}>✓ {item.point}</Text>
              <Text style={styles.cardDescription}>{item.explanation}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Weaknesses */}
      {data.weaknesses && data.weaknesses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚠️ Potential Weaknesses</Text>
          {data.weaknesses.map((item: any, index: number) => (
            <View key={index} style={[styles.detailedCard, styles.weaknessCard]}>
              <View style={styles.cardHeader}>
                <Text style={styles.weaknessTitle}>! {item.point}</Text>
                <View style={[styles.badge, { backgroundColor: getSeverityColor(item.severity) + "20" }]}>
                  <Text style={[styles.badgeText, { color: getSeverityColor(item.severity) }]}>
                    {item.severity}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.explanation}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Recommended Actions */}
      {data.recommended_actions && data.recommended_actions.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Recommended Actions</Text>
          {data.recommended_actions.map((item: any, index: number) => (
            <View key={index} style={styles.detailedCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.actionTitle}>{index + 1}. {item.action}</Text>
                <View style={[styles.badge, { backgroundColor: getPriorityColor(item.priority) + "20" }]}>
                  <Text style={[styles.badgeText, { color: getPriorityColor(item.priority) }]}>
                    {item.priority}
                  </Text>
                </View>
              </View>
              <Text style={styles.cardDescription}>{item.rationale}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Evidence Needed */}
      {data.evidence_needed && data.evidence_needed.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📎 Evidence Required</Text>
          {data.evidence_needed.map((evidence: string, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.bulletPoint}>• {evidence}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Precedents */}
      {data.precedents && data.precedents.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📚 Relevant Precedents</Text>
          {data.precedents.map((precedent: string, index: number) => (
            <View key={index} style={styles.card}>
              <Text style={styles.precedentText}>{precedent}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Estimated Outcome */}
      {data.estimated_outcome && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎲 Estimated Outcome</Text>
          <View style={styles.outcomeCard}>
            <Text style={styles.outcomeText}>{data.estimated_outcome}</Text>
          </View>
        </View>
      )}

      {/* Timeline Considerations */}
      {data.timeline_considerations && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⏰ Timeline Considerations</Text>
          <View style={styles.timelineCard}>
            <Text style={styles.timelineText}>{data.timeline_considerations}</Text>
          </View>
        </View>
      )}

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 12,
  },
  typeBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#8b5cf6",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  typeBadgeText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  detailedCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  strengthCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#10b981",
  },
  weaknessCard: {
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  lawTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6366f1",
    marginBottom: 8,
  },
  strengthTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#059669",
  },
  weaknessTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#d97706",
    flex: 1,
    marginRight: 8,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    flex: 1,
    marginRight: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  summaryText: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 22,
  },
  bulletPoint: {
    fontSize: 14,
    color: "#475569",
    lineHeight: 20,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  relevanceBox: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  relevanceLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 4,
  },
  relevanceText: {
    fontSize: 14,
    color: "#334155",
    lineHeight: 20,
  },
  precedentText: {
    fontSize: 14,
    color: "#475569",
    fontStyle: "italic",
  },
  outcomeCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  outcomeText: {
    fontSize: 15,
    color: "#1e40af",
    lineHeight: 22,
    fontWeight: "500",
  },
  timelineCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#fde68a",
  },
  timelineText: {
    fontSize: 15,
    color: "#92400e",
    lineHeight: 22,
    fontWeight: "500",
  },
  error: {
    color: "#dc2626",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
