import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HeroScreen from "../screen/HeroScreen";
import RegisterScreen from "../screen/RegisterScreen";
import LoginScreen from "../screen/LoginScreen";
import colors from "../config/color";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  const screensArray = [
    {
      name: "Hero",
      component: HeroScreen,
      headerShown: false,
    },
    {
      name: "Login",
      component: LoginScreen,
      headerShown: true,
    },
    {
      name: "Register",
      component: RegisterScreen,
      headerShown: true,
    },

  ];

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors["fire-engine-red"],
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      {screensArray.map((screen, index) => (
        <Stack.Screen
          name={screen.name}
          key={index}
          component={screen.component}
          options={{ headerShown: screen.headerShown }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
