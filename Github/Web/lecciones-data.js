
const LECCIONES = {

  1: {
    title: "Fundamentos del control de versiones",
    desc: "Por qué existe Git y qué problema real resuelve en el día a día de un equipo.",
    steps: [
      {
        kicker: "El problema",
        title: "Antes de los sistemas de control de versiones",
        html: `
          <p>Antes de Git era común trabajar guardando copias manuales de un proyecto:</p>
          <div class="code-block"><div class="code-head"><span>carpeta-proyecto</span></div>
            <pre>proyecto.zip
proyecto_final.zip
proyecto_final_2.zip
proyecto_ahora_si_final.zip
proyecto_final_corregido.zip</pre></div>
          <p>Esto generaba desorden total, pérdida de trabajo, imposibilidad de saber quién cambió qué,
          y un riesgo alto de sobreescribir el trabajo de otra persona.</p>
          <div class="callout">Git evita este desorden guardando automáticamente la historia real del proyecto.</div>`,
      },
      {
        kicker: "Ideas clave",
        title: "Qué garantiza un sistema de control de versiones",
        html: `
          <ul>
            <li><strong>Guarda qué cambió</strong>: cada modificación queda registrada.</li>
            <li><strong>Guarda cuándo cambió</strong>: cada cambio tiene fecha y hora.</li>
            <li><strong>Guarda quién lo hizo</strong>: cada modificación tiene un autor.</li>
            <li><strong>Permite volver atrás</strong>: si algo sale mal, puedes regresar.</li>
            <li><strong>Habilita el trabajo en equipo</strong>: varias personas editan el mismo proyecto sin pisarse.</li>
          </ul>
          <h4>El historial como línea de tiempo</h4>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Commit 1\\nCrea estructura"] --> B["Commit 2\\nAgrega login"]
    B --> C["Commit 3\\nCorrige validación"]
    C --> D["Estado actual"]
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style B fill:#1f6feb,stroke:#58a6ff,color:#fff
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff
    style D fill:#238636,stroke:#3fb950,color:#fff</div></div>`,
      },
      {
        kicker: "Evolución",
        title: "De las copias manuales a Git",
        html: `
          <h4>Copias manuales</h4>
          <p>Al inicio las personas guardaban versiones copiando archivos en disquetes, USB o ZIP.</p>
          <h4>Control centralizado</h4>
          <p>Luego surgieron sistemas como SVN, donde un servidor central guardaba las versiones. Si el
          servidor se caía, nadie podía trabajar.</p>
          <h4>Control distribuido (Git)</h4>
          <p>Git permite que cada persona tenga una copia completa del historial en su máquina. No dependes
          de un servidor central para trabajar.</p>`,
      },
      {
        kicker: "Por qué Git",
        title: "Rápido, seguro, flexible y estándar",
        html: `
          <ul>
            <li><strong>Rápido</strong>: las operaciones son locales.</li>
            <li><strong>Seguro</strong>: usa hashes SHA-1 para identificar cada commit.</li>
            <li><strong>Flexible</strong>: permite trabajar sin conexión y sincronizar después.</li>
            <li><strong>Estándar de la industria</strong>: usado por millones de desarrolladores.</li>
          </ul>
          <div class="callout">Con estas ideas claras, el siguiente paso es entender la diferencia entre
          <strong>Git</strong> y <strong>GitHub</strong>.</div>`,
      },
    ],
  },

  2: {
    title: "Git y GitHub",
    desc: "Dos herramientas distintas que se complementan: el motor local y la plataforma en la nube.",
    steps: [
      {
        kicker: "Definiciones",
        title: "Qué es Git y qué es GitHub",
        html: `
          <h4>Git</h4>
          <p>Sistema de control de versiones distribuido, creado por Linus Torvalds en 2005. Guarda la
          historia completa del proyecto en tu máquina, permite crear ramas, funciona sin internet y es
          gratuito y de código abierto.</p>
          <h4>GitHub</h4>
          <p>Plataforma en la nube que almacena repositorios de Git. Permite compartir tu código, facilita
          la colaboración en equipo y ofrece herramientas como Pull Requests, Issues y Actions.</p>`,
      },
      {
        kicker: "Comparación",
        title: "Git vs GitHub",
        html: `
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Git</th><th>GitHub</th></tr></thead>
            <tbody>
              <tr><td>Software que instalas en tu máquina</td><td>Servicio web que almacena repositorios</td></tr>
              <tr><td>Funciona sin internet</td><td>Necesita internet para sincronizar</td></tr>
              <tr><td>Controla versiones localmente</td><td>Permite compartir y colaborar</td></tr>
              <tr><td>Gratuito y open source</td><td>Tiene planes gratuitos y de pago</td></tr>
            </tbody>
          </table></div>
          <div class="callout">Analogía: Git es como Word instalado en tu PC. GitHub es como Google Docs,
          donde compartes y trabajas con otros.</div>`,
      },
      {
        kicker: "Flujo",
        title: "Git local vs GitHub remoto",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    Dev["Tu computadora\\nGit instalado"] -->|"git commit"| Local["Repositorio local"]
    Local -->|"git push"| GH["GitHub\\nRepositorio remoto"]
    GH -->|"git clone / git pull"| Alumno["Otra computadora"]
    style Dev fill:#238636,stroke:#3fb950,color:#fff
    style Local fill:#1f6feb,stroke:#58a6ff,color:#fff
    style GH fill:#30363d,stroke:#8b949e,color:#fff
    style Alumno fill:#8957e5,stroke:#bc8cff,color:#fff</div></div>
          <ol>
            <li>Trabajas en tu máquina con Git.</li>
            <li>Envías tus cambios a GitHub con <code>git push</code>.</li>
            <li>Otros descargan tus cambios con <code>git pull</code>.</li>
            <li>Todos colaboran en el mismo proyecto.</li>
          </ol>`,
      },
    ],
  },

  3: {
    title: "Terminal y Linux básico",
    desc: "Git se maneja principalmente desde la terminal: los comandos mínimos para moverte con soltura.",
    steps: [
      {
        kicker: "Por qué la terminal",
        title: "Control total sobre Git",
        html: `
          <p>Aunque existen interfaces gráficas, la terminal te da control total sobre Git, acceso a todas
          las funciones, mayor velocidad con la práctica y compatibilidad con servidores y entornos
          profesionales.</p>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    Linux["Linux\\nTerminal"] --> Git["Git\\nVersionado"]
    Git --> GitHub["GitHub\\nColaboración"]
    GitHub --> Docker["Docker\\nContenedores"]
    Docker --> Ansible["Ansible\\nAutomatización"]
    style Linux fill:#238636,stroke:#3fb950,color:#fff
    style Git fill:#1f6feb,stroke:#58a6ff,color:#fff
    style GitHub fill:#30363d,stroke:#8b949e,color:#fff
    style Docker fill:#8957e5,stroke:#bc8cff,color:#fff
    style Ansible fill:#da3633,stroke:#f85149,color:#fff</div></div>`,
      },
      {
        kicker: "Comandos base",
        title: "Ubicarte y listar contenido",
        html: `
          <div class="terminal-window"><div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash</span></div>
            <div class="terminal-body">
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">pwd</span></div>
              <div class="tline tout">/home/usuario/proyectos</div>
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">ls -la</span></div>
              <div class="tline tout">drwxr-xr-x  .git  README.md  index.html</div>
            </div></div>
          <p><code>pwd</code> muestra la ruta completa de tu ubicación actual. <code>ls</code> muestra el
          contenido del directorio actual; con <code>-la</code> ves también los archivos ocultos.</p>`,
      },
      {
        kicker: "Comandos base",
        title: "Moverte y crear archivos",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>cd nombre-carpeta   # entrar a una carpeta
cd ..               # subir un nivel
cd ~                # ir a tu home
mkdir nombre-carpeta
touch archivo.txt
cat archivo.txt
clear</pre></div>
          <h4>Ejemplo de uso completo</h4>
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>pwd
mkdir mi-proyecto
cd mi-proyecto
touch README.md
ls
cat README.md</pre></div>`,
      },
      {
        kicker: "Recursos",
        title: "Para seguir practicando",
        html: `
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Recurso</th><th>Uso</th></tr></thead>
            <tbody>
              <tr><td>KodeKloud Labs</td><td>Práctica interactiva de Linux en el navegador</td></tr>
              <tr><td>Ubuntu CLI Cheat Sheet</td><td>Referencia rápida de comandos</td></tr>
              <tr><td>Linux Journey</td><td>Guía guiada de comandos Linux</td></tr>
            </tbody>
          </table></div>`,
      },
    ],
  },

  4: {
    title: "Instalación y configuración de Git",
    desc: "Instalar Git y decirle a Git quién eres, antes de tu primer commit.",
    steps: [
      {
        kicker: "Verificar",
        title: "¿Ya tienes Git instalado?",
        html: `
          <div class="terminal-window"><div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash</span></div>
            <div class="terminal-body">
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">git --version</span></div>
              <div class="tline tout tsuccess">git version 2.43.0</div>
            </div></div>
          <p>Si aparece un número de versión, Git ya está instalado en tu equipo.</p>`,
      },
      {
        kicker: "Instalación",
        title: "Windows, macOS y Linux",
        html: `
          <h4>Windows</h4>
          <p>Descarga el instalador desde <a href="https://git-scm.com/downloads" target="_blank" rel="noopener">git-scm.com/downloads</a>,
          ejecútalo con las opciones por defecto y abre <strong>Git Bash</strong> para usar comandos tipo Linux.</p>
          <h4>macOS</h4>
          <div class="code-block"><div class="code-head"><span>bash</span></div><pre>brew install git</pre></div>
          <h4>Linux (Ubuntu/Debian)</h4>
          <div class="code-block"><div class="code-head"><span>bash</span></div><pre>sudo apt update
sudo apt install git</pre></div>`,
      },
      {
        kicker: "Identidad",
        title: "Configurar tu nombre y correo",
        html: `
          <p>Git necesita saber quién realiza cada commit:</p>
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git config --global user.name "Tu Nombre"
git config --global user.email "tu@email.com"</pre></div>
          <p>Esta configuración se guarda en <code>~/.gitconfig</code> y se aplica a todos tus repositorios.</p>
          <h4>Editor por defecto</h4>
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Editor</th><th>Comando</th></tr></thead>
            <tbody>
              <tr><td>Nano</td><td><code>git config --global core.editor "nano"</code></td></tr>
              <tr><td>VS Code</td><td><code>git config --global core.editor "code --wait"</code></td></tr>
              <tr><td>Vim</td><td><code>git config --global core.editor "vim"</code></td></tr>
            </tbody>
          </table></div>`,
      },
      {
        kicker: "Verificación final",
        title: "Confirma que todo quedó listo",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git --version
git config user.name
git config user.email
git config --list</pre></div>
          <div class="callout">Si todos los comandos responden correctamente, Git está listo para usarse.</div>`,
      },
    ],
  },

  5: {
    title: "Primer repositorio local",
    desc: "Convertir una carpeta común en un repositorio controlado por Git con git init.",
    steps: [
      {
        kicker: "Concepto",
        title: "Qué es un repositorio local",
        html: `
          <p>Un repositorio local es una carpeta en tu máquina donde Git controla los cambios de los
          archivos. Contiene todo el historial del proyecto, funciona sin internet y puedes trabajar en él
          de forma independiente.</p>`,
      },
      {
        kicker: "git init",
        title: "Convertir una carpeta en repositorio",
        html: `
          <div class="terminal-window"><div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash</span></div>
            <div class="terminal-body">
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">mkdir mi-proyecto && cd mi-proyecto</span></div>
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">git init</span></div>
              <div class="tline tout tsuccess">Initialized empty Git repository in .git/</div>
            </div></div>
          <p>Al ejecutar <code>git init</code>, Git crea una carpeta oculta llamada <code>.git</code> que
          contiene el historial completo del proyecto, la configuración del repositorio y las referencias
          a ramas y commits.</p>
          <div class="callout warn">Nunca modifiques manualmente la carpeta <code>.git</code>.</div>`,
      },
      {
        kicker: "Estructura",
        title: "Carpeta visible vs cerebro de Git",
        html: `
          <div class="code-block"><div class="code-head"><span>estructura</span></div>
            <pre>mi-proyecto/
├── .git/          (carpeta oculta de Git)
├── README.md      (tu archivo)
└── script.py      (tu archivo)</pre></div>
          <div class="diagram-wrap"><div class="mermaid">flowchart TB
    Repo["mi-proyecto/"] --> Visible["Archivos visibles\\nREADME.md / script.py"]
    Repo --> GitFolder[".git/\\nHistorial y configuración"]
    Visible -->|"editas aquí"| Cambios["Git detecta cambios"]
    GitFolder -->|"guarda commits"| Historial["Línea de tiempo"]
    style Repo fill:#30363d,stroke:#8b949e,color:#fff
    style Visible fill:#238636,stroke:#3fb950,color:#fff
    style GitFolder fill:#1f6feb,stroke:#58a6ff,color:#fff
    style Cambios fill:#9e6a03,stroke:#d29922,color:#fff
    style Historial fill:#8957e5,stroke:#bc8cff,color:#fff</div></div>`,
      },
      {
        kicker: "Práctica",
        title: "Verificar el estado del repositorio",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>mkdir mi-proyecto
cd mi-proyecto
git init
touch README.md
git status</pre></div>
          <p>Si ves un mensaje como <code>On branch main</code> o <code>No commits yet</code>, el
          repositorio está listo. En Linux/macOS usa <code>ls -la</code> para ver la carpeta
          <code>.git</code> oculta.</p>`,
      },
    ],
  },

  6: {
    title: "Estados, staging y commits",
    desc: "El corazón de Git: cómo un cambio viaja del directorio de trabajo al historial confirmado.",
    steps: [
      {
        kicker: "Los tres estados",
        title: "Working Directory → Staging → Repository",
        html: `
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Estado</th><th>Significado</th></tr></thead>
            <tbody>
              <tr><td>Modificado (Working Directory)</td><td>El archivo cambió en tu carpeta de trabajo</td></tr>
              <tr><td>Preparado (Staging Area)</td><td>El archivo está listo para entrar al próximo commit</td></tr>
              <tr><td>Confirmado (Repository)</td><td>El cambio ya fue guardado en el historial</td></tr>
            </tbody>
          </table></div>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    WD["Working Directory"] -->|"git add"| SA["Staging Area"]
    SA -->|"git commit"| LR2["Local Repository"]
    style WD fill:#da3633,stroke:#f85149,color:#fff
    style SA fill:#238636,stroke:#3fb950,color:#fff
    style LR2 fill:#1f6feb,stroke:#58a6ff,color:#fff</div></div>
          <div class="callout">Analogía: Working Directory es tu taller. Staging Area es la bandeja donde
          pones lo que quieres enviar. Repository es la caja fuerte donde se guarda todo.</div>`,
      },
      {
        kicker: "git add",
        title: "Preparar cambios",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git status
git add archivo.txt      # preparar un archivo
git add .                # preparar todos los cambios
git add *.md              # preparar solo un tipo de archivo</pre></div>
          <p>Usa <code>git status</code> constantemente: muestra archivos modificados en rojo, preparados
          en verde, la rama actual y si hay cambios sin preparar.</p>`,
      },
      {
        kicker: "git commit",
        title: "Confirmar una instantánea del proyecto",
        html: `
          <div class="terminal-window"><div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash</span></div>
            <div class="terminal-body">
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">git commit -m "Agrega README inicial"</span></div>
              <div class="tline tout tsuccess">[main 9f3a21c] Agrega README inicial</div>
            </div></div>
          <p>Un <strong>commit</strong> es una instantánea confirmada del estado del proyecto: un punto del
          historial al que puedes volver, comparar o usar como referencia. No es solo "guardar un archivo":
          guardar ocurre en tu editor, el commit ocurre en Git.</p>
          <h4>Un commit registra</h4>
          <div class="diagram-wrap"><div class="mermaid">flowchart TB
    C["Commit\\n9f3a21c"]
    C --> H["Hash\\nidentificador único"]
    C --> A["Autor\\nquién hizo el cambio"]
    C --> M["Mensaje\\nqué cambió"]
    C --> P["Padre\\ncommit anterior"]
    C --> S["Snapshot\\nestado confirmado"]
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff
    style H fill:#30363d,stroke:#8b949e,color:#fff
    style A fill:#30363d,stroke:#8b949e,color:#fff
    style M fill:#238636,stroke:#3fb950,color:#fff
    style P fill:#8957e5,stroke:#bc8cff,color:#fff
    style S fill:#9e6a03,stroke:#d29922,color:#fff</div></div>
          <div class="callout">Regla práctica: si no puedes resumir el cambio en una frase clara,
          probablemente el commit es demasiado grande.</div>`,
      },
      {
        kicker: "HEAD",
        title: "HEAD y el historial",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Commit A\\nInicio"] --> B["Commit B\\nREADME"]
    B --> C["Commit C\\nLogin"]
    C --> D["Commit D\\nCorrección"]
    HEAD["HEAD\\nposición actual"] --> D
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style B fill:#1f6feb,stroke:#58a6ff,color:#fff
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff
    style D fill:#238636,stroke:#3fb950,color:#fff
    style HEAD fill:#da3633,stroke:#f85149,color:#fff</div></div>
          <p><code>HEAD</code> es un puntero que indica en qué commit estás parado. Siempre apunta al
          último commit de la rama actual.</p>
          <div class="code-block"><div class="code-head"><span>bash</span></div>
            <pre>git log
git log --oneline</pre></div>
          <h4>Commits atómicos y buenos mensajes</h4>
          <ul>
            <li>Cada commit debe representar un solo cambio lógico.</li>
            <li>Usa el imperativo: <em>Agrega</em>, <em>Corrige</em>, <em>Elimina</em>.</li>
            <li>Bien: <code>Agrega validación de email</code>. Mal: <code>cambios varios</code>.</li>
          </ul>`,
      },
    ],
  },

  7: {
    title: "Deshacer cambios en Git",
    desc: "Cómo corregir un error según en qué estado se encuentre: working directory, staging o commit.",
    steps: [
      {
        kicker: "Sin preparar",
        title: "Descartar cambios en el directorio de trabajo",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>echo "nuevo contenido" >> archivo.txt
git status
git restore archivo.txt
git status</pre></div>
          <p><code>git restore archivo.txt</code> descarta los cambios no preparados y restaura el archivo
          a su último estado confirmado.</p>`,
      },
      {
        kicker: "En staging",
        title: "Sacar un archivo del área de preparación",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git restore --staged archivo.txt</pre></div>
          <p>El archivo vuelve al directorio de trabajo pero conserva tus cambios: solo sale de la lista de
          "listos para commit".</p>`,
      },
      {
        kicker: "Ya confirmado",
        title: "Revertir un commit sin borrar historia",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git log --oneline
git revert &lt;hash-del-commit&gt;</pre></div>
          <p><code>git revert</code> crea un nuevo commit que deshace los cambios del commit indicado, sin
          borrar el historial. Es la opción más segura cuando el commit ya fue compartido.</p>`,
      },
      {
        kicker: "Mapa de decisión",
        title: "Cómo elegir la forma correcta de deshacer",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart TD
    A["Quiero deshacer algo"] --> B{"¿Ya hice commit?"}
    B -->|No| C{"¿Está en staging?"}
    C -->|No| D["git restore archivo.txt"]
    C -->|Sí| E["git restore --staged archivo.txt"]
    B -->|Sí| G["git revert hash"]
    G --> H["Nuevo commit correctivo"]
    style A fill:#30363d,stroke:#8b949e,color:#fff
    style B fill:#8957e5,stroke:#bc8cff,color:#fff
    style C fill:#8957e5,stroke:#bc8cff,color:#fff
    style D fill:#da3633,stroke:#f85149,color:#fff
    style E fill:#9e6a03,stroke:#d29922,color:#fff
    style G fill:#238636,stroke:#3fb950,color:#fff
    style H fill:#1f6feb,stroke:#58a6ff,color:#fff</div></div>
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Acción</th><th>Comando</th></tr></thead>
            <tbody>
              <tr><td>Descartar cambios en archivo</td><td><code>git restore archivo.txt</code></td></tr>
              <tr><td>Quitar del staging</td><td><code>git restore --staged archivo.txt</code></td></tr>
              <tr><td>Revertir un commit</td><td><code>git revert &lt;hash&gt;</code></td></tr>
              <tr><td>Ver estado</td><td><code>git status</code></td></tr>
            </tbody>
          </table></div>`,
      },
    ],
  },

  8: {
    title: ".gitignore y buenas prácticas",
    desc: "Decirle a Git qué archivos ignorar, y los hábitos que mantienen un repositorio sano.",
    steps: [
      {
        kicker: "Qué es",
        title: ".gitignore como filtro",
        html: `
          <p><code>.gitignore</code> es un archivo de texto que le dice a Git qué archivos o carpetas debe
          ignorar. Los archivos ignorados no aparecen en <code>git status</code>, no se pueden preparar con
          <code>git add</code> y no se suben al repositorio.</p>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    Archivos["Archivos del proyecto"] --> Filtro{".gitignore"}
    Filtro -->|permitido| GitAdd["git add"]
    Filtro -->|ignorado| Fuera["No entra al repositorio"]
    GitAdd --> Commit["git commit"]
    style Archivos fill:#30363d,stroke:#8b949e,color:#fff
    style Filtro fill:#9e6a03,stroke:#d29922,color:#fff
    style GitAdd fill:#238636,stroke:#3fb950,color:#fff
    style Fuera fill:#da3633,stroke:#f85149,color:#fff
    style Commit fill:#1f6feb,stroke:#58a6ff,color:#fff</div></div>`,
      },
      {
        kicker: "Qué ignorar",
        title: "Ejemplos comunes",
        html: `
          <p>Ignora archivos que contienen información sensible, que se generan automáticamente, que son
          específicos de tu máquina, o que son muy pesados/innecesarios.</p>
          <div class="code-block"><div class="code-head"><span>.gitignore</span><button class="copy-btn">Copiar</button></div>
            <pre># Entorno
.env
.env.local
# Dependencias
node_modules/
vendor/
# Compilados
*.pyc
*.class
# Logs
*.log
# IDE
.vscode/
.idea/
# Sistema operativo
.DS_Store
Thumbs.db</pre></div>`,
      },
      {
        kicker: "Práctica",
        title: "Crear y verificar tu .gitignore",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>touch .gitignore
echo "*.log" >> .gitignore
touch prueba.log
git status   # prueba.log no debería aparecer</pre></div>
          <h4>.gitignore global</h4>
          <div class="code-block"><div class="code-head"><span>bash</span></div>
            <pre>git config --global core.excludesFile ~/.gitignore_global</pre></div>
          <p>Luego crea el archivo <code>~/.gitignore_global</code> con tus reglas comunes para todos tus
          repositorios.</p>`,
      },
      {
        kicker: "Buenas prácticas",
        title: "Hábitos que mantienen limpio el repo",
        html: `
          <ul>
            <li>Haz commits pequeños y frecuentes, uno por cambio lógico.</li>
            <li>Crea <code>.gitignore</code> desde el inicio del proyecto y compártelo en el repositorio.</li>
            <li>No ignores archivos de configuración del proyecto (como <code>package.json</code>).</li>
            <li>Usa <code>git status</code> constantemente y revisa cambios antes de confirmar.</li>
            <li>Nunca subas información sensible.</li>
          </ul>`,
      },
    ],
  },

  9: {
    title: "Ramas en Git",
    desc: "Una rama es un puntero ligero a un commit. Aprende a crearlas, moverte entre ellas y entender HEAD.",
    steps: [
      {
        kicker: "Concepto",
        title: "Una rama es un puntero, no una copia",
        html: `
          <p>Una rama es una línea de trabajo independiente dentro del mismo repositorio: te permite
          experimentar sin afectar el código principal y luego fusionar los cambios.</p>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Commit base"] --> B["main estable"]
    A --> C["rama feature"]
    C --> D["commits de trabajo"]
    D --> E["merge"]
    B --> E
    E --> F["main actualizado"]
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style B fill:#1f6feb,stroke:#58a6ff,color:#fff
    style C fill:#8957e5,stroke:#bc8cff,color:#fff
    style D fill:#8957e5,stroke:#bc8cff,color:#fff
    style E fill:#238636,stroke:#3fb950,color:#fff
    style F fill:#238636,stroke:#3fb950,color:#fff</div></div>
          <div class="callout">Analogía de la autopista: una rama se parece más a una salida de autopista
          que a la rama de un árbol. Sales por una vía paralela, avanzas, y más adelante puedes volver a la
          vía principal.</div>`,
      },
      {
        kicker: "Comandos",
        title: "Crear, listar y cambiar de rama",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git branch                    # ver ramas locales (* marca la actual)
git branch --show-current     # solo el nombre de la rama actual
git branch fix                # crear una rama sin cambiarte a ella
git switch fix                # cambiar a una rama existente
git switch -c mi-primera-rama # crear y entrar en un solo paso
git switch main               # volver a main
git log --oneline --graph --all</pre></div>
          <div class="callout warn">Para crear una rama debe existir al menos un commit. Con
          <code>git init</code> recién creado y sin commits, Git no tiene un punto base desde donde crear
          la rama.</div>`,
      },
      {
        kicker: "Simulador",
        title: "main, una rama secundaria y HEAD en acción",
        type: "git-visualizer",
        html: `<p class="prose-intro">Usa los botones para avanzar comando por comando y observa cómo se
          mueven los punteros de <strong>main</strong>, de la rama <strong>feature</strong> y de
          <strong>HEAD</strong> en la terminal y en el grafo.</p>`,
      },
      {
        kicker: "Antes de cambiar de rama",
        title: "Revisa el estado primero",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart TD
    A["Quiero cambiar de rama"] --> B["git status"]
    B --> C{"¿Hay cambios pendientes?"}
    C -->|No| D["git switch otra-rama"]
    C -->|Sí| E{"¿Quiero guardarlos?"}
    E -->|Sí| F["git add . + git commit"]
    E -->|No todavía| G["git stash"]
    F --> D
    G --> D
    style A fill:#30363d,stroke:#8b949e,color:#fff
    style B fill:#1f6feb,stroke:#58a6ff,color:#fff
    style D fill:#238636,stroke:#3fb950,color:#fff
    style F fill:#9e6a03,stroke:#d29922,color:#fff
    style G fill:#9e6a03,stroke:#d29922,color:#fff</div></div>
          <p>Si tienes cambios sin guardar, Git puede bloquear el cambio de rama para proteger tu trabajo.
          Históricamente la rama principal se llamaba <code>master</code>; desde 2020 la industria adoptó
          <code>main</code> como nombre por defecto.</p>`,
      },
    ],
  },

  /*  10. MERGE Y CONFLICTOS (con simulador)  */
  10: {
    title: "Merge y conflictos",
    desc: "Fusionar dos ramas y resolver, con criterio, el momento en que Git necesita una decisión humana.",
    steps: [
      {
        kicker: "git merge",
        title: "Traer los cambios de otra rama",
        html: `
          <div class="callout"><code>git merge</code> afecta siempre a la rama donde estás parado.</div>
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git switch main
git merge feature-estilos
git merge feature-menu</pre></div>
          <p>Si dos ramas modificaron archivos distintos, Git puede combinar los cambios automáticamente:
          no hay conflicto.</p>`,
      },
      {
        kicker: "Conflicto",
        title: "Cuando dos ramas tocan la misma línea",
        html: `
          <p>Un conflicto ocurre cuando dos ramas modifican la misma zona de un archivo de formas
          incompatibles. Git no falla: se detiene para pedir una decisión humana.</p>
          <div class="terminal-window"><div class="terminal-titlebar">
            <span class="tdot red"></span><span class="tdot yellow"></span><span class="tdot green"></span>
            <span class="tlabel">bash</span></div>
            <div class="terminal-body">
              <div class="tline"><span class="tprompt">$</span> <span class="tcmd">git merge feature-header</span></div>
              <div class="tline tout tdanger">CONFLICT (content): Merge conflict in index.html</div>
              <div class="tline tout tdanger">Automatic merge failed; fix conflicts and then commit the result.</div>
            </div></div>
          <h4>Marcas de conflicto en el archivo</h4>
          <div class="code-block"><div class="code-head"><span>index.html</span></div>
            <pre>&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
&lt;h1&gt;Cafe Aroma - El mejor cafe de Lima&lt;/h1&gt;
=======
&lt;h1&gt;Bienvenidos a Cafe Aroma&lt;/h1&gt;
&gt;&gt;&gt;&gt;&gt;&gt;&gt; feature-header</pre></div>
          <p><code>HEAD</code> es lo que existe en la rama actual; debajo de <code>=======</code> está lo
          que trae la rama que intentas fusionar. Git dice: "no sé cuál es correcta, tú decides".</p>`,
      },
      {
        kicker: "Simulador",
        title: "Fusiona una rama y observa el commit de merge",
        type: "git-visualizer-merge",
        html: `<p class="prose-intro">Continúa la simulación: crea un segundo commit en <strong>main</strong>
          mientras <strong>feature</strong> avanza por su cuenta, y observa cómo <code>git merge</code> une
          ambas líneas de historia en un commit de fusión.</p>`,
      },
      {
        kicker: "Resolver y limpiar",
        title: "Marcar como resuelto y borrar ramas viejas",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre># después de editar el archivo y quitar las marcas
git add index.html
git commit -m "Resolver conflicto del encabezado"

# limpiar ramas ya fusionadas
git branch -d feature-menu
git branch -D nombre-rama   # forzar si NO está fusionada</pre></div>
          <p>En un conflicto, <code>git add</code> significa "Git, ya resolví este archivo". La opción
          <code>-d</code> es segura porque Git verifica si la rama ya fue fusionada; <code>-D</code>
          fuerza el borrado aunque puedas perder commits.</p>`,
      },
    ],
  },

  11: {
    title: "Historial, inspección y deshacer con criterio",
    desc: "Leer el historial como un mapa y comparar cambios antes de confirmarlos.",
    steps: [
      {
        kicker: "Leer el historial",
        title: "El historial es la bitácora del proyecto",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git log
git log --oneline
git log --graph --oneline --all
git show &lt;hash&gt;</pre></div>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["git log"] --> B["Veo la lista de commits"]
    B --> C["Elijo un hash"]
    C --> D["git show hash"]
    D --> E["Entiendo qué cambió y por qué"]
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style C fill:#8957e5,stroke:#bc8cff,color:#fff
    style E fill:#238636,stroke:#3fb950,color:#fff</div></div>`,
      },
      {
        kicker: "Comparar",
        title: "git diff antes de confirmar",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git diff           # cambios que todavía no están preparados
git diff --staged  # lo que ya entraría al próximo commit</pre></div>
          <p>Muchas veces el error no está en Git, sino en hacer commit demasiado rápido sin revisar qué se
          está guardando.</p>`,
      },
      {
        kicker: "Deshacer con criterio",
        title: "Elegir la herramienta según dónde está el cambio",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart TD
    A["Quiero deshacer algo"] --> B{"¿Ya hice commit?"}
    B -->|No| C{"¿Está en staging?"}
    C -->|No| D["git restore archivo"]
    C -->|Sí| E["git restore --staged archivo"]
    B -->|Sí| F{"¿Ya compartí el historial?"}
    F -->|No| G["amend o reset con cuidado"]
    F -->|Sí| H["git revert hash"]
    H --> I["Nuevo commit que corrige"]
    style D fill:#da3633,stroke:#f85149,color:#fff
    style E fill:#9e6a03,stroke:#d29922,color:#fff
    style G fill:#8957e5,stroke:#bc8cff,color:#fff
    style H fill:#238636,stroke:#3fb950,color:#fff
    style I fill:#1f6feb,stroke:#58a6ff,color:#fff</div></div>
          <div class="code-block"><div class="code-head"><span>bash</span></div>
            <pre>git restore archivo.txt
git restore --staged archivo.txt
git commit --amend
git reset --mixed HEAD~1
git reset --hard HEAD~1
git revert &lt;hash&gt;</pre></div>`,
      },
      {
        kicker: "Qué sigue",
        title: "Próximas herramientas del ecosistema Git",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Rebase"] --> B["Stash"]
    B --> C["Cherry-pick"]
    C --> D["Reflog"]
    D --> E["Hooks"]
    style A fill:#8957e5,stroke:#bc8cff,color:#fff
    style B fill:#9e6a03,stroke:#d29922,color:#fff
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff
    style D fill:#238636,stroke:#3fb950,color:#fff
    style E fill:#30363d,stroke:#8b949e,color:#fff</div></div>
          <p>Con la lectura de historial ya clara, el siguiente módulo cierra el flujo local con
          <code>rebase</code>.</p>`,
      },
    ],
  },

  12: {
    title: "Rebase y limpieza de historial",
    desc: "Cambiar la base de una rama para dejar un historial más lineal antes de integrar cambios.",
    steps: [
      {
        kicker: "El problema",
        title: "Tu rama se quedó atrás de main",
        html: `
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Commit A"] --> B2["Commit B (feature)"]
    A --> C["Commit C (main)"]
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style B2 fill:#8957e5,stroke:#bc8cff,color:#fff
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff</div></div>
          <p>Mientras trabajabas en <code>feature-menu</code>, <code>main</code> también recibió nuevos
          commits. Tu rama nace desde un punto que ya quedó atrás.</p>`,
      },
      {
        kicker: "git rebase",
        title: "Reaplicar tus commits sobre la nueva base",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git switch feature-menu
git rebase main</pre></div>
          <div class="diagram-wrap"><div class="mermaid">flowchart LR
    A["Commit A"] --> C["Commit C (main)"]
    C --> B2["Commit B' (feature)"]
    style A fill:#1f6feb,stroke:#58a6ff,color:#fff
    style C fill:#1f6feb,stroke:#58a6ff,color:#fff
    style B2 fill:#238636,stroke:#3fb950,color:#fff</div></div>
          <p>El commit <code>B'</code> representa el mismo cambio conceptual que <code>B</code>, pero
          aplicado sobre una base nueva; por eso el hash cambia.</p>`,
      },
      {
        kicker: "Rebase vs merge",
        title: "Cuándo usar cada uno",
        html: `
          <div class="table-wrap"><table class="prose-table">
            <thead><tr><th>Situación</th><th>Comando recomendado</th></tr></thead>
            <tbody>
              <tr><td>Integrar una rama terminada a main</td><td><code>git merge nombre-rama</code></td></tr>
              <tr><td>Actualizar tu rama local antes de integrar</td><td><code>git rebase main</code></td></tr>
              <tr><td>Historial ya compartido con otras personas</td><td>Evita rebase</td></tr>
            </tbody>
          </table></div>
          <div class="callout warn"><strong>Regla de oro:</strong> no hagas rebase sobre commits que otras
          personas ya están usando. Rebase reescribe la historia de la rama.</div>`,
      },
      {
        kicker: "Conflictos en rebase",
        title: "Continuar, resolver o abortar",
        html: `
          <div class="code-block"><div class="code-head"><span>bash</span><button class="copy-btn">Copiar</button></div>
            <pre>git status
# editar archivos con conflicto
git add archivo.txt
git rebase --continue
# o, para cancelar y volver atrás:
git rebase --abort</pre></div>
          <p>Antes de integrar una rama conviene revisar: <code>git status</code>,
          <code>git log --oneline --graph --all</code> y <code>git diff main</code>.</p>`,
      },
    ],
  },

  13: {
    title: "Bonus: Loki, Git y la Línea Temporal Sagrada",
    desc: "Una analogía con la serie Loki de Marvel para fijar de forma memorable el concepto de ramas.",
    steps: [
      {
        kicker: "La analogía",
        title: "La Línea Temporal Sagrada es tu repositorio",
        html: `
          <p>La <strong>Línea Temporal Sagrada</strong>, mantenida por la Autoridad de Variación Temporal
          (TVA), funciona como un repositorio de Git gigante. Cualquier desviación, un
          <strong>Evento Nexus</strong>, es como un commit rebelde que podría descarrilar todo. En Git, tu
          rama <code>main</code> cumple ese mismo papel: es la versión estable y oficial del proyecto.</p>`,
      },
      {
        kicker: "Loki",
        title: "El pull request travieso",
        html: `
          <p>Loki es como un desarrollador travieso que envía pull requests que rompen todo: es quien
          accidentalmente borró la rama principal de la Línea Temporal Sagrada. En Git, cuando experimentas
          en una rama y algo sale mal, no destruiste <code>main</code>: solo borras la rama experimental y
          vuelves a ella.</p>
          <div class="code-block"><div class="code-head"><span>bash</span></div>
            <pre># Eliminar una rama que ya no necesitas
git branch -d nombre-rama

# Forzar eliminación si no está fusionada
git branch -D nombre-rama</pre></div>`,
      },
      {
        kicker: "Conflictos y reset",
        title: "Dolores de cabeza cósmicos",
        html: `
          <p>Los Eventos Nexus surgen de desviaciones del curso predeterminado; en Git, los
          <strong>conflictos de fusión</strong> ocurren cuando dos ramas intentan modificar el mismo
          archivo, y requieren resolución manual.</p>
          <p><code>git reset</code> es básicamente un retcón cósmico: permite reescribir la historia y
          deshacer errores. Igual que con los viajes en el tiempo, es mejor usarlo con moderación.</p>
          <div class="code-block"><div class="code-head"><span>bash</span></div>
            <pre># Cuidado: esto reescribe la historia
git reset --hard HEAD~1</pre></div>
          <div class="callout warn">Al igual que la TVA no debería abusar del reset, tú tampoco deberías
          abusar de <code>git reset --hard</code>. Úsalo solo cuando estés seguro de lo que haces.</div>`,
      },
      {
        kicker: "Cierre",
        title: "Dos líneas temporales, un propósito",
        html: `
          <p>Ya sea que estés lidiando con Líneas Temporales Sagradas o ramas de Git, el objetivo es el
          mismo: <strong>mantener el orden y prevenir el caos</strong>. La próxima vez que trabajes en un
          proyecto, recuerda que no solo gestionas ramas de código: eres un guardián cósmico,
          salvaguardando la integridad de tu historial.</p>
          <div class="callout">Analogía basada en el artículo "Loki, Git, and the Cosmic Retcon" de Gaurav
          Trivedi, publicado en Being Technical Writer.</div>`,
      },
    ],
  },
};
