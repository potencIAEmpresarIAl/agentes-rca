---
tipo: proceso
estado: provisional
creado: 2026-10-30
actualizado: 2026-10-30
tags: [proceso, entregables, reportes-y-alertas]
fuentes: [Laboratorio/RCA Consultores/plan/RCA-Control-de-entregables-por-cliente.xlsx, memoria Potencia sesión 15-oct-2026, N8N-RCA-GUIA-IMPULSO-EMPRESARIAL.md]
---
# Proceso: control de entregables por cliente

## En una frase
Cada entregable que RCA le debe a un cliente (informe mensual, declaración, acta) se registra en una tabla con fecha compromiso, líder responsable y estado; el sistema avisa a la coordinadora cada día de los que siguen pendientes y están atrasados o por vencer.

## Secuencia
1. **Registrar** el entregable y su periodo en la tabla con ID único, cliente, tipo, fecha compromiso, líder y coordinador. Estado inicial: `Pendiente`. (Hoy se hace a mano en la hoja; un flujo de registro es [[pendientes]] P7.)
2. **Trabajar**: el líder cambia el estado a `En elaboración`.
3. **Entregar**: estado `Entregado`, fecha real y enlace a la evidencia en OneDrive.
4. **Vigilar** (automatizado, flujo 1): cada día a las 7:00 se revisa toda la tabla. Lo que no está `Entregado` y está atrasado, vence en 5 días o menos, o no tiene fecha válida, va en UN correo resumen a la coordinadora. Si no hay nada, no se envía correo.
5. **Reglas futuras acordadas el 15-oct, sin construir** ([[pendientes]] P6): aviso individual al líder 5 días antes; resumen semanal a gerencia.

## Entradas, regla y salida
| Entrada | Regla | Salida |
|---|---|---|
| Filas de la tabla `Entregables` (todas) | estado ≠ `Entregado` Y (fecha compromiso inválida O días hasta la fecha ≤ 5) | un correo con la lista de casos a la coordinadora; ninguno si la lista queda vacía |
| Fecha de hoy en America/Bogota (`$today` de n8n) | días = fecha compromiso menos hoy, redondeado | `clasificacion`: ATRASADO n día(s) · VENCE EN n día(s) · SIN FECHA VÁLIDA · AL DÍA |

## Tabla: columnas reales de la plantilla (hoja `Entregables`, encabezados en fila 4 del Excel)
| Columna (nombre exacto) | Tipo | Obligatoria | Ejemplo ficticio | Nota de estandarización |
|---|---|---|---|---|
| `ID` | texto, consecutivo `RCA-AAAA-0000` | sí | RCA-2026-0001 | la plantilla no impide repetirlo (ver P8) |
| `Cliente` | texto | sí | Cliente Ficticio Uno | |
| `NIT` | texto numérico | no | 900000001 | guardar como texto para no perder ceros |
| `Servicio` | lista: Outsourcing contable · Revisoría fiscal · Auditoría · Asesoría tributaria · Asesoría financiera · Nómina · Otro | sí | Revisoría fiscal | |
| `Tipo de entregable` | lista: Informe financiero mensual · Estados financieros · Informe de gestión · Informe de auditoría · Declaración tributaria · Nómina y seguridad social · Acta de reunión | sí | Informe de gestión | |
| `Periodicidad` | lista: Mensual · Bimestral · Trimestral · Semestral · Anual · Única | sí | Trimestral | |
| `Periodo` | texto libre | sí | T3 2026 | formato libre; estandarizar luego |
| `Fecha compromiso` | fecha | sí | 2026-11-03 | **en la hoja de prueba debe ir como texto AAAA-MM-DD**; el Excel la guarda como fecha. Decidir formato único (P5) |
| `Responsable (líder)` | texto | sí | Líder auditoría B | |
| `Coordinador` | texto | sí | Andrea | |
| `Estado` | lista: Pendiente · En elaboración · Entregado · Atrasado | sí | Pendiente | la plantilla dice que `Atrasado` lo muestra la columna Alerta, no se escribe a mano. El flujo solo mira si es `Entregado` o no |
| `Fecha real de entrega` | fecha | solo al entregar | 2026-10-27 | |
| `Evidencia (enlace OneDrive)` | URL | solo al entregar | https://... | |
| `Observaciones` | texto | no | Falta extracto bancario | |
| `Alerta (automática)` | fórmula del Excel | no la usa el flujo | ATRASADO | el flujo recalcula lo mismo con `clasificacion` |

## Estados vigentes (4)
`Pendiente` → `En elaboración` → `Entregado`; `Atrasado` es una condición calculada, no un estado que alguien escriba. Fuente: hoja Instrucciones de la plantilla. Nivel: provisional hasta que RCA lo confirme.

## Cómo se evita repetir una acción
- El flujo 1 corre una vez al día y envía un solo correo; no guarda estado. Si se ejecuta dos veces el mismo día (manual + programado), llegan dos correos iguales. Mitigación pendiente: columna `Última alerta` escrita por el flujo, o aceptar el reenvío como riesgo bajo (ver [[decisiones]] D8).
- Unicidad del ID: fuera del alcance del flujo 1; pendiente para el flujo de registro (P7, P8).
