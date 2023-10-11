import { View, Text, StatusBar, Platform } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ScreenWrapper({children}) {
    let statusBarHeight = StatusBar.currentHeight? StatusBar.currentHeight: Platform.OS=='android'? 30: 0;
  return (
    <SafeAreaView style={{paddingTop: statusBarHeight}}>
      {
        children
      }
    </SafeAreaView>
  )
}