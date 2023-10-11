import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Button,
  Image,
} from "react-native";
// import { useEffect, useState } from "react";
// import { StyleSheet, Text, View, Button, Image } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from 'expo-location';

WebBrowser.maybeCompleteAuthSession();

const BasePage = ({ navigation, route }) => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState("");
  const [loading, setLoading] = useState(false)
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [navi, setNavi] = useState(null);

  const userData = {
    'name': userInfo.name,
    'email' : userInfo.email,
  }

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "660356380091-gnm5t5ap6ldv3furuh9s782g1s8hpd0t.apps.googleusercontent.com",
    webClientId: '660356380091-stuu31290s7uclfvuf3dmvj34bsihdgg.apps.googleusercontent.com',
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setError('Permission to access location was denied!')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
    })();
  }, [])

  if (location) {
    console.log(location)
  }

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
      await AsyncStorage.setItem("@user", JSON.stringify(user));
    } catch (error) {
    }
  };

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("userdata", user);
    if (!user) {
      if (response?.type === "success") {
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  if (loading) {
    return (
      <View style={styles.loadCircle}>
        <ActivityIndicator size={'large'} color={'blue'} />
      </View>
    )
  }
  else {
    return (
      <SafeAreaView style={styles.container}>
        <Image source={require("../assets/env1.png")} style={styles.env1} />
        <View>
          <Text style={styles.heading}>EcoSaathi</Text>
          <Text style={styles.heading2}>Where Eco meets Social</Text>
          <View style={styles.loginOption}>
            <Text style={styles.logInText}>Already Have an account?</Text>
            <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText2}>Log in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.appButtons}>
          <TouchableOpacity
            style={styles.appButtonContainer1}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={styles.appButtonText}>Sign up with email</Text>
          </TouchableOpacity>

        </View>
        <View style={styles.appButtons}>

          <TouchableOpacity style={styles.appButtonContainer2}
            title="Sign in with Google"
            disabled={!request}
            onPress={() => {

              promptAsync().then((result) => {
                if(result){
                  navigation.navigate('SurveyPage', {userData});
                }
                else{
                  navigation.navigate('BasePage');
                }
              })
            }}
          >
            <Image
              style={styles.buttonImageIconStyle}
              source={require("../assets/google.png")}
            />
            <Text style={styles.appButtonText2}>Sign up with Google</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  env1: {
    alignSelf: "center",
    height: 300,
    width: 400,
  },
  heading: {
    fontSize: 35,
    alignSelf: "center",
    color: "#07411B",
    fontWeight: "900",
  },
  heading2: {
    fontSize: 20,
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(52,87,47,1)",
    fontWeight: "900",
    textAlign: "center",
  },
  loginOption: {
    flexDirection: "row",
  },
  logInText: {
    marginTop: 25,
    alignSelf: "center",
    fontSize: 15,
    marginBottom: 25,
  },
  login: {
    alignSelf: "center",
  },
  loginText2: {
    fontSize: 17,
    fontWeight: "bold",
    color: "green",
    marginLeft: 10,
  },
  appButtons: {
    alignItems: "center",
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
  buttonImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 15,
    width: 38,
    resizeMode: "stretch",
  },
  appButtonContainer2: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    width: 250,
    borderWidth: 2,
    borderColor: "#07411B",
    flexDirection: "row",
  },
  appButtonText2: {
    color: "#07411B",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default BasePage;
