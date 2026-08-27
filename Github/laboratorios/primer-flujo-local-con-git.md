# Laboratorio: Primer Flujo Local Con Git

## Objetivo

Practicar el ciclo basico de Git:

```
modificar -> preparar -> confirmar -> revisar
```

## Requisitos

- Git instalado (`git --version`).
- Terminal abierta.
- Configuracion basica (`user.name` y `user.email`).

## Pasos

### 1. Crear Una Carpeta De Trabajo

```bash
mkdir laboratorio-git
cd laboratorio-git
```

### 2. Inicializar Git

```bash
git init
```

Verifica con:

```bash
git status
```

### 3. Crear Un Archivo README

```bash
touch README.md
```

Agrega contenido:

```bash
echo "# Mi Primer Repositorio" >> README.md
```

### 4. Revisar Estado

```bash
git status
```

Deberias ver `README.md` en rojo (modificado, no preparado).

### 5. Preparar El Archivo

```bash
git add README.md
```

Verifica:

```bash
git status
```

Ahora `README.md` debe estar en verde (preparado).

### 6. Crear El Primer Commit

```bash
git commit -m "Agrega README inicial"
```

Verifica:

```bash
git status
git log --oneline
```

### 7. Modificar El Archivo

```bash
echo "Este es mi primer repositorio con Git." >> README.md
```

Revisa:

```bash
git status
```

### 8. Preparar Y Confirmar

```bash
git add .
git commit -m "Agrega descripcion al README"
```

Verifica:

```bash
git log --oneline
```

### 9. Deshacer Un Cambio

Crea un archivo de prueba:

```bash
touch temporal.txt
echo "contenido temporal" >> temporal.txt
```

Preparalo por error:

```bash
git add temporal.txt
git status
```

Quitalo del staging:

```bash
git restore --staged temporal.txt
git status
```

Descarta el cambio:

```bash
git restore temporal.txt
```

### 10. Crear Un `.gitignore`

```bash
touch .gitignore
echo "*.tmp" >> .gitignore
echo "*.log" >> .gitignore
```

Crea archivos que deben ser ignorados:

```bash
touch prueba.tmp
touch prueba.log
```

Verifica que no aparecen:

```bash
git status
```

### 11. Commit Final

```bash
git add .gitignore
git commit -m "Agrega gitignore para archivos temporales"
```

### 12. Verificacion Final

```bash
git status
git log --oneline
```

El repositorio debe estar limpio y con al menos 3 commits.

## Resultado Esperado

Al finalizar, debes tener:

- Un repositorio local funcional.
- Al menos 3 commits con mensajes claros.
- Un `.gitignore` configurado.
- Entendimiento del flujo: modificar, preparar, confirmar.
