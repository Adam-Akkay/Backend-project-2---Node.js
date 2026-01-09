import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = join(__dirname, 'pets.db');
let db;

export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Fout bij het openen van database:', err);
        reject(err);
        return;
      }
      
      // Create pets table
      db.run(`
        CREATE TABLE IF NOT EXISTS pets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          species TEXT NOT NULL,
          age INTEGER NOT NULL,
          availability INTEGER NOT NULL DEFAULT 1,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Fout bij het aanmaken van pets tabel:', err);
          reject(err);
          return;
        }
        
        // Create adopters table
        db.run(`
          CREATE TABLE IF NOT EXISTS adopters (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            contact TEXT NOT NULL,
            pet_id INTEGER,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (pet_id) REFERENCES pets(id)
          )
        `, (err) => {
          if (err) {
            console.error('Fout bij het aanmaken van adopters tabel:', err);
            reject(err);
            return;
          }
          
          console.log('Database geïnitialiseerd');
          resolve(db);
        });
      });
    });
  });
};

export const getDatabase = () => {
  if (!db) {
    db = new sqlite3.Database(dbPath);
  }
  return db;
};

// Promisify database methods
export const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ lastID: this.lastID, changes: this.changes });
    });
  });
};

export const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    const database = getDatabase();
    database.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};
