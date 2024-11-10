const express = require('express');
const bodyParser = require('body-parser');
const { conectarDB } = require('./database');

const app = express();
const PORT = 3000;

// Conectar a la base de datos
conectarDB();

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Rutas de ejemplo
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/itzel/index.html');
});

app.listen(PORT, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
