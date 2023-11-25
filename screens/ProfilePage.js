import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Dimensions, ImageBackground } from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { colors } from "../index";
import { signOut } from 'firebase/auth';
// import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from '@react-navigation/native';
// import { signOut } from 'firebase/auth';
import FIREBASE_APP, { FIREBASE_AUTH, FIREBASE_DB, signUpDataRef } from '../FirebaseConfig';
import { useSelector, useDispatch } from 'react-redux';
import { getDoc, getDocs, query, where, Firestore, collection } from 'firebase/firestore';
import { setUserLoading } from "../user";

const percentage = 55;
const points = 0;

export default function ProfilePage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();

  const fetchEvents = async () => {
    console.log(user.uid)
    const q = query(signUpDataRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach(doc => {
      // console.log('documement: ',doc.data());
      data.push({ ...doc.data(), id: doc.id })
    })
    setEvents(data);
    console.log(data);
  }

  useEffect(() => {
    if (isFocused)
      fetchEvents();
  }, [isFocused])

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    dispatch(setUserLoading(false));
    navigation.navigate("BasePage");
  }
  return (
    <SafeAreaView style={styles.container}>
      <View >
        <TouchableOpacity onPress={() => handleLogout()}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
      <View>
        <ImageBackground
          source={require("../assets/greenleaves1.jpg")}
          style={styles.profileBackground}
        />
        <View style={[styles.profileView, styles.shadowProp]}>
          <Image
            style={styles.profileimage}
            source={require("../assets/ria.png")}
          />

          <View>
            {events.map((item) => (
              <Text style={styles.personName} key={item.id}>{item.firstName + " " + item.lastName}</Text>
            ))}
            {events.map((item) => (
              <Text style={styles.personLocation} key={item.id}>{item.emailed}</Text>
            ))}
          </View>


        </View>
      </View>
      <View>
        <Text style={styles.heading1}>Saathi Score</Text>
      </View>
      <View style={styles.perCircle}>
        <ProgressCircle
          percent={percentage}
          radius={100}
          borderWidth={15}
          color="#57B894"
          shadowColor="#34572F"
          bgColor="#fff"
        >
          <Text style={styles.perText}>{percentage}%</Text>
        </ProgressCircle>
      </View>
      <View style={styles.points}>
        <Text style={styles.pointHeading}>Points:  {points}</Text>
        <TouchableOpacity style={styles.addcontainer}>
          <Text style={styles.add}>+Add</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginBottom: 70,
    marginVertical: 50,
    marginRight: 12,
    height: 30,
    width: 100,
    color: 'green',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align contents to the right
    alignItems: 'center', // Vertically center the contents
  },
  back: {
    paddingHorizontal: 9,
    // paddingVertical: 4,
    paddingBottom: 4,
    fontSize: 17,
    fontWeight: '500',
    color: 'green',


  },
  add: {
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: '#D0E7D2',
    color: "white",
  },
  addcontainer: {
    backgroundColor: "#07411B",
    borderWidth: 3,
    borderRadius: 20,
    width: 60,
    marginRight: -40,
    // justifyContent:'right'
  },
  points: {
    borderRadius: 50,
    height: 30,
    alignItems: "center",
    justifyContent: 'center',
    width: 200,
    marginLeft: 80,
    marginTop: 40,
    borderColor: '#D0E7D2',
    backgroundColor: "#D0E7D2",
    flexDirection: 'row',
  },
  profileBackground: {
    height: 200,
    width: Dimensions.get("window").width,
  },
  heading1: {
    fontSize: 25,
    fontWeight: '900',
    color: "#34572F",
    marginTop: 50,
    textAlign: 'center',
    marginBottom: -50,
  },
  profileimage: {
    height: 70,
    width: 70,
    marginTop: -90,
    marginBottom: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black"
  },
  profileView: {
    backgroundColor: "#D9D9D9",
    width: 300,
    height: 180,
    marginTop: -60,
    marginLeft: 30,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 80,
    borderRadius: 20,
  },
  shadowProp: {
    shadowColor: "black",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  personName: {
    fontSize: 15,
    marginTop: -8,
    fontWeight: '900',
    color: "green",
    textAlign: "center",
    justifyContent: "center",
  },
  personLocation: {
    fontSize: 15,
    fontWeight: '600',
    color: "green"
  },
  perText: {
    fontSize: 40,
    color: 'grey'
  },
  perCircle: {
    marginTop: 70,
    marginLeft: 80
  },
  pointHeading: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 16,
    fontWeight: '900',
    marginRight: 10
  }
});
