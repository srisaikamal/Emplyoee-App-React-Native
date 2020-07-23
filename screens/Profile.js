import React from "react";
import { Title, Card, Button } from "react-native-paper";
import { View, Image, StyleSheet, Text, Linking, Platform } from "react-native";
import { Dimensions } from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
const screenWidth = Math.round(Dimensions.get("window").width);

const Profile = (props) => {
  const {
    email,
    name,
    picture,
    phone,
    salary,
    position,
  } = props.route.params.item;
  const openDail = () => {
    if (Platform.OS === "android") {
      Linking.openURL("tel:123456789");
    } else {
      Linking.openURL("telprompt:123456789");
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#52be80", "#52be80"]}
        style={{ height: "30%" }}
      />

      <View style={styles.greenCard}>
        <View style={{ alignItems: "center" }}>
          <Image
            style={{
              width: 150,
              height: 150,
              borderRadius: 150 / 2,
              marginTop: 25,
              borderWidth: 5,
              borderColor: "white",
            }}
            source={{
              uri: picture,
            }}
          />
        </View>
        <View style={{ alignItems: "center" }}>
          <Title style={{ fontSize: 24, color: "white", marginTop: 10 }}>
            {name}
          </Title>
          <Text style={{ fontSize: 20, color: "white", marginBottom: 20 }}>
            {position}
          </Text>
        </View>
      </View>
      <Card
        style={styles.card}
        onPress={() => Linking.openURL("mailto:abc@vsskamal.me")}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="email"
            size={32}
            color="#27ae60"
            style={{ marginTop: 10 }}
          />
          <View>
            <Text style={styles.emailText}>{email}</Text>
          </View>
        </View>
      </Card>

      <Card
        style={styles.card}
        onPress={() => openDail("mailto:abc@vsskamal.me")}
      >
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="phone"
            size={32}
            color="#27ae60"
            style={{ marginTop: 10 }}
          />
          <View>
            <Text style={styles.emailText}>+91 {phone}</Text>
          </View>
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={{ flexDirection: "row" }}>
          <MaterialIcons
            name="attach-money"
            size={32}
            color="#27ae60"
            style={{ marginTop: 10 }}
          />
          <View>
            <Text style={styles.emailText}>{salary}</Text>
          </View>
        </View>
      </Card>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
          padding: 10,
        }}
      >
        <Button
          icon="camera"
          mode="contained"
          color="#27ae60"
          style={{ elevation: 10 }}
          onPress={() => console.log("Pressed")}
        >
          Edit Employee
        </Button>
        <Button
          icon="camera"
          mode="contained"
          color="#27ae60"
          style={{ elevation: 10 }}
          onPress={() => console.log("Pressed")}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  card: {
    margin: 3,
    marginTop: 10,
    marginLeft: 10,
    padding: 15,
    width: screenWidth - 20,
    elevation: 5,
  },
  emailText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 12,
  },
  greenCard: {
    marginLeft: 30,
    marginTop: -160,
    height: "40%",
    backgroundColor: "#2ecc71",
    width: screenWidth - 60,
    borderRadius: 40,
    elevation: 10,
  },
});

export default Profile;
