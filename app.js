const sql = require("mssql");
const express = require("express");
const app = express();
const port = 3000;

const config = {
  server: "localhost", // Nombre del servidor
  database: "CRECI", // Nombre de tu base de datos
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};


// Crear un pool de conexión
const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();
app.use(express.json()); // Para parsear JSON en el cuerpo de la solicitud

// Ruta para registrar nuevos usuarios
app.post("/registro", async (req, res) => {
  const { nombre, correo, contraseña } = req.body; // Datos que recibe del frontend

  try {
    // Consulta SQL para insertar un nuevo usuario en la base de datos
    const query = `
      INSERT INTO Usuarios (Nombre, Correo, Contraseña)
      VALUES (@nombre, @correo, @contraseña);
    `;
    const request = pool.request();
    request.input("nombre", sql.NVarChar, nombre);
    request.input("correo", sql.NVarChar, correo);
    request.input("contraseña", sql.NVarChar, contraseña);
    await request.query(query);

    res.send("Usuario registrado exitosamente");
  } catch (err) {
    console.error("Error registrando usuario:", err);
    res.status(500).send("Error en el registro");
  }
});
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
