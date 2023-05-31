import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { getFilteredMenu, getCategories } from '../database';

const db = SQLite.openDatabase('TheLittleLemon.db');

const CategoryList = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  const applyFilter = () => {
    getFilteredMenu(selectedCategories, (filteredItems) => {
      setFilteredMenu(filteredItems);
    });
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const categoryIndex = prevCategories.indexOf(categoryId);
      if (categoryIndex !== -1) {
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        return [...prevCategories, categoryId];
      }
    });
  };

  useEffect(() => {
    applyFilter();
  }, [selectedCategories]);

  useEffect(() => {
    getCategories((categories) => {
      setCategories(categories);
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category.name}
          style={[
            styles.categoryItem,
            selectedCategories.includes(category.name) && styles.selectedCategoryItem,
          ]}
          onPress={() => toggleCategory(category.name)}
        >
          <Text
            style={[
              styles.categoryName,
              selectedCategories.includes(category.name) && styles.selectedCategoryName,
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}

      {/* render only the filtered menu items */}
      {filteredMenu.map((item) => (
        <View key={item.name} style={styles.menuItem}>
          <Image
            source={{
              uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
            }}
            style={styles.menuItemImage}
          />
          <View style={styles.menuItemDetails}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedCategoryItem: {
    backgroundColor: '#ccc',
  },
  categoryName: {
    fontSize: 16,
    color: 'black',
  },
  selectedCategoryName: {
    color: 'white',
  },
  menuItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
    marginLeft: 5,
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

export default CategoryList;
