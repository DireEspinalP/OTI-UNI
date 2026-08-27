/*
  Referencia completa de comandos de Git, agrupados por categoría.
  Usada por el panel "Referencia de comandos" dentro del Sandbox interactivo
  (git-sandbox.js), pero es un dataset independiente reutilizable en
  cualquier otra parte del curso.
*/
const GIT_COMMANDS_REF = [
  {
    categoria: "Configuración inicial",
    comandos: [
      { cmd: "git config --global user.name \"Tu Nombre\"", desc: "Define el nombre de autor que se guarda en cada commit." },
      { cmd: "git config --global user.email \"tu@correo.com\"", desc: "Define el correo de autor asociado a tus commits." },
      { cmd: "git config --list", desc: "Muestra toda la configuración activa de Git." },
      { cmd: "git --version", desc: "Muestra la versión de Git instalada." },
    ],
  },
  {
    categoria: "Crear y clonar repositorios",
    comandos: [
      { cmd: "git init", desc: "Convierte la carpeta actual en un repositorio Git nuevo (crea la carpeta .git)." },
      { cmd: "git init -b main", desc: "Igual que git init, pero nombra a la rama principal 'main' desde el inicio." },
      { cmd: "git clone <url>", desc: "Descarga una copia completa de un repositorio remoto, con todo su historial." },
    ],
  },
  {
    categoria: "Cambios locales: staging y commits",
    comandos: [
      { cmd: "git status", desc: "Muestra el estado del directorio de trabajo: qué cambió, qué está en staging." },
      { cmd: "git add <archivo>", desc: "Mueve cambios de un archivo específico al área de staging." },
      { cmd: "git add .", desc: "Mueve todos los cambios pendientes al área de staging." },
      { cmd: "git commit -m \"mensaje\"", desc: "Guarda lo que está en staging como un nuevo commit permanente." },
      { cmd: "git commit -am \"mensaje\"", desc: "Combina 'add' de archivos ya rastreados y 'commit' en un solo paso." },
      { cmd: "git diff", desc: "Muestra las diferencias entre el directorio de trabajo y el último commit." },
      { cmd: "git diff --staged", desc: "Muestra las diferencias entre el staging y el último commit." },
    ],
  },
  {
    categoria: "Ramas y HEAD",
    comandos: [
      { cmd: "git branch", desc: "Lista las ramas locales; la actual aparece marcada con *." },
      { cmd: "git branch <nombre>", desc: "Crea una nueva rama apuntando al commit actual, sin cambiarte a ella." },
      { cmd: "git branch -d <nombre>", desc: "Elimina una rama ya fusionada. Falla si tiene trabajo sin fusionar." },
      { cmd: "git branch -D <nombre>", desc: "Fuerza la eliminación de una rama, aunque tenga cambios sin fusionar." },
      { cmd: "git branch -f <nombre> <commit>", desc: "Mueve el puntero de una rama a otro commit a la fuerza." },
      { cmd: "git switch <nombre>", desc: "Cambia HEAD hacia una rama existente." },
      { cmd: "git switch -c <nombre>", desc: "Crea una rama nueva y se cambia a ella en un solo paso." },
      { cmd: "git checkout <nombre>", desc: "Forma clásica (pre-2019) de cambiar de rama; hace lo mismo que switch." },
      { cmd: "git checkout -b <nombre>", desc: "Forma clásica de crear y cambiar de rama en un solo paso." },
      { cmd: "git checkout <commit>", desc: "Mueve HEAD directamente a un commit, sin pasar por una rama (HEAD separado / detached)." },
    ],
  },
  {
    categoria: "Fusionar y combinar historiales",
    comandos: [
      { cmd: "git merge <rama>", desc: "Trae los commits de <rama> hacia la rama actual. Crea un commit de fusión si hubo divergencia." },
      { cmd: "git merge --abort", desc: "Cancela un merge en curso y regresa al estado anterior al intento." },
      { cmd: "git rebase <rama>", desc: "Vuelve a aplicar los commits de la rama actual sobre la punta de <rama>, reescribiendo el historial." },
      { cmd: "git rebase --abort", desc: "Cancela un rebase en curso." },
      { cmd: "git cherry-pick <commit>", desc: "Copia un commit específico de otra rama hacia la rama actual." },
    ],
  },
  {
    categoria: "Inspección e historial",
    comandos: [
      { cmd: "git log", desc: "Muestra el historial de commits de la rama actual." },
      { cmd: "git log --oneline", desc: "Historial compacto: un commit por línea." },
      { cmd: "git log --oneline --graph --all", desc: "Historial con gráfico de ramas en texto, incluyendo todas las ramas." },
      { cmd: "git show <commit>", desc: "Muestra los detalles y cambios introducidos por un commit específico." },
      { cmd: "git blame <archivo>", desc: "Muestra qué commit y autor modificó por última vez cada línea de un archivo." },
    ],
  },
  {
    categoria: "Deshacer cambios",
    comandos: [
      { cmd: "git restore <archivo>", desc: "Descarta cambios sin confirmar en el directorio de trabajo." },
      { cmd: "git restore --staged <archivo>", desc: "Saca un archivo del área de staging, sin perder el cambio en sí." },
      { cmd: "git reset --soft <commit>", desc: "Mueve el puntero de la rama a otro commit, conservando los cambios en staging." },
      { cmd: "git reset --mixed <commit>", desc: "Mueve el puntero de la rama y saca los cambios del staging, pero los conserva en el directorio." },
      { cmd: "git reset --hard <commit>", desc: "Mueve el puntero de la rama a otro commit y descarta todo cambio posterior. Es destructivo." },
      { cmd: "git revert <commit>", desc: "Crea un nuevo commit que deshace los cambios de otro, sin borrar historial." },
      { cmd: "git stash", desc: "Guarda temporalmente cambios sin confirmar para recuperarlos después." },
      { cmd: "git stash pop", desc: "Recupera el último cambio guardado con git stash y lo quita de la pila." },
    ],
  },
  {
    categoria: "Trabajo remoto y colaboración",
    comandos: [
      { cmd: "git remote -v", desc: "Lista los repositorios remotos configurados y sus URLs." },
      { cmd: "git remote add origin <url>", desc: "Conecta el repositorio local con uno remoto llamado 'origin'." },
      { cmd: "git fetch", desc: "Descarga los commits nuevos del remoto sin fusionarlos todavía." },
      { cmd: "git pull", desc: "Combina git fetch + git merge: trae y fusiona los cambios del remoto." },
      { cmd: "git push", desc: "Envía tus commits locales al repositorio remoto." },
      { cmd: "git push -u origin <rama>", desc: "Envía la rama al remoto y la deja configurada como la rama de seguimiento por defecto." },
    ],
  },
];

if (typeof window !== "undefined") window.GIT_COMMANDS_REF = GIT_COMMANDS_REF;