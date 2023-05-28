import React, { useState } from 'react';
import { StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';

const CategoryList = ({ categories, onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const handleSelectCategory = (category) => {
    const isSelected = selectedCategories.includes(category);
    let updatedSelectedCategories;

    if (isSelected) {
      updatedSelectedCategories = selectedCategories.filter((item) => item !== category);
    } else {
      updatedSelectedCategories = [...selectedCategories, category];
    }

    setSelectedCategories(updatedSelectedCategories);
    onSelectCategory(updatedSelectedCategories);
  };

  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategories.includes(item);

    return (
      <TouchableOpacity
        style={[styles.categoryItem, isSelected && styles.selectedCategoryItem]}
        onPress={() => handleSelectCategory(item)}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
          {item}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item}
      style={styles.categoryList}
    />
  );
};

const styles = StyleSheet.create({
  categoryList: {
    flexGrow: 0,
    marginBottom: 16,
  },
  categoryItem: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 8,
    borderRadius: 5,
  },
  selectedCategoryItem: {
    backgroundColor: '#4CAF50', // Customize the selected background color
  },
  categoryText: {
    fontSize: 16,
    color: '#000000',
  },
  selectedCategoryText: {
    color: '#FFFFFF', // Customize the selected text color
  },
});

export default CategoryList;
