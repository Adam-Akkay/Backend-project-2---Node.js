import { Pet } from '../models/Pet.js';

export const getAllPets = async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    
    const pets = await Pet.getAll(limit, offset);
    const total = limit !== null ? (await Pet.getAll()).length : pets.length;
    
    res.json({
      success: true,
      message: 'Huisdieren succesvol opgehaald',
      data: pets,
      paginatie: limit !== null ? {
        limit,
        offset,
        totaal: total
      } : null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het ophalen van huisdieren',
      error: error.message
    });
  }
};

export const getPetById = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.getById(id);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Huisdier niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Huisdier succesvol opgehaald',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het ophalen van huisdier',
      error: error.message
    });
  }
};

export const searchPets = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Zoekterm (name) is verplicht'
      });
    }
    
    const pets = await Pet.searchByName(name);
    
    res.json({
      success: true,
      message: `Zoekresultaten voor "${name}"`,
      data: pets
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het zoeken van huisdieren',
      error: error.message
    });
  }
};

export const createPet = async (req, res) => {
  try {
    const pet = await Pet.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Huisdier succesvol aangemaakt',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het aanmaken van huisdier',
      error: error.message
    });
  }
};

export const updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    const pet = await Pet.update(id, req.body);
    
    if (!pet) {
      return res.status(404).json({
        success: false,
        message: 'Huisdier niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Huisdier succesvol bijgewerkt',
      data: pet
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het bijwerken van huisdier',
      error: error.message
    });
  }
};

export const deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Pet.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Huisdier niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Huisdier succesvol verwijderd'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het verwijderen van huisdier',
      error: error.message
    });
  }
};
