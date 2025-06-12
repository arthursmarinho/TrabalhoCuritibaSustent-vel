let = map;

const coords = [
  {
    id: 1,
    nome: "Parque Barigui",
    tipo: "Parque",
    coords: [-25.4149, -49.3113],
  },
  {
    id: 2,
    nome: "Jardim Botânico",
    tipo: "Parque",
    coords: [-25.4394, -49.2401],
  },
  {
    id: 3,
    nome: "Bosque do Papa",
    tipo: "Parque",
    coords: [-25.4309, -49.2765],
  },
  {
    id: 4,
    nome: "Ponto de Coleta Ambiental",
    tipo: "Coleta",
    coords: [-25.4284, -49.2733],
  },
  {
    id: 5,
    nome: "Feira Orgânica Municipal",
    tipo: "Feira",
    coords: [-25.45, -49.27],
  },
  {
    id: 6,
    nome: "Parque Tingui",
    tipo: "Parque",
    coords: [-25.4176, -49.311],
  },
  {
    id: 7,
    nome: "Estação Ambiental CIC",
    tipo: "Educação Ambiental",
    coords: [-25.48, -49.275],
  },
];

function renderMap() {
  map = L.map("map").setView([-25.4284, -49.2733], 13); // Curitiba

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
  }).addTo(map);

  coords.forEach((coord) => {
    L.marker(coord.coords).addTo(map).bindPopup(`
        <b>${coord.nome}</b> <br>
        Tipo: ${coord.tipo} <br><br>
        <a href="#form-avaliacao-container">
        <button onclick="test(${coord.id})">Avaliar este ponto</button>
        </a>
      `);
  });

  window.addEventListener("resize", function () {
    if (typeof map !== "undefined") {
      map.invalidateSize();
    }
  });
}

function test(id) {
  const ponto = coords.find((p) => p.id === id);
  if (!ponto) return alert("Ponto não encontrado");

  document.getElementById("nome-ponto").textContent = ponto.nome;
  document.getElementById("form-avaliacao-container").style.display = "block";
  document.getElementById("status-msg").textContent = "";
}

function fecharFormulario() {
  document.getElementById("form-avaliacao-container").style.display = "none";
}

function calcularQuiz() {
  let diasSust = +document.getElementById("diasSustentavel").value;
  let refVeg = +document.getElementById("refVegetariana").value;
  let lixo = document.getElementById("separaLixo").value;

  let score = diasSust * 2 + refVeg * 1 + (lixo === "sim" ? 5 : 0);
  document.getElementById(
    "resultadoQuiz"
  ).innerText = `Sua pontuação sustentável: ${score} pontos!`;
}

renderMap();
