import { View } from "react-native";
import { Text } from "react-native-paper";

function ChatRoom() {
  return (
    <View style={{
      flex: 1,
      padding: 10,
      justifyContent: "center",
      alignContent: "center"
    }}>
      <Text 
        variant="displayMedium"
      >
        Chat feature to be implemented...
      </Text>
    </View>
  )
}

export default ChatRoom;