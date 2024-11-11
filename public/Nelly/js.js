// Función para mostrar solo la sección seleccionada
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".seccion-oculta");
  document.getElementById("bienvenida").style.display = "none"; // Oculta la bienvenida
  secciones.forEach(seccion => {
    seccion.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

// Función para mostrar recomendaciones y formularios específicos
function mostrarRecomendaciones(id) {
  document.querySelectorAll(".recomendaciones-ocultas").forEach(element => {
    element.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}

function mostrarFormularioSalud() {
  document.getElementById("formularioSalud").style.display = "block";
}

// Registro de Salud
function registrarSalud() {
  const nombre = document.getElementById("nombreBebe").value;
  const peso = document.getElementById("pesoBebe").value;
  const comidas = document.getElementById("comidasDia").value;
  const horasSueno = document.getElementById("horasSueno").value;
  const enfermedades = document.getElementById("enfermedadesRecientes").value;

  const fecha = new Date().toLocaleDateString();
  const tabla = document.getElementById("tablaSalud").querySelector("tbody");
  const nuevaFila = document.createElement("tr");

  nuevaFila.innerHTML = `<td>${fecha}</td><td>${nombre}</td><td>${peso}</td><td>${comidas}</td><td>${horasSueno}</td><td>${enfermedades}</td>`;
  tabla.appendChild(nuevaFila);

  document.getElementById("saludForm").reset();
}
