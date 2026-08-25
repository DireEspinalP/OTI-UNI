# Laboratorio · 1

**Curso:** Git y GitHub · Control de Versiones Software  
**PIT 2026 · Universidad Nacional de Ingeniería**  


---

## Objetivo

Al terminar debe existir, en **su computadora**, un repositorio local llamado `notas-pit` con:

- al menos **dos commits**;
- un `README.md` con su nombre y la frase *Sesión 1*;
- un `comandos.txt` con tres comandos que aprendió hoy;
- un `git log --oneline` legible (pantallazo para el aula virtual).

Ese repositorio es el que usarán en la sesión 2 (archivo de avance). No lo borre.

---



## Qué se practica


| Oficio                 | Comandos                                                                  |
| ---------------------- | ------------------------------------------------------------------------- |
| Moverse en la terminal | `pwd`, `ls`, `ls -la`, `cd`, `mkdir`, `echo`, `cat`                       |
| Comprobar Git          | `git --version`                                                           |
| Identidad              | `git config --global user.name`, `user.email`, `git config --list`        |
| Flujo local            | `git init`, `git status`, `git add`, `git commit -m`, `git log --oneline` |


Hoy **no** hay GitHub, `push`, ramas, merge ni `reset --hard`.

---



## Requisitos

- Computadora con Windows, macOS o Linux.
- Terminal: **Git Bash** en Windows (recomendado), Terminal en macOS, o shell en Linux.
- Un editor: VS Code, notepad, nano, etc.
- Conexión solo para descargar Git, si aún no lo tiene: [https://git-scm.com/downloads](https://git-scm.com/downloads)

En Windows, después de instalar, **cierre** la terminal vieja y abra Git Bash de nuevo.

---



## Cómo usar esta guía

1. Abra la terminal a pantalla completa.
2. Ejecute **un** bloque, lea la salida, compare con lo esperado.
3. Si algo no cuadra, vaya a [Errores frecuentes](#errores-frecuentes) **antes** de copiar el siguiente comando.
4. Las tres brújulas de hoy: `pwd`, `ls -la`, `git status`.

Convención: el texto después de `$` es lo que usted escribe. No copie el `$`.

---



## Parte A · Orientarse en la terminal

La clase usa comandos de Bash. En PowerShell los nombres cambian (`dir`, `Get-Location`). Si está en Windows y puede, trabaje en Git Bash.

### A1. ¿Dónde estoy?

```bash
pwd
```

**Esperado:** una ruta. En Git Bash de Windows suele parecerse a `/c/Users/SuUsuario`.

### A2. Carpeta del curso

Si puede, evite OneDrive y Descargas (menos sorpresas con archivos ocultos).

```bash
mkdir -p ~/curso-git
cd ~/curso-git
pwd
ls -la
```

**Esperado:** el prompt muestra que está dentro de `curso-git`. `ls -la` lista también archivos ocultos (los que empiezan por `.`).


| Comando        | Para qué                              |
| -------------- | ------------------------------------- |
| `pwd`          | Print working directory: dónde estoy. |
| `ls`           | Qué hay aquí.                         |
| `ls -la`       | Igual, con ocultos y detalle.         |
| `cd carpeta`   | Entrar.                               |
| `cd ..`        | Subir un nivel.                       |
| `mkdir nombre` | Crear carpeta.                        |
| `echo "texto"` | Escribir una línea.                   |
| `cat archivo`  | Ver contenido.                        |
| `clear`        | Limpiar pantalla.                     |


En Windows con Git Bash, `~` es su usuario (`C:/Users/SuUsuario`).  
`touch archivo.txt` crea un archivo vacío; en PowerShell el equivalente habitual es `ni archivo.txt`.

---



## Parte B · Git instalado e identidad



### B1. ¿Ya tengo Git?

```bash
git --version
```

**Esperado:** algo como `git version 2.xx.x`.

Si dice *no se reconoce el comando* o *command not found*:

1. Instale desde [git-scm.com/downloads](https://git-scm.com/downloads).
2. Windows: en el asistente, Git Bash; rama por defecto `main` si la pregunta.
3. Cierre la terminal. Abra una **nueva**.
4. Otra vez: `git --version`.



### B2. Nombre y correo (no es la cuenta de GitHub)

Git **firma** cada commit con estos datos. Es identidad local. GitHub es sesión 4.

```bash
git config --global user.name "Su Nombre"
git config --global user.email "su.correo@ejemplo.com"
```

Use su nombre real (o el que quiera ver en el historial) y un correo que recuerde.

### B3. Tres ajustes que evitan dolores de cabeza

```bash
git config --global init.defaultBranch main
git config --global color.ui auto
```

Editor (elija **una** línea, la de su máquina):

```bash
git config --global core.editor "code --wait"
```

Si no tiene VS Code: en Windows `notepad`; en macOS/Linux `nano`.

### B4. Comprobar

```bash
git config --list
git config user.name
git config user.email
```

**Esperado:** aparecen *su* nombre y *su* correo, no los del instructor.

`--global` vale para todos los repositorios de este usuario en esta máquina. Si un dato no cuadra, pregúntese: ¿lo configuró en global o solo dentro de un repo?

---



## Parte C · Laboratorio de clase: `notas-pit`

Esta es la práctica que está en las diapositivas. Hágala **ahora**, aunque la clase ya haya pasado de esa diapositiva.

### C1. Crear el repositorio

Desde `~/curso-git` (compruebe con `pwd`):

```bash
mkdir notas-pit
cd notas-pit
git init
ls -la
```

**Esperado:**

- Un mensaje del estilo `Initialized empty Git repository in .../notas-pit/.git/`.
- `ls -la` muestra la carpeta oculta `.git`.

**No borre** `.git`. Ahí vive la historia.  
**No** ejecute `git init` en `C:\` ni en `/home`. Inicialice *dentro* del proyecto.

### C2. Brújula: `git status`

```bash
git status
```

**Esperado:** rama `main` (o `master` en Git antiguo), *No commits yet*, working tree limpio o archivos sin seguimiento.

Antes de cualquier comando que no entienda: `git status`.

### C3. Primer archivo y primer commit

Cree `README.md` (editor o terminal):

```bash
echo "# Notas PIT 2026" > README.md
echo "Nombre: Su Nombre" >> README.md
echo "Sesion 1" >> README.md
cat README.md
git status
```

**Esperado:** `README.md` aparece como *untracked* (sin seguimiento). Git lo vio; todavía no lo cuida.

```bash
git add README.md
git status
```

**Esperado:** `README.md` *staged* / *to be committed* (preparado). Si hay color, suele verse en verde.

```bash
git commit -m "Agrega README de notas del curso"
git status
```

**Esperado:** `nothing to commit, working tree clean`. Ya hay una foto en la historia.

Mensaje en **imperativo**: *Agrega*, *Corrige*, *Actualiza*. Evite `asdf`, `fix`, `cambios`, `wip`.

### C4. Segundo archivo y segundo commit

```bash
echo "pwd" > comandos.txt
echo "git status" >> comandos.txt
echo "git log --oneline" >> comandos.txt
cat comandos.txt
git status
git add comandos.txt
git commit -m "Agrega lista personal de comandos"
```

Puede poner otros tres comandos de hoy. Lo importante: **un commit = un cambio lógico**. No mezcle el README y la lista en el mismo commit si los está creando por separado, como en clase.

### C5. Leer el historial

```bash
git log
git log --oneline
```

**Esperado (ejemplo; los hashes serán distintos):**

```text
c7d8e9f Agrega lista personal de comandos
a1b2c3d Agrega README de notas del curso
```

Debe ver **su** nombre, la fecha y dos mensajes claros.  
`git log` completo se sale con `q` si se abre el visor (`less`).

---



## Parte D · Verificación y entrega

El laboratorio está completo si puede responder **sí** a todo:

- [ ] `git --version` muestra un número.
- [ ] `git config user.name` y `user.email` son los míos.
- [ ] Estoy dentro de `notas-pit` (`pwd`).
- [ ] Existe `.git` (`ls -la`).
- [ ] Existen `README.md` (con mi nombre y *Sesión 1*) y `comandos.txt`.
- [ ] `git log --oneline` muestra **al menos dos** commits.
- [ ] `git status` dice *working tree clean*.

**Entrega al aula virtual:** pantallazo de `git log --oneline` (se debe leer su nombre en el log completo, o al menos los dos mensajes).

Si no alcanzó en los 20 minutos de clase, **esta guía es la tarea**. Termínela esta noche en la misma máquina con la que seguirá el curso.

---



## Errores frecuentes


| Sintoma                                  | Qué suele ser                       | Qué hacer                                                                         |
| ---------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------- |
| `nothing added to commit`                | Faltó `git add`                     | `git status`, luego `git add` del archivo, luego commit                           |
| `command not found` / no se reconoce Git | No está instalado o terminal vieja  | Instale, cierre y abra Git Bash                                                   |
| El editor se abre y no sabe salir        | `git commit` sin `-m` (a veces Vim) | `Esc`, luego `:q` y Enter. La próxima, use `-m "mensaje"`                         |
| Nombre o correo en blanco                | No configuró identidad              | Parte B2 otra vez                                                                 |
| No ve `.git`                             | Archivos ocultos                    | `ls -la`. En el Explorador de Windows: ver elementos ocultos                      |
| Inicializó en la carpeta equivocada      | `git init` demasiado arriba         | `pwd`. Si **aún no** hay commits valiosos, se puede borrar esa `.git` con cuidado |
| `git diff` no lo pedimos hoy             | Adelantó material                   | En la sesión 1 basta status, add, commit, log                                     |


**Si se pierde:** `pwd` → `ls -la` → `git status`. Esos tres resuelven la mayoría de los sustos de hoy.

---



## Qué no hacer todavía

- No cree cuenta de GitHub ni ejecute `git push`.
- No clone ni haga fork.
- No cree ramas ni resuelva conflictos.
- No use `git reset --hard` ni borre archivos a ciegas.
- No inicialice Git en el disco entero.

`.gitignore` se mencionó en clase como extra: **saber que existe** basta. En la sesión 2 lo practican; en la 4 lo usan al publicar. No hace falta para aprobar este laboratorio.

---



## Hoja de comandos (sesión 1)

```bash
pwd
ls -la
cd carpeta
mkdir notas-pit

git --version
git config --global user.name "Su Nombre"
git config --global user.email "su.correo@ejemplo.com"
git config --list

git init
git status
git add README.md
git add .
git commit -m "Agrega README de notas del curso"
git log
git log --oneline
```

---



## Listo para la sesión 2

Si `notas-pit` existe y el log tiene dos commits, está a la par con la clase.

La próxima sesión parte de **este** repositorio: van a leer diferencias (`git diff`), explorar el historial con criterio y crear el **archivo de avance** (`avance.md`). No hace falta adelantar eso hoy.

**Lectura opcional:** Pro Git en español, capítulo 1  
[https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Acerca-del-Control-de-Versiones](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Acerca-del-Control-de-Versiones)

Traiga una duda **escrita** (un comando, un mensaje de error). Eso adelanta más que un «no me funciona» suelto.