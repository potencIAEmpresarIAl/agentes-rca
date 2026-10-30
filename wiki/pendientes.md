---
tipo: pendientes
estado: vigente
creado: 2026-10-30
actualizado: 2026-10-30
tags: [pendientes, preguntas]
fuentes: [conversacion-2026-10-30]
---
# Pendientes y preguntas abiertas

P1 a P5 fueron respondidas por Hanssen el 30-oct-2026 (ver [[decisiones]] D2, D3, D5, D6, D11). Quedan abiertas las demás.

| ID | Pregunta o bloqueo | Por qué importa | Quién | Estado |
|---|---|---|---|---|
| P1 | ¿Esta carpeta es para RCA Consultores y el control de entregables? | define toda la wiki y el flujo | Hanssen | **cerrado 30-oct**: sí, ejercicio de la sesión Impulso |
| P2 | ¿Quién recibe el resumen y desde qué cuenta se envía? | sin esto el flujo no sale del borrador | Hanssen | **cerrado 30-oct**: lo recibe Roger; se envía desde el correo de Potencia. Falta: crear la credencial SMTP en n8n (P14) y escribir el correo de Roger en el nodo (P15) |
| P3 | ¿Google Sheet con datos ficticios como tabla de prueba? | nodo de lectura del flujo 1 | Hanssen | **cerrado 30-oct**: sí, solo pruebas. La tabla definitiva sigue abierta (P16) |
| P4 | ¿7:00 todos los días o solo entre semana? | disparador | Hanssen | **cerrado 30-oct**: todos los días a las 7:00 |
| P5 | ¿Qué cuenta como «sigue pendiente»? | regla de «Calcular alerta» | Hanssen | **cerrado 30-oct**: todo lo que no sea `Entregado` |
| P6 | Aviso individual al líder 5 días antes y resumen semanal a gerencia (acordados el 15-oct) | segundo y tercer flujo | agente, tras P2 | sin construir |
| P7 | Flujo de registro (formulario n8n → tabla) con ID consecutivo | hoy el registro es manual | agente, tras P3 | sin construir |
| P8 | Unicidad del ID: buscar y luego insertar en una hoja no garantiza unicidad con ejecuciones simultáneas | duplicados en la tabla y en los avisos | agente | limitación expresa; opciones: Data Tables con clave, BD de la app, o ID por marca de tiempo |
| P9 | GitHub: `gh` no está instalado y no hay remoto. Acción mínima: crear el repositorio vacío en github.com y ejecutar `git remote add origin <url>`; o instalar `gh` y `gh auth login` | respaldo remoto de versiones | Hanssen | abierto; el repo local ya existe |
| P10 | Correo de la persona de Impulso que implementa, para crear su usuario miembro en n8n | acceso al servidor | Impulso | abierto desde el 1-oct |
| P11 | Formato único de `Fecha compromiso` (AAAA-MM-DD como texto en la hoja de prueba) | la lectura ISO falla con otros formatos | Hanssen / RCA | abierto |
| P12 | Confirmar compatibilidad de los typeVersion con n8n 2.41.5 al importar | podría pedir actualizar nodos | Hanssen al importar / MCP | abierto |
| P13 | MCP a la instancia: comprobar herramientas y permisos reales la próxima sesión | permite respaldo, validación y pruebas remotas | instructor | siguiente sesión |
| P14 | Crear en n8n la credencial SMTP `RCA · Correo de salida (Potencia)`: host smtp.gmail.com, puerto 587, STARTTLS, usuario gerencia@potenciaempresarial.site, contraseña de aplicación de Google (se genera en la cuenta de Google y se pega solo en n8n) | sin ella el nodo de correo no puede enviar | Hanssen en la interfaz de n8n | abierto; guía en `workflows/LEEME-importacion.md` §3b |
| P15 | Escribir el correo de Roger en el nodo «Enviar al gerente» (no se guarda en el JSON ni en la wiki) | destinatario real | Hanssen en n8n | abierto |
| P16 | Tabla definitiva: BD de la app RCA o Data Tables de n8n | el Sheet es solo para pruebas | Hanssen / Potencia | abierto |
