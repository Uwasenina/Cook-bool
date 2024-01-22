import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Screen from "../components/Screen";
import AppText from "../components/typo/AppText";
import AppSubmitButton from "../components/forms/AppSubmitButton";
import AppFormField from "../components/forms/AppFormField";
import AppForm from "../components/forms/AppForm";
import colors from "../config/color";
import * as Yup from "yup";
import axios from "../config/axios";
import { getData, storeData } from "../config/storage";
import { useContext } from "react";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  names: Yup.string().required().label("Names"),
});
const RegisterScreen = ({ navigation }) => {
  const { user, setUser  } = useContext();

  const handleRegister = async (values) => {
    console.log(values);
    try {
      const response = await axios.post("user/register", values);
      console.log(response.data);
      storeData("user", response.data.user);
      setUser(await getData("user"));
    } catch (error) {
      console.log(error.response.data);
    }
  };
  return (
    <Screen>
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          height: "100%",
          padding: 10,
          gap: 30,
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            justifyContent: "flex-start",
            alignItems: "flex-start",
            marginTop: 50,
            gap: 15,
          }}
        >
          <AppText
            value={"Create an account"}
            size={30}
            color={"#000"}
            bold={true}
          />
          <AppText
            value={
              "Create an account to continue using our app  to make your favourite dishes."
            }
            size={15}
            color={"gray"}
            bold={false}
          />
        </View>
        <AppForm
          initialValues={{ email: "", password: "", names: "" }}
          onSubmit={handleRegister}
          validationSchema={validationSchema}
        >
          <AppFormField
            name="names"
            placeholder="Names"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            textContentType="name"
          />
          <AppFormField
            name="email"
            placeholder="Email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            textContentType="emailAddress"
          />
          <AppFormField
            name="password"
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="default"
            textContentType="password"
            secureTextEntry={true}
          />

          <AppSubmitButton title={"Register"} />
        </AppForm>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            gap: 10,
          }}
        >
          <AppText
            value={"Login if you have account"}
            size={15}
            color={"gray"}
          />
          <AppText
            value={"Login"}
            size={15}
            color={colors["fire-engine-red"]}
            bold={false}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
      </View>
    </Screen>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
