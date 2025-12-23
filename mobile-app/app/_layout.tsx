import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#ffffff" },
          headerTintColor: "#0f172a",
          headerTitleStyle: { fontWeight: "600" },
        }}
      >
        <Stack.Screen name="index" options={{ title: "AI-Lawyer" }} />
        <Stack.Screen name="new-case" options={{ title: "New Case" }} />
        <Stack.Screen name="results" options={{ title: "Analysis Results" }} />
        <Stack.Screen name="history" options={{ title: "Case History" }} />
      </Stack>
    </>
  );
}
