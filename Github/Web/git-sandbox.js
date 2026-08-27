(function () {
  "use strict";

  /* ---------------------------------------------------------------------
   *  ESTADO DEL REPOSITORIO
   * ------------------------------------------------------------------- */

  const BRANCH_PALETTE = ["#a78bfa", "#34d399", "#f59e0b", "#f472b6", "#22d3ee", "#fb7185", "#facc15"];

  function nuevoRepo() {
    return {
      commits: {},          // id -> { id, parents:[id], message, laneOwner, isMerge }
      branches: {},         // nombre -> commitId | null
      branchLane: {},       // nombre -> número de carril
      branchOrder: [],      // orden de creación (para color estable)
      head: null,           // { type:'branch', ref:'main' } | { type:'detached', ref:commitId } | null (repo vacío)
      counter: 0,
      initialized: false,
    };
  }

  function nextId(repo) {
    repo.counter += 1;
    return "C" + repo.counter;
  }

  function freeLane(repo) {
    const used = new Set(Object.values(repo.branchLane));
    let lane = 0;
    while (used.has(lane)) lane++;
    return lane;
  }

  function colorForBranch(repo, name) {
    if (name === "main" || name === "master") return "#60a5fa";
    const idx = repo.branchOrder.filter((n) => n !== "main" && n !== "master").indexOf(name);
    return BRANCH_PALETTE[idx % BRANCH_PALETTE.length];
  }

  function currentBranchName(repo) {
    return repo.head && repo.head.type === "branch" ? repo.head.ref : null;
  }

  function headCommit(repo) {
    if (!repo.head) return null;
    if (repo.head.type === "branch") return repo.branches[repo.head.ref];
    return repo.head.ref;
  }

  function ancestors(repo, id) {
    const seen = new Set();
    const stack = id ? [id] : [];
    while (stack.length) {
      const cur = stack.pop();
      if (!cur || seen.has(cur)) continue;
      seen.add(cur);
      const c = repo.commits[cur];
      if (c) c.parents.forEach((p) => stack.push(p));
    }
    return seen;
  }

  function isAncestor(repo, maybeAncestor, ofCommit) {
    if (!maybeAncestor || !ofCommit) return false;
    return ancestors(repo, ofCommit).has(maybeAncestor);
  }

  function reachableCommitIds(repo) {
    const all = new Set();
    Object.values(repo.branches).forEach((id) => {
      ancestors(repo, id).forEach((a) => all.add(a));
    });
    if (repo.head && repo.head.type === "detached") {
      ancestors(repo, repo.head.ref).forEach((a) => all.add(a));
    }
    return all;
  }

  function prune(repo) {
    const reachable = reachableCommitIds(repo);
    Object.keys(repo.commits).forEach((id) => {
      if (!reachable.has(id)) delete repo.commits[id];
    });
  }

  /* ---------------------------------------------------------------------
   *  EJECUCIÓN DE COMANDOS
   * ------------------------------------------------------------------- */

  function ok(t) { return { t, cls: "tout tsuccess" }; }
  function info(t) { return { t, cls: "tout" }; }
  function warn(t) { return { t, cls: "tout tdanger" }; }

  function crearCommit(repo, mensaje, parents, laneOwner, isMerge) {
    const id = nextId(repo);
    repo.commits[id] = { id, parents: parents.slice(), message: mensaje, laneOwner, isMerge: !!isMerge };
    return id;
  }

  function doCommit(repo, mensaje) {
    const lines = [];
    if (!repo.initialized) return [warn("fatal: no es un repositorio git (ni ninguno de los directorios padres). Usa 'git init' primero.")];
    if (!mensaje) mensaje = "Sin mensaje de commit";

    if (repo.head.type === "detached") {
      const parent = repo.head.ref;
      const id = crearCommit(repo, mensaje, parent ? [parent] : [], "detached", false);
      repo.head = { type: "detached", ref: id };
      lines.push(ok(`[HEAD separado ${id}] ${mensaje}`));
      lines.push(warn("Advertencia: estás en 'HEAD separado'. Este commit no pertenece a ninguna rama y se perderá si te mueves sin crear una rama aquí."));
      return lines;
    }

    const branch = repo.head.ref;
    const parent = repo.branches[branch];
    const id = crearCommit(repo, mensaje, parent ? [parent] : [], branch, false);
    repo.branches[branch] = id;
    lines.push(ok(`[${branch} ${id}] ${mensaje}`));
    return lines;
  }

  function ejecutar(repo, raw) {
    const cmd = raw.trim();
    if (!cmd) return [];
    if (cmd === "clear" || cmd === "cls") return [{ clear: true }];

    const parts = cmd.split(/\s+/);
    if (parts[0] !== "git") {
      return [warn(`comando no encontrado: ${parts[0]}`)];
    }

    const sub = parts[1];
    const args = parts.slice(2);

    switch (sub) {
      case "init": {
        if (repo.initialized) return [info("Repositorio Git ya reinicializado en ./.git/")];
        repo.initialized = true;
        repo.branches["main"] = null;
        repo.branchLane["main"] = 0;
        repo.branchOrder.push("main");
        repo.head = { type: "branch", ref: "main" };
        return [ok("Initialized empty Git repository in ./.git/"), info("Rama 'main' preparada (sin commits todavía).")];
      }

      case "status": {
        if (!repo.initialized) return [warn("fatal: no es un repositorio git.")];
        if (repo.head.type === "detached") {
          return [warn(`HEAD está separado en ${repo.head.ref}`), info("nada para confirmar, directorio de trabajo limpio")];
        }
        const b = repo.head.ref;
        return [info(`En la rama ${b}`), info("nada para confirmar, directorio de trabajo limpio")];
      }

      case "add":
        if (!repo.initialized) return [warn("fatal: no es un repositorio git.")];
        return [info(`Cambios agregados al área de staging (${args.join(" ") || "."}).`)];

      case "commit": {
        const mIdx = args.indexOf("-m");
        let mensaje = mIdx >= 0 ? args.slice(mIdx + 1).join(" ").replace(/^"|"$/g, "") : null;
        return doCommit(repo, mensaje);
      }

      case "branch": {
        if (!repo.initialized) return [warn("fatal: no es un repositorio git.")];
        if (args.length === 0) {
          return Object.keys(repo.branches).map((b) =>
            info((b === currentBranchName(repo) ? "* " : "  ") + b)
          );
        }
        if (args[0] === "-d" || args[0] === "-D") {
          const name = args[1];
          return borrarRama(repo, name, args[0] === "-D");
        }
        if (args[0] === "-f") {
          return moverRama(repo, args[1], args[2]);
        }
        const name = args[0];
        if (repo.branches[name]) return [warn(`fatal: la rama '${name}' ya existe.`)];
        const tip = headCommit(repo);
        if (!tip) return [warn("fatal: no hay ningún commit todavía; crea uno antes de ramificar.")];
        repo.branches[name] = tip;
        repo.branchLane[name] = freeLane(repo);
        repo.branchOrder.push(name);
        return [info(`Rama '${name}' creada, apuntando a ${tip}.`)];
      }

      case "switch":
      case "checkout": {
        let create = args[0] === "-c" || args[0] === "-b";
        const name = create ? args[1] : args[0];
        if (!name) return [warn("uso: git switch [-c] <rama>")];
        if (create) {
          const r = ejecutar(repo, `git branch ${name}`);
          if (r.some((l) => l.cls && l.cls.indexOf("tdanger") >= 0)) return r;
          repo.head = { type: "branch", ref: name };
          return r.concat([ok(`Switched to a new branch '${name}'`)]);
        }
        if (repo.branches.hasOwnProperty(name)) {
          repo.head = { type: "branch", ref: name };
          return [ok(`Switched to branch '${name}'`)];
        }
        if (repo.commits[name]) {
          repo.head = { type: "detached", ref: name };
          return [warn(`Nota: te mudaste a 'HEAD separado' en ${name}.`)];
        }
        return [warn(`error: no existe la rama ni el commit '${name}'.`)];
      }

      case "merge": {
        const name = args[0];
        return fusionar(repo, name);
      }

      case "log": {
        const tip = headCommit(repo);
        if (!tip) return [info("Todavía no hay commits.")];
        const ids = topoOrder(repo).filter((id) => ancestors(repo, tip).has(id)).reverse();
        return ids.map((id) => {
          const c = repo.commits[id];
          return info(`${id}  ${c.message}`);
        });
      }

      case "reset": {
        const hard = args.includes("--hard");
        const ref = args[args.length - 1];
        const target = resolveRef(repo, ref);
        if (!target) return [warn(`fatal: referencia desconocida '${ref}'`)];
        if (repo.head.type !== "branch") return [warn("fatal: HEAD está separado; usa 'git switch' primero.")];
        repo.branches[repo.head.ref] = target;
        prune(repo);
        return [ok(`HEAD ahora está en ${target}` + (hard ? " (reset --hard)" : ""))];
      }

      case "revert": {
        const ref = resolveRef(repo, args[0]);
        if (!ref || !repo.commits[ref]) return [warn(`fatal: commit desconocido '${args[0]}'`)];
        const original = repo.commits[ref];
        return doCommit(repo, `Revert "${original.message}"`);
      }

      case "tag":
        return [info(`Tag '${args[0] || ""}' creado en ${headCommit(repo) || "(sin commits)"} (simulado, no se muestra en el grafo).`)];

      case "stash":
        return [info(args[0] === "pop" ? "Aplicando cambios guardados... (simulado)" : "Cambios guardados temporalmente (simulado, el sandbox no rastrea archivos reales).")];

      case "remote":
        return [info("origin  https://github.com/tu-usuario/tu-repo.git (fetch)"), info("origin  https://github.com/tu-usuario/tu-repo.git (push)")];

      case "fetch":
        return [info("Simulando: no hay un remoto real en este sandbox, nada que descargar.")];

      case "pull":
        return [info("Simulando: git fetch + git merge. En este sandbox no hay remoto real, así que no cambia nada.")];

      case "push":
        return [info(`Simulando: se enviarían los commits de '${currentBranchName(repo) || "HEAD"}' a origin. No hay remoto real en este sandbox.`)];

      case "clone":
        return [info("Simulando: git clone crea una copia completa de un repositorio remoto. No disponible dentro del sandbox.")];

      default:
        return [warn(`git: '${sub}' no está simulado en este sandbox (pero sí existe en Git real). Revisa la lista de comandos abajo.`)];
    }
  }

  function resolveRef(repo, ref) {
    if (!ref) return null;
    if (repo.branches.hasOwnProperty(ref)) return repo.branches[ref];
    if (repo.commits[ref]) return ref;
    if (ref === "HEAD") return headCommit(repo);
    const m = /^HEAD~(\d+)$/.exec(ref);
    if (m) {
      let cur = headCommit(repo);
      let n = parseInt(m[1], 10);
      while (n-- > 0 && cur) cur = repo.commits[cur] ? repo.commits[cur].parents[0] : null;
      return cur;
    }
    return null;
  }

  function topoOrder(repo) {
    const gens = {};
    function gen(id) {
      if (gens[id] !== undefined) return gens[id];
      const c = repo.commits[id];
      if (!c || c.parents.length === 0) return (gens[id] = 0);
      return (gens[id] = 1 + Math.max(...c.parents.map(gen)));
    }
    return Object.keys(repo.commits).sort((a, b) => gen(a) - gen(b) || a.localeCompare(b));
  }

  function borrarRama(repo, name, force) {
    if (!name) return [warn("uso: git branch -d <rama>")];
    if (!repo.branches.hasOwnProperty(name)) return [warn(`error: la rama '${name}' no existe.`)];
    if (name === currentBranchName(repo)) return [warn(`error: no puedes eliminar la rama en la que estás parado.`)];
    const tip = repo.branches[name];
    const mergedSomewhere = Object.entries(repo.branches).some(([n, t]) => n !== name && isAncestor(repo, tip, t));
    if (!force && !mergedSomewhere) {
      return [warn(`error: la rama '${name}' no está fusionada. Usa 'git branch -D ${name}' para forzar.`)];
    }
    delete repo.branches[name];
    delete repo.branchLane[name];
    repo.branchOrder = repo.branchOrder.filter((b) => b !== name);
    prune(repo);
    return [ok(`Deleted branch ${name} (was ${tip}).`)];
  }

  function moverRama(repo, name, ref) {
    if (!repo.branches.hasOwnProperty(name)) return [warn(`error: la rama '${name}' no existe.`)];
    const target = resolveRef(repo, ref);
    if (!target) return [warn(`fatal: referencia desconocida '${ref}'`)];
    repo.branches[name] = target;
    prune(repo);
    return [ok(`Rama '${name}' movida a ${target}.`)];
  }

  function fusionar(repo, name) {
    if (repo.head.type !== "branch") return [warn("fatal: HEAD está separado; usa 'git switch' a una rama primero.")];
    if (!repo.branches.hasOwnProperty(name)) return [warn(`merge: la rama '${name}' no existe.`)];
    const current = repo.head.ref;
    const currentTip = repo.branches[current];
    const otherTip = repo.branches[name];
    if (!otherTip) return [warn(`fatal: la rama '${name}' no tiene commits todavía.`)];
    if (currentTip && isAncestor(repo, otherTip, currentTip)) {
      return [info(`Already up to date. '${current}' ya contiene todo el trabajo de '${name}'.`)];
    }
    if (!currentTip || isAncestor(repo, currentTip, otherTip)) {
      repo.branches[current] = otherTip;
      return [ok(`Updating ${currentTip || "∅"}..${otherTip}`), ok("Fast-forward"), info(`'${current}' avanzó directamente hasta ${otherTip} (fast-forward, sin commit de fusión).`)];
    }
    const id = crearCommit(repo, `Merge branch '${name}' into ${current}`, [currentTip, otherTip], current, true);
    repo.branches[current] = id;
    return [
      info(`Merging ${name} into ${current}...`),
      info("Merge made by the 'recursive' strategy."),
      ok(`[${current} ${id}] Merge branch '${name}' into ${current}`),
    ];
  }

  /* ---------------------------------------------------------------------
   *  LAYOUT Y RENDER SVG
   * ------------------------------------------------------------------- */

  function layout(repo) {
    const order = topoOrder(repo);
    const gens = {};
    order.forEach((id) => {
      const c = repo.commits[id];
      gens[id] = c.parents.length === 0 ? 0 : 1 + Math.max(...c.parents.map((p) => gens[p]));
    });
    const pos = {};
    order.forEach((id) => {
      const c = repo.commits[id];
      const lane = repo.branchLane.hasOwnProperty(c.laneOwner) ? repo.branchLane[c.laneOwner] : 0;
      pos[id] = { x: 64 + gens[id] * 108, y: 56 + lane * 78 };
    });
    return pos;
  }

  function svgFor(repo, pos, selectedId) {
    const ids = Object.keys(repo.commits);
    const maxX = ids.length ? Math.max(...ids.map((id) => pos[id].x)) : 200;
    const maxY = ids.length ? Math.max(...ids.map((id) => pos[id].y)) : 120;
    const w = Math.max(560, maxX + 140);
    const h = Math.max(180, maxY + 90);

    let edges = "";
    ids.forEach((id) => {
      repo.commits[id].parents.forEach((p) => {
        if (!pos[p]) return;
        const p1 = pos[p], p2 = pos[id];
        const curve = p1.y === p2.y ? "" : `Q ${(p1.x + p2.x) / 2} ${p1.y}, ${p2.x} ${(p1.y + p2.y) / 2} T`;
        edges += `<path d="M ${p1.x} ${p1.y} C ${(p1.x + p2.x) / 2} ${p1.y}, ${(p1.x + p2.x) / 2} ${p2.y}, ${p2.x} ${p2.y}" fill="none" stroke="#3a3a46" stroke-width="2"></path>`;
      });
    });

    let nodes = "";
    ids.forEach((id) => {
      const c = repo.commits[id];
      const p = pos[id];
      const color = c.isMerge ? "#34d399" : colorForBranch(repo, c.laneOwner);
      const isSel = id === selectedId;
      nodes += `
        <g class="gv-node" data-commit="${id}" style="cursor:pointer;">
          <circle cx="${p.x}" cy="${p.y}" r="${isSel ? 22 : 18}" fill="${color}" stroke="${isSel ? "#f2f2f5" : "#0a0a0d"}" stroke-width="${isSel ? 3 : 2}"></circle>
          <text x="${p.x}" y="${p.y + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="700" fill="#0a0a0d">${id}</text>
          <text x="${p.x}" y="${p.y + 34}" text-anchor="middle" font-family="Inter, sans-serif" font-size="10" fill="#9a9aa5">${escapeHtml(truncate(c.message, 20))}</text>
        </g>`;
    });

    // Etiquetas de ramas y HEAD, agrupadas por commit para no solaparse
    const byTip = {};
    Object.entries(repo.branches).forEach(([name, tip]) => {
      if (!tip) return;
      (byTip[tip] = byTip[tip] || []).push(name);
    });
    let tags = "";
    Object.entries(byTip).forEach(([tip, names]) => {
      const p = pos[tip];
      if (!p) return;
      names.forEach((name, i) => {
        const color = colorForBranch(repo, name);
        const y = p.y - 40 - i * 26;
        const tagW = Math.max(60, name.length * 7 + 20);
        const isHead = repo.head && repo.head.type === "branch" && repo.head.ref === name;
        tags += `
          <line x1="${p.x}" y1="${p.y - 18}" x2="${p.x}" y2="${y + 12}" stroke="${color}" stroke-width="1.5" stroke-dasharray="3,3"></line>
          <rect x="${p.x - tagW / 2}" y="${y - 12}" width="${tagW}" height="24" rx="12" fill="#0e0e12" stroke="${color}" stroke-width="1.5"></rect>
          <text x="${p.x}" y="${y + 4}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="11" font-weight="600" fill="${color}">${escapeHtml(name)}</text>
          ${isHead ? `<rect x="${p.x - 28}" y="${y - 38}" width="56" height="20" rx="10" fill="#f2f2f5"></rect><text x="${p.x}" y="${y - 24}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="800" fill="#0a0a0d">HEAD</text>` : ""}
        `;
      });
    });

    let detachedTag = "";
    if (repo.head && repo.head.type === "detached" && pos[repo.head.ref]) {
      const p = pos[repo.head.ref];
      detachedTag = `<rect x="${p.x - 40}" y="${p.y + 24}" width="80" height="20" rx="10" fill="#f2f2f5"></rect><text x="${p.x}" y="${p.y + 38}" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="10" font-weight="800" fill="#0a0a0d">HEAD (detached)</text>`;
    }

    const empty = ids.length === 0
      ? `<text x="${w / 2}" y="${h / 2}" text-anchor="middle" fill="#6b6b76" font-family="Inter, sans-serif" font-size="14">Escribe "git init" para empezar</text>`
      : "";

    return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grafo del repositorio">
      ${edges}${nodes}${tags}${detachedTag}${empty}
    </svg>`;
  }

  function truncate(s, n) { return s.length > n ? s.slice(0, n - 1) + "…" : s; }
  function escapeHtml(s) { return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }

  /* ---------------------------------------------------------------------
   *  PANEL DE ACCIONES CONTEXTUALES (add / delete / move / merge / PR)
   * ------------------------------------------------------------------- */

  function accionesPara(repo, id) {
    const acciones = [];
    const c = repo.commits[id];
    if (!c) return acciones;
    const current = currentBranchName(repo);
    const branchesHere = Object.entries(repo.branches).filter(([, t]) => t === id).map(([n]) => n);
    const isCurrentTip = current && repo.branches[current] === id;

    branchesHere.forEach((name) => {
      if (name !== current) {
        acciones.push({ label: `Cambiar a '${name}'`, kind: "switch", run: (r) => ejecutar(r, `git switch ${name}`) });
      }
    });

    if (isCurrentTip) {
      acciones.push({ label: "➕ Nuevo commit aquí", kind: "add", run: (r, msg) => ejecutar(r, `git commit -m "${msg || "Nuevo cambio"}"`) });
      if (c.parents.length <= 1) {
        acciones.push({ label: "🗑 Deshacer este commit (mover rama al padre)", kind: "delete", run: (r) => ejecutar(r, `git reset --hard ${c.parents[0] || "HEAD~0"}`) });
      }
    }

    // Fusionar: cualquier otra rama cuya punta sea este commit, hacia la rama actual (si no es ancestro ya)
    if (current) {
      branchesHere.forEach((name) => {
        if (name !== current && !isAncestor(repo, id, repo.branches[current])) {
          acciones.push({ label: `🔀 Fusionar '${name}' → '${current}'`, kind: "merge", run: (r) => ejecutar(r, `git merge ${name}`) });
          acciones.push({ label: `📬 Crear Pull Request: '${name}' → '${current}'`, kind: "pr", pr: { source: name, target: current } });
        }
      });
    }

    // Mover puntero de rama aquí
    Object.keys(repo.branches).forEach((name) => {
      if (repo.branches[name] !== id) {
        acciones.push({ label: `📌 Mover '${name}' aquí`, kind: "move", run: (r) => ejecutar(r, `git branch -f ${name} ${id}`) });
      }
    });

    // Mover HEAD aquí (detached), si no es ya el commit de HEAD
    if (headCommit(repo) !== id) {
      acciones.push({ label: "🎯 Mover HEAD aquí (detached)", kind: "detach", run: (r) => ejecutar(r, `git checkout ${id}`) });
    }

    return acciones;
  }

  /* ---------------------------------------------------------------------
   *  MONTAJE EN EL DOM
   * ------------------------------------------------------------------- */

  function mount(container) {
    if (!container) return;
    let repo = nuevoRepo();
    let selected = null;
    let history = [];
    let histIdx = -1;
    let prLive = null; // { source, target } cuando el panel de PR está abierto

    container.innerHTML = `
      <div class="git-sandbox">
        <div class="gv-toolbar">
          <span class="gv-step-label">Sandbox libre — escribe comandos o usa los botones del grafo</span>
          <button class="btn" id="sbxReset">Reiniciar repositorio</button>
        </div>

        <div class="sbx-layout">
          <div class="sbx-main">
            <div class="terminal-window">
              <div class="terminal-titlebar">
                <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
                <span class="tlabel">bash — sandbox</span>
              </div>
              <div class="terminal-body" id="sbxTerminal"></div>
              <form class="sbx-input-row" id="sbxForm">
                <span class="sbx-prompt">$</span>
                <input type="text" id="sbxInput" class="sbx-input" autocomplete="off" spellcheck="false" placeholder="git init" />
                <button type="submit" class="btn btn-primary">Ejecutar</button>
              </form>
            </div>

            <div class="gv-stage" id="sbxStage"></div>
            <div class="gv-legend">
              <span><span class="sw" style="background:#60a5fa"></span>main</span>
              <span><span class="sw" style="background:#a78bfa"></span>otras ramas</span>
              <span><span class="sw" style="background:#34d399"></span>commit de merge</span>
              <span><span class="sw" style="background:#f2f2f5"></span>HEAD</span>
            </div>

            <div class="sbx-actions" id="sbxActions"></div>
          </div>

          <aside class="sbx-ref" id="sbxRef"></aside>
        </div>
      </div>
    `;

    const $ = (sel) => container.querySelector(sel);
    const terminalEl = $("#sbxTerminal");
    const stageEl = $("#sbxStage");
    const actionsEl = $("#sbxActions");
    const refEl = $("#sbxRef");
    const inputEl = $("#sbxInput");
    const formEl = $("#sbxForm");

    function log(lines) {
      lines.forEach((l) => {
        if (l.clear) { terminalEl.innerHTML = ""; return; }
        const div = document.createElement("div");
        div.className = "tline " + (l.cls || "tout");
        div.textContent = l.t;
        terminalEl.appendChild(div);
      });
      terminalEl.scrollTop = terminalEl.scrollHeight;
    }

    function promptLine(cmd) {
      const div = document.createElement("div");
      div.className = "tline";
      const branch = currentBranchName(repo) || (repo.head && repo.head.type === "detached" ? "HEAD" : "~");
      div.innerHTML = `<span class="tprompt">sandbox</span> <span class="tpath">${escapeHtml(branch)}</span> <span class="tprompt">$</span> <span class="tcmd">${escapeHtml(cmd)}</span>`;
      terminalEl.appendChild(div);
    }

    function renderGraph() {
      const pos = layout(repo);
      stageEl.innerHTML = svgFor(repo, pos, selected);
      stageEl.querySelectorAll(".gv-node").forEach((node) => {
        node.addEventListener("click", () => {
          selected = node.getAttribute("data-commit") === selected ? null : node.getAttribute("data-commit");
          prLive = null;
          renderGraph();
          renderActions();
        });
      });
    }

    function runAndLog(cmdStr) {
      const lines = ejecutar(repo, cmdStr);
      log(lines);
    }

    function renderActions() {
      if (!selected || !repo.commits[selected]) {
        actionsEl.innerHTML = repo.initialized
          ? `<p class="sbx-hint">Haz clic en un commit del grafo para ver acciones: agregar, deshacer, mover una rama, fusionar o crear un Pull Request.</p>`
          : `<p class="sbx-hint">Escribe <code>git init</code> en la terminal para comenzar.</p>`;
        return;
      }

      if (prLive) {
        const source = prLive.source, target = prLive.target;
        const onlyInSource = Array.from(ancestors(repo, repo.branches[source])).filter((id) => !ancestors(repo, repo.branches[target]).has(id));
        const ordered = topoOrder(repo).filter((id) => onlyInSource.includes(id));
        actionsEl.innerHTML = `
          <div class="sbx-pr">
            <div class="sbx-pr-head">📬 Pull Request: <strong>${escapeHtml(source)}</strong> → <strong>${escapeHtml(target)}</strong></div>
            <p class="sbx-hint">Esta rama aporta ${ordered.length} commit(s) que '${escapeHtml(target)}' todavía no tiene:</p>
            <ul class="sbx-pr-list">
              ${ordered.map((id) => `<li><code>${id}</code> — ${escapeHtml(repo.commits[id].message)}</li>`).join("") || "<li>Sin commits nuevos.</li>"}
            </ul>
            <div class="sbx-action-row">
              <button class="btn btn-primary" id="sbxPrApprove">Aprobar y mergear</button>
              <button class="btn" id="sbxPrCancel">Cancelar</button>
            </div>
          </div>`;
        $("#sbxPrApprove").addEventListener("click", () => {
          if (currentBranchName(repo) !== target) runAndLog(`git switch ${target}`);
          promptLine(`git merge ${source}`);
          runAndLog(`git merge ${source}`);
          prLive = null;
          selected = null;
          renderGraph();
          renderActions();
        });
        $("#sbxPrCancel").addEventListener("click", () => { prLive = null; renderActions(); });
        return;
      }

      const acciones = accionesPara(repo, selected);
      actionsEl.innerHTML = `
        <div class="sbx-action-head">Commit <code>${selected}</code> — acciones disponibles</div>
        <div class="sbx-action-row" id="sbxActionButtons">
          ${acciones.length ? acciones.map((a, i) => `<button class="btn" data-i="${i}">${a.label}</button>`).join("") : '<span class="sbx-hint">No hay acciones disponibles para este commit.</span>'}
        </div>
      `;
      $("#sbxActionButtons").querySelectorAll("button[data-i]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const accion = acciones[parseInt(btn.dataset.i, 10)];
          if (accion.kind === "pr") {
            prLive = accion.pr;
            renderActions();
            return;
          }
          if (accion.kind === "add") {
            const msg = window.prompt("Mensaje del commit:", "Nuevo cambio") || "Nuevo cambio";
            const cmdStr = `git commit -m "${msg}"`;
            promptLine(cmdStr);
            log(ejecutar(repo, cmdStr));
          } else {
            const before = JSON.stringify(repo.branches);
            const lines = accion.run(repo);
            log(lines);
          }
          if (accion.kind === "delete" || accion.kind === "move") selected = null;
          renderGraph();
          renderActions();
        });
      });
    }

    function renderRef() {
      const data = window.GIT_COMMANDS_REF || [];
      refEl.innerHTML = `
        <div class="sbx-ref-title">📖 Referencia de comandos Git</div>
        ${data.map((grupo, gi) => `
          <details class="sbx-ref-group" ${gi === 0 ? "open" : ""}>
            <summary>${escapeHtml(grupo.categoria)}</summary>
            <ul>
              ${grupo.comandos.map((c) => `<li><code>${escapeHtml(c.cmd)}</code><span>${escapeHtml(c.desc)}</span></li>`).join("")}
            </ul>
          </details>
        `).join("")}
      `;
    }

    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = inputEl.value;
      if (!val.trim()) return;
      history.push(val);
      histIdx = history.length;
      promptLine(val);
      const lines = ejecutar(repo, val);
      log(lines);
      inputEl.value = "";
      renderGraph();
      renderActions();
    });

    inputEl.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        if (histIdx > 0) { histIdx--; inputEl.value = history[histIdx]; }
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (histIdx < history.length - 1) { histIdx++; inputEl.value = history[histIdx]; }
        else { histIdx = history.length; inputEl.value = ""; }
        e.preventDefault();
      }
    });

    $("#sbxReset").addEventListener("click", () => {
      repo = nuevoRepo();
      selected = null;
      prLive = null;
      history = [];
      histIdx = -1;
      terminalEl.innerHTML = "";
      log([info("Sandbox reiniciado. Escribe 'git init' para comenzar.")]);
      renderGraph();
      renderActions();
    });

    log([info("Bienvenido al sandbox de Git. Prueba con: git init"), info("También puedes hacer clic sobre cualquier commit del grafo para agregar, deshacer, mover una rama, fusionar o crear un Pull Request.")]);
    renderGraph();
    renderActions();
    renderRef();
  }

  window.GitSandbox = { mount };
})();