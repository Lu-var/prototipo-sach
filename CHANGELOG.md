# Changelog

Aqui se documentan todos los cambios relevantes al prototipo.
Se aplica Versionamiento Semántico (MAJOR.MINOR.PATCH).

---

## [v0.4.0] — 2026-06-25

### Agregado
- Prompt original de generación añadido como comentario en `ontourprototype.tsx` como referencia de código fuente.
- `docs/Casos_de_Pruebas_Funcionario.xlsx`: casos de prueba específicos para el rol Funcionario.
- `.gitignore` para excluir archivos del sistema operativo y dependencias locales.

---

## [v0.3.0] — 2026-06-23

### Agregado
- `prototipo.html`: prototipo funcional completo, vista Funcionario, vanilla HTML/CSS/JS.
  - Dashboard de trámites con filtros por nombre/RUT y por estado.
  - Pantalla de escaneo QR con redirección al detalle o mensaje de error.
  - Vista de detalle: datos del viajero, documentos, declaración SAG, vehículo, QR simulado.
  - Controles SAG/PDI independientes por trámite.
  - Acciones Aprobar/Rechazar con historial y timestamp.
- `prototipo-aduanas.tsx`: código fuente React/TypeScript equivalente del prototipo.
- `docs/3.3.4 Casos+de+Pruebas+Ejemplo.xlsx`: planilla de casos de prueba de ejemplo del curso.

---

## [v0.2.0] — 2026-06-23

### Agregado
- `docs/PLAN_MVP.md`: plan de transformación de OnTour a prototipo aduanero.

### Planificado
- `ontourprototype.tsx`: identificado como base de partida, se definió plan de transformación al dominio aduanero chileno.

---

## [v0.1.0] — 2026-06-23

### Agregado
- Estructura inicial del repositorio.
- `informe/Informe 1 ERS Valderrama-Vargas-Valencia.docx`: especificación de requisitos (IEEE 830).
- `ontourprototype.tsx`: prototipo inicial del proyecto OnTour, incorporado como punto de partida del caso semestral.
