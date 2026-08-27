(function () {
  "use strict";

  const PROGRESS_KEY = "curso-git-progreso";

  function leerProgreso() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function porcentajeModulo(id) {
    const progreso = leerProgreso();
    const total = (LECCIONES[id] && LECCIONES[id].steps.length) || 1;
    const hecho = (progreso[id] && progreso[id].length) || 0;
    return Math.round((hecho / total) * 100);
  }

  function renderModulos() {
    const grid = document.getElementById("modulesGrid");
    if (!grid) return;
    grid.innerHTML = MODULOS_META.map((m) => {
      const pct = porcentajeModulo(m.id);
      return `
      <a class="module-card" href="leccion.html?m=${m.id}">
        <span class="m-num">${String(m.id).padStart(2, "0")}</span>
        <span class="m-label">${m.label}</span>
        <h3 class="m-title">${m.title}</h3>
        <ul class="m-topics">
          ${m.topics.map((t) => `<li>${t}</li>`).join("")}
        </ul>
        <div class="m-progress-row">
          <div class="mini-progress"><span style="width:${pct}%"></span></div>
          <span>${pct}%</span>
        </div>
      </a>`;
    }).join("");
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("headerRight");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderModulos();
    setupMobileMenu();
  });
})();