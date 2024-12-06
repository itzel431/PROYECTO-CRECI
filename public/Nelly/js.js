// Importa lo necesario desde Firebase
import { db } from './firebase-config.js';  // Asegúrate de que estás importando `db` desde firebase-config
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'; // Para la autenticación

const auth = getAuth(); // Inicializar la autenticación de Firebase

// Función para registrar un movimiento del usuario
const recordUserAction = async (uid, action, details) => {
  try {
    // Esta función guarda los movimientos del usuario en la colección "user_actions" de Firestore
    await addDoc(collection(db, "user_actions"), {
      uid: uid,            // ID del usuario
      action: action,      // Descripción de la acción (ejemplo: "Inicio de sesión")
      details: details,    // Detalles adicionales sobre lo que pasó
      timestamp: new Date() // Marca de tiempo (fecha y hora)
    });

    console.log("Movimiento registrado en Firestore");
  } catch (error) {
    console.error("Error al registrar el movimiento: ", error);
  }
};

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
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert('Inicio de sesión exitoso');
        switchSection('login-section', 'plans-section');
        
        // Registrar el movimiento en Firestore
        recordUserAction(user.uid, "Inicio de sesión", `Inicio de sesión con el correo: ${email}`);
      })
      .catch((error) => {
        alert("Error de inicio de sesión: " + error.message);
      });
  } else {
    alert('Por favor, ingresa tus credenciales');
  }
});

// Inicio de Sesión con Google
document.getElementById('google-btn').addEventListener('click', () => {
  const provider = new GoogleAuthProvider();
  
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      alert('Inicio de sesión con Google exitoso');
      switchSection('login-section', 'plans-section');
      
      // Registrar el movimiento en Firestore
      recordUserAction(user.uid, "Inicio de sesión con Google", "Inicio de sesión utilizando cuenta de Google");
    })
    .catch((error) => {
      alert("Error de inicio de sesión con Google: " + error.message);
    });
});

// Registro
document.getElementById('register-btn').addEventListener('click', () => {
  const name = document.getElementById('register-name').value;
  const email = document.getElementById('register-email').value;
  const password = document.getElementById('register-password').value;

  if (name && email && password) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`Cuenta creada para ${name}`);
        switchSection('register-section', 'login-section');
        
        // Registrar el movimiento en Firestore
        recordUserAction(user.uid, "Registro", `Cuenta creada para ${name}`);
      })
      .catch((error) => {
        alert("Error al crear cuenta: " + error.message);
      });
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

    // Registrar el movimiento en Firestore
    const uid = "user_id"; // Aquí puedes colocar el UID del usuario que selecciona el plan
    recordUserAction(uid, "Selección de plan", `Plan seleccionado: ${plan}`);
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
    
    // Registrar el movimiento en Firestore
    const uid = "user_id"; // Aquí puedes colocar el UID del usuario que finaliza el perfil
    recordUserAction(uid, "Finalización de perfil", `Perfil de bebé guardado: ${babyName}`);
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
