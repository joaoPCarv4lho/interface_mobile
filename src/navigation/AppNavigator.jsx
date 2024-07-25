import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import HomeScreen from "../screens/homeScreen";
import {ProfileScreen} from "../screens/profileScreen";
import EditProductScreen from "../screens/editProductScreen";

const Stack = createStackNavigator();

export default function AppNavigator(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="loginscreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="registerscreen" component={RegisterScreen} options={{ headerShown: false }}  />
                <Stack.Screen name="homescreen" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="profilescreen" component={ProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="editproductscreen" component={EditProductScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}