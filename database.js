import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('little_lemon.db');

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
        }
      }
    );
  });
};

export const insertMenuItem = (menuItem) => {
  const { name, price, description, image, category } = menuItem;
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO menu (name, price, description, image, category) VALUES (?, ?, ?, ?, ?)',
      [name, price, description, image, category],
      (_, { rowsAffected }) => {
        if (rowsAffected > 0) {
        }
      }
    );
  });
};

export const getMenuItems = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT * FROM menu', [], (_, { rows }) => {
      const menuItems = rows._array;
      callback(menuItems);
    });
  });
};

export const clearMenuTable = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM menu', [], (_, { rowsAffected }) => {
      if (rowsAffected > 0) {
      }
    });
  });
};

export const getFilteredMenu = (selectedCategories, searchQuery, callback) => {
  db.transaction(tx => {
    let query = 'SELECT * FROM menu';

    if (selectedCategories.length > 0) {
      const placeholders = selectedCategories.map(() => '?').join(',');
      query += ` WHERE category IN (${placeholders})`;
    }

    if (searchQuery.length > 0) {
      query += selectedCategories.length > 0 ? ' AND' : ' WHERE';
      query += ` name LIKE '%${searchQuery}%'`;
    }

    tx.executeSql(query, selectedCategories, (_, { rows }) => {
      const filteredItems = rows._array;
      callback(filteredItems);
    });
  });
};

export const getCategories = (callback) => {
  db.transaction(tx => {
    tx.executeSql('SELECT DISTINCT category FROM menu', [], (_, { rows }) => {
      const categories = rows._array.map(item => ({ name: item.category }));
      callback(categories);
    });
  });
};

export const searchMenuItems = (query, selectedCategories, callback) => {
  db.transaction(tx => {
    let sqlQuery = 'SELECT * FROM menu';

    if (selectedCategories.length > 0) {
      const placeholders = selectedCategories.map(() => '?').join(',');
      sqlQuery += ` WHERE category IN (${placeholders})`;
    }

    if (query.length > 0) {
      sqlQuery += selectedCategories.length > 0 ? ' AND' : ' WHERE';
      sqlQuery += ` name LIKE '%${query}%'`;
    }

    tx.executeSql(sqlQuery, selectedCategories, (_, { rows }) => {
      const filteredItems = rows._array;
      callback(filteredItems);
    });
  });
};
