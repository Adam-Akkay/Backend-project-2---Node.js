import { dbAll, dbGet, dbRun } from '../database/db.js';

export class Pet {
  static async getAll(limit = null, offset = 0) {
    let pets;
    if (limit !== null) {
      pets = await dbAll('SELECT * FROM pets LIMIT ? OFFSET ?', [limit, offset]);
    } else {
      pets = await dbAll('SELECT * FROM pets');
    }
    return pets.map(pet => ({ ...pet, availability: pet.availability === 1 }));
  }

  static async getById(id) {
    const pet = await dbGet('SELECT * FROM pets WHERE id = ?', [id]);
    if (pet) {
      return { ...pet, availability: pet.availability === 1 };
    }
    return pet;
  }

  static async searchByName(name) {
    const pets = await dbAll('SELECT * FROM pets WHERE name LIKE ?', [`%${name}%`]);
    return pets.map(pet => ({ ...pet, availability: pet.availability === 1 }));
  }

  static async create(petData) {
    const { name, species, age, availability } = petData;
    const result = await dbRun(`
      INSERT INTO pets (name, species, age, availability)
      VALUES (?, ?, ?, ?)
    `, [name, species, age, availability ? 1 : 0]);
    
    return this.getById(result.lastID);
  }

  static async update(id, petData) {
    const { name, species, age, availability } = petData;
    const result = await dbRun(`
      UPDATE pets 
      SET name = ?, species = ?, age = ?, availability = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, species, age, availability ? 1 : 0, id]);
    
    if (result.changes === 0) {
      return null;
    }
    
    return this.getById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM pets WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
