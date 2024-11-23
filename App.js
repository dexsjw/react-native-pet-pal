import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { OwnerAuthProvider } from './contexts/OwnerAuthContext';
import EditProfilePage from './screens/EditProfilePage';
import LoginScreen from './screens/LoginScreen';
import OwnerProfilePage from './screens/OwnerProfilePage';
import PetProfile from './screens/PetProfile';
import PetView from './screens/PetView';
import RegisterScreen from './screens/RegisterScreen';
import ChatRoom from './screens/ChatRoom';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import EditOwnerProfile from './screens/EditOwnerProfile';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PetStack() {
  return (
    <Stack.Navigator initialRouteName="PetView">
      <Stack.Screen
        name="PetView"
        component={PetView} 
        options={{headerShown: false}}
      />
      <Stack.Screen name="PetProfile" component={PetProfile} />
    </Stack.Navigator>
  )
}

function OwnerStack() {
  return (
    <Stack.Navigator initialRouteName="OwnerProfile">
      <Stack.Screen name="OwnerProfile" component={OwnerProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
      <Stack.Screen name="EditOwnerProfile" component={EditOwnerProfile} />
    </Stack.Navigator>
  )
}

function PetPalTabs() {
  return (
    <Tab.Navigator initialRouteName="PetStack">
      <Tab.Screen 
        name="ChatRoom" 
        component={ChatRoom}
        options={{
          title: "Chat",
          tabBarIcon: ({color, size}) => {
            return <Entypo name="chat" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="PetStack"
        component={PetStack} 
        options={{
          headerShown: false,
          title: "Pet Pal",
          tabBarIcon: ({color, size}) => {
            return <MaterialIcons name="pets" size={size} color={color} />
          }
        }}
      />
      <Tab.Screen
        name="OwnerStack"
        component={OwnerStack} 
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({color, size}) => {
            return <AntDesign name="profile" size={size} color={color} />
          }
        }}
      />
    </Tab.Navigator>
  )
}

function RootStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen
        name="PetPal"
        component={PetPalTabs}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <OwnerAuthProvider>
          <NavigationContainer>
            <RootStack />
          </NavigationContainer>
        </OwnerAuthProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
