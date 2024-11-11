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

function mostrarFormularioAlimentacion() {
  document.getElementById("formularioAlimentacion").style.display = "block";
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

// Registro de Alimentación
function registrarAlimentacion() {
  const alimento = document.getElementById("alimento").value;
  const preparacion = document.getElementById("preparacion").value;
  const alergias = document.getElementById("alergias").value;
  
  const fecha = new Date().toLocaleDateString();
  const tabla = document.getElementById("tablaAlimentacion").querySelector("tbody");
  const nuevaFila = document.createElement("tr");

  nuevaFila.innerHTML = `<td>${fecha}</td><td>${alimento}</td><td>${preparacion}</td><td>${alergias}</td>`;
  tabla.appendChild(nuevaFila);

  document.getElementById("alimentacionForm").reset();
}

// Función para agregar fotos con descripción y fecha en el álbum
function agregarFoto() {
  const fotoInput = document.getElementById("fotoBebe");
  const descripcion = document.getElementById("descripcionFoto").value;
  const album = document.getElementById("albumFotos");

  if (album.childElementCount >= 300) {
    alert("El álbum ha alcanzado el límite de 300 fotos.");
    return;
  }

  const fotoURL = URL.createObjectURL(fotoInput.files[0]);
  const contenedorFoto = document.createElement("div");
  contenedorFoto.classList.add("foto-item");

  contenedorFoto.innerHTML = `<img src="${fotoURL}" alt="Foto del bebé"><p>${descripcion}</p><p>${new Date().toLocaleDateString()}</p>`;
  album.appendChild(contenedorFoto);

  document.getElementById("albumForm").reset();
}

// Función para cambiar los colores de la interfaz
function cambiarColor(bgColor, textColor) {
  // Cambiar colores de fondo y texto de la interfaz completa
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;

  // Cambiar colores de la barra de navegación
  const navbar = document.querySelector('.navbar');
  navbar.style.backgroundColor = bgColor;
  navbar.style.color = textColor;
  navbar.querySelectorAll('a').forEach(link => {
    link.style.color = textColor;
  });

  // Cambiar colores del pie de página
  const piePagina = document.querySelector('.pie-pagina');
  piePagina.style.backgroundColor = bgColor;
  piePagina.style.color = textColor;
}

// Mostrar detalles de prevención
function mostrarPrevencion(id) {
  document.querySelectorAll(".prevencion-oculta").forEach(element => {
    element.style.display = "none";
  });
  document.getElementById(id).style.display = "block";
}
