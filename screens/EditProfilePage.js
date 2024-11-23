import React, { useState } from "react";
import { View, StyleSheet, ToastAndroid, Alert } from "react-native";
import { TextInput, Button, RadioButton, Text, Card } from "react-native-paper";
import axios from "axios";

const EditProfilePage = ({ route, navigation }) => {
  const { ownerData = {}, petData = {} } = route.params || {};

  const [name, setName] = useState(petData?.name || "");
  const [description, setDescription] = useState(petData?.description || "");
  const [areaLocation, setAreaLocation] = useState(ownerData?.areaLocation || "");
  const [gender, setGender] = useState(petData?.gender || "Male");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name || !areaLocation) {
      Alert.alert("Validation Error", "Pet name and location are required!");
      return;
    }
  
    const updatedProfile = {
      id: ownerData.id,
      name: ownerData.name,
      areaLocation,
      pets: [
        {
          id: petData.id,
          name,
          gender,
          description,
          pictures: petData.pictures,
        },
      ],
    };
  
    const endpoint = `http://192.168.0.227:3000/owners/${ownerData.id}`;
    console.log("Endpoint:", endpoint);
    console.log("Data being sent:", updatedProfile);
  
    setIsSaving(true);
  
    try {
      // const response = await axios.put(endpoint, updatedProfile);
  
      if (response.status === 200) {
        ToastAndroid.show("Profile updated successfully!", ToastAndroid.SHORT);
        navigation.goBack();
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", `Failed to save profile. ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text variant="headlineMedium" style={styles.title}>
            Edit Profile
          </Text>
          <TextInput
            label="Pet Name"
            mode="outlined"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />
          <TextInput
            label="Pet Description"
            mode="outlined"
            value={description}
            onChangeText={(text) => setDescription(text)}
            style={styles.input}
          />
          <TextInput
            label="Location"
            mode="outlined"
            value={areaLocation}
            onChangeText={(text) => setAreaLocation(text)}
            style={styles.input}
          />
          <Text style={styles.label}>Pet Gender</Text>
          <RadioButton.Group
            onValueChange={(value) => setGender(value)}
            value={gender}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton.Item label="Male" value="Male" />
              <RadioButton.Item label="Female" value="Female" />
            </View>
          </RadioButton.Group>
          <Button
            mode="contained"
            onPress={handleSave}
            disabled={isSaving}
            style={styles.saveButton}
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={[styles.saveButton, { marginTop: 8 }]}
          >
            Cancel
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  card: {
    padding: 16,
    borderRadius: 10,
  },
  title: {
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 8,
  },
  radioButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
  },
  saveButton: {
    marginTop: 16,
  },
});

export default EditProfilePage;
