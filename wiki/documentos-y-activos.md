---
tipo: catalogo
estado: vigente
creado: 2026-10-30
actualizado: 2026-10-30
tags: [catalogo, docs, fuentes]
fuentes: [inventario-2026-10-30]
---
# Documentos y activos

`Docs/` es la entrada principal de información de la empresa (vacía al 2026-10-30; Hanssen puede depositar material). Las fuentes externas ya existentes viven en `~/Code PotencIA/Laboratorio/RCA Consultores/` y se enlazan aquí sin copiarlas. Regla: originales intactos; copias de trabajo solo en `Docs/organizados/` con referencia al original.

## Inventario
| Ruta | Categoría | Descripción | Información relevante | Versión / fecha | Utilidad para el proceso | Revisión pendiente |
|---|---|---|---|---|---|---|
| `Docs/LEEME.md` | referencia | instrucciones para depositar material | reglas de la carpeta | 2026-10-30 | orienta a Hanssen | no |
| `Laboratorio/RCA Consultores/n8n/N8N-RCA-GUIA-IMPULSO-EMPRESARIAL.md` (+ .pdf) | manual / referencia | guía del servidor n8n de RCA para el equipo Impulso | URL, versión 2.41.5, reglas del servidor, 5 definiciones previas, entregables esperados | 1-oct-2026 | base de [[empresa]] y de las reglas de construcción | leída completa |
| `Laboratorio/RCA Consultores/n8n/N8N-RCA-FICHA-TECNICA-INTERNA.md` | referencia interna | ficha técnica del servidor (Potencia) | rutas, servicio, respaldo | 1-oct-2026 | solo para operar el servidor; NO compartir | no leída en esta sesión (no hacía falta) |
| `Laboratorio/RCA Consultores/plan/RCA-Control-de-entregables-por-cliente.xlsx` | tabla de datos / plantilla | plantilla de control de entregables, 3 hojas: Instrucciones, Entregables, Listas | 15 columnas (encabezados en fila 4), 3 filas de ejemplo ficticias, listas desplegables, fórmula de Alerta | 15-oct-2026 | define columnas, estados y la regla de 5 días que implementa el flujo ([[proceso]]) | leída completa con openpyxl |
| `Laboratorio/RCA Consultores/plan/ACTA-SESION-IMPULSO-2026-10-02.md` | proceso / acta | acta de la sesión Impulso + RCA | dolor principal: control operativo interno; ecosistema Microsoft; piloto con datos ficticios | 5-oct-2026 | contexto del proceso | leída vía memoria de Potencia, no el archivo completo |
| `Laboratorio/RCA Consultores/sesiones/2026-10-22-impulso/` | mensajes | textos de mensajes al comité de innovación RCA | levantamiento de información | 22-oct-2026 | contexto; no afecta el flujo | sin leer (2 .txt) |
| `Laboratorio/RCA Consultores/insumos/diagnostico-impulso-empresarial-2026-09-16.pdf` | información empresarial | diagnóstico del programa | recomendación inicial: reportes y alertas | 16-sep-2026 | antecedente de [[decisiones]] | sin leer (conocido por memoria) |
| `pruebas/entregables-ficticios.csv` | tabla de datos (ficticia) | 8 filas de prueba derivadas de la plantilla | cubre los casos de [[mapa-del-flujo]] | 2026-10-30 | pruebas | no |

## Relación copia ↔ original
Ninguna copia de trabajo creada todavía. `pruebas/entregables-ficticios.csv` NO es copia de la plantilla: es un derivado con las mismas 14 columnas de entrada (sin la columna calculada «Alerta») y datos inventados.

## Reglas y datos extraídos a otras páginas
- Columnas, tipos y listas de la plantilla → [[proceso]].
- Reglas del servidor n8n → [[empresa]].
- Regla de alerta de 5 días (fórmula de la columna Alerta) → [[proceso]] y [[mapa-del-flujo]].
