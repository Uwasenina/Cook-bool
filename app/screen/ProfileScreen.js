import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext } from "react";
import Screen from "../components/Screen";
import { MaterialCommunityIcons as Mat } from "@expo/vector-icons";
import AppText from "../components/typo/AppText";
import colors from "../config/color";
import AppContext from "../config/context";
import { removeData } from "../config/storage";
import { AntDesign } from "@expo/vector-icons";
import axios from "../config/axios";

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
            const response = await axios.delete(`book/${selected.id}`);
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

const handleEdit = async (selected) => {};

const RecipeItem = ({ item }) => {
  return (
    <View
      style={{
        width: "50%",
        padding: 10,
        marginBottom: 20,
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
            uri: "https://hips.hearstapps.com/hmg-prod/images/190307-fish-tacos-112-1553283299.jpg",
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
        <View style={{ marginBottom: 10 }}>
          <AppText value={item.duration + " min"} color={"gray"} size={15} />
          <AppText value={item.difficulty} color={"gray"} size={12} />
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            onPress={() => {
              handleEdit(item);
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "green",
                padding: 5,
                borderRadius: 5,
                marginLeft: 10,
              }}
            >
              {/*  Edit */}

              <AntDesign name="edit" size={24} color="white" />
              <Text>Edit</Text>
            </View>
          </TouchableOpacity>
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
              <Text>Delete</Text>
            </View>
          </TouchableOpacity>
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
const ProfileScreen = () => {
  const { recipes, user, setUser } = useContext(AppContext);
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
          <ProfileTop name={user.names} />
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
            value="Recipes Available"
            size={25}
            color={colors["fire-engine-red"]}
          />
          <FlatList
            data={recipes}
            style={{ padding: 10 }}
            keyExtractor={(recipe) => recipe.id}
            numColumns={2}
            renderItem={({ item }) => <RecipeItem item={item} />}
          />
        </View>
      </View>
    </Screen>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
