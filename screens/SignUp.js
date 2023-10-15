import { View, SafeAreaView, Text, StyleSheet, ActivityIndicator, Dimensions, TextInput, TouchableOpacity, KeyboardAvoidingView, ScrollView } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import { userSignUpData } from '../FirebaseConfig';
import Snackbar from 'react-native-snackbar';
import { addDoc } from "firebase/firestore";
import { useSelector, useDispatch } from "react-redux";
import { ScreenWrapper } from '../screenWrapper';
import { setUserLoading } from "../user";
import DatePicker from 'react-native-modern-datepicker';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function SignUpUser() {
    const { userLoading } = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    // const [loading, setLoading] = useState("");
    const auth = FIREBASE_AUTH;

    const handleSubmit = async () => {
        const userData = {
            'email': email
        }
        if (email) {
            if (password === passwordConfirm) {
                try {
                    dispatch(setUserLoading(true));
                    await createUserWithEmailAndPassword(auth, email, password);
                    Snackbar.show({
                        text: 'Signup Successful',
                        textColor: 'black',
                        backgroundColor: 'darkgreen',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    // setLoading(true);
                    navigation.navigate("UserDetailsSub", { userData });
                    dispatch(setUserLoading(false));
                } catch (e) {
                    dispatch(setUserLoading(false));
                    Snackbar.show({
                        text: e.message,
                        backgroundColor: 'red'
                    });
                }
            }
            else {
                Snackbar.show({
                    text: 'Password does not match',
                    textColor: 'black',
                    backgroundColor: 'red',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }

        }
        else {
            Snackbar.show({
                text: 'Please enter your email and password',
                textColor: 'black',
                backgroundColor: 'red',
                duration: Snackbar.LENGTH_LONG,
            });
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>

                    <Text style={styles.heading}>Create your account:</Text>
                    <View style={styles.inputWrapper}>

                        <Text style={styles.inpText}>Your Email:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="example@gmail.com" value={email}
                            onChangeText={(email) => setEmail(email)}
                        />
                        <Text style={styles.inpText}>Choose Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********" value={password}
                            onChangeText={(password) => setPassword(password)}
                            secureTextEntry={true}
                        />
                        <Text style={styles.inpText}>Confirm Password:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="********" value={passwordConfirm}
                            onChangeText={(passwordConfirm) => setPasswordConfirm(passwordConfirm)}
                            secureTextEntry={true}
                        />

                    </View>

                    {userLoading ? (
                        <View style={{alignItems:'center'}}>
                            <LottieView style={styles.lottie} source={require('../assets/Animations/earth.json')} autoPlay loop />
                        </View>
                    ) : (
                        <>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.appButtonContainer1}
                                    onPress={handleSubmit}
                                >
                                    <Text style={styles.appButtonText}>Sign up with email</Text>
                                </TouchableOpacity>
                                <View style={styles.loginOption}>
                                    <Text style={styles.logInText}>Already Have an account? </Text>
                                    <TouchableOpacity
                                        style={styles.login}
                                        onPress={() => navigation.navigate("Login")}>
                                        <Text style={styles.login}>Log in</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </>
                    )}

                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginTop: 70,
    },
    lottie: {
        justifyContent: "center",
        alignItems: "center",
        width: width * 0.3,
        height: width,
    },
    arrow: {
        alignSelf: "center",
        color: "green",
        paddingLeft: 3,
        marginLeft: 12,
        borderRadius: 10,
        // width: 250,
        borderWidth: 2,
        borderColor: '#D0E7D2',
        backgroundColor: "#D0E7D2"
    },
    backButton: {
        marginBottom: 100,
        marginVertical: 20,
        marginLeft: 3,
        flexDirection: 'row',
        height: 30,
        width: 100,
        color: 'green',
    },
    back: {
        paddingHorizontal: 9,
        // paddingVertical: 4,
        paddingBottom: 4,
        fontSize: 17,
        fontWeight: '500',
        color: 'green',
    },
    heading: {
        fontSize: 38,
        alignSelf: 'center',
        justifyContent: 'center',
        color: '#07411B',
        fontWeight: '800',
        textAlign: 'center',
    },
    inputWrapper: {
        alignItems: "center",
        marginLeft: 50,
        marginTop: 40,
    },
    inpText: {
        // color: "#34572F",
        // fontSize: 15,
        alignSelf: "flex-start",
        // marginTop: 14,
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "rgba(52,87,47,1)",
        fontWeight: "700",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#D0E7D2",
        // opacity:17,
        width: 250,
        alignSelf: "flex-start",
        height: 45,
        //   borderRadius: 10,
        marginTop: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 15,
        borderRadius: 15
    },
    buttonWrapper: {
        alignItems: "center",
        // marginLeft: 50,
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
        fontWeight: '400'
    },
    login: {
        alignSelf: "center",
        color: "green",
        marginTop: 25,
        fontSize: 15,
        marginBottom: 25,
        fontWeight: '400',
        textDecorationLine: 'underline'
    },
});
