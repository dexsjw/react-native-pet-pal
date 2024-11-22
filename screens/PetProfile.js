import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Image,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import petProfileStyles from "../styles/petProfileStyles";
// import dog1 from "../assets/dog1.png";
import maleicon from "../assets/maleicon.png";
import femaleicon from "../assets/femaleicon.png";
import { useRoute } from "@react-navigation/native";
import { getOwner, getRandomDog } from "../service/PetPalMockService";

const PetProfile = () => {
  const route = useRoute();
  const { id } = route.params;

  const [pet, setPet] = useState(null);

  useEffect(() => {
    const ownerResponse = getOwner(id).json();
    const randomDog = getRandomDog().json();
    ownerResponse.imageUrl = randomDog.message;
    setPet(ownerResponse);
  }, []);

  // const pet = {
  //   name: "Toby",
  //   age: "10",
  //   location: "Bishan",
  //   gender: "Male",
  //   imageUrl: ""
  //   description:
  //     "My Golden Retriever, Toby, is a bundle of sunshine wrapped in golden fur. He's the perfect mix of energy and gentleness, always ready for an adventure or a snuggle. With his wagging tail and soulful eyes, he brings endless joy and unconditional love to my days.",
  // };

  return (
    <SafeAreaView style={petProfileStyles.container}>
      <View style={petProfileStyles.imageContainer}>
        <ImageBackground
          source={{ uri: pet.imageUrl }} // Replace with your image URL
          style={petProfileStyles.image}
          resizeMode="cover"
        >
          <View style={petProfileStyles.overlay}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text
                style={[
                  petProfileStyles.imageText,
                  { fontSize: 30, fontWeight: "bold" },
                ]}
              >
                {pet.name}{" "}
              </Text>
              <Image
                style={petProfileStyles.genderIcon}
                source={
                  pet.gender.toLowerCase() == "male" ? maleicon : femaleicon
                }
                resizeMode="contain"
              />
            </View>
            <Text style={[petProfileStyles.imageText, { fontSize: 20 }]}>
              {pet.age} years old
            </Text>
            <Text style={[petProfileStyles.imageText, { fontSize: 20 }]}>
              {pet.location}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={petProfileStyles.bottomTextContainer}>
        <Text style={petProfileStyles.bottomText}>{pet.description}</Text>
      </View>
      <Pressable style={petProfileStyles.bottomButton}>
        <Text style={petProfileStyles.bottomButtonText}>Message</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PetProfile;
