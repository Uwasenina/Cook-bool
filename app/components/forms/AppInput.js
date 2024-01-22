import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import colors from "../../config/color";

const AppInput = ({ icon, ...others }) => {
  return (
    <View style={styles.container}>
      {icon && (
        <MaterialCommunityIcons name={icon} size={24} color={colors.flame} />
      )}
      <TextInput style={styles.input} {...others} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors["fire-engine-red"],
    padding: 10,
    gap: 10,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
});

export default AppInput;
