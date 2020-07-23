import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { TextInput, Button, Modal } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const CreateEmployee = ({ navigation }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [picture, setPicture] = useState("");
  const [modal, setModal] = useState(false);

  const submitData = async () => {
    if (name === "" || position === "" || email === "") {
      alert("All fields are Required fields");
    } else {
      const config = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          salary,
          picture,
          position,
        }),
      };
      await fetch("https://employee-app-kamal.herokuapp.com/send", config);
      alert("Saved user to database");
      navigation.navigate("Home");
    }
  };

  const pickFromGallery = async () => {
    const granted = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      const data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          name: `Image.${data.uri.split(".")[1]}`,
          uri: data.uri,
          type: `Image/${data.uri.split(".")[1]}`,
        };

        handelUpload(newFile);
      }
    } else {
      Alert.alert("You need to give permission to work");
    }
  };

  const pickFromCamera = async () => {
    const granted = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      const data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newFile = {
          name: `Image.${data.uri.split(".")[1]}`,
          uri: data.uri,
          type: `Image/${data.uri.split(".")[1]}`,
        };

        handelUpload(newFile);
      }
    } else {
      Alert.alert("You need to give permission to work");
    }
  };

  const handelUpload = (image) => {
    const data = new FormData();
    data.append("file", image);

    data.append("upload_preset", "EmployeeApp");

    data.append("cloud_name", "vsskamal");

    fetch("https://api.cloudinary.com/v1_1/vsskamal/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => setPicture(data.url), setModal(false));
  };
  return (
    <View style={styles.root}>
      <TextInput
        style={styles.InputField}
        label={"Name"}
        theme={theme}
        value={name}
        mode="outlined"
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={styles.InputField}
        label={"Phone"}
        keyboardType="number-pad"
        theme={theme}
        value={phone}
        mode="outlined"
        onChangeText={(text) => setPhone(text)}
      />

      <TextInput
        style={styles.InputField}
        label={"Email"}
        theme={theme}
        value={email}
        mode="outlined"
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        style={styles.InputField}
        label={"Salary"}
        theme={theme}
        value={salary}
        mode="outlined"
        onChangeText={(text) => setSalary(text)}
      />

      <TextInput
        style={styles.InputField}
        label={"Position"}
        theme={theme}
        value={position}
        mode="outlined"
        onChangeText={(text) => setPosition(text)}
      />
      <Button
        style={{ margin: 10 }}
        icon={picture === "" ? "upload" : "check"}
        mode="contained"
        color="#27ae60"
        onPress={() => setModal(true)}
      >
        {picture === "" ? "Upload" : "Uploaded"}
      </Button>

      <Button
        style={{ margin: 10 }}
        icon="content-save"
        mode="contained"
        color="#27ae60"
        onPress={() => submitData()}
      >
        Save
      </Button>
      <Modal
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <View style={styles.modalView}>
          <View style={styles.modalButtonView}>
            <Button
              icon="camera"
              color="#27ae60"
              mode="contained"
              onPress={() => pickFromCamera()}
            >
              camera
            </Button>
            <Button
              icon="image-area"
              mode="contained"
              color="#27ae60"
              onPress={() => pickFromGallery()}
            >
              gallery
            </Button>
          </View>
          <Button color="#27ae60" onPress={() => setModal(false)}>
            cancel
          </Button>
        </View>
      </Modal>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#27ae60",
  },
  ButtonColor: {
    primary: "white",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  InputField: {
    margin: 10,
  },
  modalView: {
    height: "100%",
    marginTop: 2150,
    backgroundColor: "white",
  },
  modalButtonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});

export default CreateEmployee;
