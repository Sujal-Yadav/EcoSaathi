import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
} from "react-native";

// import { FlatList } from "react-native-web";

const Question = ({question}) => {
  const options = [
    "Strongly Agree",
    "Agree",
    "Neutral",
    "Disagree",
    "Strongly Disagree",
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };
  return (
    <View style={styles.questionView}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedOption === index && styles.selectedOption, // Apply a style for selected option
          ]}
          onPress={() => handleOptionSelect(index)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

// const question = "Do you regularly separate recyclables from your trash?";
const questions = [
  {
    id: 1,
    question: "Do you regularly separate recyclables from your trash?",
  },
  {
    id: 2,
    question: "Do you compost organic waste?",
  },
  {
    id: 3,
    question: "Do you use personal care products  that are environmentally friendly or come in sustainable packaging?",
  },
  {
    id: 4,
    question: "When going out, do you carry a reusable water bottle instead of buying bottled water?",
  },
  {
    id: 5,
    question: "Do you turn off lights when you leave a room?",
  },
  {
    id: 6,
    question: "Do you try to combine multiple errands into one trip to save fuel?",
  },
  {
    id: 7,
    question: "Have you switched to a reusable razor instead of using disposable ones?",
  },
  {
    id: 8,
    question: "Do you use a bamboo or biodegradable toothbrush?",
  },
  {
    id: 9,
    question: "Do you prioritise products with minimal packaging or those packaged in recyclable materials?",
  },
  {
    id: 10,
    question: "  Do you use public transport or carpool to reduce your carbon footprint?",
  },
];
const SurveyPage = ({navigation, route}) => {
  navigation.setOptions({headerShown: true})
  const { userData } = route.params;
  return (
    // <ScrollView style={styles.container}>
    //   {/* <ImageBackground
    //     source={require('../../assets/back.jpg')}
    //     resizeMode="cover"
    //     style={styles.backgroundImg}
    //   > */}
    //   {/* </ImageBackground> */}

    // </ScrollView>
    // <FlatList
    //   data={questions}
    //   renderItem={({ item }) => {
    //     <Question question={item.question} />;
    //   }}
    // />
    // <Question question={data[0].question}/>
    // <ImageBackground source={require('../../assets/back.jpg')} style={styles.backgroundImg}>
      
    // </ImageBackground>
    <SafeAreaView style={styles.container}>
      <Text>{userData.name}</Text>
      <Text>{userData.email}</Text>
      <FlatList
        data={questions}
        renderItem={({ item }) => <Question question={item.question} />}
        keyExtractor={(item) => item.id}
        style={styles.container}
      />
      <TouchableOpacity style={styles.appButtonContainer1} onPress={()=>navigation.navigate('MyTabs')}>
          <Text style={styles.appButtonText}>Submit</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImg: {
    flex: 1,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
    width: Dimensions.get("window").width,
  },
  question: {
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 20,
    alignItems: "center",
    color: "green",
  },
  questionView: {
    alignItems: "center",
    marginTop: 30,
  },
  option: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
  },
  optionText: {
    fontWeight: "bold",
    fontSize: 17,
    color: "green",
  },
  selectedOption: {
    borderColor: "green",
  },
  appButtonContainer1: {
    marginVertical: 20,
    backgroundColor: "#07411B",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 10,
    width: 150,
    alignSelf: 'center',
  },
  appButtonText: {
    color: "white",
    alignSelf: "center",
    fontWeight: "bold",
  },
});

export default SurveyPage;