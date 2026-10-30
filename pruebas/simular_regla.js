#!/usr/bin/env node
// Simula localmente la regla de «Calcular alerta» + «¿Requiere aviso?» sobre pruebas/entregables-ficticios.csv.
// Uso: node pruebas/simular_regla.js [fecha-de-hoy AAAA-MM-DD] [dias-de-aviso]
// Ejemplo: node pruebas/simular_regla.js 2026-10-30 5
// Sirve para PREDECIR lo que n8n debería producir. No sustituye la prueba en n8n.

const fs = require('fs');
const path = require('path');
const hoyTxt = process.argv[2] || new Date().toISOString().slice(0, 10);
const diasAviso = Number(process.argv[3] ?? 5);
const hoy = Date.parse(hoyTxt + 'T00:00:00Z');
if (Number.isNaN(hoy)) { console.error('Fecha de hoy inválida. Use AAAA-MM-DD.'); process.exit(2); }

const csv = fs.readFileSync(path.join(__dirname, 'entregables-ficticios.csv'), 'utf8').trim().split('\n');
const cab = csv[0].split(',');
const filas = csv.slice(1).map(l => { const v = l.split(','); const o = {}; cab.forEach((c, i) => o[c] = (v[i] ?? '').trim()); return o; });

// Misma lógica que las expresiones del flujo (Luxon DateTime.fromISO acepta AAAA-MM-DD; «30/11/2026» NO es ISO).
const esISO = (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s + 'T00:00:00Z'));
const vistos = new Map();
const salida = filas.map(f => {
  const fecha = f['Fecha compromiso'];
  const fechaValida = esISO(fecha);
  const dias = fechaValida ? Math.round((Date.parse(fecha + 'T00:00:00Z') - hoy) / 86400000) : 0;
  const clasificacion = !fechaValida ? 'SIN FECHA VÁLIDA' : dias < 0 ? `ATRASADO ${Math.abs(dias)} día(s)` : dias <= diasAviso ? `VENCE EN ${dias} día(s)` : 'AL DÍA';
  const requiereAviso = f['Estado'] !== 'Entregado' && (!fechaValida || dias <= diasAviso);
  vistos.set(f['ID'], (vistos.get(f['ID']) || 0) + 1);
  return { id: f['ID'], cliente: f['Cliente'], estado: f['Estado'], fecha, dias: fechaValida ? dias : 'n/a', clasificacion, aviso: requiereAviso ? 'SÍ' : 'no' };
});

console.log(`Hoy simulado: ${hoyTxt} · regla: avisar si estado != Entregado y (sin fecha válida o faltan <= ${diasAviso} días)\n`);
console.table(salida);
const avisados = salida.filter(s => s.aviso === 'SÍ');
console.log(`\nCorreo esperado: ${avisados.length ? `UN correo con ${avisados.length} caso(s): ${avisados.map(a => a.id).join(', ')}` : 'NINGUNO (el filtro no deja pasar nada y el flujo termina sin enviar)'}`);
const dup = [...vistos].filter(([, n]) => n > 1).map(([id]) => id);
if (dup.length) console.log(`AVISO duplicados: el ID ${dup.join(', ')} aparece más de una vez. El flujo lo listará dos veces; la unicidad del ID debe garantizarla la tabla o el flujo de registro (pendiente).`);
