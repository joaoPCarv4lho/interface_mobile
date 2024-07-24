import { useContext, useState } from "react";
import { createProduct } from "../services/productService";
import { UserContext } from "../Context/UserContext";



export default function createProductScreen(){
    const [userId, setUserId] = useContext(UserContext);

    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [image, setImage] = useState();

    // const onSaveImage = async () => {
    //     try{
    //         const localUri = await captureRef(imageRef,{
    //             height: 200,
    //             quality: 1
    //         })
    //         return localUri;
    //     }catch(e){
    //         console.log(e);
    //     }
    // }

    async function handleCreateProduct(){

        // const newImage = onSaveImage()

        if(!productName || !productDescription || !productPrice ) throw new Error("Preencha todos os campos!")

        const product = {
            productName: productName,
            productDescription: productDescription,
            productPrice: productPrice,
            image: newImage
        }

        const [user, setUser] = useState();
        try{
            const response = await createProduct(product, userId);
            const {user} = response.data;
            setUser(user);
            console.log(response);
            if(response.status !== 201){
                alert("Erro ao cadastrar produto");
            }
            alert("Produto cadastrado com sucesso!");
            setProductName("")
            setProductDescription("")
            setProductPrice("")
            setImage("")
            navigation.navigate("profileScreen");
        }catch(error){
            alert("Erro: ", error);
        }
    }
    return(
        <SafeAreaView>
            <View>
                <TextInput
                    label="Digite o nome do produto"
                    value={productName}
                    onChangeText={(text) => setProductName(text)}
                    placeholder="Digite o nome do produto"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
                <TextInput
                    label="Digite a descrição do produto"
                    value={productDescription}
                    onChangeText={(text) => setProductDescription(text)}
                    placeholder="Digite a descrição do produto"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
                <TextInput
                    label="Digite o preço do produto"
                    value={productPrice}
                    onChangeText={(text) => setProductPrice(text)}
                    placeholder="Digite o preço do produto"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
                <View>
                    <Button
                        title="Escolher imagem"
                        onPress={() => {
                            ImagePicker.launchImageLibrary(
                                {
                                    mediaType: 'photo',
                                    allowsEditing: true,
                                    includeBase64: false,
                                    maxHeight: 200,
                                    maxWidth: 200
                                },
                                (response) => {
                                    console.log(response);
                                    setImage(response.uri);
                                }
                            )
                        }}
                    />
                    {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                </View>
                <Button onPress={handleCreateProduct}>Cadastrar Produto</Button>
            </View>
        </SafeAreaView>
    )
}