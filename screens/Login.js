import {
    View,
    Text,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Animated,
    Image,
    Dimensions,
    KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState, useEffect } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import Snackbar from 'react-native-snackbar';
import { useSelector, useDispatch } from "react-redux";
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { setUserLoading } from "../user";

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {userLoading} = useSelector(state=> state.user);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const dispatch = useDispatch();

    const handleSubmit = async ()=>{
        if(email && password){
            // good to go
            // navigation.goBack();
            // navigation.navigate('Home');
            try{
                dispatch(setUserLoading(true));
                await signInWithEmailAndPassword(auth, email, password);
                Snackbar.show({
                    text: 'Login Successful',
                    textColor: 'black',
                    backgroundColor: 'darkgreen',
                    duration: Snackbar.LENGTH_SHORT,
                });
                dispatch(setUserLoading(false));
            }catch(e){
                dispatch(setUserLoading(false));
                Snackbar.show({
                    text: e.message,
                    backgroundColor: 'red'
                });
            }
            
        }else{
            // show error
            Snackbar.show({
                text: 'Email and Password are required!',
                backgroundColor: 'red'
            });
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior='padding'>
                {/* <View>
                    <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.backButton}>
                        <Ionicons name="arrow-back" style={styles.arrow} size={24} color="black" />
                        <Text style={styles.back}>Back</Text>
                    </TouchableOpacity>
                </View> */}
                <Image source={require('../assets/env2.png')} style={styles.env2} />
                <Text style={styles.heading}>Welcome Back Saathi!</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        onChangeText={(email) => setEmail(email)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Password" value={password}
                        onChangeText={(password) => setPassword(password)}
                        secureTextEntry={true}
                    />
                </View>
                {userLoading ? (
                    <ActivityIndicator />
                ) : (
                    <>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={styles.appButtonContainer1}
                                title="Login Successfull"
                                onPress={handleSubmit}
                            >
                                <Text style={styles.appButtonText}>Login</Text>
                            </TouchableOpacity>

                            <View style={styles.loginOption}>
                                <Text style={styles.logInText}>Don't have an account?</Text>
                                <TouchableOpacity
                                    style={styles.login}
                                    onPress={() => navigation.navigate("SignUp")}>
                                    <Text style={styles.signup}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    toastContainer: {
        height: 60,
        width: 350,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    toastRow: {
        width: "90%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    toastText: {
        width: "70%",
        padding: 2,
    },
    container: {
        flex: 1,
        justifyContent: "center",
    },
    arrow: {
        alignSelf: "center",
        color: "green",
        paddingLeft: 3,
        marginLeft: 4,
        borderRadius: 10,
        // width: 250,
        borderWidth: 2,
        borderColor: '#D0E7D2',
        backgroundColor: "#D0E7D2",
        // textAlign:'center'
    },
    backButton: {
        marginBottom: 70,
        marginVertical: 50,
        marginLeft: 12,
        height: 30,
        width: 100,
        color: 'green',
        flexDirection: 'row',

    },
    back: {
        paddingHorizontal: 9,
        // paddingVertical: 4,
        paddingBottom: 4,
        fontSize: 17,
        fontWeight: '500',
        color: 'green',
    },
    env2: {
        alignSelf: 'center',
        height: 250,
        width: 300,
    },
    heading: {
        fontSize: 25,
        color: "#07411B",
        alignSelf: "center",
        fontWeight: '900'
    },
    inputWrapper: {
        alignItems: "center",
        // marginLeft: 50,
        marginTop: 40,
    },
    inpText: {
        color: "#34572F",
        fontSize: 10,
        alignSelf: "flex-start",
        marginTop: 14,
    },
    input: {
        backgroundColor: "#D0E7D2",
        width: 280,
        // height:40,
        alignSelf: "center",
        height: 40,
        borderRadius: 10,
        marginTop: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 3
    },
    buttonWrapper: {
        alignItems: "center",
        marginTop: 40,
    },
    appButtonContainer1: {
        backgroundColor: "#07411B",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 10,
        width: 250,
    },
    appButtonText: {
        color: "white",
        alignSelf: "center",
        fontWeight: "bold",
    },
    loginOption: {
        flexDirection: 'row',
    },
    logInText: {
        alignSelf: "center",
        marginTop: 25,
        fontSize: 15,
        marginBottom: 25,
    },
    login: {
        alignSelf: "center",
    },
    signup: {
        alignSelf: "center",
        color: "green",
        marginTop: 25,
        fontSize: 15,
        marginBottom: 25,
        fontWeight: '400',
        textDecorationLine: 'underline'
    }
});