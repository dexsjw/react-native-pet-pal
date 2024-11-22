import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Avatar, Text, Button, Card } from "react-native-paper";
import axios from "axios";

const OwnerProfilePage = ({ navigation }) => {
  const [ownerData, setOwnerData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://192.168.0.227:3000/owners/1");
        setOwnerData(response.data);
      } catch (error) {
        console.error("Error fetching owner data:", error);
      }
    };
    fetchData();
  }, []);

  if (!ownerData) {
    return <Text>Loading...</Text>;
  }

  const pet = ownerData.pets && ownerData.pets[0];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Avatar.Image
            size={120}
            source={{ uri: pet?.pictures[0] || "https://picsum.photos/200/200?random=${Math.random()https://picsum.photos/200/200?random=${Math.random()}" }}
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
            onPress={() => navigation.navigate("EditProfile", { ownerData })}
            style={styles.editButton}
          >
            Edit Profile
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
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
  },
});

export default OwnerProfilePage;
