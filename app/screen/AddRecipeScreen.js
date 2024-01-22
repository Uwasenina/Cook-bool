import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import AppText from "../components/typo/AppText";
import colors from "../config/color";
import AppForm from "../components/forms/AppForm";
import AppFormField from "../components/forms/AppFormField";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import * as Yup from "yup";
import Screen from "../components/Screen";
import axios from "../config/axios";

const validattionSchema = Yup.object().shape({
  title: Yup.string().required().label("Title"),
  category: Yup.string().required().label("Category"),
  ingredients: Yup.string().required().label("Ingredients"),
  instructions: Yup.string().required().label("Instructions"),
  image: Yup.string().required().label("Image"),
  duration: Yup.number().required().label("Duration"),
  difficulty: Yup.string().required().label("Difficulty"),
  createdAt: Yup.date().required().label("CreatedAt"),
});

export default function AddRecipeScreen({ navigation }) {
  /**
     * 
     * model
       title: { type: String, required: true },
  category: { type: String },
  ingredients: [{ type: String }],
  instructions: { type: String },
  image: { type: String },
  duration: { type: Number },
  difficulty: { type: String },
  createdAt: { type: Date, default: Date.now },
     */

  const handleAddRecipe = async (values) => {
    try {
      const response = await axios.post("recipe", values);
      console.log(response.data);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Screen>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <AppText
            value={"Add recipe"}
            color={colors["fire-engine-red"]}
            size={20}
            bold={true}
          />

          <AppForm
            initialValues={{
              title: "",
              category: "",
              ingredients: [],
              instructions: "",
              image: "",
              duration: 0,
              difficulty: "",
              createdAt: Date.now,
            }}
            onSubmit={handleAddRecipe}
            validationSchema={validattionSchema}
          >
            <AppFormField
              name="title"
              placeholder="Title"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="category"
              placeholder="Category"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="ingredients"
              placeholder="Ingredients"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="instructions"
              placeholder="Instructions"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="image"
              placeholder="Image"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="duration"
              placeholder="Duration"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="difficulty"
              placeholder="Difficulty"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppFormField
              name="createdAt"
              placeholder="CreatedAt"
              icon="food"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <AppSubmitButton title="Add recipe" />
          </AppForm>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({});
