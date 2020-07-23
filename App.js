import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import CreateEmployee from "./screens/CreateEmployee";
import Profile from "./screens/Profile";

const Stack = createStackNavigator();
function App() {
  const myOptions = {
    title: "Employee App",
    headerTintColor: "white",
    headerStyle: {
      backgroundColor: "#27ae60",
    },
  };
  return (
    <>
      <StatusBar hidden={false} backgroundColor="#229954" translucent={true} />
      <View style={styles.container}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} options={myOptions} />
          <Stack.Screen
            name="Create"
            component={CreateEmployee}
            options={{ ...myOptions, title: "Create Profile" }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ ...myOptions, title: "Profile" }}
          />
        </Stack.Navigator>
      </View>
    </>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
