import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapsScreen from "/Users/abhinavgurkar/VHAS/Frontend/app/(root)/(tabs)/maps";
import ProfileScreen from "/Users/abhinavgurkar/VHAS/Frontend/app/(root)/(tabs)/profile";



const Stack = createNativeStackNavigator<RootStackParamList>();
export type RootStackParamList = {
    Profile: undefined;
    Maps: undefined;
  };

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Maps" component={MapsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


