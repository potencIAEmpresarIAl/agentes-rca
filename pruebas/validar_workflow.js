#!/usr/bin/env node
// Validador local de un JSON de flujo n8n antes de importarlo.
// Uso: node pruebas/validar_workflow.js workflows/<archivo>.json
// Comprueba: sintaxis JSON, nodos con nombre único, conexiones que apuntan a nodos existentes,
// typeVersion dentro de las versiones verificadas (código fuente oficial de n8n, 2026-10-30),
// salidas con efecto real deshabilitadas, credenciales incrustadas y marcadores PENDIENTE.
// Solo valida el archivo: NO garantiza que n8n lo ejecute igual.

const fs = require('fs');
const ruta = process.argv[2];
if (!ruta) { console.error('Uso: node pruebas/validar_workflow.js workflows/<archivo>.json'); process.exit(2); }

const VERIFICADAS = {
  'n8n-nodes-base.scheduleTrigger': [1, 1.1, 1.2, 1.3, 1.4],
  'n8n-nodes-base.formTrigger': [1, 2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6],
  'n8n-nodes-base.set': [1, 2, 3, 3.1, 3.2, 3.3, 3.4, 3.5],
  'n8n-nodes-base.googleSheets': [1, 2, 3, 4, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7],
  'n8n-nodes-base.if': [1, 2, 2.1, 2.2, 2.3, 2.4],
  'n8n-nodes-base.filter': [1, 2, 2.1, 2.2, 2.3, 2.4],
  'n8n-nodes-base.aggregate': [1],
  'n8n-nodes-base.gmail': [1, 2, 2.1, 2.2],
  'n8n-nodes-base.emailSend': [1, 2, 2.1],
  'n8n-nodes-base.stickyNote': [1],
};
const CON_EFECTO_REAL = ['n8n-nodes-base.emailSend', 'n8n-nodes-base.gmail', 'n8n-nodes-base.microsoftOutlook'];

let errores = 0, avisos = 0;
const err = (m) => { errores++; console.log('  ERROR  ' + m); };
const aviso = (m) => { avisos++; console.log('  AVISO  ' + m); };
const ok = (m) => console.log('  ok     ' + m);

const texto = fs.readFileSync(ruta, 'utf8');
let wf;
try { wf = JSON.parse(texto); ok('JSON con sintaxis válida'); }
catch (e) { console.log('  ERROR  JSON inválido: ' + e.message); process.exit(1); }

console.log('Flujo: ' + wf.name);
if (wf.active === true) aviso('active=true: al importar quedaría activo. Un borrador debe ir con active=false.');
if (!Array.isArray(wf.nodes) || wf.nodes.length === 0) err('sin nodos');

const nombres = new Set();
for (const n of wf.nodes || []) {
  if (nombres.has(n.name)) err('nombre de nodo repetido: ' + n.name);
  nombres.add(n.name);
  const vers = VERIFICADAS[n.type];
  if (!vers) aviso(`tipo no verificado contra el código fuente: ${n.type} (${n.name})`);
  else if (!vers.includes(n.typeVersion)) err(`typeVersion ${n.typeVersion} no existe para ${n.type} (${n.name}); válidas: ${vers.join(', ')}`);
  if (CON_EFECTO_REAL.includes(n.type) && !n.disabled) aviso(`nodo con efecto real HABILITADO: ${n.name}. Un borrador debe tenerlo deshabilitado.`);
  if (n.credentials) aviso(`credenciales incrustadas en ${n.name}: ${JSON.stringify(n.credentials)}. Revisar antes de versionar.`);
}
ok(`${wf.nodes.length} nodos, nombres únicos`);

const disparadores = (wf.nodes || []).filter(n => /Trigger$/i.test(n.type));
if (disparadores.length === 0) err('no hay nodo disparador (Trigger)');
else ok('disparador: ' + disparadores.map(d => d.name).join(', '));

let conexiones = 0;
for (const [origen, salidas] of Object.entries(wf.connections || {})) {
  if (!nombres.has(origen)) err('conexión desde un nodo inexistente: ' + origen);
  for (const grupo of (salidas.main || [])) for (const c of grupo) {
    conexiones++;
    if (!nombres.has(c.node)) err(`conexión hacia un nodo inexistente: ${origen} -> ${c.node}`);
  }
}
ok(`${conexiones} conexiones, todas apuntan a nodos existentes`);

const sinEntrada = (wf.nodes || []).filter(n => n.type !== 'n8n-nodes-base.stickyNote' && !/Trigger$/i.test(n.type)
  && !Object.values(wf.connections || {}).some(s => (s.main || []).some(g => g.some(c => c.node === n.name))));
if (sinEntrada.length) aviso('nodos sin conexión de entrada: ' + sinEntrada.map(n => n.name).join(', '));

const pendientes = (texto.match(/PENDIENTE[_A-Za-z0-9@.]*/g) || []);
if (pendientes.length) aviso(`${pendientes.length} marcador(es) PENDIENTE por completar en n8n: ${[...new Set(pendientes)].join(', ')}`);

if (/\u2014|\u2013/.test(texto)) err('contiene guion largo o corto tipográfico (regla de estilo de Potencia)');
else ok('sin guiones tipográficos');

console.log(`\nResultado: ${errores} error(es), ${avisos} aviso(s). ${errores ? 'NO importar todavía.' : 'Listo para importar como BORRADOR.'}`);
process.exit(errores ? 1 : 0);
