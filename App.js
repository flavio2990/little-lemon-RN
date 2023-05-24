// // import { StatusBar } from 'expo-status-bar';
// // import React, { useState, useEffect } from 'react';
// // import { StyleSheet, Text, View } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // import AsyncStorage from '@react-native-async-storage/async-storage';


// // import OnboardingScreen from './screens/OnboardingScreen';
// // import SplashScreen from './screens/SplashScreen';
// // import ProfileScreen from './screens/ProfileScreen';
// // import HomeScreen from './screens/HomeScreen';

// // const Stack = createNativeStackNavigator();

// // export default function App() {
// //   const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

// //   useEffect(() => {
// //     checkOnboardingStatus();
// //   }, []);

// //   const checkOnboardingStatus = async () => {
// //     try {
// //       const value = await AsyncStorage.getItem('onboardingStatus');
// //       if (value !== null) {
// //         setIsOnboardingCompleted(true);
// //       }
// //     } catch (error) {
// //       console.log('Error retrieving onboarding status:', error);
// //     }
// //   };
  

// //   return (
// //     <NavigationContainer>
// //       <Stack.Navigator>
// //         <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
// //         <Stack.Screen name="Onboarding" component={OnboardingScreen} />
// //         <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
// //         <Stack.Screen name="Home" component={HomeScreen} />
// //       </Stack.Navigator>
// //       <StatusBar style="auto" />
// //     </NavigationContainer>
// //   );
// // }

import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import OnboardingScreen from './screens/OnboardingScreen';
import SplashScreen from './screens/SplashScreen';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('onboardingStatus');
      if (value !== null) {
        setIsOnboardingCompleted(true);
      }
    } catch (error) {
      console.log('Error retrieving onboarding status:', error);
    }
  };

  return (
    <NavigationContainer >
      <Stack.Navigator >
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{ headerShown: false }}/>
        )}
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}