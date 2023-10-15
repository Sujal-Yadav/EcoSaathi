import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Dimensions } from "react-native";
import { StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get('window');

export default function GoogleAuth({promptAsync}){
  const navigation = useNavigation();

  return ( 
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" hidden={false} backgroundColor="white" translucent={true} />
      <View>
        <LottieView style={styles.lottie} source={require('../assets/Animations/plant.json')} autoPlay loop/>
      </View>
      <View>
        <Text style={styles.heading}>EcoSaathi</Text>
        <Text style={styles.heading2}>Where Eco meets Social</Text>
        <View style={styles.loginOption}>
          <Text style={styles.logInText}>Already Have an account?</Text>
          <TouchableOpacity style={styles.login} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginText2}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View><View style={styles.appButtons}>
        <TouchableOpacity
          style={styles.appButtonContainer1}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.appButtonText}>Sign up with email</Text>
        </TouchableOpacity>

      </View>
      <View style={styles.appButtons}>
        
          <TouchableOpacity style={styles.appButtonContainer2}
            onPress={() => promptAsync()}
          >
            <Image
              style={styles.buttonImageIconStyle}
              source={require("../assets/google.png")} />
            <Text style={styles.appButtonText2}>Sign up with Google</Text>

          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lottie: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 1.2,
    height: width,
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

