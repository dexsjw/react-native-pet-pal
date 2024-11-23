import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Avatar, Text, Button, Card } from "react-native-paper";
import axios from "axios";
import { OwnerAuthContext } from "../contexts/OwnerAuthContext";
import { mockDogUrl, mockOwners, mockPets } from "../mockoon/mockData";
import { useNavigation } from "@react-navigation/native";

const OwnerProfilePage = ({ navigation }) => {
  const navigate = useNavigation();
  const ownerAuthCtx = useContext(OwnerAuthContext);
  const [ownerData, setOwnerData] = useState({});
  const [pets, setPets] = useState(mockPets); // should use pets from owner

  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const response = await axios.get("http://192.168.0.227:3000/owners/1");
    //     setOwnerData(response.data);
    //   } catch (error) {
    //     console.error("Error fetching owner data:", error);
    //   }
    // };
    // fetchData();
    console.log("owner", mockOwners.filter(owner => owner.ownerAuth === ownerAuthCtx.ownerAuth.id))
    setOwnerData(mockOwners.filter(owner => owner.ownerAuth === ownerAuthCtx.ownerAuth.id));
  }, []);

  if (!ownerData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
        <Avatar.Image
          size={120}
          source={{ uri: `https://picsum.photos/200/200?random=${Math.random()}` }}
          style={styles.avatar}
        />
      <Card>
        <Card.Title title={ownerData.name} />
        <Card.Content>
          <Text variant="bodyMedium">Address: {ownerData.areaLocation}</Text>
        </Card.Content>
        <Button
          mode="contained"
          onPress={() => {
            navigate.navigate("EditOwnerProfile");
          }}
        >
          Edit Profile
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigate.navigate("Login");
          }}
        >
          Logout
        </Button>
      </Card>
      <ScrollView contentContainerStyle={styles.container}>
        {pets.map(pet => (
          <Card style={styles.card}>
            <Card.Content>
              <Avatar.Image
                size={120}
                source={{ uri: mockDogUrl }}
                style={styles.avatar}
              />
              <Text variant="headlineMedium" style={styles.textCenter}>
                {pet.name} {pet?.gender === "Female" ? "♀" : "♂"}
              </Text>
              <Text variant="bodyMedium" style={styles.textCenter}>
                {pet?.age} years old
              </Text>
              <Text variant="bodyMedium" style={styles.textCenter}>
                {ownerData.areaLocation}
              </Text>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("EditProfile")}
                style={styles.editButton}
              >
                Edit Profile
              </Button>
            </Card.Content>
          </Card>
        ))}
        </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    elevation: 3,
  },
  avatar: {
    alignSelf: "center",
    marginBottom: 16,
  },
  textCenter: {
    textAlign: "center",
    marginBottom: 8,
  },
  editButton: {
    marginTop: 16,
    alignSelf: "center",
  }
});

export default OwnerProfilePage;
