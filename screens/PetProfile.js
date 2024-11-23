import React, { useState, useEffect, useContext } from "react";
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
import { mockDogUrl, mockOwners } from "../mockoon/mockData";
import { OwnerAuthContext } from "../contexts/OwnerAuthContext";

const PetProfile = ({ route }) => {
  // const route = useRoute();
  // const { id } = route.params || {};

  // const [owner, setOwner] = useState(null);

  // useEffect(() => {
  //   const ownerResponse = getOwner(id).json();
  //   const randomDog = getRandomDog().json();
  //   ownerResponse.pets[0].imageUrl = randomDog.message;
  //   setPet(ownerResponse);
  // }, []);
  
  const ownerAuthCtx = useContext(OwnerAuthContext);
  const { allOwnerAuth } = ownerAuthCtx;

  const pet = route?.params?.pet || { gender: "" };
  const [owner, setOwner] = useState({});

  useEffect(() => {
    console.log("pet pet", pet)
    // for (const o of mockOwners) {
    //   for (const p of owner.pets) {
    //     if (p.id === pet.id) {
    //       setOwner(o);
    //     }
    //   }
    // }
    // mockOwners.map(o => {
    //   console.log("owner", o)
    //   o.pets.map(p => {
    //     console.log("P pet", pet);
    //     if (p.id === pet.id) {
    //       setOwner(o);
    //     }
    //   });
    // })
    console.log(owner);
  }, []);

  // const pet = {
  //   name: "Toby",
  //   age: "10",
  //   areaLocation: "Bishan",
  //   gender: "Male",
  //   imageUrl: ""
  //   description:
  //     "My Golden Retriever, Toby, is a bundle of sunshine wrapped in golden fur. He's the perfect mix of energy and gentleness, always ready for an adventure or a snuggle. With his wagging tail and soulful eyes, he brings endless joy and unconditional love to my days.",
  // };

  return (
    <SafeAreaView style={petProfileStyles.container}>
      <View style={petProfileStyles.imageContainer}>
        <ImageBackground
          // source={{ uri: owner.pets[0].imageUrl }} // Replace with your image URL
          source={{ uri: mockDogUrl }} // Replace with your image URL
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
                {owner.name}{" "}
              </Text>
              <Image
                style={petProfileStyles.genderIcon}
                source={
                  // owner.pets[0].gender.toLowerCase() == "male" ? maleicon : femaleicon
                  pet.gender == "male" ? maleicon : femaleicon
                }
                resizeMode="contain"
              />
            </View>
            <Text style={[petProfileStyles.imageText, { fontSize: 20 }]}>
              {/* {owner.pets[0].age} years old */}
              {pet.age} years old
            </Text>
            <Text style={[petProfileStyles.imageText, { fontSize: 20 }]}>
              {owner.areaLocation}
            </Text>
          </View>
        </ImageBackground>
      </View>
      <View style={petProfileStyles.bottomTextContainer}>
        {/* <Text style={petProfileStyles.bottomText}>{owner.pets[0].description}</Text> */}
        <Text style={petProfileStyles.bottomText}>{pet.description}</Text>
      </View>
      <Pressable style={petProfileStyles.bottomButton}>
        <Text style={petProfileStyles.bottomButtonText}>Message</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PetProfile;
