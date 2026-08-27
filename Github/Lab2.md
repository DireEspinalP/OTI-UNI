# Laboratorio · 2

**Curso:** Git y GitHub · Control de Versiones Software  
**PIT 2026 · Universidad Nacional de Ingeniería**  
**Instructor:** Luis Rojas  

---

## Objetivo

Al terminar debe existir, en **su computadora**, un repositorio local llamado `practica-historial` con:

- un `bitacora.md` **completo** (sin huecos: nombre, sistema, Inicio, Oficio de hoy);
- un `README.md` breve;
- un `.gitignore` que ignore `.env` y `*.log`;
- un historial con **varios commits atómicos** (no un solo `update`);
- práctica hecha de `diff`, `restore`, `restore --staged`, `amend` y `revert`;
- `git status` limpio: *working tree clean*.

Ese repositorio es el que usarán en la sesión 3. No lo borre.

---

## Qué se practica


| Oficio           | Comandos                                                                                                              |
| ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| Ver el cambio    | `git status`, `git diff`, `git diff --staged`                                                                         |
| Commits atómicos | `git add archivo`, `git commit -m`                                                                                    |
| Recuperar        | `git restore`, `git restore --staged`, `git commit --amend`, `git revert`                                             |
| Ignorar          | `.gitignore`                                                                                                          |
| Leer historia    | `git log --oneline`, `git log -3`, `git log --oneline -- archivo`, `git log --oneline --graph --all`, `git show HEAD` |


---

## Requisitos

- Git instalado. Compruebe:

```bash
git --version
```

