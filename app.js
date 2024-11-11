const express = require("express");
const bodyParser = require("body-parser");
const { pool, connectDB } = require("./database");

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Conectar a la base de datos
connectDB();

// Ruta para registrar un usuario
app.post("/registro", async (req, res) => {
  const { nombre, correo, contraseña } = req.body;
  const query = `
    INSERT INTO Usuarios (Nombre, Correo, Contraseña)
    VALUES (@nombre, @correo, @contraseña);
  `;
  try {
    const request = pool.request();
    request.input("nombre", sql.NVarChar, nombre);
    request.input("correo", sql.NVarChar, correo);
    request.input("contraseña", sql.NVarChar, contraseña);
    await request.query(query);
    res.send("Usuario registrado exitosamente");
  } catch (error) {
    console.error("Error registrando usuario:", error);
    res.status(500).send("Error en el registro");
  }
});

// Ruta para iniciar sesión
app.post("/login", async (req, res) => {
  const { correo, contraseña } = req.body;
  const query = `
    SELECT * FROM Usuarios WHERE Correo = @correo AND Contraseña = @contraseña;
  `;
  try {
    const request = pool.request();
    request.input("correo", sql.NVarChar, correo);
    request.input("contraseña", sql.NVarChar, contraseña);
    const result = await request.query(query);

    if (result.recordset.length > 0) {
      res.send("Inicio de sesión exitoso");
    } else {
      res.status(401).send("Correo o contraseña incorrectos");
    }
  } catch (error) {
    console.error("Error en el inicio de sesión:", error);
    res.status(500).send("Error en el inicio de sesión");
  }
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en http://localhost:${port}`);
});
