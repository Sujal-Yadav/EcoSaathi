import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  FlatList,
  ScrollView,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const PostComponent = ({profileImage , username, caption , imgSource}) => {
  return (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Image
          source={profileImage}
          style={styles.profileImage}
        />
        <Text style={styles.username}>{username}</Text>
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="black"
          style={styles.threeDots}
        />
      </View>
      <Text style={styles.postCaption}>{caption}</Text>
      <View style={styles.postImage}>
        <Image
          source={imgSource}
          style={styles.image}
        />
      </View>
      <View style={styles.postIcons}>
        <Ionicons
          name="earth-sharp"
          size={24}
          color="green"
          style={{ flex: 0.25 }}
        />
        <FontAwesome
          name="commenting-o"
          size={24}
          color="green"
          style={{ flex: 0.25 }}
        />
        <Feather
          name="share-2"
          size={24}
          color="green"
          style={{ flex: 0.25 }}
        />
        <MaterialIcons name="save-alt" size={24} color="green" />
      </View>
    </View>
  );

};

const data = [
{
  id: 'id1',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 1',
  caption: 'For a better tomorrow , plant more trees today!',
  imgSource: require('../assets/sih1.jpg'),
},
{
  id: 'id2',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 2',
  caption: 'From Newsprint to Masterpiece: My Eco-Friendly Creation 🌍📰♻ #UpcycledArt',
  imgSource: require('../assets/OIP.jpeg'),
},
{
  id: 'id3',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 3',
  caption: 'For a better tomorrow , plant more trees today!',
  imgSource: require('../assets/greenleaves1.jpg'),
},
{
  id: 'id4',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 4',
  caption: 'For a better tomorrow , plant more trees today!',
  imgSource: require('../assets/planting.jpg'),
},
{
  id: 'id5',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 5',
  caption: 'For a bettkjnkjkjkjkuhjer tomorrow , plant more trees today!',
  imgSource: require('../assets/greenleaves.jpg'),
},
{
  id: 'id6',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 5',
  caption: 'For a bettkjnkjkjkjkuhjer tomorrow , plant more trees today!',
  imgSource: require('../assets/planting.jpg'),
},
{
  id: 'id7',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 5',
  caption: 'For a bettkjnkjkjkjkuhjer tomorrow , plant more trees today!',
  imgSource: require('../assets/OIP.jpeg'),
},
{
  id: 'id8',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 5',
  caption: 'For a bettkjnkjkjkjkuhjer tomorrow , plant more trees today!',
  imgSource: require('../assets/sih1.jpg'),
},
{
  id: 'id9',
  profileImage: require('../assets/ria.png'),
  username: 'User Name 5',
  caption: 'For a bettkjnkjkjkjkuhjer tomorrow , plant more trees today!',
  imgSource: require('../assets/sih1.jpg'),
},

];

const ForumPage = () => {
  return (
      <FlatList
        data={data}
        renderItem={({ item }) => <PostComponent profileImage = {item.profileImage} username={item.username} caption={item.caption} imgSource={item.imgSource}/>}
        keyExtractor={(item) => item.id}
        style={styles.container}
      />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  postContainer: {
    width: Dimensions.get("window").width,
    marginVertical: 4,
  },
  postHeader: {
    flexDirection: "row",
    height: 50,
  },
  postCaption: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#FAFAFA",
  },
  postImage: {},
  image: {
    height: 250,
    width: Dimensions.get("window").width,
  },
  postIcons: {
    width: Dimensions.get("window").width,
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 6,
    backgroundColor: "#D5E6E2",
    borderBottomWidth:10,
    borderBottomColor:'white'
  },
  profileImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    alignSelf: "center",
    marginLeft: 10,
  },
  threeDots: {
    alignSelf: "center",
    position: "absolute",
    right: 10,
  },
  username: {
    alignSelf: "center",
    marginLeft: 10,
  },
});

export default ForumPage;