import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

const logo = require('../img/Logo.png');

const db = SQLite.openDatabase('TheLittleLemon.db');
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const profileImage = route.params?.profileImage;
    const [menuData, setMenuData] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
                const storedMenuItems = rows._array;

                if (storedMenuItems.length > 0) {
                    setMenuData(storedMenuItems);
                } else {
                    fetchMenuData();
                }
            });
        });
    }, []);
    const fetchMenuData = async () => {
        try {
            const response = await axios.get(
                'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
            );
            const menuItems = response.data.menu;

            // clear existing data from the table
            db.transaction(tx => {
                tx.executeSql('DELETE FROM menu', []);
            });

            // insert the fetched menu items into the table
            db.transaction(tx => {
                menuItems.forEach(item => {
                    tx.executeSql(
                        'INSERT INTO menu (name, price, description, image) VALUES (?, ?, ?, ?)',
                        [item.name, item.price, item.description, item.image]
                    );
                });
            });

            // set the menu data state
            setMenuData(menuItems);
        } catch (error) {
            console.log('Error fetching menu data:', error);
        }
    };


    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS menu (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price TEXT,
            description TEXT,
            image TEXT
          );`
        );
    });

    const renderMenuItem = ({ item }) => (
        <View style={styles.menuItem}>
            <Image
                source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }}
                style={styles.menuItemImage}
            />
            <View style={styles.menuItemDetails}>
                <Text style={styles.menuItemName}>{item.name}</Text>
                <Text style={styles.menuItemPrice}>${item.price}</Text>
                <Text style={styles.menuItemDescription}>{item.description}</Text>
            </View>
        </View>
    );

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
                    <Text style={[styles.text, styles.description]}>We are a family-owned{'\n'}mediterranean restaurant{'\n'}focused on traditional{'\n'}recipes served with a{'\n'}modern twist</Text>
                    <Button title="Back" onPress={() => navigation.navigate('Profile')} />
                </View>
            </View>
            <FlatList
                data={menuData}
                renderItem={renderMenuItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.menuList}
            />
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
        color: '#EDEFEE',
    },
    description: {
        fontSize: 20,
        marginBottom: 0,
        color: '#EDEFEE',
    },
    menuList: {
        paddingBottom: 16,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    menuItemImage: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
        marginRight: 10,
    },
    menuItemName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    menuItemDescription: {
        fontSize: 14,
    },
});
