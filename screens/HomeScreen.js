import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { createMenuTable, insertMenuItem, clearMenuTable } from '../database';
import CategoryList from '../categories/CategoryList';
import _ from 'lodash';

const logo = require('../img/Logo.png');
const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const profileImage = route.params?.profileImage;
  const [menuData, setMenuData] = useState([]);

  const fetchMenuData = async () => {
    try {
      const response = await axios.get(
        'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
      );
      const menuItems = response.data.menu;
      createMenuTable();
      clearMenuTable();
      menuItems.forEach(item => {
        insertMenuItem(item);
      });
      setMenuData(menuItems);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} />
        <TouchableOpacity style={styles.avatarContainer} onPress={navigateToProfile}>
          <Avatar avatarStyle={styles.avatar} size="medium" rounded source={profileImage ? { uri: profileImage } : null} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Image source={require('../img/waiter.png')} style={styles.waiter} />
        <View style={styles.textContainer}>
          <Text style={[styles.text, styles.title]}>Little Lemon</Text>
          <Text style={[styles.text, styles.city]}>Chicago</Text>
          <Text style={[styles.text, styles.description]}>We are a family-owned{'\n'}mediterranean restaurant{'\n'}focused on traditional{'\n'}recipes served with a{'\n'}modern twist</Text>
        </View>
      </View>
      <CategoryList menuData={menuData} />
      <View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 32,
  },
  logo: {
    resizeMode: 'contain',
  },
  waiter: {
    marginTop:40,
    width: 200,
    height: 200,
    resizeMode: 'cover',
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
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 30,
  },
  contentContainer: {
    backgroundColor: '#495E57',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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
