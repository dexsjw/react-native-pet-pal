import { ScrollView, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { mockDogUrl, mockOwners, mockPets } from "../mockoon/mockData";
import { useCallback, useContext, useEffect, useState } from "react";
import { getRandomDog } from "../service/PetPalMockService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { OwnerAuthContext } from "../contexts/OwnerAuthContext";

function PetView({ route }) {
  // const insets = useSafeAreaInsets();
  const navigate = useNavigation();
  const ownerAuthCtx = useContext(OwnerAuthContext);

  const {ownerAuth} = route?.params || {};
  const [pets, setPets] = useState([]);

  // useFocusEffect(
  //   useCallback(() => {
  //     if (!ownerAuthCtx.isLoggedIn) {
  //       navigate.navigate("Login")
  //     }
  //   }, [])
  // );

  useEffect(() => {
    setPets(mockPets);
  }, [])

  return (
    <ScrollView style={{marginTop: 50}}>
      {pets.map(pet => (
        <Card 
          key={pet.id}
          onPress={() => {
            console.log("petView", pet);
            navigate.navigate("PetProfile", { pet })
          }}
        >
          <Card.Cover source={{ uri: mockDogUrl }} />
          <Card.Title title={pet.name} />
          <Card.Content>
            <Text variant="bodyMedium">Gender: {pet.gender}</Text>
            <Text variant="bodyMedium">Age: {pet.age}</Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  )
}

export default PetView;