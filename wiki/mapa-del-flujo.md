---
tipo: flujo
estado: borrador
creado: 2026-10-30
actualizado: 2026-10-30
tags: [n8n, flujo, recordatorio, entregables]
fuentes: [workflows/RCA-Entregables-Recordatorio-diario.json, código fuente n8n (GitHub n8n-io/n8n, rama master, consultado 2026-10-30)]
---
# Mapa del flujo · RCA · Entregables · Recordatorio diario (BORRADOR)

Archivo: `workflows/RCA-Entregables-Recordatorio-diario.json` · importación: `workflows/LEEME-importacion.md` · pruebas: `pruebas/casos-de-prueba.md`.

## Recorrido de un dato ficticio
Fila `RCA-2026-0002 · Cliente Ficticio Dos · Pendiente · 2026-11-03`, hoy 2026-10-30:
1. 7:00 arranca el disparador.
2. Google Sheets devuelve la fila como un objeto con las columnas de la hoja.
3. «Normalizar campos» la convierte en `id=RCA-2026-0002, estado=Pendiente, fecha_compromiso=2026-11-03, fecha_valida=true, dias_para_vencer=4`.
4. «Calcular alerta» añade `clasificacion=VENCE EN 4 día(s)` y `requiere_aviso=true`.
5. «¿Requiere aviso?» la deja pasar (otras filas se descartan).
6. «Agrupar en un resumen» junta todas las que pasaron en una sola lista `data`.
7. «Redactar correo» arma asunto y cuerpo con una línea por caso.
8. «Enviar al gerente» (deshabilitado en el borrador) enviaría el correo a Roger desde gerencia@potenciaempresarial.site.

## Nodo por nodo
| # | Nodo | Tipo · typeVersion | Qué resuelve | Recibe → entrega | Cómo comprobarlo · error habitual |
|---|---|---|---|---|---|
| 1 | Cada día 7:00 | `scheduleTrigger` 1.2 | que la revisión ocurra sola cada mañana | nada → un item vacío con la hora | en ejecución manual arranca al instante. Error: zona horaria del flujo distinta a America/Bogota (está fijada en settings) |
| 2 | Leer tabla de entregables | `googleSheets` 4.5, operación `read` | traer todas las filas de la hoja `Entregables` | documento + pestaña → un item por fila, claves = encabezados | abrir el nodo y ver 8 items con `ID`, `Estado`, `Fecha compromiso`. Errores: ID del Sheet vacío (PENDIENTE), credencial sin permiso, encabezados en otra fila |
| 3 | Normalizar campos | `set` 3.4 | nombres cortos y sin espacios, y calcular los días | columnas con espacios → `id, cliente, tipo, periodo, fecha_compromiso, responsable, coordinador, estado, fecha_valida, dias_para_vencer` | `dias_para_vencer` debe ser 4 para 2026-11-03 si hoy es 30-oct. Error: fecha como `30/11/2026` da `fecha_valida=false` |
| 4 | Calcular alerta | `set` 3.4, conserva otros campos | aplicar LA REGLA del negocio en un solo lugar | `fecha_valida, dias_para_vencer, estado` → `clasificacion, requiere_aviso` | el 5 de la regla está aquí dos veces (clasificación y aviso). Micropráctica: cambiarlo por 10 |
| 5 | ¿Requiere aviso? | `filter` 2.2 | dejar pasar solo lo que sigue pendiente y urge | `requiere_aviso` → mismos items filtrados | con los datos ficticios pasan 6 de 8. Error: si no pasa nada, el resto del flujo no se ejecuta (es lo deseado) |
| 6 | Agrupar en un resumen | `aggregate` 1, todos los datos | un solo correo, no uno por fila | n items → 1 item con `data[]` | `data.length` = 6 |
| 7 | Redactar correo | `set` 3.4 | texto legible para el gerente | `data[]` → `asunto, cuerpo, total` | el cuerpo tiene una línea por caso con «·» y «|» |
| 8 | Enviar al gerente | `emailSend` 2.1 (SMTP), **deshabilitado** | que el aviso llegue a Roger | `asunto, cuerpo` → correo desde el correo de Potencia | habilitar solo con destinatario de prueba (Hanssen) la primera vez. Errores: credencial SMTP sin contraseña de aplicación, puerto distinto de 587, correo de Roger sin poner (PENDIENTE) |
| 9 | Nota | `stickyNote` 1 | instrucciones dentro del editor | | |

## Expresiones usadas (escritas, no hay que memorizarlas)
- Leer una columna con espacios: `{{ $json['Fecha compromiso'] }}`.
- Días hasta la fecha: `{{ Math.round(DateTime.fromISO(...).startOf('day').diff($today, 'days').days) }}`. `$today` es hoy a medianoche en la zona del flujo; `DateTime` es la librería Luxon que n8n incluye.
- Validez de la fecha: `{{ DateTime.fromISO(texto).isValid }}`.
- Regla: `{{ $json.estado !== 'Entregado' && (!$json.fecha_valida || $json.dias_para_vencer <= 5) }}`.
- Lista en el correo: `{{ $json.data.map(e => '· ' + e.id + ' | ' + e.cliente + ...).join('\n') }}`.

## Versiones verificadas (código fuente oficial, rama master, 2026-10-30)
| Nodo | Versiones existentes | Usada | Por qué |
|---|---|---|---|
| scheduleTrigger | 1, 1.1, 1.2, 1.3, 1.4 | 1.2 | estable, anterior a la última |
| googleSheets | 1 a 4.7 | 4.5 | versión madura de la familia v4 |
| set (Edit Fields) | 1 a 3.5 | 3.4 | |
| filter | 1 a 2.4 | 2.2 | |
| aggregate | 1 | 1 | |
| emailSend | 1, 2, 2.1 | 2.1 | |
| formTrigger (para el flujo de registro futuro) | 1 a 2.6 | ninguna aún | |
| gmail (alternativa) | 1 a 2.2 | ninguna | RCA es Microsoft; se prefiere SMTP |

**Pendiente:** la rama master puede ir por delante de n8n 2.41.5 del servidor. Las versiones elegidas son anteriores a las últimas para minimizar el riesgo; la confirmación definitiva es importar y ver que no aparezca aviso de nodo desconocido.

## Decisiones de diseño
- Sin AI Agent ni nodo Code: la regla cabe en expresiones de Edit Fields.
- Dos nodos Set en vez de uno: separa «poner nombres» de «aplicar la regla», para que cambiar la regla sea tocar un solo nodo.
- Filter en vez de IF: no necesitamos la rama «falso».
- SMTP (`emailSend`) en vez de Gmail: el servidor no tiene correo propio y Hanssen decidió usar la cuenta de Potencia por ahora ([[decisiones]] D6). Mismo método que ya usa la app de Potencia (smtp.gmail.com, puerto 587).
