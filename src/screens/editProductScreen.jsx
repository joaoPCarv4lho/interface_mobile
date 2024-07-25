import { Button, TextInput } from "react-native-paper";
import { SafeAreaView, View } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { styles } from "../../styles";
import { UserContext } from "../Context/UserContext";
import { createProduct } from "../services/productService";



export default function EditProductScreen(){
    const {userId, setUserId} = useContext(UserContext);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [image, setImage] = useState();

    async function handleCreateProduct(){

        if(!productName || !productDescription || !image) throw new Error("Preencha todos os campos!")

        const product = {
            productName: productName,
            productDescription: productDescription,
            image: newImage
        }

        const [user, setUser] = useState();
        try{
            const response = await createProduct(product, userId);
            if(response.status !== 201){
                alert("Erro ao cadastrar produto");
            }
            const {user} = response.data;
            setUser(user);
            console.log(response);
            alert("Produto cadastrado com sucesso!");
            setProductName("")
            setProductDescription("")
            setImage("")
            navigation.navigate("profileScreen");
        }catch(error){
            alert(`Error: ${error.message}`);
        }
    }
    return(
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', padding: 16 }}>
            <View style={{ flex: 1, alignItems: "center", marginTop: 24, justifyContent: 'space-around' }}>

                <View style={{ borderColor: 'gray', borderWidth: 1, borderRadius: 8, width: 200, height: 200 }}>
                    <Button style={{width: 200, height: 200}}
                        title="Escolher imagem"
                        onPress={ async () => {
                            ImagePicker.launchImageLibraryAsync(
                                {
                                    mediaType: 'photo',
                                    allowsEditing: true,
                                    includeBase64: false,
                                    maxHeight: 200,
                                    maxWidth: 200
                                }
                            )
                        }}
                    />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>

                <TextInput
                    label="Digite o nome do produto"
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                    placeholder="Digite o nome do produto"
                    style={styles.input}
                />
                <TextInput
                    label="Coloque uma descrição"
                    value={productDescription}
                    onChangeText={(text) => setProductDescription(text)}
                    placeholder="Coloque uma descrição"
                    style={styles.input}
                />

                <Button onPress={handleCreateProduct}>Cadastrar Produto</Button>
            </View>
        </SafeAreaView>
    )
}