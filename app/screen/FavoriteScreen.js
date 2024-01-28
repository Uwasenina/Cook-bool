import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../components/Screen";
import AppText from "../components/typo/AppText";
import colors from "../config/color";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { MaterialCommunityIcons as Mat } from "@expo/vector-icons";
import AppContext from "../config/context";
import axios from "../config/axios";
import * as Notifications from "expo-notifications";
import { getData } from "../config/storage";

export const recipes = [
  {
    id: "1",
    title: "Homemade Pizza",
    category: "Dinner",
    ingredients: ["Dough", "Tomato Sauce", "Cheese", "Toppings of your choice"],
    instructions:
      "1. Roll out the dough. 2. Spread tomato sauce. 3. Add cheese and toppings. 4. Bake in the oven.",
    image: "https://example.com/pizza.jpg",
    duration: 45,
    difficulty: "Intermediate",
  },
  {
    id: "2",
    title: "Avocado Toast",
    category: "Breakfast",
    ingredients: [
      "2 slices of bread",
      "1 ripe avocado",
      "Salt",
      "Pepper",
      "Optional: poached egg",
    ],
    instructions:
      "Toast bread. Mash avocado and spread it on the toast. Add salt and pepper. Optional: top with a poached egg.",
    image: "https://example.com/avocado_toast.jpg",
    duration: 15,
    difficulty: "Easy",
  },
  // Add more recipes as needed
  // ...
];

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// Generate additional recipes to make at least 9
for (let i = 3; i <= 9; i++) {
  recipes.push({
    id: i.toString(),
    title: `Recipe ${i}`,
    category: "Other",
    ingredients: [
      `Ingredient ${i}_1`,
      `Ingredient ${i}_2`,
      `Ingredient ${i}_3`,
    ],
    instructions: `Instructions for Recipe ${i}.`,
    image: `https://example.com/recipe_${i}.jpg`,
    duration: 30,
    difficulty: "Medium",
  });
}

