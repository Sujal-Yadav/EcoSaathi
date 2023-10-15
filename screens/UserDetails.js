import { View, Text, Image, Modal, TextInput, TouchableOpacity, Dimensions, SafeAreaView, ScrollView, StyleSheet, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
// import ScreenWrapper from '..screenWrapper'
import EmptyList from '../emptyList'
import { colors } from '../index'
// import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
// import Loading from '../components/loading'
import Snackbar from 'react-native-snackbar';
import { addDoc } from 'firebase/firestore'
import { signUpDataRef } from '../FirebaseConfig'
import { useSelector } from 'react-redux'
import DatePicker from 'react-native-modern-datepicker';
import { Picker } from '@react-native-picker/picker';
import LottieView from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

export default function UserDetailsSub({ route }) {
    const { userData } = route.params;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(state => state.user);
    const emailed = userData.email;
    const [selectedDate, setSelectedDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisible] = useState(false);
    // const [selectedGender, setSelectedGender] = useState(''); // Initial value can be an empty string
    const genderOptions = ['None', 'Male', 'Female', 'Other'];
    const navigation = useNavigation();

    const toggleDatePicker = () => {
        setDatePickerVisible(!isDatePickerVisible);
    };

    const handleDateChange = (date) => {
        // Handle the selected date here, e.g., set it in a state variable.
        setSelectedDate(date);
    };

    const handleAddDetails = async () => {
        if (firstName && lastName && selectedDate && gender) {
            setLoading(true);
            let doc = await addDoc(signUpDataRef, {
                firstName,
                lastName,
                dob,
                gender,
                emailed,
                userId: user.uid,
            });
            navigation.navigate("SurveyPage")
            setLoading(false);
            if (doc.id) {
                navigation.navigate("SignUp");
            }
        } else {

            Snackbar.show({
                text: 'All fields are required',
                backgroundColor: 'red'
            });
        }
    }

    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <KeyboardAvoidingView>

                    <Text style={styles.heading}>Enter your Details</Text>
                    <View style={styles.inputWrapper}>

                        <Text style={styles.inpText}>First Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="First Name" value={firstName}
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />

                        <Text style={styles.inpText}>Last Name:</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Last Name" value={lastName}
                            onChangeText={(lastName) => setLastName(lastName)}
                        />

                        <Text style={styles.inpText}>Date of Birth:</Text>
                        <TouchableOpacity
                            style={styles.input}
                            onPress={toggleDatePicker} 
                            value={dob}// Open the date picker modal on button press
                        >
                            <Text style={styles.input}>
                                {selectedDate ? selectedDate.toString() : 'Select Date'}
                            </Text>
                        
                        </TouchableOpacity>
                        {/* <DatePicker
                            onSelectedChange={date => setSelectedDate(date)}
                        /> */}

                        <Text style={styles.inpText}>Gender:</Text>
                        <Picker
                            selectedValue={gender}
                            style={styles.input}
                            onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                        >
                            {genderOptions.map((gender, index) => (
                                <Picker.Item key={index} label={gender} value={gender} />
                            ))}
                        </Picker>
                    </View>

                    {loading && user ? (
                        <View style={{ alignItems: 'center' }}>
                            <LottieView style={styles.lottie} source={require('../assets/Animations/earth.json')} autoPlay loop />
                        </View>
                    ) : (
                        <>
                            <View style={styles.buttonWrapper}>
                                <TouchableOpacity style={styles.appButtonContainer1}
                                    onPress={handleAddDetails}
                                >
                                    <Text style={styles.appButtonText}>Next</Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}

                    <Modal
                        visible={isDatePickerVisible}
                        animationType="slide"
                        transparent={true}
                        onRequestClose={() => setDatePickerVisible(false)}
                    >
                        <View style={styles.datePickerModal}>
                            <DatePicker
                                onSelectedChange={handleDateChange}
                            />
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={toggleDatePicker}
                            >
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView >
    )
}

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
        // fontSize: "21px",
        // lineHeight: "21px",
        // fontFamily: "Poppins, sans-serif",
        fontWeight: "700",
        textAlign: "center",
    },
    input: {
        backgroundColor: "#D0E7D2",
        // opacity:17,
        width: 250,
        alignSelf: "flex-start",
        height: 45,
        marginTop: 8,
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 15,
        borderRadius: 5,
        overflow: 'hidden'
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
