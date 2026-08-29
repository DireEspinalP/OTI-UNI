# Laboratorio · 3

**Curso:** Git y GitHub · Control de Versiones Software  
**PIT 2026 · Universidad Nacional de Ingeniería**  
**Instructor:** Luis Rojas  

---

## Objetivo

Al terminar debe existir, en **su computadora**, un repositorio local llamado `receta-limonada` con:

- un `README.md` (porciones);
- un `receta.md` **completo** (ingredientes, pasos, variación de menta y hielo);
- ramas usadas en clase: `agregar-menta`, `cambia-porciones`, `agrega-hielo`, `menos-azucar`, `mas-azucar` (algunas ya pueden estar fusionadas y borradas);
- al menos un **merge limpio** y un **conflicto resuelto** (sin marcadores `<<<<<<<` en el archivo);
- `git log --oneline --graph --all` con un dibujo que **se parte** (no una sola línea recta);
- `git status` limpio: *working tree clean* (el **directorio de trabajo** está limpio, en el lenguaje de Pro Git).

Ese repositorio puede subir a GitHub en la sesión 4. No lo borre.

---



## Qué se practica


| Oficio                        | Comandos                                              |
| ----------------------------- | ----------------------------------------------------- |
| Crear archivos en la terminal | `cat > archivo << 'EOF'` … `EOF`                      |
| Añadir al final               | `cat >> archivo << 'EOF'` … `EOF`                     |
| Crear y cambiar rama          | `git branch`, `git switch -c`, `git switch main`      |
| Ver todas las líneas          | `git log --oneline --graph --all`                     |
| Fusionar                      | `git merge --no-edit rama`, `git merge --abort`       |
| Ordenar                       | `git branch -d nombre`                                |
| Conflicto                     | `cat >` del archivo bueno, `git add`, `git commit -m` |


Los tres estados de Pro Git (cap. 1.3): **modificado** (directorio de trabajo), **preparado** (área de preparación), **confirmado** (directorio de Git). `git status` dice en cuál está cada archivo.

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

Si salen vacíos, **escriba** esto (guiones con la tecla de menos):

```bash
git config --global user.name "Su Nombre"
git config --global user.email "su.correo@ejemplo.com"
git config --global init.defaultBranch main
```

- Terminal: **Git Bash**.

---



## Cómo usar esta guía

