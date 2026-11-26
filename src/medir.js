const { generarVentas } = require("./generador");

function valorVenta(venta, contador) {
  contador.ops++;
  return venta.cantidad * venta.precio;
}

function totalVendidoC(ventas, contador) {
  let total = 0;
  for (const venta of ventas) {
    contador.ops++; // visita un elemento
    total += valorVenta(venta, contador);
  }
  return total;
}

function ventaMayorC(ventas, contador) {
  let mayor = ventas[0];
  for (const venta of ventas) {
    contador.ops++; // visita un elemento
    contador.ops++; // hace una comparación
    if (valorVenta(venta, contador) > valorVenta(mayor, contador)) {
      mayor = venta;
    }
  }
  return mayor;
}

function totalPorCiudadC(ventas, contador) {
  const totales = {};
  for (const venta of ventas) {
    contador.ops++; // visita un elemento
    const clave = venta.ciudad.trim().toLowerCase();
    totales[clave] = (totales[clave] || 0) + valorVenta(venta, contador);
  }
  return totales;
}

// Paso 5: función de complejidad constante O(1)
function primerVentaC(ventas, contador) {
  contador.ops++; // solo hace 1 operación, no recorre todo
  return ventas[0];
}

const tamanos = [100, 1000, 10000, 100000];
const resultados = [];

for (const n of tamanos) {
  const ventas = generarVentas(n);

  const c1 = { ops: 0 };
  totalVendidoC(ventas, c1);

  const c2 = { ops: 0 };
  ventaMayorC(ventas, c2);

  const c3 = { ops: 0 };
  totalPorCiudadC(ventas, c3);

  const c4 = { ops: 0 };
  primerVentaC(ventas, c4);

  resultados.push({
    n: n,
    totalVendido: c1.ops,
    ventaMayor: c2.ops,
    totalPorCiudad: c3.ops,
    primerVenta: c4.ops
  });
}

console.table(resultados);