# Cómo importar y probar el flujo (copia de prueba)

Flujo: `RCA-Entregables-Recordatorio-diario.json` · nombre en n8n: `RCA · Entregables · Recordatorio diario (BORRADOR)`.
Estado: borrador validado solo localmente (`node pruebas/validar_workflow.js`). No ha sido importado ni ejecutado en n8n todavía.

## 1. Tabla de prueba (datos ficticios): YA CREADA el 30-oct
El agente la creó en el Drive de gerencia@ desde `pruebas/entregables-ficticios.csv`: «RCA · Entregables · PRUEBA (datos ficticios)», ID `1EI5DnWpeHMLqtXCWkc_p8rd-Q23I-kcb0fg9kXkIDww`. El ID ya está puesto en el nodo «Leer tabla de entregables».
Solo revisar dos cosas al abrirla:
1. Que la pestaña se llame `Entregables` (el nodo la busca por ese nombre). Si Google le puso otro nombre, renombrarla.
2. Que la columna `Fecha compromiso` muestre `2026-10-25` y no `25/10/2026`. Si Google la convirtió, seleccionar la columna > Formato > Número > Texto sin formato y volver a escribir las fechas como AAAA-MM-DD. n8n lee lo que se muestra en la celda.

## 2. Importar en n8n
1. Entrar a https://n8n-rca.potenciaempresarial.site con el usuario propio (rol miembro).
2. Menú `...` arriba a la derecha > `Import from File` > elegir el JSON.
3. El flujo llega inactivo (`active: false`). No activarlo.

## 3. Completar los campos pendientes (en n8n, no en el JSON)
| Nodo | Campo | Qué poner |
|---|---|---|
| Leer tabla de entregables | Credential | credencial de Google Sheets (OAuth2 o cuenta de servicio) guardada en Credenciales con prefijo `RCA ·` |
| Enviar al gerente | Credential | credencial SMTP `RCA · Correo de salida (Potencia)`: cuenta gerencia@potenciaempresarial.site, decidido el 30-oct |
| Enviar al gerente | To | correo de Roger. En la primera prueba poner el correo de Hanssen y solo después el de Roger |

## 3b. Crear la credencial SMTP (una sola vez, en n8n)
Decisión del 30-oct: se envía desde el correo de Potencia. Es el mismo método que ya usa la app de Potencia.
1. En n8n: `Credentials` > `Add credential` > buscar `SMTP`.
2. Nombre: `RCA · Correo de salida (Potencia)`.
3. User: `gerencia@potenciaempresarial.site` · Host: `smtp.gmail.com` · Port: `587` · SSL/TLS: desactivado (usa STARTTLS).
4. Password: una **contraseña de aplicación** de Google (cuenta de Google > Seguridad > Verificación en dos pasos > Contraseñas de aplicaciones). Se genera allí y se pega solo en n8n. No la escriba en el chat ni en archivos.
5. Guardar y, en el nodo «Enviar al gerente», elegir esa credencial. El campo `To` lleva el correo de Roger; en la primera prueba, el de Hanssen.

## 4. Probar sin efectos reales
1. Con el nodo de correo DESHABILITADO, pulsar `Execute workflow` (ejecución manual).
2. Abrir cada nodo y comparar con `pruebas/casos-de-prueba.md`: la salida de `Redactar correo` debe traer `total` = cantidad esperada y el `cuerpo` con los ID listados.
3. Solo cuando el cuerpo sea correcto y el destinatario sea de prueba: habilitar «Enviar al gerente», ejecutar manualmente UNA vez, verificar el correo recibido. Luego volver a deshabilitar o dejar activo según autorización.

## 5. Qué NO hace todavía
- No escribe en la tabla (no marca «aviso enviado»): si se ejecuta dos veces el mismo día, envía dos correos iguales.
- No garantiza ID únicos: eso corresponde a la tabla o a un futuro flujo de registro.
- No avisa individualmente a cada líder ni envía el resumen semanal a gerencia (pendientes P6).
