const sql = require("mssql");

const config = {
  user: "tuUsuario", // Coloca aquí tu usuario de SQL Server
  password: "tuContraseña", // Coloca aquí tu contraseña de SQL Server
  server: "localhost",
  database: "CreciApp",
  options: {
    encrypt: true,
    trustServerCertificate: true
  }
};

const pool = new sql.ConnectionPool(config);
const connectDB = async () => {
  try {
    await pool.connect();
    console.log("Conexión a la base de datos exitosa");
  } catch (error) {
    console.error("Error de conexión a la base de datos:", error);
  }
};

module.exports = { pool, connectDB };
