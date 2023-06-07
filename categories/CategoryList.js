import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { getFilteredMenu, getCategories, searchMenuItems } from '../database';
import _ from 'lodash';
import { SearchBar } from 'react-native-elements';

// const windowWidth = Dimensions.get('window').width;

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
    <ScrollView contentContainerStyle={styles.container}>
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
      <View>
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
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex:1,
    backgroundColor:'red',
    padding: 10,
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
    backgroundColor:'black',
    fontSize: 16,
    color: 'black',
  },
  selectedCategoryName: {
    color: 'white',
  },
  menuItemDetails:{
    backgroundColor:'white',

  },
  menuItem: {
    flex:1,
    alignItems: 'center',
    // flexDirection: 'row', con row se ve acomodado, la img a la iz y los txts a la derecha
    flexDirection:'column',
    marginBottom: 16,
    marginLeft: 10,
  },
  menuItemImage: {
    backgroundColor:'green',
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  menuItemName: {
    backgroundColor:'blue',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemPrice: {
    backgroundColor:'yellow',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  menuItemDescription: {
    backgroundColor:'grey',
    fontSize: 14,
  },
  searchBarInputContainer: {
    width: '100%',
    backgroundColor: '#EDEFEE',
  },
  searchBarContainer: {
    marginLeft: "0%",
    marginRight: "10%",
    paddingHorizontal: 20,
    backgroundColor: '#495E57',
  },
  searchBarContainerStyle: {
    backgroundColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
});

export default CategoryList;