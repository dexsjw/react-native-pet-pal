import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, TextInput } from "react-native-paper";
import { OwnerAuthContext } from "../contexts/OwnerAuthContext";
import pawIcon from "../assets/paw-icon.png"

function LoginScreen({ route }) {
  const navigate = useNavigation();
  const ownerAuthCtx = useContext(OwnerAuthContext);
  const { ownerAuth, isLoggedIn, authenticateOwner } = ownerAuthCtx;

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  return (
    <View style={styles.mainContainer}>
      <Avatar.Image 
        style={styles.avatarImage}
        size={200} 
        source={pawIcon}
      />
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
            authenticateOwner(email, password);
            console.log("isLoggedIn", isLoggedIn);
            if (isLoggedIn) {
              navigate.navigate("PetPal", {ownerAuth});
            }
            navigate.navigate("PetPal", {ownerAuth});
          }}
        >
          Login
        </Button>
      </View>
      <View style={styles.button}>
        <Button 
          mode="contained"
          onPress={() => {
            navigate.navigate("Register");
          }}
        >
          Register
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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

export default LoginScreen;