
(function () {
  "use strict";

  
  const NODE_POS = {
    A: { x: 90, y: 130 },
    B: { x: 230, y: 66 },
    C: { x: 360, y: 194 },
    D: { x: 500, y: 194 },
  };
  const NODE_LABEL = {
    A: "A", B: "B", C: "C", D: "D",
  };
  const NODE_MSG = {
    A: "Proyecto inicial",
    B: "Agregar productos al menú",
    C: "Agregar estilos iniciales",
    D: "Merge feature-menu",
  };
  const EDGES_ALL = [
    ["A", "B"], ["A", "C"], ["C", "D"], ["B", "D"],
  ];

  function commitColor(id) {
    if (id === "B") return "var(--state-branch)";
    if (id === "D") return "var(--state-ok)";
    return "var(--state-main)";
  }

  function buildScript(scenario) {
    const base = [
      {
        cmd: null,
        out: [{ t: "Repositorio vacío. Aún no existen commits ni ramas.", cls: "tout" }],
        commits: [], refs: { main: null, feature: null }, head: null,
        explain: "Antes del primer commit no hay nada a lo que una rama pueda apuntar: main todavía no existe de verdad.",
      },
      {
        cmd: "git init -b main",
        out: [
          { t: "Initialized empty Git repository in ./.git/", cls: "tout" },
          { t: "Rama 'main' preparada (sin commits todavía)", cls: "tsuccess" },
        ],
        commits: [], refs: { main: null, feature: null }, head: { ref: "main" },
        explain: "git init crea el repositorio y deja lista la rama main, pero aún no apunta a ningún commit.",
      },
      {
        cmd: 'git add . && git commit -m "Proyecto inicial de cafetería"',
        out: [{ t: "[main (root-commit) a1b2c3d] Proyecto inicial de cafetería", cls: "tsuccess" }],
        commits: ["A"], refs: { main: "A", feature: null }, head: { ref: "main" },
        explain: "main ahora apunta al commit A. Como HEAD apunta a main, indirectamente HEAD también señala a A.",
      },
      {
        cmd: "git switch -c feature-menu",
        out: [{ t: "Switched to a new branch 'feature-menu'", cls: "tsuccess" }],
        commits: ["A"], refs: { main: "A", feature: "A" }, head: { ref: "feature" },
        explain: "Se crea un puntero nuevo, feature-menu, apuntando al mismo commit que main. HEAD se mueve hacia feature-menu.",
      },
      {
        cmd: 'git commit -m "Agregar productos al menú"',
        out: [{ t: "[feature-menu 4d5e6f7] Agregar productos al menú", cls: "tsuccess" }],
        commits: ["A", "B"], refs: { main: "A", feature: "B" }, head: { ref: "feature" },
        explain: "feature-menu avanzó a B. main NO cambió y sigue en A: el trabajo nuevo quedó aislado en la rama.",
      },
      {
        cmd: "git switch main",
        out: [{ t: "Switched to branch 'main'", cls: "tsuccess" }],
        commits: ["A", "B"], refs: { main: "A", feature: "B" }, head: { ref: "main" },
        explain: "HEAD vuelve a apuntar a main, que sigue en A. No se perdió nada: B sigue existiendo en feature-menu.",
      },
      {
        cmd: 'git commit -m "Agregar estilos iniciales"',
        out: [{ t: "[main 7g8h9i0] Agregar estilos iniciales", cls: "tsuccess" }],
        commits: ["A", "B", "C"], refs: { main: "C", feature: "B" }, head: { ref: "main" },
        explain: "El historial se bifurcó de verdad: main avanzó a C y feature-menu sigue en B. Ambas nacieron de A.",
      },
    ];

    if (scenario === "ramas") return base;

    // Escenario "merge": parte del mismo punto y agrega la fusión.
    return base.concat([
      {
        cmd: "git switch main",
        out: [{ t: "Already on 'main'", cls: "tout" }],
        commits: ["A", "B", "C"], refs: { main: "C", feature: "B" }, head: { ref: "main" },
        explain: "Para fusionar, te paras primero en la rama que va a RECIBIR los cambios: main.",
      },
      {
        cmd: "git merge feature-menu",
        out: [
          { t: "Merging feature-menu into main...", cls: "tout" },
          { t: "Merge made by the 'recursive' strategy.", cls: "tout" },
          { t: "[main 3f2e1d0] Merge branch 'feature-menu'", cls: "tsuccess" },
        ],
        commits: ["A", "B", "C", "D"], refs: { main: "D", feature: "B" }, head: { ref: "main" },
        explain: "Git crea un commit de fusión D con DOS padres: C (main) y B (feature-menu). main avanza a D.",
      },
      {
        cmd: "git branch -d feature-menu",
        out: [{ t: "Deleted branch feature-menu (was 4d5e6f7).", cls: "tsuccess" }],
        commits: ["A", "B", "C", "D"], refs: { main: "D", feature: null }, head: { ref: "main" },
        explain: "feature-menu ya está fusionada por completo: es seguro borrarla. El commit B sigue vivo, alcanzable desde D.",
      },
    ]);
  }

  function svgFor(step) {
    const w = 620, h = 250;
    const nodes = step.commits.map((id) => {
      const p = NODE_POS[id];
      return `
        <g class="gv-node">
          <circle cx="${p.x}" cy="${p.y}" r="20" fill="${commitColor(id)}" stroke="#0a0a0d" stroke-width="2"></circle>
          <text x="${p.x}" y="${p.y + 5}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="13" font-weight="700" fill="#0a0a0d">${NODE_LABEL[id]}</text>
          <text x="${p.x}" y="${p.y + 38}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10.5" fill="#9a9aa5">${NODE_MSG[id]}</text>
        </g>`;
    }).join("");

    const edges = EDGES_ALL.filter(([a, b]) => step.commits.includes(a) && step.commits.includes(b))
      .map(([a, b]) => {
        const p1 = NODE_POS[a], p2 = NODE_POS[b];
        return `<line x1="${p1.x}" y1="${p1.y}" x2="${p2.x}" y2="${p2.y}" stroke="#3a3a46" stroke-width="2"></line>`;
      }).join("");

    function refTag(ref, label, color, dy) {
      const id = step.refs[ref];
      if (!id) return "";
      const p = NODE_POS[id];
      const y = p.y + dy;
      const isHead = step.head && step.head.ref === ref;
      const tagW = 78;
      return `
        <line x1="${p.x}" y1="${p.y}" x2="${p.x}" y2="${y + (dy > 0 ? -14 : 14)}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,3"></line>
        <rect x="${p.x - tagW / 2}" y="${y - 12}" width="${tagW}" height="24" rx="12" fill="#0e0e12" stroke="${color}" stroke-width="1.5"></rect>
        <text x="${p.x}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="${color}">${label}</text>
        ${isHead ? `
          <rect x="${p.x - 28}" y="${y + (dy > 0 ? 20 : -46)}" width="56" height="22" rx="11" fill="#f2f2f5"></rect>
          <text x="${p.x}" y="${y + (dy > 0 ? 35 : -31)}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10.5" font-weight="800" fill="#0a0a0d">HEAD</text>
        ` : ""}
      `;
    }

    const mainTag = refTag("main", "main", "#60a5fa", 46);
    const featureTag = refTag("feature", "feature-menu", "#a78bfa", -46);

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Diagrama de ramas y HEAD">
      ${edges}
      ${nodes}
      ${mainTag}
      ${featureTag}
      ${step.commits.length === 0 ? `<text x="${w/2}" y="${h/2}" text-anchor="middle" fill="#6b6b76" font-family="Inter, sans-serif" font-size="14">Todavía no hay commits</text>` : ""}
    </svg>`;
  }

  function mount(container, scenario) {
    if (!container) return;
    const script = buildScript(scenario);
    let idx = 0;
    const history = [];

    container.innerHTML = `
      <div class="git-visualizer">
        <div class="gv-toolbar">
          <button class="btn" id="gvPrev">◀ Anterior</button>
          <button class="btn btn-primary" id="gvNext">Siguiente comando ▶</button>
          <button class="btn" id="gvReset">Reiniciar</button>
          <span class="gv-step-label" id="gvStepLabel"></span>
        </div>
        <div class="terminal-window">
          <div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash — cafe-aroma</span>
          </div>
          <div class="terminal-body" id="gvTerminal"></div>
        </div>
        <div class="gv-stage" id="gvStage"></div>
        <div class="gv-legend">
          <span><span class="sw" style="background:#60a5fa"></span>main</span>
          <span><span class="sw" style="background:#a78bfa"></span>feature-menu</span>
          <span><span class="sw" style="background:#34d399"></span>commit de merge</span>
          <span><span class="sw" style="background:#f2f2f5"></span>HEAD</span>
        </div>
        <div class="gv-explain" id="gvExplain"></div>
      </div>
    `;

    const terminalEl = container.querySelector("#gvTerminal");
    const stageEl = container.querySelector("#gvStage");
    const explainEl = container.querySelector("#gvExplain");
    const labelEl = container.querySelector("#gvStepLabel");
    const prevBtn = container.querySelector("#gvPrev");
    const nextBtn = container.querySelector("#gvNext");
    const resetBtn = container.querySelector("#gvReset");

    function renderTerminal() {
      let html = "";
      for (let i = 0; i <= idx; i++) {
        const step = script[i];
        if (step.cmd) {
          html += `<div class="tline"><span class="tprompt">cafe-aroma</span> <span class="tpath">main</span> <span class="tprompt">$</span> <span class="tcmd">${step.cmd}</span></div>`;
        }
        step.out.forEach((o) => {
          html += `<div class="tline tout ${o.cls || ""}">${o.t}</div>`;
        });
      }
      html += `<div class="tline"><span class="tprompt">$</span> <span class="tcaret"></span></div>`;
      terminalEl.innerHTML = html;
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }

    function render() {
      const step = script[idx];
      stageEl.innerHTML = svgFor(step);
      explainEl.innerHTML = "<strong>Qué pasó:</strong> " + step.explain;
      labelEl.textContent = "Paso " + (idx + 1) + " de " + script.length;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === script.length - 1;
      nextBtn.textContent = idx === script.length - 1 ? "Fin de la simulación" : "Siguiente comando ▶";
      renderTerminal();
    }

    prevBtn.addEventListener("click", () => { if (idx > 0) { idx--; render(); } });
    nextBtn.addEventListener("click", () => { if (idx < script.length - 1) { idx++; render(); } });
    resetBtn.addEventListener("click", () => { idx = 0; render(); });

    render();
  }

  window.GitVisualizer = { mount };
})();
