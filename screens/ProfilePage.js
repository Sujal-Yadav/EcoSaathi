import React, { useState, useEffect } from "react";
import { FAB } from '@rneui/themed';
import {
  Pressable,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import ProgressCircle from "react-native-progress-circle";
import { colors } from "../index";
import { signOut } from "firebase/auth";
import { Icon } from "@rneui/themed";
// import { FIREBASE_AUTH } from "../FirebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
// import { signOut } from 'firebase/auth';
import FIREBASE_APP, {
  FIREBASE_AUTH,
  FIREBASE_DB,
  signUpDataRef,
} from "../FirebaseConfig";
import { useSelector, useDispatch } from "react-redux";
import {
  getDoc,
  getDocs,
  query,
  where,
  Firestore,
  collection,
} from "firebase/firestore";
import { setUserLoading } from "../user";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Avatar, Button, Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
const Tab = createMaterialTopTabNavigator();
const percentage = 55;
const points = 0;

const Posts = () => {
  const photos = [
    {
      key: "1",
      image: require("../assets/sih2.jpg"),
    },
    {
      key: "2",
      image: require("../assets/sih1.jpg"),
    },
    {
      key: "3",
      image: require("../assets/sih3.jpg"),
    },
    {
      key: "4",
      image: require("../assets/sih2.jpg"),
    },
    {
      key: "5",
      image: require("../assets/sih3.jpg"),
    },
    {
      key: "6",
      image: require("../assets/sih3.jpg"),
    },
    {
      key: "6",
      image: require("../assets/sih3.jpg"),
    },
    {
      key: "6",
      image: require("../assets/sih3.jpg"),
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      {/* <ScrollView> */}
      <FlatList
        style={styles.box}
        keyExtractor={(item) => item.key}
        data={photos}
        numColumns={3}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={{ flex: 1 / 3, aspectRatio: 1, margin: 1 }}
            >
              {/* <View style={{flex: 1/3,aspectRatio: 1,margin: 1}}> */}
              <Image
                source={item.image}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: 5,
                  marginTop: 0,
                }}
              />
              {/* </View> */}
            </TouchableOpacity>
          );
        }}
      />
      {/* </ScrollView> */}
    </View>
  );
};

