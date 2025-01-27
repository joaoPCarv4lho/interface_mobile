import { Button, Text, TextInput } from "react-native-paper";
import { Image, ImageBackground, SafeAreaView, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin } from "../services/userService";
import { styles } from "../../styles";

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    async function handleLogin(){
        const user = {
            email: email,
            password: password,
        }

        try{
            const response = await signin(user);
            console.log(response);
            if(response.status !== 200){
                alert("Erro ao logar usuário");
            }

            const token = response.data.token;
            await AsyncStorage.setItem("authToken", token)
            alert("Usuário logado com sucesso!")

            navigation.navigate("profilescreen");
    }catch(error){
        alert(`Error: ${error.message}`);
    }
}

    return (
            <ImageBackground source={require("../../assets/ImagemFundo.png")} style={styles.container}>
                <View style={styles.container_inner}>
                    <Image source={require("../../assets/ImagemPI.png")} />
                    {/* <Text>{"\n"}</Text>
                <Text>{"\n"}</Text> */}

                    <TextInput
                        label="Digite seu email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder="Digite seu e-mail"
                        style={styles.input}
                        left={<TextInput.Icon
                            icon={"email-outline"}
                        />}
                    />

                    <TextInput
                        label="Digite sua senha"
                        style={styles.input}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder="Digite sua senha"
                        secureTextEntry={hidePassword}
                        right={<TextInput.Icon
                            icon={hidePassword ? "eye" : "eye-off"}
                            onPress={() => setHidePassword(!hidePassword)}
                        />}
                        left={<TextInput.Icon
                            icon={"lock"}
                        />}
                    />

                    <Text>{"\n"}</Text>
                    <Button onPress={handleLogin} textColor="#FFF" mode="outlined" style={styles.button} >LOGAR</Button>
                    <Text>{"\n"}</Text>
                    <Button textColor="#FFF" onPress={() => navigation.navigate("registerscreen")}>
                        Fazer cadastro
                    </Button>
                </View>
            </ImageBackground>
    );
}
