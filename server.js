import express from 'express';
import { initializeDatabase } from './database/db.js';
import petRoutes from './routes/petRoutes.js';
import adopterRoutes from './routes/adopterRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize database
initializeDatabase().catch(err => {
  console.error('Fout bij initialiseren van database:', err);
  process.exit(1);
});

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="nl">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Pet Adoption System API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        h1 {
          color: #333;
          border-bottom: 3px solid #4CAF50;
          padding-bottom: 10px;
        }
        h2 {
          color: #555;
          margin-top: 30px;
          border-left: 4px solid #4CAF50;
          padding-left: 10px;
        }
        .endpoint {
          background-color: white;
          padding: 15px;
          margin: 10px 0;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .method {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 3px;
          font-weight: bold;
          margin-right: 10px;
        }
        .get { background-color: #4CAF50; color: white; }
        .post { background-color: #2196F3; color: white; }
        .put { background-color: #FF9800; color: white; }
        .delete { background-color: #f44336; color: white; }
        code {
          background-color: #f4f4f4;
          padding: 2px 6px;
          border-radius: 3px;
          font-family: monospace;
        }
        .description {
          margin-top: 10px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <h1>🐾 Pet Adoption System API</h1>
      <p>Welkom bij de Pet Adoption System API. Hieronder vindt u alle beschikbare endpoints.</p>
      
      <h2>Pet Endpoints</h2>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/pets</code>
        <div class="description">Haal alle huisdieren op (met paginatie: ?limit=10&offset=0)</div>
      </div>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/pets/search?name=Max</code>
        <div class="description">Zoek huisdieren op naam</div>
      </div>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/pets/:id</code>
        <div class="description">Haal een specifiek huisdier op op basis van ID</div>
      </div>
      
      <div class="endpoint">
        <span class="method post">POST</span>
        <code>/api/pets</code>
        <div class="description">Maak een nieuw huisdier aan. Body: { "name": "Max", "species": "Hond", "age": 3, "availability": true }</div>
      </div>
      
      <div class="endpoint">
        <span class="method put">PUT</span>
        <code>/api/pets/:id</code>
        <div class="description">Update een bestaand huisdier. Body: { "name": "Max", "species": "Hond", "age": 4, "availability": false }</div>
      </div>
      
      <div class="endpoint">
        <span class="method delete">DELETE</span>
        <code>/api/pets/:id</code>
        <div class="description">Verwijder een huisdier</div>
      </div>
      
      <h2>Adopter Endpoints</h2>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/adopters</code>
        <div class="description">Haal alle adoptanten op</div>
      </div>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/adopters/search?name=Jan</code>
        <div class="description">Zoek adoptanten op naam</div>
      </div>
      
      <div class="endpoint">
        <span class="method get">GET</span>
        <code>/api/adopters/:id</code>
        <div class="description">Haal een specifieke adoptant op op basis van ID</div>
      </div>
      
      <div class="endpoint">
        <span class="method post">POST</span>
        <code>/api/adopters</code>
        <div class="description">Maak een nieuwe adoptant aan. Body: { "name": "Jan Janssen", "contact": "jan@example.com", "pet_id": 1 }</div>
      </div>
      
      <div class="endpoint">
        <span class="method put">PUT</span>
        <code>/api/adopters/:id</code>
        <div class="description">Update een bestaande adoptant. Body: { "name": "Jan Janssen", "contact": "jan@example.com", "pet_id": 2 }</div>
      </div>
      
      <div class="endpoint">
        <span class="method delete">DELETE</span>
        <code>/api/adopters/:id</code>
        <div class="description">Verwijder een adoptant</div>
      </div>
      
      <h2>Validatieregels</h2>
      <ul>
        <li>Geen lege velden toegestaan</li>
        <li>Leeftijd moet numeriek zijn</li>
        <li>Namen mogen geen cijfers bevatten</li>
        <li>Contact moet een geldig e-mailadres of telefoonnummer zijn</li>
      </ul>
    </body>
    </html>
  `);
});

app.use('/api/pets', petRoutes);
app.use('/api/adopters', adopterRoutes);

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
