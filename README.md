# Pet Adoption System API

Een Node.js + Express API voor een huisdieren adoptie systeem.

## Vereisten

- Node.js 20 of hoger
- npm of yarn

## Installatie

```bash
npm install
```

## Starten

```bash
npm start
```

Of voor development met auto-reload:

```bash
npm run dev
```

De server draait standaard op `http://localhost:3000`

## API Endpoints

### Pet Endpoints

- `GET /api/pets` - Haal alle huisdieren op (met paginatie: `?limit=10&offset=0`)
- `GET /api/pets/search?name=Max` - Zoek huisdieren op naam
- `GET /api/pets/:id` - Haal een specifiek huisdier op
- `POST /api/pets` - Maak een nieuw huisdier aan
- `PUT /api/pets/:id` - Update een huisdier
- `DELETE /api/pets/:id` - Verwijder een huisdier

### Adopter Endpoints

- `GET /api/adopters` - Haal alle adoptanten op
- `GET /api/adopters/search?name=Jan` - Zoek adoptanten op naam
- `GET /api/adopters/:id` - Haal een specifieke adoptant op
- `POST /api/adopters` - Maak een nieuwe adoptant aan
- `PUT /api/adopters/:id` - Update een adoptant
- `DELETE /api/adopters/:id` - Verwijder een adoptant

## Validatieregels

- Geen lege velden toegestaan
- Leeftijd moet numeriek zijn
- Namen mogen geen cijfers bevatten
- Contact moet een geldig e-mailadres of telefoonnummer zijn

## Database

De applicatie gebruikt SQLite als database. De database wordt automatisch aangemaakt bij de eerste start.

## Project Structuur

```
├── server.js              # Hoofdbestand van de applicatie
├── database/
│   └── db.js              # Database configuratie en initialisatie
├── models/
│   ├── Pet.js             # Pet model
│   └── Adopter.js         # Adopter model
├── controllers/
│   ├── petController.js   # Pet controllers
│   └── adopterController.js # Adopter controllers
├── routes/
│   ├── petRoutes.js       # Pet routes
│   └── adopterRoutes.js   # Adopter routes
└── middleware/
    ├── validation.js      # Validatie middleware
    └── errorHandler.js    # Error handling middleware
```
