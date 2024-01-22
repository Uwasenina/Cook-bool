import { Text, View } from "react-native";
import React from "react";

const AppText = ({ value, size, color, bold, ...others }) => {
  return (
    <Text
      {...others}
      style={{
        fontSize: size,
        color: color,
        backgroundColor: "transparent",
        fontWeight: bold ? "bold" : "normal",
      }}
    >
      {value}
    </Text>
  );
};

export default AppText;
