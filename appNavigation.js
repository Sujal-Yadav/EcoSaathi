import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ForumPage from "./screens/ForumPage";
import ProfilePage from "./screens/ProfilePage";
import EventsPage from "./screens/EventsPage";
import Login from "./screens/Login";
import SignUpUser from "./screens/SignUp";
import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH } from "./FirebaseConfig";
import BasePage from "./screens/BasePage";
import SurveyPage from "./screens/SurveyPage";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from "./user";
import UserDetailsSub from "./screens/UserDetails";
import OnboardingScreen from "./screens/OnBordingScreen";
import GoogleAuth from "./screens/GoogleAuth";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export function MyTabs() {

    return (
        <Tab.Navigator >
            <Tab.Screen name="Forum" component={ForumPage}  options={{
                tabBarLabel: 'Forum',
                headerShown: false,
                
                tabBarIcon: ({ color, size }) => (
                    <Icon name="comments" size={size} color={color} /> // Use FontAwesome icon
                ),
            }} />
            <Tab.Screen name="Events" component={EventsPage} options={{
                tabBarLabel: 'Events',
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" size={size} color={color} /> // Use FontAwesome icon
                ),
            }} />
            <Tab.Screen name="Profile" component={ProfilePage}
                options={{
                    tabBarLabel: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="user" size={size} color={color} /> // Use FontAwesome icon
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default function AppNavigation() {
    const auth = FIREBASE_AUTH;
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();

    onAuthStateChanged(auth, u => {
        // console.log('got user: ',u);
        dispatch(setUser(u));
    })


    if (user) {
        return (

            <NavigationContainer>
                <Stack.Navigator initialRouteName="MyTabs">
                    <Stack.Screen name="MyTabs" component={MyTabs} options={{ headerShown: false }} />
                    <Stack.Screen name="SurveyPage" component={SurveyPage} options={{ headerShown: false }} />
                    <Stack.Screen name="UserDetailsSub" component={UserDetailsSub} options={{ headerShown: false }} />
                    {/* <Stack.Screen name="Logout" component={Logout} options={{ headerShown: false }} /> */}
                </Stack.Navigator>
            </NavigationContainer>

        );
    }
    else {
        return (

            <NavigationContainer>
                <Stack.Navigator initialRouteName="Onboarding">
                    <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
                    {/* <Stack.Screen name="GoogleAuth" component={GoogleAuth} options={{ headerShown: false }} /> */}
                    <Stack.Screen name="SignUp" component={SignUpUser} options={{ headerShown: false }} />
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="BasePage" component={BasePage} options={{ headerShown: false }} />

                </Stack.Navigator>
            </NavigationContainer>

        );
    }
}