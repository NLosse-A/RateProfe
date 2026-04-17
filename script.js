// ===== DATOS =====
let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

// ===== ELEMENTOS =====
const DOM = {
  list: document.getElementById("list"),
  search: document.getElementById("search"),
  info: document.getElementById("info"),
  modal: document.getElementById("modal"),
  openModal: document.getElementById("openModal"),
  closeModal: document.getElementById("close"),
  saveBtn: document.getElementById("save"),
};

// ===== MODAL =====
DOM.openModal.onclick = () => DOM.modal.classList.remove("hidden");
DOM.closeModal.onclick = () => DOM.modal.classList.add("hidden");

// ===== GUARDAR DATOS =====
const saveData = () => localStorage.setItem("teachers", JSON.stringify(teachers));

// ===== IR A DETALLE =====
const goToDetail = (index) => {
  localStorage.setItem("selectedTeacher", index);
  window.location.href = "detail.html";
};

// ===== RENDER =====
function render(data) {
  DOM.list.innerHTML = data.map((teacher, index) => `
    <div class="card" onclick="goToDetail(${index})">
      <div class="name">${teacher.name}</div>
      <div class="subject">${teacher.subject}</div>
      <div class="stars">
        ${teacher.rating > 0 ? "★".repeat(teacher.rating) + "☆".repeat(5 - teacher.rating) : "Sin calificaciones"}
        <span class="rating">(${teacher.reviews})</span>
      </div>
    </div>
  `).join("");

  const totalReviews = data.reduce((sum, t) => sum + t.reviews, 0);
  DOM.info.textContent = `${data.length} maestros • ${totalReviews} reseñas`;
}

// ===== AGREGAR MAESTRO =====
DOM.saveBtn.onclick = () => {
  const name = document.getElementById("name").value.trim();
  const subject = document.getElementById("subject").value.trim();

  if (!name || !subject) return alert("Completa todos los campos");

  teachers.push({ name, subject, rating: 0, reviews: 0 });
  saveData();
  render(teachers);
  DOM.modal.classList.add("hidden");
};

// ===== BUSCADOR =====
DOM.search.addEventListener("input", (e) => {
  const filtered = teachers.filter(t =>
    t.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
    t.subject.toLowerCase().includes(e.target.value.toLowerCase())
  );
  render(filtered);
});

render(teachers);
