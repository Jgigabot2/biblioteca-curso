# Contrato de la API · Biblioteca del Curso

Este archivo es el acuerdo entre los tres equipos. **Frontend** lo consume, **backend** lo cumple y **testing** lo verifica.
Nadie lo cambia por su cuenta: cualquier cambio entra por un Pull Request que aprueban los tres líderes.

Versión del contrato: **1.0**

## Libro

```json
{ "id": 2, "titulo": "Clean Code", "autor": "Robert C. Martin", "anio": 2008, "disponible": true }
```

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | número | Identificador único |
| `titulo` | texto | Título del libro |
| `autor` | texto | Autor o autores |
| `anio` | número | Año de publicación |
| `disponible` | booleano | `true` si se puede prestar |

## Préstamo

```json
{ "id": 1, "libroId": 2, "estudiante": "Laura Gómez", "fecha": "2026-10-20T15:30:00.000Z" }
```

## Rutas

| Método | Ruta | Respuesta correcta | Errores |
|---|---|---|---|
| GET | `/api/salud` | `200` `{ "estado": "ok" }` | — |
| GET | `/api/libros` | `200` lista de libros | — |
| GET | `/api/libros/:id` | `200` un libro | `404` `{ "error": "Libro no encontrado" }` |
| POST | `/api/prestamos` | `201` el préstamo creado; el libro pasa a `disponible: false` | `400` faltan datos · `404` el libro no existe · `409` el libro ya está prestado |
| GET | `/api/prestamos` | `200` lista de préstamos | — |

### POST /api/prestamos

Cuerpo que envía el frontend:

```json
{ "libroId": 2, "estudiante": "Laura Gómez" }
```

Todos los errores responden un JSON con la forma `{ "error": "mensaje para mostrar al usuario" }`.
