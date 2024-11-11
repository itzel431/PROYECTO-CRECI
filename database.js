const sql = require('mssql');

const dbConfig = {
  user: 'Creci',         // Cambia por tu usuario de SQL Server
  password: 'Creci',  // Cambia por tu contraseña
  server: 'localhost',        // Cambia si usas un servidor remoto
  database: 'CRECI',
  options: {
    encrypt: true,            // Activa si usas Azure; desactiva para SQL Server local
    enableArithAbort: true
  }
};

const conectarDB = async () => {
  try {
    await sql.connect(dbConfig);
    console.log('Conectado a la base de datos');
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
};

module.exports = { conectarDB, sql };
