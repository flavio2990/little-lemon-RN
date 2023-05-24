import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const logo = require('../img/Logo.png');
export default function OnboardingScreen() {

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
    const navigation = useNavigation();


    const handleFirstNameChange = (text) => {
        setFirstName(text.replace(/[^a-zA-Z]/g, ''));
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };
    const handleOnboardingComplete = async () => {
        if (firstName.trim() === '') {
            alert('Please enter your first name.');
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
        } else {
            try {
                setIsOnboardingCompleted(true);
                await AsyncStorage.multiRemove(['@firstName', '@email']);
                await AsyncStorage.setItem('@firstName', firstName);
                await AsyncStorage.setItem('@email', email);
                await AsyncStorage.setItem('onboardingStatus', 'completed');
                alert('Onboarding completed!');
                navigation.navigate('Profile');
            } catch (error) {
                console.log('Error saving onboarding data:', error.message);
            }
        }
    };
    const validateEmail = (email) => {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return emailRegex.test(email);
    };
    const isNextButtonDisabled = firstName.trim() === '' || !validateEmail(email);
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>Little Lemon</Text>
                {/* <View style={styles.logoContainer}> */}
                <View>
                    <Image source={logo} style={styles.logo} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={firstName}
                    onChangeText={handleFirstNameChange}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    value={email}
                    onChangeText={handleEmailChange}
                />
                <Button
                    title="Next"
                    onPress={handleOnboardingComplete}
                    disabled={isNextButtonDisabled}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    logo: {
        resizeMode: 'contain',
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});