import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const categories = [
  { id: 1, name: 'Starters' },
  { id: 2, name: 'Mains' },
  { id: 3, name: 'Desserts' },
];

const CategoryList = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (categoryId) => {
    const categoryIndex = selectedCategories.indexOf(categoryId);
    if (categoryIndex !== -1) {
      setSelectedCategories(prevState => prevState.filter(id => id !== categoryId));
    } else {
      setSelectedCategories(prevState => [...prevState, categoryId]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategories.includes(category.id) && styles.selectedCategoryItem
          ]}
          onPress={() => toggleCategory(category.id)}
        >
          <Text
            style={[
              styles.categoryName,
              selectedCategories.includes(category.id) && styles.selectedCategoryName
            ]}
          >
            {category.name}
          </Text>
        </TouchableOpacity>
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
    paddingVertical: 8,
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
});

export default CategoryList;
