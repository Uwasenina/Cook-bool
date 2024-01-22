import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Screen from "./app/components/Screen";
import AuthNavigator from "./app/navigator/AuthNavigator";
import AppNavigator from "./app/navigator/AppNavigator";
import AppContext from "./app/config/context";
import { useState } from "react";
import { useEffect } from "react";
import { getData, storeData } from "./app/config/storage";
import axios from "./app/config/axios";

export default function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [bookings, setBookings] = useState([]);

  const fetchRecipe = async () => {
    try {
      const response = await axios.get("recipe");
      storeData("recipe", response.data.recipes);
      setRecipes(await getData("recipe"));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const fetchBooking = async () => {
    console.log(user._id);
    try {
      const response = await axios.get(`book/user/${user?._id}`);
      console.log(response.data.bookings);
      storeData("booking", response.data.bookings);
      setBookings(await getData("booking"));
    } catch (error) {
      console.log(error.response.data + "sddf");
    }
  };

  useEffect(() => {
    const updateUser = async () => {
      setUser(await getData("user"));
    };
    updateUser();
  }, []);

  useEffect(() => {
    fetchRecipe();
    fetchBooking();
  }, [user]);

  return (
    <NavigationContainer
      theme={{
        colors: {
          background: "white",
        },
      }}
    >
      <AppContext.Provider value={{ user, setUser, recipes, bookings }}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </AppContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
