import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CategoryList = ({ categories, onSelectCategory }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const toggleCategory = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <View style={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[
            styles.categoryButton,
            selectedCategories.includes(category) && styles.selectedCategoryButton,
          ]}
          onPress={() => {
            toggleCategory(category);
            onSelectCategory(category, !selectedCategories.includes(category));
          }}
        >
          <Text
            style={[
              styles.categoryText,
              selectedCategories.includes(category) && styles.selectedCategoryText,
            ]}
          >
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'lightgray',
    marginHorizontal: 5,
  },
  selectedCategoryButton: {
    backgroundColor: 'darkgray',
  },
  categoryText: {
    fontSize: 16,
    color: 'black',
  },
  selectedCategoryText: {
    color: 'white',
  },
});

export default CategoryList;