const RecipeItem = ({ item, handleBook }) => {
  return (
    <View
      style={{
        width: "50%",
        padding: 10,
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
      }}
    >
      <View
        style={{
          width: "100%",
          height: 200,
          backgroundColor: "white",
          borderRadius: 10,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <Image
          source={{
            uri: "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg?quality=90&resize=440,400",
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <AppText
        value={item.title}
        color={colors["fire-engine-red"]}
        size={15}
        bold={true}
      />
      <AppText value={item.category} color={"gray"} size={13} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <AppText value={item.duration + " min"} color={"gray"} size={15} />
        <AppText value={item.difficulty} color={"gray"} size={12} />
      </View>
      <TouchableOpacity
        onPress={() => {
          handleBook(item);
        }}
        style={{
          backgroundColor: colors["fire-engine-red"],
          padding: 10,
          borderRadius: 10,
          marginTop: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText value={"Book"} color={"white"} size={15} bold={true} />
      </TouchableOpacity>
    </View>
  );
};

const RecipeScreen = () => {
  const { recipes, user, setUser } = useContext(AppContext);

  const [expoPushToken, setExpoPushToken] = useState("");
  const requestPermissions = async () => {
    try {
      const { granted } = await Notifications.requestPermissionsAsync();
      if (!granted) {
        alert("You need to enable permissions in settings");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getToken = async () => {
    try {
      const token = await Notifications.getExpoPushTokenAsync({
        projectId: "dfa4cc7b-cd15-413b-bde8-6b4834773852",
      });
      setExpoPushToken(token.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    requestPermissions();
    getToken();
  }, []);
  const handleBook = async (item) => {
    try {
      const response = await axios.post(`book/${user._id}`, {
        recipeId: item._id,
        scheduledTime: Date.now(),
        notes: "Family dinner",
      });

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Notification",
          body: "You have a new booking",
        },
        trigger: {
          seconds: 1,
        },
      });
      setUser(await getData("user"));
      console.log(response.data);
    } catch (error) {
      alert(error.response.data.error);
    }
  };
  return (
    <View>
      <FlatList
        data={recipes}
        style={{ padding: 10 }}
        keyExtractor={(recipe) => recipe.id}
        numColumns={2}
        renderItem={({ item }) => (
          <RecipeItem handleBook={handleBook} item={item} />
        )}
      />
    </View>
  );
};

const BookingItem = ({ item }) => {
  const handleDelete = async (selected) => {
    Alert.alert(
      "Confirm Delete",
      " Are you sure you want to delete this booking?",
      [
        {
          text: "Not",
          style: "no",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              const response = await axios.delete(`book/${selected._id}`);
              console.log(response.data);

              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Booking deleted",
                  body: "Booking deleted",
                },
              });
            } catch (error) {
              console.log(error.response.data);
            }
          },
        },
      ]
    );
  };
  console.log(item.recipeId.image);
  return (
    <View style={{ flex: 1, marginVertical: 10, flexDirection: "row" }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri:
              item?.recipeId.image ||
              "https://images.immediate.co.uk/production/volatile/sites/30/2023/06/Ultraprocessed-food-58d54c3.jpg?quality=90&resize=440,400",
          }}
          style={{ width: "100%", height: 100, borderRadius: 10 }}
          alt="hhhh"
        />
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <AppText value={item?.recipeId?.title} size={10} color="black" />
        <AppText value={item?.recipeId?.category} size={10} color="gray" />
        <View
          style={{
            // alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mat name="clock-outline" size={10} color="black" />
              <AppText
                value={item?.recipeId?.duration + " mins"}
                size={10}
                color="gray"
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Mat name="fire" size={20} color="black" />
              <AppText
                value={item?.recipe?.difficulty}
                size={10}
                color="gray"
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Mat name="calendar" size={20} color="black" />
            <AppText
              value={new Date(item.scheduledTime).toLocaleDateString("en-US", {
                weekday: "short",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
              size={10}
              color="gray"
            />
          </View>
        </View>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.ochre,
            padding: 5,
            borderRadius: 5,
          }}
        >
          <AppText value={"Booked"} size={10} color="white" />
        </View>

        <TouchableOpacity
          onPress={() => {
            handleDelete(item);
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors["fire-engine-red"],
              padding: 5,
              borderRadius: 5,
              marginLeft: 10,
            }}
          >
            {/*  delete */}
            <Mat
              name="delete"
              size={20}
              color={"white"}
              style={{ marginLeft: 0 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BookScreen = () => {
  const [refresh, setRefresh] = useState(false);
  const { bookings, setUser } = useContext(AppContext);

  return (
    <View style={{ padding: 10, flex: 1 }}>
      <AppText
        value={"Book"}
        color={colors["fire-engine-red"]}
        size={20}
        bold={true}
      />

      <FlatList
        data={bookings}
        style={{ padding: 0 }}
        refreshing={refresh}
        onRefresh={async () => {
          setRefresh(true);
          setUser(await getData("user"));
          setTimeout(() => {
            setRefresh(false);
          }, 2000);
        }}
        keyExtractor={(booking) => booking.id}
        renderItem={({ item }) => <BookingItem item={item} />}
      />
    </View>
  );
};

export const TopNavigator = () => {
  const Tab = createMaterialTopTabNavigator();

  const screensArray = [
    {
      name: "Recipe",
      component: RecipeScreen,
    },
    {
      name: "Book",
      component: BookScreen,
    },
  ];
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors["fire-engine-red"],
        tabBarInactiveTintColor: "black",
        tabBarLabelStyle: {
          fontSize: 13,
          textTransform: "capitalize",
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors["fire-engine-red"],
        },

        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            height: 0,
          },
        },
      }}
    >
      {screensArray.map((screen, index) => (
        <Tab.Screen
          name={screen.name}
          key={index}
          component={screen.component}
        />
      ))}
    </Tab.Navigator>
  );
};

const FavoriteScreen = () => {
  return <Screen></Screen>;
};

export default FavoriteScreen;

const styles = StyleSheet.create({});
