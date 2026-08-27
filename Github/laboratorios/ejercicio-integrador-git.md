# Ejercicio Integrador: Repaso General De Git

## Objetivo

Repasar en un solo ejercicio los temas principales de Git local:

- repositorio local,
- `status`, `add`, `commit`,
- `diff`,
- `.gitignore`,
- ramas,
- `merge`,
- conflicto,
- `restore`,
- `amend`,
- `rebase`,
- lectura del historial.

## Escenario

Construiremos un mini perfil web en archivos simples. La idea no es hacer una web perfecta, sino practicar el flujo completo de Git.

## 1. Crear El Proyecto

```bash
mkdir repaso-git
cd repaso-git
git init -b main
```

Archivos iniciales:

```bash
echo "# Perfil Web" > README.md
echo "<h1>Mi Perfil</h1>" > index.html
git status
git add .
git commit -m "Crea estructura inicial"
```

Explicacion:

- `git status` muestra que archivos cambiaron.
- `git add .` prepara cambios.
- `git commit` guarda una version del proyecto.

## 2. Revisar Cambios Antes Del Commit

```bash
echo "<p>Estudiante OTI</p>" >> index.html
git status
git diff
git add index.html
git commit -m "Agrega descripcion inicial"
```

Explicacion:

- `git diff` permite revisar antes de confirmar.
- Es una buena practica antes de cada commit.

## 3. Ignorar Archivos Locales

```bash
echo "TOKEN=123456" > .env
echo ".env" > .gitignore
git status
git add .gitignore
git commit -m "Ignora variables locales"
```

Explicacion:

- `.env` simula un archivo sensible.
- `.gitignore` evita subirlo al repositorio.
- No se suben claves, tokens ni contrasenas.

## 4. Crear Una Rama Para Contacto

```bash
git switch -c feature-contacto
echo "<p>Contacto: correo@uni.edu.pe</p>" >> index.html
git add index.html
git commit -m "Agrega contacto"
```

Explicacion:

- Una rama permite trabajar sin tocar directamente `main`.
- La funcionalidad queda aislada hasta integrarla.

## 5. Main Avanza En Paralelo

```bash
git switch main
echo "<p>Bienvenido a mi portafolio</p>" >> index.html
git add index.html
git commit -m "Agrega bienvenida"
```

Ahora:

- `feature-contacto` tiene contacto.
- `main` tiene bienvenida.

## 6. Integrar Con Merge

```bash
git merge feature-contacto
git log --oneline --graph --all --decorate
```

Explicacion:

- `merge` trae cambios de otra rama hacia la rama actual.
- Si Git puede combinar automaticamente, no hay conflicto.

## 7. Crear Y Resolver Un Conflicto

Creamos una rama que cambia el titulo:

```bash
git switch -c feature-titulo
echo "<h1>Perfil Profesional</h1>" > index.html
git add index.html
git commit -m "Actualiza titulo profesional"
```

En `main`, cambiamos la misma linea de otra forma:

```bash
git switch main
echo "<h1>Portafolio Personal</h1>" > index.html
git add index.html
git commit -m "Actualiza titulo principal"
```

Intentamos integrar:

```bash
git merge feature-titulo
```

Resolvemos el conflicto con una version final:

```bash
echo "<h1>Portafolio Profesional</h1>" > index.html
git add index.html
git commit -m "Resuelve conflicto de titulo"
```

Explicacion:

- El conflicto aparece porque dos ramas tocaron la misma linea.
- La persona decide el resultado final.
- `git add` marca el archivo como resuelto.

## 8. Corregir El Ultimo Commit Con Amend

```bash
echo "<p>Git, Linux y DevOps</p>" >> index.html
git add index.html
git commit -m "Agrega skills"
git commit --amend -m "Agrega habilidades tecnicas"
```

Explicacion:

- `amend` corrige el ultimo commit.
- Usalo solo si ese commit todavia no fue compartido.

## 9. Descartar Un Cambio No Confirmado

```bash
echo "linea mala" >> index.html
git status
git diff
git restore index.html
git status
```

Explicacion:

- `git restore archivo` descarta cambios no confirmados.
- Antes de usarlo, revisa con `git diff`.

## 10. Rebase Para Actualizar Una Rama

Creamos una rama para mejorar el README:

```bash
git switch -c feature-readme
echo "## Objetivo" >> README.md
git add README.md
git commit -m "Agrega objetivo al README"
```

Mientras tanto, `main` avanza:

```bash
git switch main
echo "## Uso" >> README.md
git add README.md
git commit -m "Agrega uso al README"
```

Actualizamos la rama con `rebase`:

```bash
git switch feature-readme
git rebase main
```

Si aparece conflicto, deja ambas secciones en `README.md`:

```text
# Perfil Web
## Uso
## Objetivo
```

Luego:

```bash
git add README.md
git rebase --continue
git switch main
git merge feature-readme
```

Explicacion:

- `rebase` recoloca los commits de la rama encima del `main` actualizado.
- Sirve para limpiar o actualizar una rama personal antes de integrarla.
- No se debe usar sobre commits ya compartidos con otras personas.

## 11. Cierre Visual

```bash
git log --oneline --graph --all --decorate
git status
```

Preguntas finales:

- Que diferencia hay entre working directory, staging y commit?
- Para que sirve `.gitignore`?
- Cuando conviene crear una rama?
- Que hace `merge`?
- Que hace `rebase`?
- Que comando muestra cambios antes de confirmar?
- Que comando descarta cambios no confirmados?

