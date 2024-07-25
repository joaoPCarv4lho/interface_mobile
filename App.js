import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AppNavigator from "./src/navigation/AppNavigator";
import UserProvider from "./src/Context/UserContext";
import { useState } from "react";

export default function App() {
  const [userId, setUserId] = useState({});
  return (
    <UserProvider value={{ userId, setUserId }}>
        <StatusBar style="auto" />
        <AppNavigator />
    </UserProvider>
  );
}

