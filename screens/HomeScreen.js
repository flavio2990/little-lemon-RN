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
                <Image source={require('../img/waiter.png')} style={styles.image} />
                <View style={styles.textContainer}>
                <Text style={styles.text}>Little Lemon</Text>
                <Text style={styles.text}>Chicago</Text>
                <Text style={styles.text}>We are a family owned mediterranean food</Text>
                </View>
            </View>
            <Button title="Back" onPress={() => navigation.navigate('Profile')} />
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
        resizeMode: 'contain',
        height: '20%',
        width: '30%',
        borderRadius: 10,
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
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom: 30,
    },
    textContainer:{
        flexDirection: 'column',
    },
    image: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        borderRadius: 10,
    },
})