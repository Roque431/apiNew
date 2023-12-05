const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Importa el paquete cors
const dbconfig = require('./config/db.config');
const inicionSesionRoutes = require('./routes/citaUsuario.routes');

const app = express();
const port = 8080;

// Configurar middleware para parsear JSON
app.use(bodyParser.json());

// Configurar CORS
app.use(cors()); // Esto permitirá cualquier origen

// Configurar rutas
app.use('/', inicionSesionRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://54.145.141.130:${port}`);
});