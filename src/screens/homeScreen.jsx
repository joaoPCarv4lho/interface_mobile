import { Text, View, ScrollView, Pressable } from "react-native";
import { useState, useEffect } from "react";
/**
 * import { TextInput } from "react-native-gesture-handler";
 * import MaterialIcons from "react-native-vector-icons/MaterialIcons";
 * import NewArrivalsCard from "../Components/NewArrivalsCard";
 * import { SafeAreaView } from "react-native-safe-area-context";
 */
import { userLogged } from "../services/userService";
import { getAllProducts } from "../services/productService";

export default function HomeScreen(){
    return(
        <View>
            <Text>Home Screen</Text>
        </View>
    )
}