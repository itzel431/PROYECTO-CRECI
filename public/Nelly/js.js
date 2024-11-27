import app from "./firebase-config.js";

// Cambiar entre secciones
const switchSection = (current, next) => {
  document.getElementById(current).classList.remove('active');
  document.getElementById(next).classList.add('active');
};

// Inicio de Sesión
document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (email && password) {
    alert('Inicio de sesión exitoso');
    switchSection('login-section', 'plans-section');
  } else {
    alert('Por favor, ingresa tus credenciales');
  }
});

// Inicio de Sesión con Google
document.getElementById('google-btn').addEventListener('click', () => {
  alert('Selecciona tu cuenta de Google');
  switchSection('login-section', 'plans-section');
});

// Registro
document.getElementById('register-btn').addEventListener('click', () => {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (name && email && password) {
    alert(`Cuenta creada para ${name}`);
    switchSection('register-section', 'login-section');
  } else {
    alert('Por favor, completa todos los campos');
  }
});

// Navegación entre Registro e Inicio de Sesión
document.getElementById('register-link').addEventListener('click', () => {
  switchSection('login-section', 'register-section');
});

document.getElementById('login-link').addEventListener('click', () => {
  switchSection('register-section', 'login-section');
});

// Selección de Planes
document.querySelectorAll('.plan-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const plan = btn.getAttribute('data-plan');
    alert(`Plan seleccionado: ${plan}`);
    switchSection('plans-section', 'profile-section');
  });
});

// Finalizar Personalización
document.getElementById('finalize-profile-btn').addEventListener('click', () => {
  const babyName = document.getElementById('baby-name').value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;
  const birthdate = document.getElementById('birthdate').value;
  const preferences = document.getElementById('preferences').value;

  if (babyName && gender && birthdate) {
    alert(`Perfil guardado: ${babyName}, ${gender}, ${birthdate}`);
    switchSection('profile-section', 'main-interface');
  } else {
    alert('Por favor, completa todos los campos');
  }
});

// Función para mostrar loading antes de la interfaz principal
const showLoading = () => {
  switchSection('profile-section', 'loading');
  setTimeout(() => {
    switchSection('loading', 'main-interface');
  }, 2000); // Simula un tiempo de carga de 2 segundos
};

// Ejemplo: Carga la interfaz después de finalizar personalización
document.getElementById('finalize-profile-btn').addEventListener('click', showLoading);
