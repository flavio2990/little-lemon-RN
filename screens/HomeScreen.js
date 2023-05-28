import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';

const logo = require('../img/Logo.png');


const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const profileImage = route.params?.profileImage;



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
                <Avatar containerStyle={styles.avatarContainer} avatarStyle={styles.avatar} size="medium" rounded source={profileImage ? { uri: profileImage } : null} />
            </View>
            <View style={styles.contentContainer}>
                <Image source={require('../img/waiter.png')} style={styles.waiter} />
                <View style={styles.textContainer}>
                    <Text style={[styles.text, styles.title]}>Little Lemon</Text>
                    <Text style={[styles.text, styles.city]}>Chicago</Text>
                    <Text style={[styles.text, styles.description]}>We are a family owned {'\n'} mediterranean restaurant{'\n'} focused on traditional{'\n'}recipes served with a {'\n'} modern twist</Text>
                    <Button title="Back" onPress={() => navigation.navigate('Profile')} />
                </View>
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
    logo: {
        resizeMode: 'contain',
    },
    waiter: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
        marginBottom: 20,
    },
    avatarContainer: {
        backgroundColor: 'lightblue',
        borderRadius: 100,
        overflow: 'hidden',
        marginRight: 16,
    },
    avatar: {
        resizeMode: 'contain',
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
    contentContainer: {
        backgroundColor: '#495E57',
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 0,
    },
    textContainer: {
        flexDirection: 'column',
        marginBottom: 60,
    },
    text: {
        marginBottom: 0,
    },
    title: {
        fontSize: 35,
        color: '#F4CE14',
    },
    city: {
        fontSize: 25,
        marginBottom: 18,
        color: '#EDEFEE'
    },
    description: {
        fontSize: 20,
        marginBottom: 0,
        color: '#EDEFEE'
    },
})