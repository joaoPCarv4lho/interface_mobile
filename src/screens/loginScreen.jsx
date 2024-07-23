import { Button, Text, TextInput } from "react-native-paper";
import { Image, ImageBackground, View } from "react-native";
import { useState, useEffect, useContext } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import UserContext from "../Context/UserContext";
import { signin } from "../services/userService";
import { styles } from "../../styles";
import { signinSchema } from "../schemas/signinSchema";

export default function LoginScreen({ navigation }) {
    const {
        control,
        handleSubmit: handleSubmitSignin,
        formState: { errors: errorsSignin },
    } = useForm({ resolver: zodResolver(signinSchema)});

    const onSubmit = async data => {
        console.log(data);
        await signin(data);
    }

    // const { currentUser, setCurrentUser } = useContext(UserContext);

    // async function inHanleSubmit(data) {
    //     try {
    //         const response = await signin(data);
    //         Cookies.set("token", response.data, { expires: 1 });
    //         navigation.navigate('homeStack');
    //         if (response.ok) {
    //             console.log("res", res);
    //             setCurrentUser(res.user);
    //             setIsLoggedIn(true);
    //         } else {
    //             console.log("Login failed", res);
    //         }
    //     } catch (error) {
    //         console.log("Error logging in", error);
    //     }
    // }

    return (
        <ImageBackground source={require("../../assets/ImagemFundo.png")} style={styles.container}>
            <View style={styles.container_inner}>
                <Image source={require("../../assets/ImagemPI.png")} />
                {/* <Text>{"\n"}</Text>
                <Text>{"\n"}</Text> */}
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            label="Email"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            placeholder="Digite seu e-mail"
                            style={styles.input}
                            left={<TextInput.Icon
                                icon={"email-outline"}
                            />}
                        />
                    )}
                />
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Digite seu e-mail"
                    style={styles.input}
                    left={<TextInput.Icon
                        icon={"email-outline"}
                    />}
                />
                <TextInput
                    label="Senha"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
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
                <Button textColor="#FFF" mode="outlined" style={styles.button} onPress={handleLogin}>LOGAR</Button>
                <Text>{"\n"}</Text>
                <Button textColor="#FFF" onPress={() => navigation.navigate("registroscreen")}>
                    Fazer cadastro
                </Button>
            </View>
        </ImageBackground>
    );
}
