# Laboratorio: Merge Vs Rebase Corto

## Objetivo

Comparar `merge` y `rebase` con un ejemplo corto y facil de visualizar con:

```bash
git log --oneline --graph --all --decorate
```

## Idea Principal

- `merge` une caminos y conserva la forma real del trabajo paralelo.
- `rebase` recoloca tus commits encima de la version mas reciente de otra rama.

## Parte A: Integrar Con Merge

### 1. Crear Proyecto Base

```bash
mkdir demo-merge-vs-rebase
cd demo-merge-vs-rebase
git init -b main

echo "version 1" > app.txt
git add app.txt
git commit -m "Base"
```

Tenemos un primer commit en `main`.

### 2. Crear Una Rama Feature

```bash
git switch -c feature
echo "funcion login" >> app.txt
git add app.txt
git commit -m "Agrega login"
```

La rama `feature` avanzo con un cambio.

### 3. Main Avanza Por Otro Lado

```bash
git switch main
echo "hotfix seguridad" >> app.txt
git add app.txt
git commit -m "Agrega hotfix"
```

Ahora hay trabajo paralelo:

- `main` tiene un hotfix.
- `feature` tiene login.

### 4. Integrar Con Merge

```bash
git merge feature
git log --oneline --graph --all --decorate
```

Si aparece conflicto, resuelve dejando ambas lineas:

```text
version 1
hotfix seguridad
funcion login
```

Luego:

```bash
git add app.txt
git commit -m "Integra login con hotfix"
```

Explicacion:

- `merge` conserva que hubo dos caminos.
- El historial muestra la union de las ramas.
- Es buena opcion para integrar trabajo compartido.

## Parte B: Integrar Con Rebase

Para verlo limpio, usa una segunda carpeta.

### 1. Crear El Mismo Escenario

```bash
cd ..
mkdir demo-rebase-lineal
cd demo-rebase-lineal
git init -b main

echo "version 1" > app.txt
git add app.txt
git commit -m "Base"

git switch -c feature
echo "funcion login" >> app.txt
git add app.txt
git commit -m "Agrega login"

git switch main
echo "hotfix seguridad" >> app.txt
git add app.txt
git commit -m "Agrega hotfix"
```

Tenemos la misma situacion: `main` avanzo y `feature` quedo atrasada.

### 2. Recolocar Feature Encima De Main

```bash
git switch feature
git rebase main
```

Si aparece conflicto, resuelve dejando ambas lineas:

```text
version 1
hotfix seguridad
funcion login
```

Luego:

```bash
git add app.txt
git rebase --continue
```

### 3. Integrar A Main

```bash
git switch main
git merge feature
git log --oneline --graph --all --decorate
```

Explicacion:

- `rebase` toma el commit de `feature` y lo pone encima del ultimo commit de `main`.
- El historial queda mas lineal.
- El merge final suele ser fast-forward.

## Regla Practica

Usa `merge` cuando quieres conservar la historia real o integrar trabajo compartido.

Usa `rebase` cuando tu rama es local o personal y quieres actualizarla antes de integrarla.

No hagas `rebase` sobre commits que otras personas ya tienen.

