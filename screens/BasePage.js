import React, { useState, useEffect } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as Location from 'expo-location';
import { useSelector } from "react-redux";
import { setUserLoading } from "../user";
import { GoogleAuthProvider, getAuth, auth, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import GoogleAuth from "./GoogleAuth";
import { addDoc } from 'firebase/firestore';
import { signUpDataRef } from '../FirebaseConfig'
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from 'lottie-react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { getDoc, getDocs, query, where, firestore, collection } from 'firebase/firestore';

const { width, height } = Dimensions.get('window');
WebBrowser.maybeCompleteAuthSession();

const BasePage = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const { userLoading } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const currentUser = auth().user;

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "371654267912-hcpntjul9k7ja78a8trvlb3gdrvva5j3.apps.googleusercontent.com",
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

  // if (location) {
  //   console.log(location)
  // }

  // const checkLocalUser = async () => {
  //   try {
  //     setLoading(true);
  //     const userJSON = await AsyncStorage.getItem("@user");
  //     const userData = userJSON ? JSON.parse(userJSON) : null;
  //     console.log("local storage : ", userData);
  //     setUserInfo(userData);
  //   }
  //   catch (e) {
  //     alert(e.message);
  //   }
  //   finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(FIREBASE_AUTH, credential);
    }
  }, [response]);

  useEffect(() => {
    const unsub = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
      
      // const q = query(signUpDataRef, where('userId', '==', user.uid));
      if (user) {
        console.log(JSON.stringify(user, null, 2));
        setUserInfo(user);
        dispatch(setUserLoading(true));
        const userData = {
          'firstName': user.displayName,
          'lastName': '',
          'emailed': user.email,
          'gender': '',
          'dob': '',
          'userId': user.uid,
        }

        const firstName = userData.firstName;
        const lastName = userData.lastName;
        const dob = userData.dob;
        const gender = userData.gender;
        const emailed = userData.emailed;

        await addDoc(signUpDataRef, {
          firstName,
          lastName,
          dob,
          gender,
          emailed,
          userId: user.uid,
        });
      }
      else {
        console.log("User is not authenticated");
      }
    });

    return () => unsub();
  }, [])
  if (userLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <LottieView style={styles.lottie} source={require('../assets/Animations/plant.json')} autoPlay loop />
        </View>
      </SafeAreaView>);
  }
  return userInfo ? <BasePage /> : <GoogleAuth promptAsync={promptAsync} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.3,
    height: width,
  },
});

export default BasePage;
