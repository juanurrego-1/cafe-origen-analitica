const datos = require('./datos');
const ventas = datos.ventas || datos;
const analitica = require('./analitica');

function formatoPesos(valor) {
  return valor.toLocaleString("es-CO");
}

console.log("=== RESUMEN GENERAL ===");
const totalGeneral = ventas.reduce((acumulado, venta) => acumulado + analitica.valorVenta(venta), 0);
console.log(`Total ventas: $${formatoPesos(totalGeneral)}`);
console.log(`Cantidad de ventas: ${ventas.length}`);

console.log("\n=== VENTAS POR CIUDAD ===");
console.table(analitica.totalPorCiudadM(ventas));

console.log("\n=== UNIDADES POR PRODUCTO ===");
console.table(analitica.unidadesPorProductoM(ventas));

console.log("\n=== TOP 3 DE PRODUCTOS POR VALOR ===");
console.table(analitica.topProductosPorValorM(ventas, 3));

function ciudadConMayorVenta(ventas) {
  const totales = analitica.totalPorCiudadM(ventas);
  const entradas = Object.entries(totales);
  const mayor = entradas.reduce((mayorActual, actual) => actual[1] > mayorActual[1] ? actual : mayorActual);
  return { ciudad: mayor[0], total: mayor[1] };
}

function productoMasVendidoPorUnidades(ventas) {
  const unidades = analitica.unidadesPorProductoM(ventas);
  const entradas = Object.entries(unidades);
  const mayor = entradas.reduce((mayorActual, actual) => actual[1] > mayorActual[1] ? actual : mayorActual);
  return { producto: mayor[0], unidades: mayor[1] };
}

function ventaDeMayorValor(ventas) {
  return ventas.reduce((mayorActual, ventaActual) => analitica.valorVenta(ventaActual) > analitica.valorVenta(mayorActual) ? ventaActual : mayorActual);
}

console.log("\n=== DESTACADOS ===");
console.log("Ciudad con mayor venta:", ciudadConMayorVenta(ventas));
console.log("Producto más vendido por unidades:", productoMasVendidoPorUnidades(ventas));
console.log("Venta de mayor valor:", ventaDeMayorValor(ventas));

const productosOrdenadosPorValor = analitica.topProductosPorValorM(ventas, ventas.length);

console.log("\n=== PRIMEROS 5 PRODUCTOS POR VALOR ===");
console.table(productosOrdenadosPorValor.slice(0, 5));

console.log("\n=== ÚLTIMOS 3 PRODUCTOS POR VALOR ===");
console.table(productosOrdenadosPorValor.slice(-3));

console.log("\n=== VENTAS CON VALOR MAYOR A 15000 ===");
const ventasMayoresA15000 = ventas.filter((venta) => analitica.valorVenta(venta) > 15000);
console.table(ventasMayoresA15000);

const ventasPorCiudad = ventas.reduce((acumulado, venta) => {
  const clave = venta.ciudad.trim().toLowerCase();
  if (!acumulado[clave]) acumulado[clave] = [];
  acumulado[clave].push(venta);
  return acumulado;
}, {});
const todasLasVentas = Object.values(ventasPorCiudad).flatMap((lista) => lista);

console.log("\n=== VENTAS UNIDAS CON FLATMAP ===");
console.log(`Total de ventas unidas: ${todasLasVentas.length}`);

console.log("\n=== PRODUCTOS CON SU PORCENTAJE DEL TOTAL GENERAL ===");
const productosConPorcentaje = productosOrdenadosPorValor.map((producto) => ({
  ...producto,
  porcentaje: (producto.total / totalGeneral) * 100
}));

productosConPorcentaje.forEach((producto) => {
  console.log(`${producto.producto}: $${formatoPesos(producto.total)} - ${producto.porcentaje.toFixed(2)}%`);
});

console.log("\n=== VERIFICACIONES ===");
const algunaSupera100000 = ventas.some((venta) => analitica.valorVenta(venta) > 100000);
const todasMayoresA0 = ventas.every((venta) => analitica.valorVenta(venta) > 0);
console.log(`¿Alguna venta supera 100000?: ${algunaSupera100000}`);
console.log(`¿Todas las ventas tienen un valor mayor a 0?: ${todasMayoresA0}`);

console.log("\n=== VENTAS DEL DÍA ===");

const diaConVentas = "2026-09-01";
const ventasDiaConVentas = analitica.ventasDelDia(ventas, diaConVentas);
const totalDiaConVentas = ventasDiaConVentas.reduce((acumulado, venta) => acumulado + analitica.valorVenta(venta), 0);
console.log(`Día ${diaConVentas} - Cantidad: ${ventasDiaConVentas.length} - Total: $${formatoPesos(totalDiaConVentas)}`);
console.table(ventasDiaConVentas);

const diaSinVentas = "2026-09-10";
const ventasDiaSinVentas = analitica.ventasDelDia(ventas, diaSinVentas);
const totalDiaSinVentas = ventasDiaSinVentas.reduce((acumulado, venta) => acumulado + analitica.valorVenta(venta), 0);
console.log(`Día ${diaSinVentas} - Cantidad: ${ventasDiaSinVentas.length} - Total: $${formatoPesos(totalDiaSinVentas)}`);
console.table(ventasDiaSinVentas);