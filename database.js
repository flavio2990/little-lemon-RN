import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('LittleLemon.db');

// Método para crear la tabla de menú
export const createMenuTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS menu (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        price REAL,
        description TEXT,
        image TEXT,
        category TEXT
      );`,
      [],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          // console.log('Table "menu" created successfully.');
        }
      }
    );
  });
};

// Método para insertar un nuevo ítem de menú
export const insertMenuItem = (menuItem) => {
  const { name, price, description, image, category } = menuItem;
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, image, category],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
          // console.log('Menu item inserted successfullyy.');
        }
      }
    );
  });
};

// Método para obtener todos los ítems de menú
export const getMenuItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
      const menuItems = rows._array;
      callback(menuItems);
    });
  });
};

// Método para borrar todos los ítems de menú
export const clearMenuTable = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM menu', [], (_, { rowsAffected }) => {
      if (rowsAffected > 0) {
        // console.log('Menu table cleared successfull.');
      }
    });
  });
};
/// esto va al categorylist
export const getFilteredMenu = (selectedCategories, callback) => {
  db.transaction(tx => {
    let query = 'SELECT * FROM menu';

    if (selectedCategories.length > 0) {
      const placeholders = selectedCategories.map(() => '?').join(',');
      query += ` WHERE category IN (${placeholders})`;
    }

    tx.executeSql(query, selectedCategories, (_, { rows }) => {
      const filteredItems = rows._array;
      callback(filteredItems);
    });
  });
};


////
export const getCategories = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT DISTINCT category FROM menu', [], (_, { rows }) => {
      const categories = rows._array.map(item => ({ name: item.category }));
      callback(categories);
    });
  });
};