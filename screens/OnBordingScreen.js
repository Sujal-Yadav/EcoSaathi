import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import { setItem } from '../utils/asyncStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function OnboardingScreen() {

    const navigation = useNavigation();

    const handleDone = () => {
        navigation.navigate('BasePage');
        setItem('onboarded', '1');
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )

    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "white" translucent = {true}/>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                // bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}

                pages={[
                    {
                        backgroundColor: '#a4ebb3',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require('../assets/Animations/meditation.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Boost Productivity',
                        subtitle: 'Subscribe this channel to boost your productivity level',

                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require('../assets/Animations/recycle.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Recycle',
                        subtitle: 'Recycle the present, save the future.',
                    },
                    {
                        backgroundColor: '#a4ebc3',
                        image: (
                            <View>
                                <LottieView style={styles.lottie} source={require('../assets/Animations/greenearth.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Make More Greener',
                        subtitle: 'Transforming Tomorrows World with Sustainable Solutions',
                    },
                ]} />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
    },
    lottie: {
        width: width * 1.2,
        height: width,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    doneButton: {
        padding: 20,
    }
})