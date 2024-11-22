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


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function PetStack() {
  return (
    <Stack.Navigator initialRouteName="PetView">
      <Stack.Screen name="PetView" component={PetView} />
      <Stack.Screen name="PetProfile" component={PetProfile} />
    </Stack.Navigator>
  )
}

function OwnerStack() {
  return (
    <Stack.Navigator initialRouteName="OwnerProfile">
      <Stack.Screen name="OwnerProfile" component={OwnerProfilePage} />
      <Stack.Screen name="EditProfile" component={EditProfilePage} />
    </Stack.Navigator>
  )
}

function PetPalTabs() {
  return (
    <Tab.Navigator initialRouteName="PetStack">
      <Tab.Screen name="ChatRoom" component={ChatRoom} />
      <Tab.Screen
        name="PetStack"
        component={PetStack} 
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="OwnerStack"
        component={OwnerStack} 
        options={{headerShown: false}}
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
