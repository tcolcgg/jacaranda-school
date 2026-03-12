# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos de desarrollo

```bash
pnpm dev        # Servidor de desarrollo en localhost:3000
pnpm build      # Compilar para producción
pnpm start      # Servidor de producción
pnpm lint       # Ejecutar ESLint
```

No hay tests configurados. El gestor de paquetes es **pnpm**.

## Arquitectura

Aplicación web educativa para la clase de 3º de Infantil del Colegio Jacaranda. Stack: Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + Framer Motion.

### Flujo de navegación

La app tiene dos modos: una pantalla de bienvenida (`LandingPage`) y la app principal con 5 secciones (`WeatherAdvisor`, `EncargadoPicker`, `BirthdayBoard`, `Riddles`, `OurClass`). La navegación entre secciones se gestiona con estado local en el componente raíz (`app/page.tsx`).

### Sistema de estaciones (tema global)

`lib/context/SeasonContext.tsx` provee el contexto global más importante. Detecta la estación automáticamente por fecha, persiste en `sessionStorage`, y expone una paleta de colores que se inyecta como variables CSS. Todos los componentes usan estos colores para la tematización dinámica. Las paletas están definidas en `lib/constants/seasons.ts`.

### Datos de la aplicación

Todos los datos estáticos están en `lib/constants/`:
- `students.ts` — 27 estudiantes con sus cumpleaños
- `seasons.ts` — 4 estaciones con paletas de color y descripciones
- `weather.ts` — 4 tipos de clima con consejos
- `riddles.ts` — banco de adivinanzas
- `teacher.ts` — datos de la profesora Patricia

### Encargado del día

`hooks/use-encargado.ts` implementa la lógica más compleja: selección aleatoria sin repetición con persistencia en `localStorage`, animación de "spinning" de 2 segundos, y reset automático del ciclo cuando todos los estudiantes han sido encargados.

### Componentes UI

Los componentes base de shadcn/ui están en `components/ui/` (no modificar directamente). Los componentes de la aplicación están en `components/jacaranda/`. Todos son `'use client'`.

El alias `@/*` apunta a la raíz del proyecto (configurado en `tsconfig.json`).
