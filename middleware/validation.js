export const validatePet = (req, res, next) => {
  const { name, species, age, availability } = req.body;
  const errors = [];

  // Check for empty fields
  if (!name || name.trim() === '') {
    errors.push('Naam is verplicht');
  }
  if (!species || species.trim() === '') {
    errors.push('Soort is verplicht');
  }
  if (age === undefined || age === null || age === '') {
    errors.push('Leeftijd is verplicht');
  }
  if (availability === undefined || availability === null) {
    errors.push('Beschikbaarheid is verplicht');
  }

  // Check if name contains numbers
  if (name && /\d/.test(name)) {
    errors.push('Naam mag geen cijfers bevatten');
  }

  // Check if species contains numbers
  if (species && /\d/.test(species)) {
    errors.push('Soort mag geen cijfers bevatten');
  }

  // Check if age is numeric
  if (age !== undefined && age !== null && age !== '') {
    if (isNaN(age) || !Number.isInteger(Number(age))) {
      errors.push('Leeftijd moet een geheel getal zijn');
    } else if (Number(age) < 0) {
      errors.push('Leeftijd moet een positief getal zijn');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validatiefouten',
      errors: errors
    });
  }

  next();
};

export const validateAdopter = (req, res, next) => {
  const { name, contact } = req.body;
  const errors = [];

  // Check for empty fields
  if (!name || name.trim() === '') {
    errors.push('Naam is verplicht');
  }
  if (!contact || contact.trim() === '') {
    errors.push('Contact is verplicht');
  }

  // Check if name contains numbers
  if (name && /\d/.test(name)) {
    errors.push('Naam mag geen cijfers bevatten');
  }

  // Check if contact is valid email or phone
  if (contact) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    
    if (!emailRegex.test(contact) && !phoneRegex.test(contact)) {
      errors.push('Contact moet een geldig e-mailadres of telefoonnummer zijn');
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validatiefouten',
      errors: errors
    });
  }

  next();
};
