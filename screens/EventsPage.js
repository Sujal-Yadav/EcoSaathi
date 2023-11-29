import React from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import { NavigationContainer } from '@react-navigation/native';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get('window');
const Tab = createMaterialTopTabNavigator();
const EventsPage = ()=>{  
    return (
      // <SafeAreaView>
        <Tab.Navigator>
          <Tab.Screen name='Events' component={Curr_Events}/>
          <Tab.Screen name='Upcoming' component={Upcoming_events}/>
        </Tab.Navigator>
      // </SafeAreaView>
    )
}
const Curr_Events = () => {
  const events = [
    {
      key: "1",
      title: "Tree Plantation Drive",
      desc: "Plant a tree today, save your future for Tomorrow!",
      location: "Location - Lodhi Gardens, Delhi",
      image: require('../assets/sih2.jpg')
    },
    {
      key: "2",
      title: "Beach Cleanliness Drive",
      desc: "Don't let our beaches become trashcans!",
      location: "Location - Juhu Beach, Mumbai",
      image: require('../assets/sih1.jpg')
    },
    {
      key: "3",
      title: "Global Recycling Day",
      desc: "Reduce, Reuse, Recycle!",
      location: "Location - MG Road, Bengaluru",
      image: require('../assets/sih3.jpg')
    },
    {
      key: "4",
      title: "Tree Plantation Drive",
      desc: "Plant a tree today, save your future for Tomorrow!",
      location: "Location - Lodhi Gardens, Delhi",
      image: require('../assets/sih2.jpg')
    },
    {
      key: "5",
      title: "Global Recycling Day",
      desc: "Reduce, Reuse, Recycle!",
      location: "Location - MG Road, Bengaluru",
      image: require('../assets/sih3.jpg')
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.box}
        keyExtractor={(item) => item.key}
        data={events}
        renderItem={({ item }) => {
          const { title, desc, location, image } = item;
          return (
            <View style={styles.eventsContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <TouchableOpacity style={styles.participate}>
                  <Text style={styles.participateText}>Participate</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.image} />
              </View>
            </View>
          )
        }}
      />
    </SafeAreaView>
  );
};
const Upcoming_events= ()=>{
  const events1 = [
    {
      key: "1",
      title: "Tree Plantation Drive",
      desc: "Plant a tree today, save your future for Tomorrow!",
      location: "Location - Lodhi Gardens, Delhi",
      image: require('../assets/sih2.jpg')
    },
    {
      key: "2",
      title: "Beach Cleanliness Drive",
      desc: "Don't let our beaches become trashcans!",
      location: "Location - Juhu Beach, Mumbai",
      image: require('../assets/sih1.jpg')
    },
    {
      key: "3",
      title: "Global Recycling Day",
      desc: "Reduce, Reuse, Recycle!",
      location: "Location - MG Road, Bengaluru",
      image: require('../assets/sih3.jpg')
    },
    {
      key: "4",
      title: "Tree Plantation Drive",
      desc: "Plant a tree today, save your future for Tomorrow!",
      location: "Location - Lodhi Gardens, Delhi",
      image: require('../assets/sih2.jpg')
    },
    {
      key: "5",
      title: "Global Recycling Day",
      desc: "Reduce, Reuse, Recycle!",
      location: "Location - MG Road, Bengaluru",
      image: require('../assets/sih3.jpg')
    },
  ];
  // const imagepath = [
  //   '../../assets/greenleaves1.png',
  //   '../../assets/greenleaves1.png',
  //   '../../assets/greenleaves1.png'
  // ];
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.box}
        keyExtractor={(item) => item.key}
        data={events1}
        renderItem={({ item }) => {
          // const { title, desc, location, image } = item;
          return (
            <View style={styles.eventsContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.desc}>{item.desc}</Text>
                <Text style={styles.location}>{item.location}</Text>
                <TouchableOpacity style={styles.participate}>
                  <Text>Participate</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={item.image} />
              </View>
            </View>
          );
        }}
      />
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  textContainer: {
    // margin:20,
    // marginVertical:20,
    marginHorizontal: 20,
    alignItems: 'flex-start',
    // justifyContent:'center'
    // flexWrap:'wrap',
    width: 175,
    textAlignVertical: 'center'
  },
  box: {
    // backgroundColor:"blue",
    // height:"auto"
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
    alignContent:'center',
    alignItems:'center'

  },
  image: {
    height: Dimensions.get('window').height*.17,
    width: Dimensions.get("window").width*0.36,
    borderColor: 'green',
    borderWidth: 2,
    borderRadius: 20,
    padding: 3

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
    // height: Dimensions.get('window').height*.2,
    width: Dimensions.get("window").width*0.36,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    // borderColor:'green',
    // borderwidth:80,

  },

  text: {
    paddingTop: 50,
    paddingHorizontal: 50,
    // alignSelf:'left',
    fontSize: 25,
    // marginVertical:8,
    fontWeight: '900',
  },
  title: {
    fontSize: 16,
    fontWeight: '900',
    textShadowColor: 'black',
    // textShadowOffset:"0.6",
    color: 'black',
    // marginLeft:20,
    // marginTop:-60
    marginVertical: 8,
    flexWrap: 'wrap-reverse'
  },
  desc: {
    fontSize: 12,
    color: 'green',
    fontWeight: '900',
    // marginLeft:20
    marginVertical: 3,
    // textShadowOffset:0.3/,
  },
  location: {
    fontSize: 12,
    // marginLeft:20
  },
  eventsContainer: {
    backgroundColor: '#D9D9D9',
    borderwidth: 3,
    borderRadius: 20,
    height: 'auto',
    justifyContent: 'center',
    // rowGap:10, 
    marginVertical: 10,
    borderColor: "black",
    // flexDirection:'row',
    height: Dimensions.get('window').height*.2,
    width: Dimensions.get("window").width,

  },

});

export default EventsPage;