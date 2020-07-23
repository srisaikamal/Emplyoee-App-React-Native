import React, { useState, useEffect } from "react";
import { Text, FlatList, StyleSheet } from "react-native";
import { Dimensions, View, Image } from "react-native";
import axios from "axios";
import { FAB, Card, ActivityIndicator } from "react-native-paper";
const screenWidth = Math.round(Dimensions.get("window").width);

const Home = ({ navigation }) => {
  const [myData, setmyData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        "https://employee-app-kamal.herokuapp.com/"
      );

      console.log(result.data);
      setmyData(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  const data = [
    {
      id: 1,
      name: "Ariana Grande",
      position: "Software Developer",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80",
      email: "abc@gmail.com",
      salary: "80,000",
      phone: "55555555",
    },
    {
      id: 2,
      name: "Tyler Shift",
      position: "Product Designer",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      email: "abc@gmail.com",
      salary: "80,000",
      phone: "55555555",
    },
    {
      id: 3,
      name: "Selena Gamoz",
      position: "Lead UX/UI Expert",
      image:
        "https://images.unsplash.com/photo-1496440737103-cd596325d314?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      email: "abc@gmail.com",
      salary: "80,000",
      phone: "55555555",
    },
    {
      id: 4,
      name: "Hannah Baker",
      position: "Systems Engineer",
      image:
        "https://images.unsplash.com/photo-1595242990014-2c8b293fa1f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
      email: "abc@gmail.com",
      salary: "80,000",
      phone: "55555555",
    },
    {
      id: 5,
      name: "Jessica Jones",
      position: "Technical Expert",
      image:
        "https://images.unsplash.com/photo-1595236867531-34448a03ccde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
      email: "abc@gmail.com",
      salary: "80,000",
      phone: "55555555",
    },
  ];

  const renderList = (item) => {
    return (
      <Card
        style={styles.myCard}
        onPress={() => navigation.navigate("Profile", { item })}
      >
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{ width: 55, height: 55, borderRadius: 50 }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ paddingHorizontal: 10 }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {item.name}
            </Text>
            <Text style={{ fontSize: 18 }}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 100 }}
          data={myData}
          keyExtractor={(item) => `${item._id}`}
          renderItem={({ item }) => renderList(item)}
        />
      )}

      <FAB
        onPress={() => navigation.navigate("Create")}
        style={styles.fab}
        icon="plus"
        theme={{ colors: { accent: "#27ae60" } }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
  myCard: {
    marginTop: 10,
    marginLeft: 10,
    padding: 15,
    width: screenWidth - 20,
    elevation: 5,
  },
});

export default Home;
