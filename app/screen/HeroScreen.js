import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppText from "../components/typo/AppText";
import colors from "../config/color";
import AppButton from "../components/forms/AppButton";
import { MaterialCommunityIcons as Mat } from "@expo/vector-icons";
const HeroScreen = ({ navigation }) => {
  return (
    <Screen>
      <View
        style={{
          justifyContent: "space-evenly",
          width: "100%",
          height: "100%",
          padding: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <Mat name="chef-hat" size={20} color={colors.burgundy} />
          <AppText
            value={"Virtual cookbook"}
            color={colors.burgundy}
            size={25}
            bold={true}
          />
        </View>
        <AppText
          value={
            "Browse through our collection of recipes from all over the world."
          }
          color={"gray"}
          size={20}
        />
        <AppButton
          title="Get started"
          handlePress={() => {
            console.log("Login");
            navigation.navigate("Login");
          }}
          color="white"
          backgroundColor={colors.burgundy}
        />
      </View>
    </Screen>
  );
};

export default HeroScreen;

const styles = StyleSheet.create({});
