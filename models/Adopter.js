import { dbAll, dbGet, dbRun } from '../database/db.js';

export class Adopter {
  static async getAll() {
    return await dbAll('SELECT * FROM adopters');
  }

  static async getById(id) {
    return await dbGet('SELECT * FROM adopters WHERE id = ?', [id]);
  }

  static async searchByName(name) {
    return await dbAll('SELECT * FROM adopters WHERE name LIKE ?', [`%${name}%`]);
  }

  static async create(adopterData) {
    const { name, contact, pet_id } = adopterData;
    const result = await dbRun(`
      INSERT INTO adopters (name, contact, pet_id)
      VALUES (?, ?, ?)
    `, [name, contact, pet_id || null]);
    
    return this.getById(result.lastID);
  }

  static async update(id, adopterData) {
    const { name, contact, pet_id } = adopterData;
    const result = await dbRun(`
      UPDATE adopters 
      SET name = ?, contact = ?, pet_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, [name, contact, pet_id || null, id]);
    
    if (result.changes === 0) {
      return null;
    }
    
    return this.getById(id);
  }

  static async delete(id) {
    const result = await dbRun('DELETE FROM adopters WHERE id = ?', [id]);
    return result.changes > 0;
  }
}
