import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Dimensions, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { createTable, getMenuItems, saveMenuItems, filterByQueryAndCategories, } from '../data/database';
import CategoryList from '../categories/CategoryList';

const logo = require('../img/Logo.png');


const windowWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const profileImage = route.params?.profileImage;
  const [menuData, setMenuData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState([]);
  const getImageUrl = (imageFileName) =>
    `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;

  const getSectionListData = (menuData) => {
    const sections = [];
    menuData.forEach((menuItem) => {
      const existingSection = sections.find((section) => section.category === menuItem.category);
      if (existingSection) {
        existingSection.data.push(menuItem);
      } else {
        sections.push({ category: menuItem.category, data: [menuItem] });
      }
    });

    return sections;
  };
  const fetchMenuData = async () => {
    try {
      const menuItems = await getMenuItems();
      if (menuItems.length > 0) {
        setMenuData(menuItems);
      } else {
        const response = await fetch('https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json');
        const data = await response.json();
        saveMenuItems(data.menu);
        setMenuData(data.menu);
      }
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        await createTable();
        await fetchMenuData();
        if (menuData) {
          const sectionListData = getSectionListData(menuData);
          setData(sectionListData);
        } else {
          setData([]);
        }
        const getProfile = await AsyncStorage.getItem('profile');
        setProfile(JSON.parse(getProfile));
      } catch (e) {
        console.log(e.message);
      }
    })();
  }, []);




  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItemContainer}>
      <Image source={{ uri: getImageUrl(item.image) }} style={styles.menuItemImage} />
      <View style={styles.menuItemTextContainer}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemPrice}>${item.price}</Text>
        <Text style={styles.menuItemDescription}>{item.description}</Text>
      </View>
    </View>
  );


  const keyExtractor = (item) => item.name;


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

      {menuData && (
        <FlatList
          data={menuData}
          renderItem={renderMenuItem}
          keyExtractor={keyExtractor}
          style={styles.menuList}
        />
      )}
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
  ///////////
  menuList: {
    width: '100%',
    paddingHorizontal: 16,
    marginTop: 20,
  },
  menuItemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  menuItemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  menuItemPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  menuItemDescription: {
    fontSize: 14,
  },
})