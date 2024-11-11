async function registrarUsuario() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const contraseña = document.getElementById("contraseña").value;

  const response = await fetch("http://localhost:3000/registro", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nombre, correo, contraseña })
  });

  if (response.ok) {
    alert("Registro exitoso");
  } else {
    alert("Error en el registro");
  }
}

async function iniciarSesion() {
  const correo = document.getElementById("correoLogin").value;
  const contraseña = document.getElementById("contraseñaLogin").value;

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo, contraseña })
  });

  if (response.ok) {
    alert("Inicio de sesión exitoso");
    // Redirigir a la página principal después del inicio de sesión
    window.location.href = "principal.html"; // Cambia esto según la estructura
  } else {
    alert("Correo o contraseña incorrectos");
  }
}
