---
tipo: pendientes
estado: vigente
creado: 2026-10-30
actualizado: 2026-10-30
tags: [pendientes, preguntas]
fuentes: [conversacion-2026-10-30]
---
# Pendientes y preguntas abiertas

Las cinco primeras son las que cambian el funcionamiento y se le preguntan a Hanssen. El resto se trabaja cuando toque.

| ID | Pregunta o bloqueo | Por qué importa | Quién | Estado |
|---|---|---|---|---|
| P1 | ¿Esta carpeta es para RCA Consultores y el proceso de control de entregables, o para otra empresa del programa? | define toda la wiki y el flujo | Hanssen | abierto |
| P2 | ¿Quién recibe el resumen diario (solo Andrea, o también gerencia) y desde qué cuenta de correo se envía? El servidor no tiene correo propio; la cuenta se guarda como credencial SMTP `RCA ·` en n8n, nunca en el chat | sin esto el flujo no puede salir del borrador | Hanssen / RCA | abierto |
| P3 | ¿Aceptamos un Google Sheet con datos ficticios como tabla de prueba mientras se decide la definitiva (BD de la app RCA o Data Tables de n8n)? | determina el nodo de lectura del flujo 1 y el flujo de registro | Hanssen | abierto (propuesta: sí, solo pruebas) |
| P4 | ¿Hora del recordatorio 7:00 a. m. y también fines de semana, o solo lunes a viernes? | cambia el disparador | Hanssen / Andrea | abierto (borrador: todos los días 7:00) |
| P5 | ¿Qué estados cuentan como «sigue pendiente»? Borrador: todo lo que no sea `Entregado` | cambia la regla del nodo «Calcular alerta» | RCA | abierto |
| P6 | Aviso individual al líder 5 días antes y resumen semanal a gerencia (acordados el 15-oct) | segundo y tercer flujo | agente, tras P2 | sin construir |
| P7 | Flujo de registro (formulario n8n → tabla) con ID consecutivo | hoy el registro es manual | agente, tras P3 | sin construir |
| P8 | Unicidad del ID: buscar y luego insertar en una hoja no garantiza unicidad con ejecuciones simultáneas | duplicados en la tabla y en los avisos | agente | limitación expresa; opciones: Data Tables con clave, BD de la app, o ID por marca de tiempo |
| P9 | GitHub: `gh` no está instalado y no hay remoto. Acción mínima: crear el repositorio vacío en github.com y ejecutar `git remote add origin <url>`; o instalar `gh` y `gh auth login` | respaldo remoto de versiones | Hanssen | abierto; el repo local ya existe |
| P10 | Correo de la persona de Impulso que implementa, para crear su usuario miembro en n8n | acceso al servidor | Impulso | abierto desde el 1-oct |
| P11 | Formato único de `Fecha compromiso` (AAAA-MM-DD como texto en la hoja de prueba) | la lectura ISO falla con otros formatos | Hanssen / RCA | abierto |
| P12 | Confirmar compatibilidad de los typeVersion con n8n 2.41.5 al importar | podría pedir actualizar nodos | Hanssen al importar / MCP | abierto |
| P13 | MCP a la instancia: comprobar herramientas y permisos reales la próxima sesión | permite respaldo, validación y pruebas remotas | instructor | siguiente sesión |
