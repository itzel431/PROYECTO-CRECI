let videoStream = null;

function switchTab(tabId) {
  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(tabId).classList.add("active");
}

function openCamera() {
  const video = document.createElement('video');
  const constraints = { video: { facingMode: "environment" } };
  
  navigator.mediaDevices.getUserMedia(constraints)
    .then(stream => {
      videoStream = stream;
      video.srcObject = stream;
      video.play();
      document.body.appendChild(video);
    })
    .catch(error => {
      alert("No se pudo acceder a la cámara.");
    });
}

function closeCamera() {
  if (videoStream) {
    videoStream.getTracks().forEach(track => track.stop());
    document.querySelector('video').remove();
  }
}

function playWhiteNoise() {
  const audio = new Audio('path/to/white-noise.mp3');
  audio.loop = true;
  audio.play();
}

function stopWhiteNoise() {
  const audio = new Audio('path/to/white-noise.mp3');
  audio.pause();
}

function registerGrowth() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("growthWeight").value;
  const stage = document.getElementById("stage").value;

  if (!height || !weight || !stage) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const table = document.getElementById("growthTable").querySelector("tbody");
  const row = document.createElement("tr");
  row.innerHTML = `<td>${new Date().toLocaleDateString()}</td><td>${height} cm</td><td>${weight} kg</td><td>${stage}</td>`;
  table.appendChild(row);

  document.getElementById("growthForm").reset();
}

function registerDiaperChange() {
  const time = document.getElementById("diaperTime").value;
  const type = document.getElementById("diaperType").value;

  if (!time || !type) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const list = document.getElementById("diaperList");
  const item = document.createElement("li");
  item.textContent = `${time} - ${type}`;
  list.appendChild(item);

  document.getElementById("diaperForm").reset();
}

function addMoment() {
  const photo = document.getElementById("momentPhoto").files[0];
  const description = document.getElementById("momentDescription").value;

  if (!photo) {
    alert("Por favor, sube una foto.");
    return;
  }

  const gallery = document.getElementById("momentsGallery");
  const reader = new FileReader();

  reader.onload = function (e) {
    const div = document.createElement("div");
    div.classList.add("moment-item");
    div.innerHTML = `<img src="${e.target.result}" alt="${description}"><p>${description}</p>`;
    gallery.appendChild(div);
  };
  
  reader.readAsDataURL(photo);
}

function registerVaccine() {
  const date = document.getElementById("healthDate").value;
  const type = document.getElementById("vaccineType").value;

  if (!date || !type) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const list = document.getElementById("vaccineList");
  const item = document.createElement("li");
  item.textContent = `${date} - ${type}`;
  list.appendChild(item);

  document.getElementById("healthForm").reset();
}
