import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import Screen from "../components/Screen";
import { MaterialCommunityIcons as Mat } from "@expo/vector-icons";
import AppText from "../components/typo/AppText";
import colors from "../config/color";
import { recipes } from "./FavoriteScreen";
import AppContext from "../config/context";
import { removeData } from "../config/storage";

/*
  this is how recipe object looks like


   {
    id: '1',
    title: 'Homemade Pizza',
    category: 'Dinner',
    ingredients: ['Dough', 'Tomato Sauce', 'Cheese', 'Toppings of your choice'],
    instructions: '1. Roll out the dough. 2. Spread tomato sauce. 3. Add cheese and toppings. 4. Bake in the oven.',
    image: 'https://example.com/pizza.jpg',
    duration: 45,
    difficulty: 'Intermediate',
  },
*/

const RecipeItem = ({ item }) => {
  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View style={{ flex: 1 }}>
        <Image
          source={{
            uri: "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg",
          }}
          style={{ width: "100%", height: 100, borderRadius: 10 }}
        />
      </View>
      <View style={{ flex: 1, padding: 10 }}>
        <AppText value={item.title} size={10} color="black" />
        <AppText value={item.category} size={10} color="gray" />
        <View
          style={{
            // alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Mat name="clock-outline" size={10} color="black" />
            <AppText value={item.duration + " mins"} size={10} color="gray" />
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Mat name="fire" size={20} color="black" />
            <AppText value={item.difficulty} size={10} color="gray" />
          </View>
        </View>
      </View>
    </View>
  );
};

const ProfileTop = ({ name }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <View>
        <Mat name="account" size={30} color="black" />
      </View>
      <View>
        <AppText value={name} size={20} color="black" />
      </View>
    </View>
  );
};
const HomeScreen = () => {
  const recipesCategories = [
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Desserts",
    "Drinks",
  ];
  const [activeCategory, setActiveCategory] = React.useState("Breakfast");
  const { recipes, setUser } = useContext(AppContext);
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          height: "100%",
          gap: 20,
          padding: 20,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <ProfileTop name="John Doe" />
          <TouchableOpacity
            onPress={() => {
              removeData("user");
              setUser(null);
            }}
          >
            <View
              style={{
                backgroundColor: colors["fire-engine-red"],
                padding: 10,
                borderRadius: 10,
                width: 100,
                alignItems: "center",
              }}
            >
              <AppText value={"Logout"} color={"white"} size={12} />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <AppText
            value="What do you want to eat today?"
            size={25}
            color={colors["fire-engine-red"]}
          />
          <FlatList
            horizontal
            data={recipesCategories}
            style={{ marginTop: 20 }}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    padding: 10,
                    borderWidth: 1,
                    borderColor: colors["fire-engine-red"],
                    marginRight: 10,
                    borderRadius: 15,
                    backgroundColor:
                      activeCategory === item
                        ? colors["fire-engine-red"]
                        : "transparent",
                  }}
                >
                  <AppText
                    value={item}
                    size={15}
                    color={activeCategory === item ? "white" : "gray"}
                    onPress={() => {
                      setActiveCategory(item);
                    }}
                  />
                </View>
              );
            }}
          />
        </View>

        <View>
          <AppText
            value="Popular recipes"
            size={25}
            color={colors["fire-engine-red"]}
          />
          <FlatList
            data={recipes}
            keyExtractor={(recipe) => recipe.id}
            numColumns={3}
            renderItem={({ item }) => <RecipeItem item={item} />}
          />
        </View>
      </View>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
