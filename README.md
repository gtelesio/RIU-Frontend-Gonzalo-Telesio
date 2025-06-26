# SuperHeroesApp

Este proyecto está construido siguiendo una **arquitectura limpia (DDD)**, separando claramente las capas de dominio, infraestructura, presentación y aplicación. Esto facilita la escalabilidad, el testing y el mantenimiento del código.

- **Biome** se utiliza para el formateo y linting automático del código fuente, asegurando calidad y consistencia en el estilo.
- El proyecto incluye **tests unitarios** y está preparado para ejecutarse en pipelines de **CI/CD**.

## Inicio rápido con Docker

1. **Construir y correr la app en Docker:**

```bash
yarn docker:up
```

Esto construirá la imagen y levantará un contenedor en el puerto 80 (puedes acceder a la app en http://localhost).

2. **(Opcional) Limpiar dependencias y reconstruir:**

```bash
rm -rf node_modules yarn.lock
yarn install
```

## Comandos útiles

- `yarn build` — Compila la aplicación Angular para producción.
- `yarn test` — Ejecuta los tests unitarios.
- `yarn coverage` — Ejecuta los tests y muestra el reporte de cobertura.
- `yarn biome` — Ejecuta el linter y formateador Biome sobre el código fuente.

## Estructura del repositorio

- `src/domain` — Modelos y servicios de dominio (reglas de negocio, entidades).
- `src/data` — Repositorios y adaptadores de datos.
- `src/infrastructure` — Implementaciones técnicas (APIs, mappers, mock services).
- `src/presentation` — Componentes, páginas y estado de la UI.
- `src/shared` — Utilidades, directivas, componentes y pipes reutilizables.

## CI/CD

El proyecto está preparado para integrarse en pipelines de CI/CD, ejecutando tests y chequeos de calidad automáticamente en cada push.

---

Para dudas o mejoras, ¡abre un issue o PR!

## Development server

To start a local development server, run:

```bash
yarn start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.