import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import HomeScreen from "../screens/homeScreen";
import ProfileScreen from "../screens/profileScreen";
import EditProductScreen from "../screens/editProductScreen";

const Stack = createStackNavigator();

export default function LoginStackNavigator(){
    return (
        <Stack.Navigator initialRouteName="loginscreen" 
        screenOptions={{
            headerStyle: {backgroundColor: "#91c4f8"},
            headerShown: false
        }}
        >
            <Stack.Screen name="loginscreen" component={LoginScreen} />
            <Stack.Screen name="registerscreen" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default function HomeStackScreen(){
    return(
        <Stack.Navigator initialRouteName="homescreen" 
        screenOptions={{
            headerStyle: {backgroundColor: "#91c4f8"},
            headerShown: false
        }}
        >
            <Stack.Screen name="homescreen" component={HomeScreen} />
            <Stack.Screen name="profilescreen" component={ProfileScreen} />
            <Stack.Screen name="editproductscreen" component={EditProductScreen} />
        </Stack.Navigator>
    )
}