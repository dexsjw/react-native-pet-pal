import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { OwnerAuthContext } from "../contexts/OwnerAuthContext";
import { createOwnerAuth } from "../service/PetPalMockService";

function RegisterScreen () {
  const navigate = useNavigation();
  const ownerAuthCtx = useContext(OwnerAuthContext);
  const { ownerAuth, isLoggedIn, authenticateOwner } = ownerAuthCtx;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const createNewOwnerAuth = () => {
    const newOwnerAuth = {
      id: Math.floor(Math.random() * 1000000000),
      email,
      password,
      ownerAuth: Math.floor(Math.random() * 1000000000)
    }
    createOwnerAuth(newOwnerAuth);
  }
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.fieldContainer}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
        />
      </View>
      <View style={styles.fieldContainer}>
      <TextInput
          label="Password"
          value={password}
          onChangeText={password => setPassword(password)}
        />
      </View>
      <View style={styles.button}>
        <Button 
          mode="contained"
          onPress={() => {
            // createNewOwnerAuth();
            navigate.navigate("PetPal");
          }}
        >
          Create
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    margin: 10
  },
  fieldContainer: {
    padding: 5,
    width: "90%"
  },
  button: {
    padding: 5,
    width: "60%"
  }
});

export default RegisterScreen;