# SACH — Modernización del Proceso Aduanero en Chile

Caso semestral de proceso de aduanas — Ingeniería de Software (RQY1102), EP3.

## Cómo abrir el prototipo

1. Descarga o clona este repositorio.
2. Abre el archivo `prototipo.html` con doble clic en cualquier navegador (Chrome, Firefox, Edge).
   - No requiere instalación.
   - No requiere servidor web.
   - Funciona sin conexión a internet.

## Alcance del prototipo

Este prototipo implementa la **vista Funcionario SNA** del punto de control fronterizo.
Navegación disponible: **Panel de Control** (lista de trámites con filtros) y **Escanear QR** (búsqueda por código).
No incluye portal Viajero ni panel Administrador (los datos del viajero son mock pre-poblados).

## Requisitos funcionales cubiertos

| ID   | Requisito                           |
|------|-------------------------------------|
| RF02 | Acceso por rol (Funcionario SNA)    |
| RF05 | Control de procesos SAG y PDI       |
| RF08 | Validación mediante código QR       |
| RF09 | Validación por funcionario          |
| RF10 | Actualización de estado del trámite |

## Roles de usuario

| Rol           | Descripción                                                        |
|---------------|--------------------------------------------------------------------|
| Viajero       | Realiza pre-registro aduanero (datos mock en el prototipo)         |
| Funcionario SNA | Escanea QR, revisa trámites, aprueba o rechaza                   |
| Administrador | Gestiona usuarios y reportes (fuera del alcance de este prototipo) |

## Documentos del proyecto

- `prototipo-aduanas.tsx` contiene como referencia el código fuente React/TypeScript del prototipo.
- `informe/Informe 1 ERS Valderrama-Vargas-Valencia.docx` — ERS (IEEE 830)
