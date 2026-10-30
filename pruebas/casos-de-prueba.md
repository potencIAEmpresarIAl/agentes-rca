# Casos de prueba · RCA · Entregables · Recordatorio diario

Datos: `pruebas/entregables-ficticios.csv` (8 filas, todo ficticio). Fecha de referencia de la simulación: 2026-10-30. Umbral: 5 días.
Cómo se verificó: **solo localmente** con `node pruebas/simular_regla.js 2026-10-30 5`, que aplica la misma regla que los nodos «Calcular alerta» y «¿Requiere aviso?». Nada se ha ejecutado en n8n (sin acceso MCP en esta sesión; importación por interfaz pendiente de Hanssen).

| # | Caso | Entrada (fila) | Resultado esperado | Observado (local, 2026-10-30) | Evidencia |
|---|---|---|---|---|---|
| 1 | Correcto, atrasado | RCA-2026-0001, En elaboración, 2026-10-25 | ATRASADO 5 día(s), aviso SÍ | igual | salida del simulador |
| 2 | Correcto, vence pronto | RCA-2026-0002, Pendiente, 2026-11-03 | VENCE EN 4 día(s), aviso SÍ | igual | salida del simulador |
| 3 | Condición no cumplida (ya entregado) | RCA-2026-0003, Entregado, 2026-10-28 | aviso no (aunque la fecha pasó) | igual | salida del simulador |
| 4 | Condición no cumplida (al día) | RCA-2026-0004, Pendiente, 2026-11-07 (8 días) | AL DÍA, aviso no con umbral 5; aviso SÍ con umbral 10 | igual en ambos umbrales | simulador con 5 y con 10 |
| 5 | Obligatorio vacío (sin fecha) | RCA-2026-0005, fecha vacía | SIN FECHA VÁLIDA, aviso SÍ (para que alguien la complete) | igual | salida del simulador |
| 6 | Fecha inválida (formato 30/11/2026) | RCA-2026-0006 | SIN FECHA VÁLIDA, aviso SÍ | igual | salida del simulador. Señala la necesidad de estandarizar la columna a AAAA-MM-DD |
| 7 | Vence hoy | RCA-2026-0007, 2026-10-30 | VENCE EN 0 día(s), aviso SÍ | igual | salida del simulador |
| 8 | Evento repetido (ID duplicado) | segunda fila con RCA-2026-0001 | aparece dos veces en el correo; el simulador avisa del duplicado | igual | limitación registrada en `wiki/pendientes.md` P8 |
| 9 | Sin pendientes | tabla con todo Entregado o al día | el filtro no deja pasar nada; Agrupar y Redactar no se ejecutan; no hay correo | por probar en n8n | pendiente |
| 10 | Fallo de conexión (Sheets o SMTP caído) | credencial inválida o sin red | el nodo falla y la ejecución queda en error visible; no reintenta solo; nadie recibe correo parcial | por probar en n8n | pendiente. Decisión sugerida: `Retry on fail` máximo 2 veces en Leer tabla; en correo NO reintentar a ciegas |

Destinatario: Roger (en la primera prueba, Hanssen). Correo esperado con umbral 5 (hoy 2026-10-30): UN correo con 6 casos (0001, 0002, 0005, 0006, 0007 y el 0001 repetido). Con umbral 10: 7 casos (se suma 0004).

## Micropráctica propuesta
Abrir el nodo «Calcular alerta», cambiar el `5` por `10` en las dos expresiones y predecir qué fila nueva aparece en el correo antes de ejecutar. Respuesta esperada: RCA-2026-0004. Comprobación local: `node pruebas/simular_regla.js 2026-10-30 10`.
