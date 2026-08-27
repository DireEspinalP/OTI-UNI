# Laboratorio: Merge Con Conflicto Corto

## Objetivo

Practicar `git merge` con un conflicto pequeno, claro y enfocado en una misma linea de archivo.

La idea es que dos ramas cambien la misma linea de un archivo. Git no puede decidir por nosotros, asi que debemos resolver manualmente.

## Escenario

Tenemos un archivo `web.txt` con un mensaje de bienvenida. Una rama lo mejora desde el lado comercial y `main` lo mejora desde el lado institucional.

## 1. Crear El Proyecto

```bash
mkdir demo-merge
cd demo-merge
git init -b main
```

Creamos el primer archivo:

```bash
echo "Bienvenido al curso Git" > web.txt
git add web.txt
git commit -m "Mensaje inicial"
```

Que acaba de pasar:

- `web.txt` existe en la rama `main`.
- El primer commit es la base comun del trabajo.
- Desde este punto pueden nacer ramas.

## 2. Crear Una Rama De Marketing

```bash
git switch -c marketing
echo "Bienvenido al curso Git y GitHub desde cero" > web.txt
git add web.txt
git commit -m "Mejora mensaje comercial"
```

Que explica esta parte:

- `marketing` es una linea de trabajo separada.
- Cambiamos la misma linea del archivo.
- `main` todavia no sabe nada de este cambio.

## 3. Cambiar La Misma Linea En Main

```bash
git switch main
echo "Bienvenido al curso profesional de Git" > web.txt
git add web.txt
git commit -m "Mejora mensaje institucional"
```

Ahora hay dos versiones distintas de `web.txt`:

- `main`: mensaje institucional.
- `marketing`: mensaje comercial.

## 4. Intentar Fusionar

```bash
git merge marketing
```

Git detendra el merge porque ambas ramas modificaron la misma linea.

Revisa el archivo:

```bash
cat web.txt
```

Veras marcas parecidas a:

```text
<<<<<<< HEAD
Bienvenido al curso profesional de Git
=======
Bienvenido al curso Git y GitHub desde cero
>>>>>>> marketing
```

Como leerlo:

- `HEAD`: lo que tiene la rama actual, en este caso `main`.
- `=======`: separador entre las dos versiones.
- `marketing`: lo que viene desde la rama que estamos fusionando.

## 5. Resolver El Conflicto

Elegimos una frase que combine ambas ideas:

```bash
echo "Bienvenido al curso profesional de Git y GitHub desde cero" > web.txt
git add web.txt
git commit -m "Combina mensaje comercial e institucional"
```

En un conflicto, `git add` significa:

> Ya resolvi este archivo. Git puede continuar.

## 6. Ver El Resultado

```bash
git log --oneline --graph --all --decorate
git status
```

Lo importante:

- `merge` une dos lineas de trabajo.
- Un conflicto no es un error: es una decision pendiente.
- El commit final representa la integracion de ambas ideas.

