// Función para mostrar solo la sección seleccionada
function mostrarSeccion(id) {
  document.querySelectorAll(".seccion-oculta").forEach(seccion => {
    seccion.style.display = "none";
  });
  document.getElementById("bienvenida").style.display = "none";
  document.getElementById(id).style.display = "block";
}

// Función para cambiar los colores de la interfaz
function cambiarColor(bgColor, textColor) {
  document.body.style.backgroundColor = bgColor;
  document.body.style.color = textColor;
  document.querySelectorAll('.navbar, .pie-pagina').forEach(element => {
    element.style.backgroundColor = bgColor;
    element.style.color = textColor;
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.style.color = textColor;
  });
}
