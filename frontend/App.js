import { NativeBaseProvider } from "native-base";
import { LogBox, StyleSheet } from "react-native";
import Navigation from "./src/navigation";
LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

export default function App() {
  return (
    <NativeBaseProvider style={styles.root}>
      <Navigation />
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9FBFC",
  },
});
