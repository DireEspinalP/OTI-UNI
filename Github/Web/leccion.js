(function () {
  "use strict";

  const PROGRESS_KEY = "curso-git-progreso";
  const params = new URLSearchParams(window.location.search);
  const moduloId = parseInt(params.get("m"), 10) || 1;
  const meta = MODULOS_META.find((m) => m.id === moduloId) || MODULOS_META[0];
  const leccion = LECCIONES[meta.id];

  let current = 0;

  function leerProgreso() {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}; }
    catch (e) { return {}; }
  }

  function guardarPaso(idx) {
    const progreso = leerProgreso();
    const arr = new Set(progreso[meta.id] || []);
    arr.add(idx);
    progreso[meta.id] = Array.from(arr);
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progreso));
  }

  function pasoCompletado(idx) {
    const progreso = leerProgreso();
    return (progreso[meta.id] || []).includes(idx);
  }

  function renderHeader() {
    document.title = leccion.title + " · Curso Git y GitHub";
    document.getElementById("moduleEyebrow").textContent = meta.label + " de 13";
    document.getElementById("moduleTitle").textContent = leccion.title;
    document.getElementById("moduleDesc").textContent = leccion.desc;

    const prevMeta = MODULOS_META.find((m) => m.id === meta.id - 1);
    const nextMeta = MODULOS_META.find((m) => m.id === meta.id + 1);
    const prevLink = document.getElementById("moduleLinkPrev");
    const nextLink = document.getElementById("moduleLinkNext");
    if (prevMeta) { prevLink.href = "leccion.html?m=" + prevMeta.id; prevLink.textContent = "← " + prevMeta.title; }
    else { prevLink.style.visibility = "hidden"; }
    if (nextMeta) { nextLink.href = "leccion.html?m=" + nextMeta.id; nextLink.textContent = nextMeta.title + " →"; }
    else { nextLink.style.visibility = "hidden"; }
  }

  function renderTOC() {
    const toc = document.getElementById("lessonToc");
    toc.innerHTML = leccion.steps.map((s, i) => `
      <button class="toc-item ${i === current ? "is-active" : ""} ${pasoCompletado(i) ? "is-done" : ""}" data-idx="${i}">
        <span class="toc-index">${pasoCompletado(i) ? "✓" : i + 1}</span>
        <span>${s.title}</span>
      </button>
    `).join("");
    toc.querySelectorAll(".toc-item").forEach((btn) => {
      btn.addEventListener("click", () => irAPaso(parseInt(btn.dataset.idx, 10)));
    });
  }

  function renderProgressBar() {
    const total = leccion.steps.length;
    const done = leccion.steps.filter((_, i) => pasoCompletado(i)).length;
    const pct = Math.round((done / total) * 100);
    document.getElementById("progressBarFill").style.width = pct + "%";
    document.getElementById("progressLabel").textContent = pct + "% completado";
  }

  function renderStep() {
    const step = leccion.steps[current];
    const card = document.getElementById("stepCard");
    card.innerHTML = `
      <div class="step-kicker">${step.kicker}</div>
      <h3 class="step-title">${step.title}</h3>
      <div class="prose" id="stepContent">${step.html}</div>
      ${step.type === "git-visualizer" || step.type === "git-visualizer-merge" || step.type === "git-sandbox" ? `<div id="gvMount"></div>` : ""}
      <div class="step-nav">
        <button class="btn" id="btnPrev">← Anterior</button>
        <span class="step-count">Paso ${current + 1} de ${leccion.steps.length}</span>
        <button class="btn btn-primary" id="btnNext">${current === leccion.steps.length - 1 ? "Finalizar módulo" : "Siguiente →"}</button>
      </div>
    `;

    document.getElementById("btnPrev").disabled = current === 0;
    document.getElementById("btnPrev").addEventListener("click", () => irAPaso(current - 1));
    document.getElementById("btnNext").addEventListener("click", () => {
      guardarPaso(current);
      renderTOC();
      renderProgressBar();
      if (current < leccion.steps.length - 1) {
        irAPaso(current + 1);
      } else {
        const nextMeta = MODULOS_META.find((m) => m.id === meta.id + 1);
        if (nextMeta) window.location.href = "leccion.html?m=" + nextMeta.id;
      }
    });

    if (window.mermaid) {
      try { window.mermaid.run({ querySelector: "#stepContent .mermaid" }); } catch (e) { /* noop */ }
    }

    if (step.type === "git-visualizer" && window.GitVisualizer) {
      window.GitVisualizer.mount(document.getElementById("gvMount"), "ramas");
    }
    if (step.type === "git-visualizer-merge" && window.GitVisualizer) {
      window.GitVisualizer.mount(document.getElementById("gvMount"), "merge");
    }
    if (step.type === "git-sandbox" && window.GitSandbox) {
      window.GitSandbox.mount(document.getElementById("gvMount"));
    }

    document.getElementById("lessonMain").scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function irAPaso(idx) {
    if (idx < 0 || idx >= leccion.steps.length) return;
    current = idx;
    renderTOC();
    renderStep();
  }

  function setupMobileMenu() {
    const toggle = document.getElementById("menuToggle");
    const nav = document.getElementById("headerRight");
    if (!toggle || !nav) return;
    toggle.addEventListener("click", () => nav.classList.toggle("is-open"));
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!leccion) { window.location.href = "index.html"; return; }
    renderHeader();
    renderTOC();
    renderProgressBar();
    renderStep();
    setupMobileMenu();
  });
})();