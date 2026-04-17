// ===== DATOS =====
let teachersData = JSON.parse(localStorage.getItem("teachers")) || [];
const index = parseInt(localStorage.getItem("selectedTeacher"));
let teacher = teachersData[index];
const commentsKey = `comments_${index}`;
let comments = JSON.parse(localStorage.getItem(commentsKey)) || [];

// ===== UTILIDADES =====
const formatStars = (rating, total = 5) => 
  "★".repeat(Math.round(rating)) + "☆".repeat(total - Math.round(rating));

const saveToStorage = (key, data) => 
  localStorage.setItem(key, JSON.stringify(data));

// ===== MOSTRAR DATOS =====
function updateTeacherUI() {
  if (!teacher) return;
  
  document.getElementById("name").textContent = teacher.name;
  document.getElementById("subject").textContent = teacher.subject;
  document.getElementById("stars").textContent = teacher.rating > 0 
    ? formatStars(teacher.rating) 
    : "Sin calificación";
  document.getElementById("reviews").textContent = `Reseñas: ${teacher.reviews}`;
}

updateTeacherUI();

// ===== NAVEGACIÓN =====
const goBack = () => window.location.href = "index.html";

// ===== UI COMENTARIOS =====
const container = document.querySelector(".container");
let selectedRating = 0;

const createCommentUI = () => {
  const commentContainer = document.createElement("div");
  Object.assign(commentContainer.style, {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px"
  });

  const commentInput = document.createElement("input");
  commentInput.placeholder = "Escribe una reseña anónima...";

  const starInput = createStarInput();
  const addCommentBtn = document.createElement("button");
  addCommentBtn.textContent = "Agregar";

  const commentList = document.createElement("div");

  commentContainer.appendChild(commentInput);
  commentContainer.appendChild(starInput.container);
  commentContainer.appendChild(addCommentBtn);

  container.appendChild(commentContainer);
  container.appendChild(commentList);

  return { commentInput, starInput, addCommentBtn, commentList };
};

const createStarInput = () => {
  const starInput = document.createElement("div");
  
  const update = () => {
    starInput.innerHTML = "";
    for (let i = 1; i <= 5; i++) {
      const star = document.createElement("span");
      star.textContent = "★";
      Object.assign(star.style, { cursor: "pointer", fontSize: "20px" });
      star.style.color = i <= selectedRating ? "gold" : "gray";
      star.onclick = () => {
        selectedRating = i;
        update();
      };
      starInput.appendChild(star);
    }
  };

  update();
  return { container: starInput, update };
};

const { commentInput, starInput, addCommentBtn, commentList } = createCommentUI();

// ===== CALCULAR PROMEDIO =====
function updateAverage() {
  if (comments.length === 0) {
    teacher.rating = 0;
    teacher.reviews = 0;
  } else {
    const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
    teacher.rating = total / comments.length;
    teacher.reviews = comments.length;
  }

  saveToStorage("teachers", teachersData);
  updateTeacherUI();
}

// ===== RENDER COMENTARIOS =====
function renderComments() {
  commentList.innerHTML = comments.length === 0 
    ? "Sin reseñas aún" 
    : "";

  comments.forEach((c, i) => {
    if (comments.length === 0) return;
    
    const div = document.createElement("div");
    div.className = "comment";

    const text = document.createElement("span");
    text.textContent = `Anónimo: ${c.text}`;

    const stars = document.createElement("div");
    stars.textContent = c.rating > 0 ? formatStars(c.rating) : "Sin calificación";

    const del = document.createElement("button");
    del.textContent = "Eliminar";
    del.onclick = () => {
      comments.splice(i, 1);
      saveToStorage(commentsKey, comments);
      updateAverage();
      renderComments();
    };

    div.appendChild(text);
    div.appendChild(stars);
    div.appendChild(del);
    commentList.appendChild(div);
  });
}

// ===== AGREGAR COMENTARIO =====
addCommentBtn.onclick = () => {
  const text = commentInput.value.trim();
  if (!text) return alert("Escribe algo");

  comments.push({ text, rating: selectedRating || 0 });
  saveToStorage(commentsKey, comments);

  selectedRating = 0;
  starInput.update();
  commentInput.value = "";

  updateAverage();
  renderComments();
};

commentInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addCommentBtn.click();
});

renderComments();

// ===== MODAL ELIMINAR =====
const deleteModal = document.getElementById("deleteModal");
const confirmDelete = document.getElementById("confirmDelete");
const cancelDelete = document.getElementById("cancelDelete");

const closeDeleteModal = () => deleteModal.classList.add("hidden");

window.openDeleteModal = () => deleteModal.classList.remove("hidden");
cancelDelete.onclick = closeDeleteModal;
deleteModal.addEventListener("click", (e) => {
  if (e.target === deleteModal) closeDeleteModal();
});

confirmDelete.onclick = () => {
  const teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  if (isNaN(index) || !teachers[index]) {
    alert("Error al eliminar");
    return;
  }

  teachers.splice(index, 1);
  saveToStorage("teachers", teachers);
  localStorage.removeItem(commentsKey);
  window.location.href = "index.html";
};

// ===== ESTADÍSTICAS =====
function updateStats() {
  const avgNumber = document.getElementById("avgNumber");
  const avgStars = document.getElementById("avgStars");
  const totalReviews = document.getElementById("totalReviews");
  const distribution = document.getElementById("distribution");

  if (!comments.length) {
    avgNumber.textContent = "0.0";
    avgStars.textContent = "☆☆☆☆☆";
    totalReviews.textContent = "0 reseñas";
    distribution.innerHTML = "";
    return;
  }

  const total = comments.reduce((sum, c) => sum + (c.rating || 0), 0);
  const avg = total / comments.length;

  avgNumber.textContent = avg.toFixed(1);
  avgStars.textContent = formatStars(avg);
  totalReviews.textContent = `${comments.length} reseñas`;

  const counts = Array(6).fill(0);
  comments.forEach(c => counts[c.rating || 0]++);

  distribution.innerHTML = "";
  for (let i = 5; i >= 0; i--) {
    const row = document.createElement("div");
    row.className = "bar-row";
    
    const label = document.createElement("span");
    label.textContent = i;
    
    const bar = document.createElement("div");
    bar.className = "bar";
    
    const fill = document.createElement("div");
    fill.className = "bar-fill";
    fill.style.width = ((counts[i] / comments.length) * 100) + "%";
    
    bar.appendChild(fill);
    row.appendChild(label);
    row.appendChild(bar);
    distribution.appendChild(row);
  }
}

updateStats();
