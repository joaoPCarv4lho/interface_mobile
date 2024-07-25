import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getAllProductsByUser } from "../services/productService";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { userLogged } from "../services/userService";
import { Button } from "react-native-paper";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function ProfileScreen({ navigation }) {
    const { userId, setUserId } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userId) {
                console.log("User ID is not defined");
                return;
            }
            try {
                const response = await userLogged(userId);
                setUser({
                    name: response.name,
                    email: response.email,
                    img: response.img,
                    points: response.points,
                    username: response.username
                });
                setUserId(user._id)
            } catch (error) {
                console.error("Error fetching user profile:", error);
                alert("Erro ao carregar perfil do usuário.");
            }
        }
        fetchUserProfile();
    }, [userId, setUserId]);

    const logout = () => {
        clearAuthToken();
    }

    const clearAuthToken = async () => {
        try{
            await AsyncStorage.removeItem("authToken");
        console.log("auth token cleared");
        navigation.navigate("loginscreen");
    }catch(error){
        console.error("Error clearing auth token", error);
        alert("Erro ao deslogar usuário.");
    }
    };

    useEffect(() => {
        const fetchProducts = async () => {
            if (!userId) {
                console.log("User ID is not defined");
                return;
            }
            try {
                const response = await getAllProductsByUser(userId);
                setProducts(response.data.products);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                alert("Erro ao carregar produtos.");
            }
        }
        fetchProducts();
    }, [userId]);

    console.log("produtos", products);

    if (!userId) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', padding: 16 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Error: User ID is not defined</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
            <View style={{ flex: 1, justifyContent: 'space-between' }}>
                <View style={{ marginTop: 16, alignItems: 'center' }}>
                    <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 8 }}>
                        <Image source={{ uri: user?.img }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                    </View>
                </View>

                <View style={{ marginTop: 24 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user?.name}</Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{user?.username}</Text>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'gray' }}>{user?.email}</Text>
                        <Text>Meus pontos: {user?.points}</Text>
                    </View>
                    <View style={{ marginTop: 24, gap: 5}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Minhas Doações</Text>
                        {products.length === 0 ? (
                            <Text>Você ainda não doou nenhum produto...</Text>
                        ) : (
                            products.slice(0, 1).map((item) => (
                                <View key={item._id}>
                                    <Image source={{ uri: item.img }} style={{ width: 80, height: 80, resizeMode: "contain" }} />
                                </View>
                            ))
                        )}
                        <Button mode="contained" onPress={() => navigation.navigate("editproductscreen")}>Criar Novo Produto</Button>
                        <Button mode="contained" onPress={logout}>Sair</Button>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
