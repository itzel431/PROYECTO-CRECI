let users = [];

// Mostrar sección de inicio de sesión
function showLogin() {
  document.getElementById("login").classList.add("active");
  document.getElementById("register").classList.remove("active");
  document.getElementById("selectPlan").classList.remove("active");
  document.getElementById("mainContent").classList.remove("active");
}

// Mostrar sección de registro
function showRegister() {
  document.getElementById("register").classList.add("active");
  document.getElementById("login").classList.remove("active");
}

// Registro de usuario
function registerUser() {
  const name = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;

  if (users.some(user => user.email === email)) {
    alert("Este correo ya está registrado.");
    return;
  }

  users.push({ name, email, password });
  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  showLogin();
}

// Inicio de sesión
function loginUser() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = users.find(user => user.email === email && user.password === password);

  if (user) {
    alert(`Bienvenido, ${user.name}`);
    document.getElementById("selectPlan").classList.add("active");
    document.getElementById("login").classList.remove("active");
  } else {
    alert("Credenciales incorrectas.");
  }
}

// Selección de plan
function selectPlan(plan) {
  alert(`Plan ${plan} seleccionado.`);
  document.getElementById("mainContent").classList.add("active");
  document.getElementById("selectPlan").classList.remove("active");
}

// Cambiar de pestañas en la interfaz principal
function switchTab(tabId) {
  document.querySelectorAll(".main-content section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

// Registrar crecimiento
function registerGrowth() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("growthWeight").value;
  const stage = document.getElementById("stage").value;

  const table = document.querySelector("#growthTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${new Date().toLocaleDateString()}</td>
    <td>${height} cm</td>
    <td>${weight} kg</td>
    <td>${stage}</td>
  `;
  table.appendChild(row);
  document.getElementById("growthForm").reset();
}

// Agregar entrada al diario
function addDiaryEntry() {
  const date = document.getElementById("diaryDate").value;
  const entry = document.getElementById("diaryEntry").value;

  const diaryContainer = document.getElementById("diaryEntries");
  const div = document.createElement("div");

  div.innerHTML = `
    <h4>${date}</h4>
    <p>${entry}</p>
  `;
  div.classList.add("diary-entry");
  diaryContainer.appendChild(div);
  document.getElementById("diaryForm").reset();
}

// Agregar momentos
function addMoment() {
  const photo = document.getElementById("momentPhoto").files[0];
  const description = document.getElementById("momentDescription").value;

  if (!photo) return alert("Por favor, sube una foto.");
  const gallery = document.getElementById("momentsGallery");

  const reader = new FileReader();
  reader.onload = function (e) {
    const div = document.createElement("div");
    div.classList.add("moment-item");
    div.innerHTML = `
      <img src="${e.target.result}" alt="${description}">
      <p>${description}</p>
    `;
    gallery.appendChild(div);
  };
  reader.readAsDataURL(photo);
}