import React, { useEffect,useState  } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = ({ navigation }) => {
  const getIsCompleted = async () => {
    isOnboarding = await AsyncStorage.getItem('onboardingStatus');
    console.log (isOnboarding)
    isOnboarding === 'completed' ? navigation.navigate('Home') : navigation.navigate('Onboarding')
}
useEffect(() => {
  setTimeout(()=>{
    getIsCompleted()
  },3000 )
});

  return (
    <View style={styles.container}>
      <Image source={require('../img/SplashLogo.png')} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
