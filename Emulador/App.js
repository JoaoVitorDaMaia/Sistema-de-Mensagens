// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "./src/Home";
import LoginCliente from "./src/LoginCliente";
import LoginAtendente from "./src/LoginAtendente";
import ChatCliente from "./src/ChatCliente";
import ChatAtendente from "./src/ChatAtendente";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="LoginCliente" component={LoginCliente} />
        <Stack.Screen name="LoginAtendente" component={LoginAtendente} />
        <Stack.Screen name="ChatCliente" component={ChatCliente} />
        <Stack.Screen name="ChatAtendente" component={ChatAtendente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