const Saathi_score = () => {
  return (
    // <SafeAreaView>
    // <ScrollView>
    <View>
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
        <Text style={styles.pointHeading}>Points: {points}</Text>
        <TouchableOpacity style={styles.addcontainer}>
          <Text style={styles.add}>+Add</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </ScrollView>

    // </SafeAreaView>
  );
};
const Redeemed_coupans = () => {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
  const Coupons = [
    {
      key: 1,
      image: require("../assets/swiggy.png"),
      company: "Swiggy",
      desc: "Get upto 60% off",
    },
    {
      key: 2,
      image: require("../assets/Zomato_logo.png"),
      company: "Zomato",
      desc: "Get upto 60% off",
    },
    {
      key: 3,
      image: require("../assets/myntra.jpg"),
      company: "Myntra",
      desc: "Get upto 60%",
    },
    {
      key: 4,
      image: require("../assets/barbeque_nation.jpg"),
      company: "Barbeque Nation",
      desc: "Get upto 60%",
    },
    {
      key: 4,
      image: require("../assets/barbeque_nation.jpg"),
      company: "Barbeque Nation",
      desc: "Get upto 60%",
    },
    {
      key: 4,
      image: require("../assets/barbeque_nation.jpg"),
      company: "Barbeque Nation",
      desc: "Get upto 60%",
    },
  ];
  return (
    <SafeAreaView>
      <View>
        <FlatList
          keyExtractor={(item) => item.key}
          data={Coupons}
          numColumns={2}
          renderItem={({ item }) => {
            const { image, company, desc } = item;
            return (
              <View style={{ flex: 1 / 2, padding: 10 }}>
                <Card style={{ height: "auto", backgroundColor: "white" }}>
                  {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
                  {/* <Card.Cover style={styles.Couponsimage} source={item.image} /> */}
                  <Image
                    style={styles.Couponsimage}
                    resizeMode="contain"
                    source={item.image}
                  />
                  <Card.Content>
                    <Text style={{ fontWeight: "bold", fontSize: 17 }}>
                      {item.company}
                    </Text>
                    <Text variant="bodyMedium">{item.desc}</Text>
                  </Card.Content>
                  <View style={{ alignSelf: "center", margin: 10 }}>
                    <TouchableOpacity style={styles.reedem}>
                      <Text style={{ color: "green" }}>Reedem</Text>
                    </TouchableOpacity>
                  </View>
                </Card>

                {/* </View> */}
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
  const events = [
    {
      key: "1",
      title: "Zomato",
      desc: "Get flat 60% off",
      image: require("../assets/sih2.jpg"),
    },
    {
      key: "2",
      title: "Zomato",
      desc: "Get flat 60% off",
      image: require("../assets/sih1.jpg"),
    },
    {
      key: "3",
      title: "Zomato",
      desc: "Get flat 60% off",
      image: require("../assets/sih3.jpg"),
    },
    {
      key: "4",
      title: "Zomato",
      desc: "Get flat 60% off",
      image: require("../assets/sih2.jpg"),
    },
    {
      key: "5",
      title: "Zomato",
      desc: "Get flat 60% off",
      image: require("../assets/sih3.jpg"),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.box}
        keyExtractor={(item) => item.key}
        data={events}
        renderItem={({ item }) => {
          const { company_name, desc, image } = item;
          return (
            <View>
              <View
                style={{
                  backgroundColor: "#34572F",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Image style={styles.image} source={item.image} />
                {/* </View>
              <View style={styles.textContainer}> */}
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <TouchableOpacity style={styles.participate}>
                  <Text style={styles.participateText}>Reedem</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default function ProfilePage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [events, setEvents] = useState([]);
  const isFocused = useIsFocused();
  const [visible, setVisible] = React.useState(true);

  const fetchEvents = async () => {
    console.log(user.uid);
    const q = query(signUpDataRef, where("userId", "==", user.uid));
    const querySnapshot = await getDocs(q);
    let data = [];
    querySnapshot.forEach((doc) => {
      // console.log('documement: ',doc.data());
      data.push({ ...doc.data(), id: doc.id });
    });
    setEvents(data);
    console.log(data);
  };

  useEffect(() => {
    if (isFocused) fetchEvents();
  }, [isFocused]);

  const handleLogout = async () => {
    await signOut(FIREBASE_AUTH);
    dispatch(setUserLoading(false));
    navigation.navigate("BasePage");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <View styles={(positon = "relative")}>
        <Button
          style={styles.logoutbutton}
          theme={{ colors: { primary: "#D0E7D2" } }}
          onPress={() => console.log("Pressed")}
        >
          Logout
        </Button>
      </View>
      <Icon style={styles.logoutbutton} color="#517fa4" name="logout" />
      <View styles={(positon = "absolute")}>
        <ImageBackground
          source={require("../assets/greenleaves1.jpg")}
          style={styles.profileBackground}
        />
        <Button
          icon="logout"
          style={styles.logoutbutton}
          theme={{ colors: { primary: "#D0E7D2" } }}
          mode="contained"
          onPress={() => console.log("Pressed")}
        ></Button>

        <View style={[styles.profileView, styles.shadowProp]}>
          <Image
            style={styles.profileimage}
            source={require("../assets/ria.png")}
          />
          <Icon
            name="star"
            size={30}
            color="gold"
            style={{ position: "absolute", top: 10, right: 10 }}
          />

          <View>
            {events.map((item) => (
              <Text style={styles.personName} key={item.id}>
                {item.firstName + " " + item.lastName}
              </Text>
            ))}
            {events.map((item) => (
              <Text style={styles.personLocation} key={item.id}>
                {item.emailed}
              </Text>
            ))}
          </View>
        </View>
      </View> */}

      <View style={{ position: 'relative' }}>

        <ImageBackground
          source={require("../assets/greenleaves1.jpg")}
          style={styles.profileBackground}
        />
        <TouchableOpacity style={styles.topRightButton}>
          <Text>Logout</Text> 
        </TouchableOpacity>

        {/* <Button
            icon="logout"
            style={styles.logoutButton}
            theme={{ colors: { primary: '#D0E7D2' } }}
            mode="contained"
            onPress={() => console.log('Pressed')}
          >
            Logout
          </Button> */}

        <View style={[styles.profileView, styles.shadowProp]}>
          <Image
            style={styles.profileimage}
            source={require("../assets/ria.png")}
          />
          {/* <Icon
            name="star"
            size={30}
            color="gold"
            style={{ position: 'absolute', top: 10, right: 10 }}
          /> */}
          <View>
            <Text style={styles.personName}>Ria Pahujani</Text>
            <Text style={styles.personLocation}>Dehradun</Text>
          </View>


        </View>

      </View>

      <Tab.Navigator
        style={styles.Tab}
        screenOptions={{
          tabBarActiveTintColor: "#57B894",
          tabBarInactiveTintColor: "#34572F",
          tabBarLabelStyle: { textAlign: "center" },
          tabBarIndicatorStyle: {
            borderBottomColor: "#C2D5A8",
            borderBottomWidth: 3,
          },
          // tabBarStyle: { backgroundColor: COLORS.White },

          tabBarLabelStyle: {
            textTransform: "none",
            fontSize: 13,
          },
        }}
      >
        <Tab.Screen style={styles.Tab_heading} name="Posts" component={Posts} />
        <Tab.Screen
          style={styles.Tab_heading}
          name="My Coupons"
          component={Redeemed_coupans}
        />
        <Tab.Screen
          style={styles.Tab_heading}
          name="Score"
          component={Saathi_score}
        />
      </Tab.Navigator>
      <View style={styles.gap}></View>
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topRightButton: {
    position: 'absolute',
    top: 10, // Adjust the top distance as needed
    right: 10, // Adjust the right distance as needed
    backgroundColor: 'transparent', // Set background color as needed
    padding: 10,
    // Add other styles for your button as needed
  },
  profileBackground: {
    width: '100%',
    height: '100%',
  },

  shadowProp: {
    // Add any shadow styles if needed
  },
  profileimage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  personName: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  personLocation: {
    color: 'white',
    fontSize: 14,
  },


  profileView: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,

  },
  reedem: {
    // fontWeight:'500',
    borderColor: "green",
    borderWidth: 1.2,
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    // margin:20,
    // marginVertical:20,
    // marginHorizontal: 20,
    alignItems: "flex-start",
    justifyContent: "center",
    // flexWrap:'wrap',
    width: 175,
    textAlignVertical: "center",
  },
  gap: {
    margin: 10,
  },
  box: {
    // backgroundColor:"blue",
    // height:"auto"
    flex: 1 / 2,
  },
  participate: {
    backgroundColor: "#D0E7D2",
    // paddingHorizontal: 10,
    // paddingVertical: 12,
    borderWidth: 1.5,
    borderRadius: 20,
    width: 100,
    marginVertical: 8,
    // paddingLeft: 0,
    alignContent: "center",
    alignItems: "center",
  },
  Couponsimage: {
    marginTop: 10,
    width: "auto",
    height: 120,
    alignItems: "center",
  },
  image: {
    height: 130,
    width: 130,
    // borderColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    padding: 3,

    // alignContent:'center',
    // justifyContent:'center',
    // position:'absolute',
    // alignSelf:'center',
    // right:0
  },
  imageContainer: {
    // marginHorizontal:260,
    // margin:20
    // alignContent:'right',
    // alignItems:'center'
    // padding:(12 , 50, 12, 50),
    // borderColor:'green',
    // borderWidth:2,
    // borderRadius:50,
    // justifyContent: 'center',
    // alignSelf: 'center',
    // alignItems: 'center',
    // position: 'relative',
    // right: 20,
    // borderColor:'green',
    // borderwidth:80,
  },

  text: {
    paddingTop: 50,
    paddingHorizontal: 50,
    // alignSelf:'left',
    fontSize: 25,
    // marginVertical:8,
    fontWeight: "900",
  },
  title: {
    fontSize: 16,
    fontWeight: "900",
    textShadowColor: "black",
    // textShadowOffset:"0.6",
    color: "black",
    // marginLeft:20,
    // marginTop:-60
    marginVertical: 8,
    flexWrap: "wrap-reverse",
  },
  desc: {
    fontSize: 12,
    color: "green",
    fontWeight: "900",
    // marginLeft:20
    marginVertical: 3,
    // textShadowOffset:0.3/,
  },
  location: {
    fontSize: 12,
    // marginLeft:20
  },
  eventsContainer: {
    backgroundColor: "#D9D9D9",
    borderwidth: 3,
    borderRadius: 20,
    // height: 'auto',
    justifyContent: "center",
    // rowGap:10,
    marginVertical: 10,
    borderColor: "black",
    // flexDirection:'row',
  },
  Tab: {
    marginTop: 10,
    marginHorizontal: 7,
    // borderRadius: 20,
    // fontSize:10,
  },
  Tab_heading: {
    fontSize: 10,
  },
  backButton: {
    marginBottom: 70,
    marginVertical: 50,
    marginRight: 12,
    height: 30,
    width: 100,
    color: "green",
    flexDirection: "row",
    justifyContent: "flex-end", // Align contents to the right
    alignItems: "center", // Vertically center the contents
  },
  back: {
    paddingHorizontal: 9,
    // paddingVertical: 4,
    paddingBottom: 4,
    fontSize: 17,
    fontWeight: "500",
    color: "green",
  },
  add: {
    textAlign: "center",
    justifyContent: "center",
    borderColor: "#D0E7D2",
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
  logoutbutton: {
    position: "relative",
    textAlign: "right",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
    // borderColor: "#D0E7D2",
    // color: "black",
    // backgroundColor: "#07411B",
    // borderWidth: 3,
    // borderRadius: 20,
    width: 30,
    backgroundColor: "#D9D9D9",
    // height:60,
    // marginRight: -40,
  },
  logoutcontainer: {
    // alignItems:"flex-start",
    // alignSelf:'flex-end',
    // justifyContent:'flex-end',
    backgroundColor: "#07411B",
    borderWidth: 3,
    borderRadius: 20,
    width: 60,
    marginRight: -40,
  },
  points: {
    borderRadius: 50,
    height: 30,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    width: 200,
    // marginLeft: 80,
    marginVertical: 40,
    borderColor: "#D0E7D2",
    backgroundColor: "#D0E7D2",
    flexDirection: "row",
  },
  profileBackground: {
    height: 120,
    width: Dimensions.get("window").width,
  },
  heading1: {
    fontSize: 25,
    fontWeight: "900",
    color: "#34572F",
    marginTop: 0,
    textAlign: "center",
    marginBottom: -50,
  },
  profileimage: {
    height: 70,
    width: 70,
    marginTop: -90,
    marginBottom: 40,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "black",
  },
  profileView: {
    backgroundColor: "#D9D9D9",
    width: 300,
    height: 180,
    marginTop: -20,
    // marginLeft: 30,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 80,
    borderRadius: 20,
    // borderStyle:'solid',
    // borderColor:'black',
    // borderWidth:2
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
    fontWeight: "900",
    color: "green",
  },
  personLocation: {
    fontSize: 15,
    fontWeight: "600",
    color: "green",
  },
  perText: {
    fontSize: 40,
    color: "grey",
  },
  perCircle: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 70,
    // marginLeft: 80
  },
  pointHeading: {
    textAlign: "center",
    justifyContent: "center",
    fontSize: 16,
    fontWeight: "900",
    marginRight: 10,
  },
});

// import React from "react";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { Avatar, Button, Card, Text } from "react-native-paper";
// import {
//   View,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   Image,
//   Dimensions,
//   FlatList,
//   ImageBackground,
//   ScrollView,
// } from "react-native";
// // import {
// //   View,
// //   Text,
// //   TouchableOpacity,
// //   StyleSheet,
// //   SafeAreaView,
// //   Image,
// //   Dimensions,
// //   FlatList,
// //   ImageBackground,
// //   ScrollView,
// // } from "react-native-ui-lib";
// import ProgressCircle from "react-native-progress-circle";
// import { Ionicons, AntDesign } from "@expo/vector-icons";
// import { FIREBASE_AUTH } from "../../FirebaseConfig";
// import { blueA100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

// const percentage = 55;
// const points = 0;
// const Posts = () => {
//   const photos = [
//     {
//       key: "1",
//       image: require("../../assets/sih2.jpg"),
//     },
//     {
//       key: "2",
//       image: require("../../assets/sih1.jpg"),
//     },
//     {
//       key: "3",
//       image: require("../../assets/sih3.jpg"),
//     },
//     {
//       key: "4",
//       image: require("../../assets/sih2.jpg"),
//     },
//     {
//       key: "5",
//       image: require("../../assets/sih3.jpg"),
//     },
//     {
//       key: "6",
//       image: require("../../assets/sih3.jpg"),
//     },
//     {
//       key: "6",
//       image: require("../../assets/sih3.jpg"),
//     },
//     {
//       key: "6",
//       image: require("../../assets/sih3.jpg"),
//     },
//   ];
//   return (
//     <View style={{ flex: 1 }}>
//       {/* <ScrollView> */}
//       <FlatList
//         style={styles.box}
//         keyExtractor={(item) => item.key}
//         data={photos}
//         numColumns={3}
//         renderItem={({ item }) => {
//           return (
//             <TouchableOpacity
//               style={{ flex: 1 / 3, aspectRatio: 1, margin: 1 }}
//             >
//               {/* <View style={{flex: 1/3,aspectRatio: 1,margin: 1}}> */}
//               <Image
//                 source={item.image}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   borderRadius: 5,
//                   marginTop: 0,
//                 }}
//               />
//               {/* </View> */}
//             </TouchableOpacity>
//           );
//         }}
//       />
//       {/* </ScrollView> */}
//     </View>
//   );
// };
// const Saathi_score = () => {
//   return (
//     <SafeAreaView>
//       <View>
//         <Text style={styles.heading1}>Saathi Score</Text>
//       </View>
//       <View style={styles.perCircle}>
//         <ProgressCircle
//           percent={percentage}
//           radius={100}
//           borderWidth={15}
//           color="#57B894"
//           shadowColor="#34572F"
//           bgColor="#fff"
//         >
//           <Text style={styles.perText}>{percentage}%</Text>
//         </ProgressCircle>
//       </View>
//       <View style={styles.points}>
//         <Text style={styles.pointHeading}>Points: {points}</Text>
//         <TouchableOpacity style={styles.addcontainer}>
//           <Text style={styles.add}>+Add</Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
// const Redeemed_coupans = () => {
//   const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;
//   const Coupons = [
//     {
//       key: 1,
//       image: require("../../assets/swiggy.png"),
//       company: "Swiggy",
//       desc: "Get upto 60% off",
//     },
//     {
//       key: 2,
//       image: require("../../assets/Zomato_logo.png"),
//       company: "Zomato",
//       desc: "Get upto 60% off",
//     },
//     {
//       key: 3,
//       image: require("../../assets/myntra.jpg"),
//       company: "Myntra",
//       desc: "Get upto 60%",
//     },
//     {
//       key: 4,
//       image: require("../../assets/barbeque_nation.jpg"),
//       company: "Barbeque Nation",
//       desc: "Get upto 60%",
//     },
//     {
//       key: 4,
//       image: require("../../assets/barbeque_nation.jpg"),
//       company: "Barbeque Nation",
//       desc: "Get upto 60%",
//     },
//     {
//       key: 4,
//       image: require("../../assets/barbeque_nation.jpg"),
//       company: "Barbeque Nation",
//       desc: "Get upto 60%",
//     },
//   ];
//   return (
//     <SafeAreaView>
//       <View>
//       <FlatList
//         keyExtractor={(item) => item.key}
//         data={Coupons}
//         numColumns={2}
//         renderItem={({ item }) => {
//           const { image, company, desc } = item;
//           return (
//             <View
//               style={{ flex: 1 / 2 , padding:10 }}
//             >
//               <Card style={{height:'auto', backgroundColor:'white'}}>
//               {/* <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} /> */}
//               {/* <Card.Cover style={styles.Couponsimage} source={item.image} /> */}
//               <Image style={styles.Couponsimage} resizeMode='contain' source={item.image} />
//               <Card.Content>
//                 <Text style={{ fontWeight: "bold", fontSize:17}}>
//                   {item.company}
//                 </Text>
//                 <Text variant="bodyMedium">{item.desc}</Text>
//               </Card.Content>
//               <View style={{alignSelf:'center', margin:10}}>
//               <TouchableOpacity style={styles.reedem}>
//                 <Text style={{color:'green'}}>Reedem</Text>
//               </TouchableOpacity>
//               </View>

//             </Card>

//               {/* </View> */}
//             </View>
//           );
//         }}
//       />
//     </View>
//     </SafeAreaView>
//   );
//   const events = [
//     {
//       key: "1",
//       title: "Zomato",
//       desc: "Get flat 60% off",
//       image: require('../../assets/sih2.jpg')
//     },
//     {
//       key: "2",
//       title: "Zomato",
//       desc: "Get flat 60% off",
//       image: require('../../assets/sih1.jpg')
//     },
//     {
//       key: "3",
//       title: "Zomato",
//       desc: "Get flat 60% off",
//       image: require('../../assets/sih3.jpg')
//     },
//     {
//       key: "4",
//       title: "Zomato",
//       desc: "Get flat 60% off",
//       image: require('../../assets/sih2.jpg')
//     },
//     {
//       key: "5",
//       title: "Zomato",
//       desc: "Get flat 60% off",
//       image: require('../../assets/sih3.jpg')
//     },
//   ];
//   return (
//     <SafeAreaView style={styles.container}>
//       <FlatList
//         style={styles.box}
//         keyExtractor={(item) => item.key}
//         data={events}
//         renderItem={({ item }) => {
//           const { company_name, desc, image } = item;
//           return (
//             <View >
//               <View style={{backgroundColor:'#34572F' , justifyContent:'center' , marginBottom:20}}>
//                 <Image style={styles.image} source={item.image} />
//               {/* </View>
//               <View style={styles.textContainer}> */}
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.desc}>{item.desc}</Text>
//                 <TouchableOpacity style={styles.participate}>
//                   <Text style={styles.participateText}>Reedem</Text>
//                 </TouchableOpacity>
//               </View>

//             </View>
//           )
//         }}
//       />
//     </SafeAreaView>
//   );
// };
// const ProfilePage = ({ navigation }) => {
//   return (
//     <SafeAreaView style={styles.container}>
//       {/* <View>
//         <TouchableOpacity onPress={() => { FIREBASE_AUTH.signOut() }} style={styles.backButton}>
//           <AntDesign name="login" style={styles.back} size={24} color="black" />
//           <Text style={styles.back}>Logout</Text>
//         </TouchableOpacity>
//       </View> */}
//       <View>
//         <ImageBackground
//           source={require("../../assets/greenleaves1.jpg")}
//           style={styles.profileBackground}
//         />
//         <View style={[styles.profileView, styles.shadowProp]}>
//           <Image
//             style={styles.profileimage}
//             source={require("../../assets/ria.png")}
//           />
//           <Text style={styles.personName}>Ria Pahujani</Text>
//           <Text style={styles.personLocation}>Dehradun, Uttrakhand</Text>
//         </View>
//       </View>
//       <Tab.Navigator
//         style={styles.Tab}
//         screenOptions={{
//           tabBarActiveTintColor: "#57B894",
//           tabBarInactiveTintColor: "#34572F",
//           tabBarLabelStyle: { textAlign: "center" },
//           tabBarIndicatorStyle: {
//             borderBottomColor: "#C2D5A8",
//             borderBottomWidth: 3,
//           },
//           // tabBarStyle: { backgroundColor: COLORS.White },

//           tabBarLabelStyle: {
//             textTransform: "none",
//             fontSize: 13,
//           },
//         }}
//       >
//         <Tab.Screen style={styles.Tab_heading} name="Posts" component={Posts} />
//         <Tab.Screen
//           style={styles.Tab_heading}
//           name="My Coupons"
//           component={Redeemed_coupans}
//         />
//         <Tab.Screen
//           style={styles.Tab_heading}
//           name="Score"
//           component={Saathi_score}
//         />
//       </Tab.Navigator>
//       <View style={styles.gap}></View>
//     </SafeAreaView>
//   );
// };
