import { Image, ImageBackground, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useState } from "react";
import { signup } from "../services/userService";
import {styles} from "../../styles";

export default function RegisterScreen({ navigation }){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [hidePassword, setHidePassword] = useState(true);

    async function handleRegister(){
        const user = {
            name,
            username,
            email,
            password
        }

        try{
        const response = await signup(user);
        console.log(response);
        if(response.status !== 201){
            alert("Erro ao cadastrar usuário");
        }
        alert("Usuário cadastrado com sucesso!");
        setName("")
        setUsername("")
        setEmail("")
        setPassword("")
        navigation.navigate("loginscreen");
    }catch(error){
        alert(`Error: ${error.message}`);
    }
    }

    return(
        <ImageBackground source={require("../../assets/ImagemFundo.png")} style={styles.container}>
            <View style={styles.container_inner}>
                <Image source={require("../../assets/ImagemPI.png")} />
                <TextInput
                    label="Digite seu nome"
                    value={name}
                    onChangeText={(text) => setName(text)}
                    placeholder="Digite seu nome"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />
                <TextInput
                    label="Digite um nome de usuário"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                    placeholder="Digite seu nome"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"account"}
                    />}
                />

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
                <Button textColor="#FFF" mode="outlined" style={styles.button} onPress={handleRegister} >CADASTRAR</Button>
                <Text>{"\n"}</Text>
                <Button textColor="#FFF" onPress={() => navigation.navigate("loginscreen")}>
                    Já tenho cadastro
                </Button>
            </View>
        </ImageBackground>
    )
}