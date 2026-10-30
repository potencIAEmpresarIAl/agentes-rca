---
tipo: entidad
estado: provisional
creado: 2026-10-30
actualizado: 2026-10-30
tags: [empresa, rca, impulso-empresarial]
fuentes: [Laboratorio/RCA Consultores/n8n/N8N-RCA-GUIA-IMPULSO-EMPRESARIAL.md, memoria Potencia rca-consultores-transformacion-digital, conversacion-2026-10-30]
---
# Empresa, responsables y programa

## Identificación
| Dato | Valor | Nivel y fuente |
|---|---|---|
| Empresa del programa | RCA Consultores y Asesores S.A.S., Valledupar. Firma contable, tributaria y de revisoría fiscal | **supuesto fuerte**: es la única empresa que Potencia acompaña en Impulso Empresarial según su memoria; esta carpeta no lo dice. Confirmar en [[pendientes]] P1 |
| Gerente | Roger Cervantes | confirmado (guía y actas) |
| Coordinadora de entregables | Andrea | provisional (sesión 15-oct, memoria Potencia) |
| Responsable técnico y usuario de este agente | Hanssen Guerra, Potencia EmpresarIAl, aliado tecnológico de RCA | confirmado (guía 1-oct) |
| Programa | Impulso Empresarial (AI Academy · Intercultural Connections · Comfacesar). Facilitadores Impulso: Jorge Andrés y Juan Carlos | confirmado (diagnóstico 16-sep y acta 2-oct) |
| Solución elegida en el programa | Automatización 2 «Solicitudes y pedidos», redirigida el 15-oct al **control de entregables por cliente** (fechas, entregables, seguimiento de la coordinadora) | confirmado (guía 1-oct) + provisional (sesión 15-oct) |
| Ecosistema de la empresa | Microsoft (OneDrive, Planner). No migra a Google | confirmado (acta 2-oct) |

## Servidor n8n de RCA (administrado por Potencia)
| Elemento | Valor |
|---|---|
| Editor | https://n8n-rca.potenciaempresarial.site |
| Versión | n8n 2.41.5, self-hosted, Community |
| Zona horaria | America/Bogota |
| Webhooks | `/webhook/...` producción · `/webhook-test/...` pruebas |
| Base de datos | SQLite (piloto); destino final: servidor de RCA cuando entren datos reales |
| Nodos de código | solo JavaScript, 60 s máximo; no leen variables del servidor |
| Nodos comunitarios | no permitidos |
| Correo de salida | NO configurado; hay que acordar cuenta y guardarla como credencial |
| Convención | prefijo `RCA ·` en flujos y credenciales |
| Acceso | un usuario miembro por persona; la cuenta administradora la conserva Potencia |
| Protección de datos | datos de clientes de RCA no salen a servicios externos sin acuerdo (Ley 1581) |

Ficha técnica interna del servidor: `Laboratorio/RCA Consultores/n8n/N8N-RCA-FICHA-TECNICA-INTERNA.md` (NO compartir con terceros; no se copia aquí).

## Alcance acordado en el programa
Una entrada, una tabla, cuatro estados como máximo, una regla de asignación, recordatorio diario. Sin pagos, inventario, facturación ni WhatsApp automático. Ver [[proceso]] y [[decisiones]].
