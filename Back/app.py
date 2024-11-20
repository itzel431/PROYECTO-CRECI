from flask import Flask, request, jsonify
import pyodbc

app = Flask(__name__)

# Configuración de la base de datos SQL Server
conn = pyodbc.connect(
    "Driver={ODBC Driver 17 for SQL Server};"
    "Server=TU_SERVIDOR;"
    "Database=Creci;"
    "UID=TU_USUARIO;"
    "PWD=TU_CONTRASENA;"
)
cursor = conn.cursor()

# Ruta para registrar usuarios
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    try:
        cursor.execute("""
            INSERT INTO Usuarios (Nombre, CorreoElectronico, Contrasena, Plan)
            VALUES (?, ?, ?, ?)
        """, data['nombre'], data['correo'], data['contrasena'], data['plan'])
        conn.commit()
        return jsonify({"message": "Registro exitoso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ruta para iniciar sesión
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    cursor.execute("""
        SELECT ID, Nombre, Plan FROM Usuarios
        WHERE CorreoElectronico = ? AND Contrasena = ?
    """, data['correo'], data['contrasena'])
    user = cursor.fetchone()
    if user:
        return jsonify({"id": user[0], "nombre": user[1], "plan": user[2]}), 200
    else:
        return jsonify({"error": "Credenciales incorrectas"}), 401

# Ruta para guardar datos específicos del usuario (progreso, diario, etc.)
@app.route('/save', methods=['POST'])
def save_data():
    data = request.json
    # Lógica para guardar en la tabla correspondiente (e.g., Progreso, Diario)
    return jsonify({"message": "Datos guardados"}), 200

if __name__ == '__main__':
    app.run(debug=True)