Si falla: instale desde [git-scm.com/downloads](https://git-scm.com/downloads), cierre la terminal y abra una **nueva** (en Windows: Git Bash).

- Identidad local (no es cuenta de GitHub):

```bash
git config user.name
git config user.email
```

Si salen vacíos:

```bash
git config --global user.name "Su Nombre"
git config --global user.email "su.correo@ejemplo.com"
git config --global init.defaultBranch main
```

- Editor (VS Code, notepad, nano).
- Terminal: **Git Bash** en Windows (recomendado).

No necesita el repo de la sesión 1. Si lo tiene, déjelo: este laboratorio usa **otra carpeta**.

---

## Cómo usar esta guía

1. Abra la terminal a pantalla completa.
2. Ejecute **un** bloque, lea la salida, compare con lo esperado.
3. Si algo no cuadra, vaya a [Errores frecuentes](#errores-frecuentes) **antes** del siguiente comando.
4. Brújulas: `pwd`, `ls -la`, `git status`. Antes de deshacer: también `git diff`.

El texto después de `$` es lo que usted escribe. No copie el `$`.  
`git log` o `git diff` a veces abren un visor: salga con `q`.

---

## Parte A · Repo nuevo (desde cero)

### A1. Carpeta e `init`

```bash
mkdir -p ~/curso-git
cd ~/curso-git
mkdir practica-historial
cd practica-historial
pwd
git init
ls -la
git status
```

**Esperado:**

- Está dentro de `practica-historial`.
- Mensaje del estilo `Initialized empty Git repository`.
- `ls -la` muestra `.git`.
- `git status`: rama `main` (o `master`), *No commits yet*.

**No borre** `.git`. **No** ejecute `git init` en `C:\` ni en el home entero.

### A2. Primer commit: nace `bitacora.md`

Cree el archivo **completo** (editor o terminal). Cambie el nombre y el sistema. No deje huecos.

```bash
cat > bitacora.md << 'EOF'
# Bitacora
- Nombre: Su Nombre
- Sistema: Windows + Git Bash
- Repo: practica-historial

## Inicio
- Repo nuevo con git init.
- Git guarda fotos, no un guardar de Word.
EOF
```

Si `<<` le resulta incómodo, abra el editor, pegue el mismo texto, guarde y cierre.

```bash
cat bitacora.md
git status
git add bitacora.md
git status
git commit -m "Agrega bitacora.md"
```

**Esperado:** primer commit. Status *clean*. El archivo se puede leer en voz alta.

### A3. Segundo commit: Oficio de hoy (atómico)

Edite `bitacora.md` y **añada** esta sección al final. No reescriba el archivo desde cero.

```bash
cat >> bitacora.md << 'EOF'

## Oficio de hoy
- git diff mira el taller; git diff --staged mira la bandeja.
- restore descarta lo no confirmado.
- Un commit = un cambio logico.
EOF
```

```bash
git status
git diff
git add bitacora.md
git diff --staged
git commit -m "Documenta diff y restore"
git log --oneline
```

**Esperado:** dos commits. `git diff` (sin `--staged`) muestra el taller **antes** del `add`. `git diff --staged` muestra lo que **sí** entraría al commit.

Mensajes en **imperativo**: *Agrega*, *Documenta*, *Ignora*. Evite `asdf`, `fix`, `update`, `wip`.

### A4. Tercer commit: un README aparte

Otro archivo, **otro** commit. Así el historial tiene más de una pieza (en la sesión 3 importará: no todo el choque ocurre en un solo archivo).

```bash
echo "# practica-historial" > README.md
echo "Repo de la sesion 2. Local. Sin GitHub todavia." >> README.md
git add README.md
git commit -m "Agrega README del repo"
```

---

## Parte B · Ver el cambio antes de la foto

### B1. `git diff` (taller)

```bash
echo "nota temporal de practica" >> README.md
git status
git diff
```

**Esperado:** `README.md` *modified*. El diff muestra una línea con `+`. Eso **aún no** está en staging.

### B2. `git diff --staged` (bandeja)

```bash
git add README.md
git status
git diff
git diff --staged
```

**Esperado:** `git diff` vacío (el taller ya se vació hacia la bandeja). `git diff --staged` muestra la misma línea con `+`. Status en verde / *to be committed*.

Confusión típica: diff vacío **no** significa «no hay cambios». Puede significar que todo está en staging. Mire status.

---

## Parte C · Recuperar según dónde esté el cambio

### C1. Sacar de la bandeja: `restore --staged`

```bash
git restore --staged README.md
git status
```

**Esperado:** el archivo **ya no** está preparado. El texto **sigue** en `README.md` (el taller conserva el trabajo).

### C2. Descartar en el taller: `restore`

Esa nota no sirve. Mírela y tírela:

```bash
git diff
git restore README.md
git status
cat README.md
```

**Esperado:** status *clean*. `README.md` volvió a la última foto confirmada. La línea «nota temporal» desapareció.

`git restore archivo` **borra del taller** lo no confirmado. Status y diff **antes**. En docs viejas verá `git checkout -- archivo`; hoy se usa `restore`.

### C3. Corregir el último mensaje: `amend`

Solo el **último** commit, y solo si es de usted.

```bash
git commit --amend -m "Agrega README inicial del repo"
git log --oneline
```

**Esperado:** el mensaje del último commit cambió. El hash **también** cambia. Eso es normal: `amend` reescribe esa foto.

Cuando exista remoto y otras personas, no enmiende commits ya publicados. Ahí se usa `revert`.

### C4. Deshacer sin borrar historia: `revert`

Vamos a crear un commit que **no** debería quedar, y deshacerlo con honestidad.

```bash
echo "debug=true" >> README.md
git add README.md
git commit -m "Activa debug permanente"
git log --oneline
git revert HEAD --no-edit
git log --oneline
cat README.md
```

**Esperado:**

- El commit malo **sigue** en el log.
- Debajo (más arriba en `--oneline`) aparece un commit nuevo del estilo `Revert "Activa debug permanente"`.
- `README.md` ya no tiene `debug=true`.

Revertir no borra: crea una foto que deshace. En la sesión 3, cuando haya más de una línea de tiempo, esa honestidad evita pelearse con la historia de otra persona.

`--no-edit` acepta el mensaje por defecto. Si se abre un editor: en Vim, `Esc`, luego `:wq` y Enter.

---

## Parte D · `.gitignore`

### D1. Crear reglas y archivos que no deben entrar

```bash
echo ".env" > .gitignore
echo "*.log" >> .gitignore
echo "*.tmp" >> .gitignore
echo "TOKEN=no-subir" > .env
echo "ruido" > practica.log
git status
```

**Esperado:** status muestra `.gitignore` (y no debería listar `.env` ni `practica.log` como pendientes). El portero funciona.

### D2. Confirmar el filtro (commit atómico)

```bash
git add .gitignore
git commit -m "Ignora secretos y logs"
git status
```

El `.gitignore` **sí** se confirma: es parte del proyecto. `.env` no.

Si un secreto ya se confirmó una vez, ignorarlo después **no** lo saca del historial. Hoy no lo subimos.

---

## Parte E · Leer el historial con criterio

Ahora sí hay varias fotos. Estos comandos no se entienden con un solo commit.

### E1. Vista diaria

```bash
git log --oneline
```

**Esperado (ejemplo; sus hashes serán otros):**

```text
c8d21aa Ignora secretos y logs
9e12ab0 Revert "Activa debug permanente"
3f44c10 Activa debug permanente
a91c011 Agrega README inicial del repo
7b4e019 Documenta diff y restore
4a91c33 Agrega bitacora.md
```

Debe ver **su** nombre si ejecuta `git log` (sin `--oneline`). Salga con `q`.

### E2. Recortar y filtrar

```bash
git log -3
git log --oneline -- bitacora.md
```

- `-3`: solo los **últimos tres**. El número es un tope, no «la sesión 3».
- `-- bitacora.md`: historial **de ese archivo**. El `--` separa opciones de la ruta. La bitácora tiene menos fotos que el README.

### E3. El dibujo de la línea de tiempo

```bash
git log --oneline --graph --all
```

**Esperado:** una sola columna de asteriscos. `HEAD -> main` arriba.

`--graph` dibuja la línea. `--all` mira **todas** las ramas. Hoy casi siempre es **una sola línea**: no hay ramas nuevas. En la sesión 3 ese dibujo se parte (una línea `main`, otra `feature`). Si hoy ya lo lee, mañana no se asusta.

### E4. Abrir una foto: `git show`

```bash
git show HEAD
```

Abre el último commit: mensaje + diff contra su padre. `q` cierra.

Para una foto concreta, copie **su** hash de `git log --oneline`, no uno de un tutorial:

```bash
git show 7b4e019
```

Ese `7b4e019` es de ejemplo. En su repo no existe. Use el hash corto que le salió a usted.

---

## Parte F · Verificación

El laboratorio está completo si puede responder **sí** a todo:

- [ ] Estoy dentro de `practica-historial` (`pwd`). Existe `.git`.
- [ ] `bitacora.md` se puede leer en voz alta (nombre, Inicio, Oficio de hoy). No quedó la plantilla vacía.
- [ ] Existen `README.md` y `.gitignore`.
- [ ] Un `.env` de prueba **no** aparece en `git status`.
- [ ] `git log --oneline` muestra **varias** fotos, no una sola.
- [ ] Practiqué `git diff` y `git diff --staged` y sé cuál mira el taller y cuál la bandeja.
- [ ] Practiqué `restore` y `restore --staged` y sé cuál borra del taller y cuál no.
- [ ] Hay un `amend` o un `revert` en lo que hice hoy (el log lo delata).
- [ ] `git log --oneline --graph --all` muestra una línea con `HEAD -> main`.
- [ ] `git show HEAD` abre el último commit. `q` para salir.
- [ ] `git status` dice *working tree clean*.

**Entrega al aula virtual (si se pide):** pantallazo de `git log --oneline --graph --all`.

Si no alcanzó en clase, **esta guía es la práctica**. Termínela en la misma máquina con la que seguirá el curso.

---

## Errores frecuentes


| Síntoma                             | Qué suele ser                                    | Qué hacer                                                          |
| ----------------------------------- | ------------------------------------------------ | ------------------------------------------------------------------ |
| `git diff` vacío y status en verde  | El cambio ya está en staging                     | `git diff --staged`                                                |
| `nothing added to commit`           | Faltó `git add`                                  | Status, add del archivo, commit                                    |
| `restore` se comió texto bueno      | Descartó trabajo no confirmado                   | El editor a veces tiene Deshacer. Git, no. Status y diff **antes** |
| `amend` no era el commit que quería | Amend solo toca el **último**                    | Si ya no es el último, use `revert`, no amend                      |
| El editor se abre en `revert`       | Faltó `--no-edit` o Git pidió mensaje            | `Esc`, `:wq`, Enter. La próxima: `--no-edit`                       |
| `git show 9f3a21c` falla            | Ese hash es de otra persona o de una diapositiva | `git log --oneline` y copie **su** hash                            |
| `.env` sigue saliendo en status     | `.gitignore` no está o está mal escrito          | `cat .gitignore`. Luego status otra vez                            |
| Una sola línea en el log            | Faltan commits del laboratorio                   | Vuelva a A3–D2. El log con criterio pide varias fotos              |


**Si se pierde:** `pwd` → `ls -la` → `git status`. Antes de deshacer: `git diff`.

---

## Qué no hacer todavía

- No cree cuenta de GitHub ni ejecute `git push`.
- No clone ni haga fork.
- No cree ramas ni haga `merge` (sesión 3).
- No use `git reset --hard`.
- No mezcle bitácora + README + gitignore en un solo commit.

---

## Hoja de comandos (sesión 2)

```bash
git status
git diff
git diff --staged
git add bitacora.md
git commit -m "Agrega bitacora.md"
git restore README.md
git restore --staged README.md
git commit --amend -m "Mensaje correcto"
git revert HEAD --no-edit
git log --oneline
git log -3
git log --oneline -- bitacora.md
git log --oneline --graph --all
git show HEAD
```

---

## Listo

Si `practica-historial` existe, el árbol está limpio y el log tiene varias fotos en **una** línea (`main`), está a la par.

**Lectura opcional:** Pro Git en español, capítulo 2  
[https://git-scm.com/book/es/v2/Fundamentos-de-Git-Registrando-cambios-en-el-repositorio](https://git-scm.com/book/es/v2/Fundamentos-de-Git-Registrando-cambios-en-el-repositorio)

Traiga una duda **escrita** sobre *un* comando de hoy.