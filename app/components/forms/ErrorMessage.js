import { StyleSheet, Text, View } from "react-native";
import AppText from "../typo/AppText";

const ErrorMessage = ({ error, visible }) => {
  if (!visible || !error) return null;
  return (
    <View style={styles.error}>
      <AppText value={error} color={"red"} />
    </View>
  );
};

export default ErrorMessage;

const styles = StyleSheet.create({});
