# Changelog

Aqui se documentan todos los cambios relevantes al prototipo.
Se aplica Versionamiento Semántico (MAJOR.MINOR.PATCH).

---

## [v0.5.0] — 2026-06-25

### Corregido
- `prototipo.html`: corregido comportamiento inconsistente del sistema de aprobación de trámites.
  - Los botones "Aprobar Trámite" y "Rechazar Trámite" ahora actúan como atajos que establecen ambos controles (SAG y PDI) al resultado elegido, en lugar de escribir directamente sobre el estado del trámite.
  - Eliminado el bloqueo permanente de los botones: ya no quedan deshabilitados de forma irreversible tras una aprobación o rechazo.
  - El estado del trámite ahora se deriva exclusivamente del estado de los controles SAG/PDI (fuente única de verdad), cubriendo los cuatro casos posibles: `pendiente`, `en_revision`, `aprobado` y `rechazado`.
  - Corregido caso en que ambos controles volvían a `pendiente` pero el estado del trámite permanecía en su valor anterior.

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
