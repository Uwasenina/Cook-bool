import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HomeScreen from "../screen/HomeScreen";
import ProfileScreen from "../screen/ProfileScreen";
import colors from "../config/color";
import { TopNavigator } from "../screen/FavoriteScreen";
import AddRecipeScreen from "../screen/AddRecipeScreen";

const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  const tabScreens = [
    {
      name: "Home",
      component: HomeScreen,
      icon: "home",
      headerShown: false,
    },
    {
      name: "Favorite",
      component: TopNavigator,
      icon: "heart",
      headerShown: true,
    },
    {
      name: "Add",
      component: AddRecipeScreen,
      icon: "plus",
      headerShown: true,
    },
    {
      name: "Profile",
      component: ProfileScreen,
      icon: "account",
      headerShown: true,
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "white",
        tabBarActiveBackgroundColor: colors["fire-engine-red"],
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 13,
        },
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
    >
      {tabScreens.map((screen, index) => (
        <Tab.Screen
          name={screen.name}
          key={index}
          component={screen.component}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name={screen.icon}
                color={color}
                size={size}
              />
            ),
          }}
        />
      ))}
    </Tab.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
