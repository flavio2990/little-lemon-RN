import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { getFilteredMenu, getCategories, searchMenuItems } from '../database';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';


const CategoryList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const debounceSearch = useRef(_.debounce((query) => {
    searchMenuItems(query, selectedCategories, (filteredItems) => {
      setFilteredMenu(filteredItems);
    });
  }, 500)).current;

  const applyFilter = () => {
    getFilteredMenu(selectedCategories, searchQuery, (filteredItems) => {
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
    <ScrollView contentContainerStyle={{ alignItems: "stretch" }} stickyHeaderIndices={[0]}>
      <View style={styles.searchBarContainer}>
        <SearchBar
          platform="default"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainer}
          placeholder="Search dishes..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            debounceSearch(text);
          }}
        />
      </View>
      <View style={styles.categoryContainer}>
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
      </View>
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
    </ScrollView >
  );
};


const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    padding: 10,
  },
  scrollMenu: {
    alignItems: 'stretch',
  },
  categoryItem: {
    marginLeft: 10,
    borderWidth: 1,
    borderRadius: 10,
    width: 80,
    height: 40,
    paddingVertical: 5,
  },
  selectedCategoryItem: {
    backgroundColor: '#ccc',
  },
  categoryName: {
    marginLeft: '5%',
    justifyContent: 'center',
    alignContent: 'center',
    // backgroundColor:'black',
    fontSize: 16,
    color: 'black',
  },
  selectedCategoryName: {
    color: 'white',
  },
  menuItemDetails: {
    marginLeft: 10
  },
  menuItem: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    marginLeft: 10,
  },
  menuItemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
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
  searchBarInputContainer: {
    width: '100%',
    backgroundColor: '#EDEFEE',
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#495E57',
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  categoryContainer: {
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default CategoryList;