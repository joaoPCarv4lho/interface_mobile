import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getAllProductsByUser } from "../services/productService";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { userLogged } from "../services/userService";
import { Button } from "react-native-paper";


export function ProfileScreen({ navigation }) {
    const { userId, setUserId } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState();
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await userLogged(userId);
                const { user } = response.data;
                setUser(user);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchUserProfile();
    }, []);

    const logout = () => {
        clearAuthToken();
    }

    const clearAuthToken = async () => {
        await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.navigate("login");
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProductsByUser(userId);
                setProducts(response.data.products);
                setLoading(products);
            } catch (error) {
                console.log("error", error);
            }
        }
        fetchProducts();
    }, []);
    console.log("produtos", products)

    return (
        <SafeAreaView className="bg-white h-full p-6 justify-between">
            <View>
                <View className="mt-16 justify-center items-center">
                    <View className="border border-slate-200 rounded-lg">
                        <Image source={user?.img} alt="Foto de usuário" />
                    </View>
                </View>

                <View className="mt-6">
                    <View className="items-center justify-center">
                        <View>
                            <Text className="text-lg font-bold">{user?.name}</Text>
                            <Text className="text-xs font-bold text-gray-500">{user?.email}</Text>
                            <Text>Meus pontos: {user?.points}</Text>
                        </View>
                        <View>
                            <Text className="text-lg font-bold">Meus Produtos</Text>
                            <View>
                                {products.length === 0 && <Text>Você ainda não criou nenhum produto...</Text>}

                                {products.products?.slice(0, 1).map((item) => {
                                    <View key={item._id}>
                                        <Image source={{ uri: item.img }} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                                    </View>
                                })}

                                <Button onPress={() => navigation.navigate("createProductScreen")}>Criar Novo Produto</Button>
                                <Button onPress={logout}>Sair</Button>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}