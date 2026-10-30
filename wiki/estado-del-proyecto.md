---
tipo: estado
estado: vigente
creado: 2026-10-30
actualizado: 2026-10-30
tags: [estado, n8n, impulso-empresarial]
fuentes: [conversacion-2026-10-30, Laboratorio/RCA Consultores/n8n/N8N-RCA-GUIA-IMPULSO-EMPRESARIAL.md]
---
# Estado del proyecto

## Resumen (2026-10-30)
- **Punto de avance real:** la empresa ([[empresa]]) ya tiene servidor n8n propio publicado (1-oct-2026), proceso elegido y una plantilla de tabla acordada (15-oct-2026). Lo que NO existía era el agente de esta carpeta ni un flujo n8n: hoy se crearon ambos.
- **Hecho hoy:** base del agente (AGENTS.md + wiki), carpeta `Docs/` (vacía, lista para recibir material), primer flujo en borrador `workflows/RCA-Entregables-Recordatorio-diario.json` validado localmente, datos ficticios, 10 casos de prueba (8 verificados en simulador local, 2 por probar en n8n), repositorio Git local.
- **Nivel de verificación:** archivo validado localmente. No importado ni ejecutado en n8n. Sin MCP en esta sesión.

## Tabla de estado
| Elemento | Estado | Nivel |
|---|---|---|
| Empresa y proceso identificados | RCA Consultores · control de entregables por cliente | provisional (ver [[pendientes]] P1) |
| Servidor n8n | https://n8n-rca.potenciaempresarial.site · n8n 2.41.5 · America/Bogota | confirmado (guía 1-oct) |
| Usuario de n8n para quien implementa | sin crear: falta el correo | pendiente P2 |
| Tabla de datos | plantilla Excel de 15 columnas; destino definitivo sin decidir | pendiente P3 |
| Flujo 1 · Recordatorio diario | borrador JSON listo para importar; 3 campos PENDIENTE | validado localmente |
| Correo de salida | el servidor no tiene correo configurado; cuenta por definir | pendiente P4 |
| Flujo de registro (entrada) | no construido; depende de P3 | pendiente P7 |
| Git | repo local inicializado, 1 commit | hecho |
| GitHub | `gh` no instalado; sin remoto | pendiente P9 |
| MCP a n8n | no disponible en esta sesión | siguiente sesión |

## Qué sigue (orden sugerido)
1. Hanssen responde P1 a P4 ([[pendientes]]).
2. Importar la copia de prueba por la interfaz de n8n siguiendo `workflows/LEEME-importacion.md`; registrar la evidencia en `pruebas/casos-de-prueba.md`.
3. Con MCP (siguiente sesión): checklist abajo.
4. Definir dónde vive la tabla y construir el flujo de registro con ID único.

## Checklist MCP (siguiente sesión)
- [ ] Confirmación del instructor o de Hanssen de que la conexión está disponible.
- [ ] Listar herramientas y permisos reales; anotar versión del servidor.
- [ ] Identificar instancia, proyecto y flujo exactos de RCA. No leer ni modificar flujos de otras empresas.
- [ ] Exportar respaldo saneado de lo que exista en el servidor a `workflows/` (quitar IDs de credenciales y datos fijados).
- [ ] Comparar remoto con local antes de sobrescribir; conservar cambios remotos no incorporados.
- [ ] Crear o actualizar SOLO la copia borrador; validar; ejecutar en modo manual o de pruebas explícito.
- [ ] Revisar valores por defecto de las herramientas de ejecución (pueden lanzar la versión publicada).
- [ ] Documentar: qué quedó local, qué quedó en el servidor, qué falta para operar.
