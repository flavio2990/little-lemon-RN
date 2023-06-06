import React, { useState, useEffect,useCallback } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInputMask } from 'react-native-masked-text';
import * as ImagePicker from 'expo-image-picker';
import { Avatar, CheckBox } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import {useFonts} from 'expo-font';


const logo = require('../img/Logo.png');

export default function ProfileScreen() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [isEmailNotificationEnabled, setIsEmailNotificationEnabled] = useState(false);
  const [isNotification1Enabled, setIsNotification1Enabled] = useState(false);
  const [isNotification2Enabled, setIsNotification2Enabled] = useState(false);
  
  const navigation = useNavigation();

  const checkData = async () => {
    try {
      setIsDataLoaded(false);
      const onboardingStatus = await AsyncStorage.getItem('onboardingStatus');
      const storedData = await AsyncStorage.getItem('@data');

      if (storedData) {
        const {
          firstName,
          email,
          phoneNumber,
          lastName,
          profileImage,
          isEmailNotificationEnabled,
          isNotification1Enabled,
          isNotification2Enabled,
        } = JSON.parse(storedData);

        setFirstName(firstName || '');
        setEmail(email || '');
        setPhoneNumber(phoneNumber || '');
        setLastName(lastName || '');
        setProfileImage(profileImage || null);
        setIsEmailNotificationEnabled(isEmailNotificationEnabled || false);
        setIsNotification1Enabled(isNotification1Enabled || false);
        setIsNotification2Enabled(isNotification2Enabled || false);
      }

      setIsDataLoaded(onboardingStatus === 'completed');
    } catch (error) {
      console.log('Error checking data:', error.message);
    }
  };

  const [fontsLoaded] = useFonts({
    'Karla-Regular': require('../assets/fonts/Karla-Regular.ttf'),
  });


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      checkData();
    });
    return unsubscribe;
  }, [navigation]);


  const saveChanges = async () => {
    try {
      await AsyncStorage.setItem('@firstName', firstName);
      await AsyncStorage.setItem('@lastName', lastName);
      await AsyncStorage.setItem('@email', email);
      await AsyncStorage.setItem('@phoneNumber', phoneNumber);
      if (profileImage) {
        await AsyncStorage.setItem('@profileImage', profileImage);
      } else {
        await AsyncStorage.removeItem('@profileImage');
      }
      await AsyncStorage.setItem('@isEmailNotificationEnabled', String(isEmailNotificationEnabled));
      await AsyncStorage.setItem('@isNotification1Enabled', String(isNotification1Enabled));
      await AsyncStorage.setItem('@isNotification2Enabled', String(isNotification2Enabled));
      navigation.navigate('Home', { profileImage: profileImage, firstName: firstName, });

      alert('Changes saved successfully!');
    } catch (error) {
      console.log('Error saving changes:', error.message);
    }
  };

  

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate('Onboarding');
    } catch (error) {
      console.log('Error logging out:', error.message);
    }
  };

  
  

  const pickImage = async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access gallery denied');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) {
        const selectedImage = result.assets[0];
        setProfileImage(selectedImage.uri);
      }
    } catch (error) {
      console.log('Error picking image:', error);
    }
  };


  if (!isDataLoaded || !fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Loading data...</Text>
      </View>
    );
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Back" onPress={() => navigation.navigate('Home')} />
        <Image source={logo} style={styles.logo} />
        <Avatar
          containerStyle={styles.avatarContainer}
          avatarStyle={styles.avatar}
          size="medium"
          rounded
          title={`${firstName.charAt(0)}${firstName.charAt(1)}`}
          source={profileImage ? { uri: profileImage } : null}
          onPress={pickImage}
        />
      </View>
      <View style={styles.personalInfoContainer} >
        <Text style={styles.profileInfoText}>Profile Information</Text>
      </View>
      <View style={styles.personalInfoText}>
        <Avatar
          containerStyle={styles.avatarContainer}
          avatarStyle={styles.avatar}
          size="xlarge"
          rounded
          title={`${firstName.charAt(0)}${firstName.charAt(1)}`}
          source={profileImage ? { uri: profileImage } : null}
          onPress={pickImage}
        />
      </View>
      <TextInput style={styles.input} value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} value={lastName} onChangeText={setLastName} placeholder="Last Name" />
      <TextInputMask
        style={styles.input}
        type={'custom'}
        options={{
          mask: '(999) 999-9999',
        }}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          title="Enable Email Notifications"
          checked={isEmailNotificationEnabled}
          onPress={() => setIsEmailNotificationEnabled(!isEmailNotificationEnabled)}
          containerStyle={styles.checkbox}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Order Statuses"
            checked={isNotification1Enabled}
            onPress={() => setIsNotification1Enabled(!isNotification1Enabled)}
            containerStyle={styles.checkbox}
          />
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            title="Special Offers"
            checked={isNotification2Enabled}
            onPress={() => setIsNotification2Enabled(!isNotification1Enabled)}
            containerStyle={styles.checkbox}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Logout" onPress={handleLogout} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={saveChanges} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 30,
  },
  input: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  personalInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,

  },
  profileInfoText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    fontFamily: 'Karla-Regular',
  },
  personalInfoText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatarContainer: {
    backgroundColor: 'lightblue',
    borderRadius: 100,
    overflow: 'hidden',
    marginRight: 16,
  },
  logo: {
    resizeMode: 'contain',
  },
  avatar: {
    resizeMode: 'contain',
  },
  checkboxContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 0,
  },
  checkbox: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
    marginLeft: 0,
  },
  buttonContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
});
