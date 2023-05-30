// import React, { useState } from 'react';
// import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';

// const categories = [
//   { id: 1, name: 'Starters' },
//   { id: 2, name: 'Mains' },
//   { id: 3, name: 'Desserts' },
// ];

// const CategoryList = ({ menuData }) => {
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const filteredMenu = menuData.filter(item => selectedCategories.includes(item.category));

//   const toggleCategory = (categoryId) => {
//     const categoryIndex = selectedCategories.indexOf(categoryId);
//     if (categoryIndex !== -1) {
//       setSelectedCategories(prevState => prevState.filter(id => id !== categoryId));
//     } else {
//       setSelectedCategories(prevState => [...prevState, categoryId]);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       {categories.map(category => (
//         <TouchableOpacity
//           key={category.id}
//           style={[
//             styles.categoryItem,
//             selectedCategories.includes(category.id) && styles.selectedCategoryItem
//           ]}
//           onPress={() => toggleCategory(category.id)}
//         >
//           <Text
//             style={[
//               styles.categoryName,
//               selectedCategories.includes(category.id) && styles.selectedCategoryName
//             ]}
//           >
//             {category.name}
//           </Text>
//         </TouchableOpacity>
//       ))}

//       {/* Render only the filtered menu items */}
//       {filteredMenu.map(item => (
//         <View key={item.name} style={styles.menuItem}>
//           <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.menuItemImage} />
//           <View style={styles.menuItemDetails}>
//             <Text style={styles.menuItemName}>{item.name}</Text>
//             <Text style={styles.menuItemPrice}>${item.price}</Text>
//             <Text style={styles.menuItemDescription}>{item.description}</Text>
//           </View>
//         </View>
//       ))}
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: 16,
//   },
//   categoryItem: {
//     paddingVertical: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   selectedCategoryItem: {
//     backgroundColor: '#ccc',
//   },
//   categoryName: {
//     fontSize: 16,
//     color: 'white',
//   },
//   selectedCategoryName: {
//     color: 'white',
//   },
//   menuItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   menuItemImage: {
//     width: 100,
//     height: 100,
//     resizeMode: 'cover',
//     borderRadius: 10,
//     marginRight: 10,
//   },
//   menuItemDetails: {
//     flex: 1,
//   },
//   menuItemName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   menuItemPrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 4,
//   },
//   menuItemDescription: {
//     fontSize: 14,
//   },
// });

// export default CategoryList;
//////////////////////////////////////

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import * as SQLite from 'expo-sqlite';
import {getFilteredMenu} from '../database'

const categories = [
  { id: 1, name: 'starters' },
  { id: 2, name: 'mains' },
  { id: 3, name: 'desserts' },
];

const db = SQLite.openDatabase('TheLittleLemon.db');

const CategoryList = (props) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);


  useEffect(() => {
    applyFilter();
  }, [selectedCategories]);

  // const applyFilter = () => {
  //   db.transaction(tx => {
  //     let query = 'SELECT * FROM menu';

  //     if (selectedCategories.length > 0) {
  //       const categoryIds = selectedCategories.join(',');
  //       query += ` WHERE category IN (${categoryIds})`;
  //     }

  //     tx.executeSql(query, [], (_, { rows }) => {
  //       const filteredItems = rows._array;
  //       console.log(filteredItems)
  //       //here rendered "description", "id", "image", "name" y "price".
  //       setFilteredMenu(filteredItems);
  //     });
  //   });
  // };
  const applyFilter = () => {
    getFilteredMenu(selectedCategories, (filteredItems) => {
      setFilteredMenu(filteredItems);
    });
  };


  const toggleCategory = (categoryId) => {
    setSelectedCategories((prevCategories) => {
      const categoryIndex = prevCategories.indexOf(categoryId);
      if (categoryIndex !== -1) {
        // ategory already selected, remove it
        return prevCategories.filter((id) => id !== categoryId);
      } else {
        // category not selected, add it
        return [...prevCategories, categoryId];
      }
    });
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

      {/* render only the filtered menu items */}
      {filteredMenu.map(item => (
        <View key={item.name} style={styles.menuItem}>
          <Image source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true` }} style={styles.menuItemImage} />
          <View style={styles.menuItemDetails}>
            <Text style={styles.menuItemName}>{item.name}</Text>
            <Text style={styles.menuItemPrice}>${item.price}</Text>
            <Text style={styles.menuItemDescription}>{item.description}</Text>
            {/* <Text style={styles.menuItemDescription}>{item.category}</Text> */}

          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
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