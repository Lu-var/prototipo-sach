# Project Context: Modernización del Proceso Aduanero en Chile

## Overview
Sistema digital (web + mobile) to modernize land border control in Chile. Acts as a support platform — does **not** replace in-person review. Integrates with Aduanas (SNA), SAG, and PDI.

## Document
- `informe/Informe 1 ERS Valderrama-Vargas-Valencia.docx`
- Based on IEEE 830 standard for SRS

## User Types
1. **Viajero** (Traveler) — Low-mid tech experience, uses web/mobile for pre-registration
2. **Funcionario** (Officer, Aduanas/SAG/PDI) — Mid tech, scans QR, validates/rejects
3. **Administrador** (Admin) — High tech, manages users, generates reports

## Core Functions
1. **User management & auth** — Registration, login, role-based access (viajero/funcionario/admin)
2. **Pre-registro aduanero** — Enter personal data, ID docs (cédula/pasaporte), goods declarations before crossing
3. **QR generation** — Unique QR per completed trámite, used at border checkpoints
4. **Checkpoint validation** — Officers scan QR, approve/reject, register observations
5. **External system integration** — APIs with SNA, SAG, PDI for real-time passenger/vehicle validation
6. **Trámite state management** — Pending → In Review → Approved/Rejected, with changelog
7. **Report generation** — Admin generates statistics (entries/exits) filtered by date/user/org, export PDF/Excel

## Functional Requirements

### Specific (RFE)
| ID | Name | Description |
|----|------|-------------|
| RFE01 | Registro de documentos de pasajeros | Enter personal data + ID docs, validate on "CONTINUAR" |
| RFE02 | Validación de documentos de menores | Auto-detect minors, validate guardian authorization |
| RFE03 | Declaración SAG digital | Digital sworn declaration of animal/vegetal products, validate on "ENVIAR" |
| RFE04 | Registro de vehículos | Enter patente, type, country of origin; validate and store |
| RFE05 | Consulta de estado de trámite | User queries trámite status by ID via "CONSULTAR" button |

### General (RF)
| ID | Name | Description |
|----|------|-------------|
| RF01 | Registro de Usuarios | Admin registers users (name, rut, email, role). Validates required fields, no duplicates |
| RF02 | Inicio de sesión | Login with username/password. Rejects invalid, shows clear errors |
| RF03 | Ingreso de documentos de pasajeros | Enter docs (cédula, pasaporte, permisos), validate format and validity |
| RF04 | Integración con sistemas externos | APIs with Aduanas, SAG, PDI. Handle errors, real-time response |
| RF05 | Control de procesos SAG y PDI | Officers register review state for passengers/vehicles |
| RF06 | Generación de reportes | Admin generates statistical reports per entity, export PDF/Excel |
| RF07 | Generación de código QR | Auto-generate unique QR after all data completed successfully |
| RF08 | Validación mediante código QR | Officers scan QR, see trámite info instantly |
| RF09 | Validación por funcionario | Officer approves/rejects, system records decision + responsible user |
| RF10 | Actualización de estado del trámite | Auto-update state (pending/in review/approved/rejected), keep history |

## Non-Functional Requirements

| ID | Name | Key Acceptance Criteria |
|----|------|------------------------|
| RNF01 | Rendimiento | 95% of transactions < 2s, stable under concurrent users |
| RNF02 | Seguridad | Secure auth, role-based access, data encryption, activity logging |
| RNF03 | Fiabilidad | Low error rate, no data loss on failure, recoverable |
| RNF04 | Disponibilidad | 98% uptime, continuous access, quick restore |
| RNF05 | Mantenibilidad | Updates without affecting operation, easy fixes |
| RNF06 | Portabilidad | Cross-browser, mobile + desktop compatible |
| RNF07 | Control de acceso | Valid credentials only, clear error messages |
| RNF08 | Protección de datos | Prevent unauthorized access and data leaks |
| RNF09 | Registro de actividad (Logs) | Log all accesses, modifications, queries for audit |
| RNF10 | Escalabilidad | Scale with user/transaction growth, no degradation |

## Constraints
- **Tech**: Desktop + mobile compatible (esp. Android), web + mobile app
- **Integration**: Must integrate with SNA, SAG, PDI via their protocols
- **Security**: Confidentiality, authorized access only
- **Infrastructure**: Internet required; consider limited connectivity in border zones
- **Branding**: Respect institutional colors and visual guidelines

## Assumptions & Dependencies
- Institutions (Aduanas, SAG, PDI) will collaborate on integration
- Border points have internet and compatible devices
- Users have basic digital literacy
- System depends on external service availability and network connectivity
- Changes in customs regulations may require requirement adjustments

## Future Requirements
- AI assistance for travelers and officers
- Cross-country system integration
- Offline mobile capabilities
- Advanced security technologies

## Project Plan
- Duration: 8-10 weeks
- Phases: Planning, Analysis, Development, Testing, Implementation
- Defined team roles, EDT/WBS, Gantt chart, cost breakdown
