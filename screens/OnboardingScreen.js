import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, ImageBackground, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const logo = require('../img/Logo.png');
const backgroundImage = require('../img/lemon.png');
export default function OnboardingScreen() {

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
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
                const data = {
                    firstName: firstName,
                    email: email,
                };

                const serializedData = JSON.stringify(data);

                await AsyncStorage.setItem('@data', serializedData);
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
                <ImageBackground source={backgroundImage} style={styles.backgroundImage} blurRadius={10}>
            <View style={styles.headerContainer}>
                <View style={styles.logoContainer}>
                    <Image source={logo} style={styles.logo} />
                </View>
            </View>
            <View style={styles.contentContainer}>
                    <Text style={styles.welcomeText}>Welcome</Text>
                    <Text style={styles.completeFields}>Complete the fields, please</Text>
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
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={({ pressed }) => [
                                styles.button,
                                { backgroundColor: pressed ? '#EE9972' : '#F4CE14', opacity: isNextButtonDisabled ? 0.5 : 1 },
                            ]}
                            onPress={handleOnboardingComplete}
                            disabled={isNextButtonDisabled}
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </Pressable>
                    </View>
            </View>
            </ImageBackground>
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
    logoContainer: {
        flex: 1,
        alignItems: 'center',
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
    welcomeText: {
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logo: {
        resizeMode: 'contain',
        borderColor:'#495E57',
        borderRadius:8,
        backgroundColor:'white',
    },
    completeFields: {
        fontWeight: 'bold',
        color: '#495E57',
        marginBottom: 10,
    },
    input: {
        height: 40,
        width: 200,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius:8,
        backgroundColor:'white'
    },

    buttonContainer: {
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode:'contain',
    },
});