import { Adopter } from '../models/Adopter.js';

export const getAllAdopters = async (req, res) => {
  try {
    const adopters = await Adopter.getAll();
    
    res.json({
      success: true,
      message: 'Adoptanten succesvol opgehaald',
      data: adopters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het ophalen van adoptanten',
      error: error.message
    });
  }
};

export const getAdopterById = async (req, res) => {
  try {
    const { id } = req.params;
    const adopter = await Adopter.getById(id);
    
    if (!adopter) {
      return res.status(404).json({
        success: false,
        message: 'Adoptant niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Adoptant succesvol opgehaald',
      data: adopter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het ophalen van adoptant',
      error: error.message
    });
  }
};

export const searchAdopters = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({
        success: false,
        message: 'Zoekterm (name) is verplicht'
      });
    }
    
    const adopters = await Adopter.searchByName(name);
    
    res.json({
      success: true,
      message: `Zoekresultaten voor "${name}"`,
      data: adopters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het zoeken van adoptanten',
      error: error.message
    });
  }
};

export const createAdopter = async (req, res) => {
  try {
    const adopter = await Adopter.create(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Adoptant succesvol aangemaakt',
      data: adopter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het aanmaken van adoptant',
      error: error.message
    });
  }
};

export const updateAdopter = async (req, res) => {
  try {
    const { id } = req.params;
    const adopter = await Adopter.update(id, req.body);
    
    if (!adopter) {
      return res.status(404).json({
        success: false,
        message: 'Adoptant niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Adoptant succesvol bijgewerkt',
      data: adopter
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het bijwerken van adoptant',
      error: error.message
    });
  }
};

export const deleteAdopter = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Adopter.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Adoptant niet gevonden'
      });
    }
    
    res.json({
      success: true,
      message: 'Adoptant succesvol verwijderd'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Fout bij het verwijderen van adoptant',
      error: error.message
    });
  }
};
