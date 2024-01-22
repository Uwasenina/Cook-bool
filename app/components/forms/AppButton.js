import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AppText from "../typo/AppText";
import colors from "../../config/color";

const AppButton = ({ title, bold, bgColor, handlePress }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View
        style={{
          backgroundColor: colors["fire-engine-red"],
          borderRadius: 7,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          width: "100%",
          borderWidth: bold ? 1 : 0,
          borderColor: "gray",
        }}
      >
        <AppText value={title} bold={false} color={"white"} />
      </View>
    </TouchableOpacity>
  );
};

export default AppButton;
