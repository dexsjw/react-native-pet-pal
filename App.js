import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OwnerProfilePage from './screens/OwnerProfilePage';
import EditProfilePage from './screens/EditProfilePage';
import 'react-native-gesture-handler';


const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OwnerProfile" component={OwnerProfilePage} />
          <Stack.Screen name="EditProfile" component={EditProfilePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
