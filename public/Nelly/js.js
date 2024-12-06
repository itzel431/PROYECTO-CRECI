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

//Diario
// Guardar entrada en el diario
document.getElementById('save-diary-btn').addEventListener('click', function() {
  const diaryInput = document.getElementById('diary-input');
  if (diaryInput.value.trim() !== '') {
    const entry = {
      text: diaryInput.value,
      date: new Date().toLocaleString()
    };

    // Guardar en el almacenamiento local
    let entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    // Mostrar las entradas actualizadas
    displayDiaryEntries();
    diaryInput.value = '';  // Limpiar el campo de entrada
  }
});

// Mostrar las entradas del diario
function displayDiaryEntries() {
  const entriesContainer = document.getElementById('diary-entries');
  entriesContainer.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('diaryEntries')) || [];
  
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.classList.add('diary-entry');
    entryElement.innerHTML = `
      <p><strong>${entry.date}</strong></p>
      <p>${entry.text}</p>
    `;
    entriesContainer.appendChild(entryElement);
  });
}

// Cargar las entradas cuando se carga la página
window.addEventListener('load', displayDiaryEntries);


//Momentos 
// Tomar foto o seleccionar imagen
document.getElementById('take-photo-btn').addEventListener('click', function() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.click();

  input.addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function() {
        const imageUrl = reader.result;
        const description = prompt('Ingresa una descripción para la foto:');
        const moment = {
          imageUrl: imageUrl,
          description: description,
          date: new Date().toLocaleString()
        };

        // Guardar en el almacenamiento local
        let moments = JSON.parse(localStorage.getItem('moments')) || [];
        moments.push(moment);
        localStorage.setItem('moments', JSON.stringify(moments));

        // Mostrar los momentos
        displayMoments();
      };
      reader.readAsDataURL(file);
    }
  });
});

// Mostrar los momentos guardados
function displayMoments() {
  const momentsContainer = document.getElementById('moments-container');
  momentsContainer.innerHTML = '';
  const moments = JSON.parse(localStorage.getItem('moments')) || [];
  
  moments.forEach(moment => {
    const momentElement = document.createElement('div');
    momentElement.classList.add('moment-entry');
    momentElement.innerHTML = `
      <img src="${moment.imageUrl}" alt="Foto del bebé" />
      <p><strong>${moment.date}</strong></p>
      <p>${moment.description}</p>
    `;
    momentsContainer.appendChild(momentElement);
  });
}

// Cargar los momentos cuando se carga la página
window.addEventListener('load', displayMoments);


  //Salud
  // Registrar datos de salud
document.getElementById('save-health-btn').addEventListener('click', function() {
  const allergies = document.getElementById('allergies').value;
  const milkType = document.getElementById('milk-type').value;
  const diapersType = document.getElementById('diapers-type').value;
  const vaccinations = document.getElementById('vaccinations').value;
  const doctorAppointments = document.getElementById('doctor-appointments').value;
  const medications = document.getElementById('medications').value;

  const healthData = {
    allergies,
    milkType,
    diapersType,
    vaccinations,
    doctorAppointments,
    medications,
    date: new Date().toLocaleString()
  };

  // Guardar en el almacenamiento local
  let healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
  healthRecords.push(healthData);
  localStorage.setItem('healthRecords', JSON.stringify(healthRecords));

  // Mostrar los registros
  displayHealthRecords();
});

// Mostrar los registros de salud
function displayHealthRecords() {
  const healthContainer = document.getElementById('health-records');
  healthContainer.innerHTML = '';
  const healthRecords = JSON.parse(localStorage.getItem('healthRecords')) || [];
  
  healthRecords.forEach(record => {
    const recordElement = document.createElement('div');
    recordElement.classList.add('health-record');
    recordElement.innerHTML = `
      <p><strong>${record.date}</strong></p>
      <ul>
        <li>Alergias: ${record.allergies}</li>
        <li>Tipo de Leche: ${record.milkType}</li>
        <li>Tipo de Pañales: ${record.diapersType}</li>
        <li>Vacunas: ${record.vaccinations}</li>
        <li>Citas con Pediatra: ${record.doctorAppointments}</li>
        <li>Medicamentos: ${record.medications}</li>
      </ul>
    `;
    healthContainer.appendChild(recordElement);
  });
}


//Lactancia 
// Iniciar y detener cronómetro de lactancia
let timer;
let seconds = 0;

document.getElementById('start-lactation-btn').addEventListener('click', function() {
  timer = setInterval(function() {
    seconds++;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    document.getElementById('lactation-time').innerText = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }, 1000);
});

document.getElementById('stop-lactation-btn').addEventListener('click', function() {
  clearInterval(timer);
  // Guardar el tiempo de lactancia
  const lactationData = {
    time: document.getElementById('lactation-time').innerText,
    date: new Date().toLocaleString()
  };

  let lactationRecords = JSON.parse(localStorage.getItem('lactationRecords')) || [];
  lactationRecords.push(lactationData);
  localStorage.setItem('lactationRecords', JSON.stringify(lactationRecords));

  // Mostrar los registros de lactancia
  displayLactationRecords();
});

// Mostrar los registros de lactancia
function displayLactationRecords() {
  const lactationContainer = document.getElementById('lactation-records');
  lactationContainer.innerHTML = '';
  const lactationRecords = JSON.parse(localStorage.getItem('lactationRecords')) || [];

  lactationRecords.forEach(record => {
    const recordElement = document.createElement('div');
    recordElement.classList.add('lactation-record');
    recordElement.innerHTML = `
      <p><strong>${record.date}</strong></p>
      <p>Tiempo de Lactancia: ${record.time}</p>
    `;
    lactationContainer.appendChild(recordElement);
  });
}

// Cargar los registros cuando se carga la página
window.addEventListener('load', displayLactationRecords);

// Cargar los registros cuando se carga la página
window.addEventListener('load', displayHealthRecords);

    document.getElementById('diary-entries').innerHTML += entry;
    document.getElementById('diary-input').value = ''; // Clear the input