1. Abra Git Bash a pantalla completa.
2. Copie **un** bloque, péguelo con **clic derecho**, pulse Enter.
3. Copie también la línea `EOF`, sola. Si el prompt `$` no vuelve, escriba `EOF` y Enter.
4. Si algo no cuadra, vaya a [Errores frecuentes](#errores-frecuentes) **antes** del siguiente bloque.
5. Brújulas: `pwd`, `ls -la`, `git status`, `git log --oneline --graph --all`.

El texto de los recuadros es lo que usted pega. No copie el `$` si aparece en otra guía.

Si **ya hizo** los pasos en clase en `receta-limonada`, no los repita: vaya a [Parte F · Verificación](#parte-f--verificación). **No** mezcle comandos de este laboratorio dentro de `practica-historial`.

---



## Parte A · La receta nace (desde cero)



### A1. Carpeta e `init`

```bash
mkdir -p ~/curso-git/sesion-03
cd ~/curso-git/sesion-03
mkdir receta-limonada
cd receta-limonada
pwd
git init
ls -la
git status
```

**Esperado:**

- Está dentro de `receta-limonada`.
- Mensaje del estilo `Initialized empty Git repository`.
- `ls -la` muestra `.git` (el **directorio de Git**).
- `git status`: rama `main` (o `master`), *No commits yet*.

Si dice `master`:

```bash
git branch -M main
```

**No borre** `.git`. **No** ejecute `git init` en `C:\` ni en el home entero.

### A2. Primer commit: `README.md`

`cat >` **crea** (o sobrescribe) el archivo. Pegue el bloque entero:

```bash
cat > README.md << 'EOF'
# Receta de limonada
Version de practica para aprender ramas en Git.
Porciones: 2 vasos
EOF
cat README.md
git add README.md
git commit -m "Agrega README de la receta"
```

**Esperado:** primer commit. Status *clean*. `git add` pasó el archivo del **directorio de trabajo** al **área de preparación**; `commit` lo dejó **confirmado** en el directorio de Git.

### A3. Segundo commit: `receta.md`

```bash
cat > receta.md << 'EOF'
# Limonada

## Ingredientes
- Limones: 4
- Agua: 1 litro
- Azucar: 4 cucharadas

## Pasos
- Exprimir los limones.
- Mezclar con el agua y el azucar.
- Servir fria.
EOF
git add receta.md
git commit -m "Agrega receta base de limonada"
git log --oneline
```

**Esperado:** dos fotos en `main`. Esta es la **receta oficial**.

---



## Parte B · Una rama (variación con menta)



### B1. Crear la rama y cambiarse

```bash
git branch
git switch -c agregar-menta
git branch
git status
```

**Esperado:** asterisco en `agregar-menta`. Status: *On branch agregar-menta*.

El `-c` es *create*. Escríbalo a mano si al pegar el guion se ve raro.

### B2. Añadir al final: `cat >>`

`cat >>` **añade** al final. No borra lo anterior.

```bash
cat >> receta.md << 'EOF'

## Variacion
- Menta: 6 hojas
EOF
git add receta.md
git commit -m "Agrega variacion con menta"
cat >> receta.md << 'EOF'
- Machacarlas ligeramente antes de servir.
EOF
git add receta.md
git commit -m "Anota como servir la menta"
git log --oneline --graph --all
```

**Esperado:** HEAD en `agregar-menta`, **dos** commits en esa rama. `main` se quedó en la foto **sin** menta. El gráfico muestra una línea verde con dos puntas de commit.

### B3. El momento ajá: volver a `main`

```bash
git switch main
git status
cat receta.md
git log --oneline --graph --all
```

**Esperado:**

- *On branch main*.
- `receta.md` **termina en los pasos**. No aparece Variacion.
- El log con `--all` muestra **dos puntas**: `main` (receta base) y `agregar-menta` **dos commits más adelante**.

La menta no se borró. Vive en la otra rama. Git reescribió el **directorio de trabajo** para que coincida con la foto de `main`.

---



## Parte C · Fusionar la variación con la receta oficial



### C1. Merge de `agregar-menta`

Esté en `main` (el destino). Luego traiga el origen:

```bash
git switch main
git merge --no-edit agregar-menta
cat receta.md
git log --oneline --graph --all
```

**Esperado:** `receta.md` **sí** tiene Variacion (las dos frases). Status *clean*. El log muestra `(HEAD -> main, agregar-menta)` en el **mismo** commit: la rama no se borró; Git solo corrió el letrero de `main` hasta el último commit de la variación.

`--no-edit` evita que se abra el editor del mensaje. Si Git dice *Already up to date*, ya había fusionado: no es un error.

### C2. Borrar el letrero (opcional, seguro)

```bash
git branch -d agregar-menta
git branch
```

**Esperado:** `-d` minúscula acepta porque esa rama **ya** está en `main`. Hoy **no** use `-D`.

---



## Parte D · Dos variaciones, merge limpio

Aquí dos personas tocan **archivos distintos**. Git puede juntarlos sin preguntar.

### D1. Rama de las porciones (solo `README.md`)

```bash
git switch -c cambia-porciones
cat > README.md << 'EOF'
# Receta de limonada
Version de practica para aprender ramas en Git.
Porciones: 4 vasos
EOF
git add README.md
git commit -m "Ajusta la receta a 4 porciones"
```



### D2. Rama del hielo (solo `receta.md`)

Vuelva a `main` **antes** de abrir la segunda rama. Si no, la segunda nace encima de la primera y el ejercicio cambia.

```bash
git switch main
git switch -c agrega-hielo
cat >> receta.md << 'EOF'

## Servir
- Hielo: 6 cubos
EOF
git add receta.md
git commit -m "Agrega hielo al servir"
```



### D3. Los dos merges, desde `main`

```bash
git switch main
git merge --no-edit cambia-porciones
git merge --no-edit agrega-hielo
git status
git log --oneline --graph --all
```

**Esperado:** status *clean*. El README dice 4 vasos. `receta.md` tiene hielo. El log **se parte y se junta**. Los hashes de cualquier diapositiva **no** son los suyos.

---



## Parte E · Conflicto (la misma línea de azúcar)

Un conflicto no es que Git se rompió. Es que **la misma línea** tiene dos intenciones y Git no adivina la receta.

### E1. Variación A: menos azúcar

```bash
git switch main
git switch -c menos-azucar
cat > receta.md << 'EOF'
# Limonada

## Ingredientes
- Limones: 4
- Agua: 1 litro
- Azucar: 2 cucharadas

## Pasos
- Exprimir los limones.
- Mezclar con el agua y el azucar.
- Servir fria.

## Variacion
- Menta: 6 hojas
- Machacarlas ligeramente antes de servir.

## Servir
- Hielo: 6 cubos
EOF
git add receta.md
git commit -m "Reduce el azucar a 2 cucharadas"
```



### E2. Variación B: más azúcar (otra vez desde `main`)

La receta oficial **aún** debe decir 4 cucharadas. Por eso vuelven a `main` antes de crear la segunda rama.

```bash
git switch main
git switch -c mas-azucar
cat > receta.md << 'EOF'
# Limonada

## Ingredientes
- Limones: 4
- Agua: 1 litro
- Azucar: 6 cucharadas

## Pasos
- Exprimir los limones.
- Mezclar con el agua y el azucar.
- Servir fria.

## Variacion
- Menta: 6 hojas
- Machacarlas ligeramente antes de servir.

## Servir
- Hielo: 6 cubos
EOF
git add receta.md
git commit -m "Sube el azucar a 6 cucharadas"
```



### E3. El merge que choca

```bash
git switch main
git merge --no-edit menos-azucar
git merge mas-azucar
```

**Esperado:** el segundo merge **no** termina. Status: *unmerged paths* / `receta.md` *both modified*.

No cierre la terminal con pánico. Tiene dos salidas: dejar el archivo bueno, o abortar.

Si se asusta **antes** de confirmar:

```bash
git merge --abort
git status
```

Eso cancela el merge a medias. Las ramas `menos-azucar` y `mas-azucar` **siguen**. Luego puede repetir `git merge mas-azucar`.

### E4. Cómo se ve el archivo

```bash
cat receta.md
```

Verá algo así:

```
<<<<<<< HEAD
- Azucar: 2 cucharadas
=======
- Azucar: 6 cucharadas
>>>>>>> mas-azucar
```

- `<<<<<<< HEAD`: lo que ya estaba en `main` (menos azúcar).
- `=======`: separa las dos propuestas.
- `>>>>>>> mas-azucar`: lo que trae la otra rama.

Esos símbolos **no** son decoración. No los deje en la receta.

### E5. Decidir y confirmar (sin editor)

Borre los marcadores reescribiendo el archivo bueno. En este laboratorio el cocinero elige **4 cucharadas** (la receta original):

```bash
cat > receta.md << 'EOF'
# Limonada

## Ingredientes
- Limones: 4
- Agua: 1 litro
- Azucar: 4 cucharadas

## Pasos
- Exprimir los limones.
- Mezclar con el agua y el azucar.
- Servir fria.

## Variacion
- Menta: 6 hojas
- Machacarlas ligeramente antes de servir.

## Servir
- Hielo: 6 cubos
EOF
git add receta.md
git status
git commit -m "Resuelve conflicto de la cantidad de azucar"
git log --oneline --graph --all
git status
```

**Esperado:** *working tree clean*. El log muestra un commit de resolución. El conflicto no se esconde: queda documentado.

Opcional, si esas ramas ya están fusionadas:

```bash
git branch -d menos-azucar
git branch -d mas-azucar
git branch -d cambia-porciones
git branch -d agrega-hielo
```

Si `-d` se niega, esa rama **no** está contenida en `main`. No use `-D`.

---



## Parte F · Verificación

El laboratorio está completo si puede responder **sí** a todo:

- [ ] Estoy dentro de `receta-limonada` (`pwd`). Existe `.git`. **No** estoy en `practica-historial`.
- [ ] `README.md` y `receta.md` se crearon con `cat` en Git Bash. Hay menta y hielo en la receta.
- [ ] Sé los tres nombres de Pro Git: directorio de trabajo, área de preparación, directorio de Git.
- [ ] Sé explicar: `main` es la receta oficial; una rama es una variación (un letrero, no una carpeta extra).
- [ ] Al hacer `git switch` entre ramas **antes** del merge, `cat receta.md` cambió de contenido.
- [ ] Fusioné `agregar-menta` (o equivalente) en `main`.
- [ ] Hice un merge limpio de archivos distintos (porciones + hielo).
- [ ] Resolví el conflicto del azúcar: **cero** marcadores `<<<<<<<` en `receta.md`.
- [ ] `git log --oneline --graph --all` se parte (hay tenedor), no es una sola línea.
- [ ] `git status` dice *working tree clean*.

**Entrega al aula virtual (si se pide):** pantallazo de `git log --oneline --graph --all`.

Si no alcanzó en clase, **esta guía es la práctica**. Termínela en la misma máquina con la que seguirá el curso.

---



## Errores frecuentes


| Síntoma                                                          | Qué suele ser                                                       | Qué hacer                                                     |
| ---------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------- |
| El prompt no vuelve después de `cat`                             | Faltó la línea `EOF`                                                | Escriba `EOF` y Enter                                         |
| `receta.md` aún tiene menta en `main` antes del merge            | Está en `agregar-menta`, no en `main`                               | `git status`. `git switch main`. `cat receta.md`              |
| Git se niega a `switch`                                          | Directorio de trabajo sucio (modificado, sin confirmar)             | Status. `add` + `commit`, o `restore` si esa línea no sirve   |
| `error: pathspec` / flag rara / `key does not contain a section` | Pegó guiones tipográficos desde el PDF                              | Escriba el comando a mano, tecla de menos                     |
| Merge hecho **dentro** de `menos-azucar`                         | Destino equivocado                                                  | Status. `switch main`. Merge se hace **parado en el destino** |
| Conflicto que no aparece                                         | Cambió líneas distintas, o no volvió a `main` antes de `mas-azucar` | `mas-azucar` debe nacer desde `main` con azúcar a 4           |
| Confirmó con `<<<<<<<` en el archivo                             | Dejó los marcadores                                                 | `cat > receta.md` con el archivo bueno, `add`, commit         |
| `git merge` abre vim                                             | Faltó `--no-edit`                                                   | `Esc`, `:wq`, Enter. La próxima: `--no-edit`                  |
| Una sola línea en el graph                                       | Falta `--all`, o faltan merges                                      | `git log --oneline --graph --all`. Vuelva a C y D             |
| `branch -d` se niega                                             | Esa rama no está fusionada en la actual                             | No use `-D`. Merge primero, o déjela                          |


**Si se pierde:** `pwd` → `ls -la` → `git status` → `git log --oneline --graph --all`.

---



## Qué no hacer todavía

- No cree cuenta de GitHub ni ejecute `git push`.
- No clone ni haga fork ni Pull Request.
- No use `git rebase`, `git stash`, `git cherry-pick` ni `git reset --hard`.
- No borre `main` ni use `git branch -D`.
- No mezcle este laboratorio dentro de `practica-historial` ni de `mi-primer-repo`.

---



## Hoja de comandos (sesión 3)

```bash
git status
git branch
git switch -c agregar-menta
git switch main
git log --oneline --graph --all
git merge --no-edit agregar-menta
git merge --abort
git branch -d agregar-menta
cat > receta.md << 'EOF'
# Limonada
EOF
git add receta.md
git commit -m "Resuelve conflicto de la cantidad de azucar"
```

---



## Listo

Si `receta-limonada` existe, el directorio de trabajo está limpio, `receta.md` no tiene marcadores de conflicto y el log **se parte**, está a la par.

**Lectura opcional:** Pro Git en español, capítulo 1.3 (tres estados) y capítulo 3 (ramas)  
[https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Fundamentos-de-Git](https://git-scm.com/book/es/v2/Inicio---Sobre-el-Control-de-Versiones-Fundamentos-de-Git)  
[https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Lo-básico-de-las-ramas-y-fusiones](https://git-scm.com/book/es/v2/Ramificaciones-en-Git-Lo-básico-de-las-ramas-y-fusiones)

Traiga una duda **escrita** sobre *un* merge o *un* conflicto de hoy.