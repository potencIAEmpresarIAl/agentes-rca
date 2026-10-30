---
tipo: decisiones
estado: vigente
creado: 2026-10-30
actualizado: 2026-10-30
tags: [decisiones]
fuentes: [N8N-RCA-GUIA-IMPULSO-EMPRESARIAL.md, memoria Potencia rca-consultores-transformacion-digital, conversacion-2026-10-30]
---
# Decisiones

Formato: ID · fecha · decisión vigente · nivel · fuente · antecedentes.

| ID | Fecha | Decisión vigente | Nivel | Fuente | Antecedentes |
|---|---|---|---|---|---|
| D1 | 2026-10-01 | El piloto de Impulso corre en el n8n que Potencia administra para RCA, no en n8n Cloud; migra al servidor de RCA cuando haya datos reales | confirmado | guía 1-oct | |
| D2 | 2026-10-15 | El proceso a automatizar es el control de entregables por cliente (fechas, estados, seguimiento de la coordinadora) | confirmado 30-oct (Hanssen, P1) | sesión 15-oct + conversación 30-oct | 1-oct: «Solicitudes y pedidos» con radicado y 4 estados; 16-sep: diagnóstico recomendaba «reportes y alertas». Las tres encajan en «1 tabla, 4 estados, 1 regla, recordatorio diario» |
| D3 | 2026-10-30 | Para pruebas se usa un Google Sheet con datos ficticios. El destino definitivo de la tabla (BD de la app RCA o Data Tables de n8n) sigue abierto | confirmado (Hanssen, P3) | conversación 30-oct | guía 1-oct: preferir no usar Sheets personal; acta 2-oct: piloto con datos ficticios en cuenta aislada |
| D4 | 2026-10-01 | Zona horaria America/Bogota | confirmado | guía 1-oct (servidor) | |
| D5 | 2026-10-30 | Regla del recordatorio: avisar si estado ≠ Entregado y (fecha inválida o faltan ≤ 5 días). Un solo correo diario, ninguno si no hay casos. «Pendiente» = todo lo que no sea Entregado | confirmado (Hanssen, P5); el umbral de 5 días sigue siendo el de la plantilla | plantilla 15-oct + conversación 30-oct | la plantilla marca amarillo a ≤ 5 días y rojo si pasó la fecha |
| D6 | 2026-10-30 | El recordatorio lo recibe Roger (gerente) y se envía por SMTP desde el correo de Potencia (gerencia@potenciaempresarial.site) «de momento» | confirmado (Hanssen, P2) | conversación 30-oct | guía 1-oct: el servidor no tiene correo; opción futura: cuenta de RCA |
| D11 | 2026-10-30 | El recordatorio corre todos los días a las 7:00, fines de semana incluidos | confirmado (Hanssen, P4) | conversación 30-oct | |
| D7 | programa | WhatsApp excluido como canal automático; sin landing, pagos, facturación ni ERP | confirmado | instrucciones del programa (30-oct) | |
| D8 | 2026-10-30 | El flujo 1 no guarda estado de «aviso enviado»; se acepta el riesgo de reenvío si se ejecuta dos veces el mismo día, hasta decidir la columna `Última alerta` | provisional (agente) | conversación 30-oct | |
| D9 | 2026-10-30 | Nodos nativos, sin AI Agent ni Code; versiones de nodo anteriores a la última para reducir riesgo de incompatibilidad | confirmado (instrucciones del programa) | | |
| D10 | 2026-10-30 | `Docs/` queda fuera de Git salvo su LEEME; las fuentes de RCA se enlazan desde el catálogo, no se copian | confirmado (instrucciones del programa) | | |
