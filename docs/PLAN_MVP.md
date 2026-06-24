# Plan: Customs MVP — Repurposing OnTour Prototype

## 1. Objetivo

Transformar el prototipo existente de OnTour (giras de estudio) en un MVP simplificado de control aduanero con una **vista unica: Funcionario**. Sin portal de viajero, sin panel admin — solo la interfaz del funcionario en el punto de control.

---

## 2. Que mantener de OnTour

- Arquitectura de archivo unico
- Ruteo con useState (currentRoute)
- Patron de navegacion con sidebar
- Patron de tablas (thead/tbody en JSX)
- Estilos con clases Tailwind
- Patron switch renderView()

## 3. Que eliminar

- Todos los datos y roles de giras de estudio
- Login multi-rol — reemplazar con entrada unica
- Roles Viajero y Admin completamente
- Componentes ProgressBar y FormularioGenerico
- Dependencia lucide-react

---

## 4. Stack tecnologico simplificado

| Capa | Eleccion |
|-------|--------|
| Framework | React (Vite o CRA) |
| Estilos | Tailwind CSS |
| Iconos | Texto/SVG/emoji, sin libreria |
| Estado | useState solamente |
| Datos | Un objeto mockData |
| Archivos | 1 archivo |

## 5. Rol unico: Funcionario

### Rutas

| Ruta | Pantalla | Reqs |
|-------|--------|------|
| func-dashboard | Dashboard: lista de tramites pendientes filtrable | RF05, RF10 |
| func-tramite | Detalle del tramite + datos viajero + aprobar/rechazar + controles SAG/PDI | RF05, RF08, RF09, RF10 |
| func-escanear | Input para codigo QR (simula escaneo) | RF08 |

## 6. Modelo de datos mock

```
Tramite = {
  id, estado (pendiente/en_revision/aprobado/rechazado),
  viajero: { nombre, rut, pasaporte },
  documentos: [{ tipo, numero, vigente }],
  menor: { esMenor, autorizacion, tutorRut },
  declaracionSag: { prodAnimal, prodVegetal, descripcion },
  vehiculo: { patente, tipo, pais },
  qrCode, controles: { sag, pdi }, historial
}
```
---
## 7. Plan pantalla por pantalla

### 7.0 Entrada

Boton unico "Ingresar como Funcionario" — sin contrasena, sin selector de rol. Va directo al dashboard.

### 7.1 Dashboard (RF05, RF10)

Tabla de todos los tramites con columnas: ID, viajero nombre, rut, estado, vehiculo, SAG, PDI.
Estados con colores. Click fila para ver detalle. Barra de filtros para buscar por nombre/rut o filtrar por estado.

### 7.2 Escanear QR (RF08)

Input de texto para ID del tramite. Boton "Buscar". Si coincide: redirige al detalle. Si no: mensaje de error.
Simula un escaner real de QR.

### 7.3 Detalle del Tramite + Validacion (RF05, RF09, RF10)

Tarjeta de solo lectura con datos del viajero: datos personales, documentos, info menor, declaracion SAG, vehiculo, QR code (div estilizado), historial.

Seccion de acciones al final:
- Botones: APROBAR / RECHAZAR (RF09)
- Control SAG: dropdown (pendiente/aprobado/rechazado) (RF05)
- Control PDI: dropdown (pendiente/aprobado/rechazado) (RF05)
- Todas las acciones se registran en historial con timestamp + nombre del funcionario
- Estado del tramite se actualiza automaticamente

## 8. Cobertura de requisitos

| ID | Estado | Como |
|----|--------|------|
| RFE01 | N/A | Lado viajero — datos mock pre-poblados |
| RFE02 | N/A | Lado viajero — datos mock pre-poblados |
| RFE03 | N/A | Lado viajero — datos mock pre-poblados |
| RFE04 | N/A | Lado viajero — datos mock pre-poblados |
| RFE05 | N/A | Lado viajero — datos mock pre-poblados |
| RF01 | N/A | Lado admin — fuera de alcance |
| RF02 | Parcial | Boton unico de entrada (sin auth real) |
| RF03 | N/A | Lado viajero — datos mock pre-poblados |
| RF04 | X | API real — diferido |
| RF05 | Si | Controles SAG/PDI por tramite |
| RF06 | N/A | Lado admin — fuera de alcance |
| RF07 | N/A | Lado viajero — QR mock en detalle |
| RF08 | Si | Pantalla de input QR |
| RF09 | Si | Aprobar/rechazar con registro |
| RF10 | Si | Actualizacion de estado + historial |

## 9. Iteraciones futuras (post-MVP)

1. Agregar vista viajero para pre-registro (RFE01-RFE05, RF07)
2. Agregar panel admin para usuarios/reportes (RF01, RF06)
3. Integracion con API real (RF04)
4. Libreria QR real (qrcode.react)
5. Backend + base de datos