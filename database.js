const sql = require('mssql');

const dbConfig = {
  user: 'tu_usuario',         // Cambia por tu usuario de SQL Server
  password: 'tu_contraseña',  // Cambia por tu contraseña
  server: 'localhost',        // Cambia si usas un servidor remoto
  database: 'nombre_de_tu_base_de_datos',
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
