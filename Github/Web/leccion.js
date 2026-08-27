<!doctype html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Lección · Git y GitHub Desde Cero</title>
<link rel="stylesheet" href="../css/variables.css" />
<link rel="stylesheet" href="../css/base.css" />
<link rel="stylesheet" href="../css/layout.css" />
<link rel="stylesheet" href="../css/components.css" />
<link rel="stylesheet" href="../css/responsive.css" />
</head>
<body>

<header class="site-header">
  <div class="container">
    <a class="brand" href="../index.html">
      <span class="brand-mark">git</span>
      <span>Git &amp; GitHub Desde Cero</span>
    </a>
    <div class="header-right" id="headerRight">
      <span class="header-author">Curso práctico paso a paso</span>
      <a class="nav-link" href="../index.html">Inicio</a>
    </div>
    <button class="menu-toggle" id="menuToggle" aria-label="Abrir menú"><span></span></button>
  </div>
</header>

<main>
  <section class="lesson-header">
    <div class="container">
      <a class="lesson-back" href="../index.html">← Todos los módulos</a>
      <span class="eyebrow" id="moduleEyebrow"></span>
      <h1 id="moduleTitle"></h1>
      <p class="lesson-desc" id="moduleDesc"></p>
    </div>
  </section>

  <section class="lesson-body">
    <div class="container lesson-layout">
      <aside class="lesson-toc" id="lessonToc"></aside>

      <div class="lesson-main" id="lessonMain">
        <div class="progress-track"><span id="progressBarFill" style="width:0%"></span></div>
        <p class="step-count" id="progressLabel" style="margin-bottom:14px;color:var(--text-muted);font-family:var(--font-mono);font-size:12.5px;"></p>

        <div class="step-card" id="stepCard"></div>

        <div class="step-nav" style="margin-top:34px;">
          <a id="moduleLinkPrev" class="btn" href="#">← Módulo anterior</a>
          <a id="moduleLinkNext" class="btn" href="#">Siguiente módulo →</a>
        </div>
      </div>
    </div>
  </section>
</main>

<footer class="site-footer">
  <div class="container">
    <span>Git &amp; GitHub Desde Cero</span>
    <span>Hecho para aprender haciendo, un commit a la vez.</span>
  </div>
</footer>

<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
<script>
  if (window.mermaid) {
    mermaid.initialize({ startOnLoad: false, theme: "dark", securityLevel: "loose", fontFamily: "Inter, sans-serif" });
  }
</script>
<script src="../js/modulos-meta.js"></script>
<script src="../js/lecciones-data.js"></script>
<script src="../js/git-visualizer.js"></script>
<script src="../js/leccion.js"></script>
</body>
</html>
