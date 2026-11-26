const ventas = require("./datos.js");
const { ticketPromedio, ventasPorCiudad } = require("./analitica.js");

console.log("Cantidad de registros:", ventas.length);

console.log("Primer registro:");
console.log(ventas[0]);

console.log("Último registro:");
console.log(ventas[ventas.length - 1]);

console.log("Producto en la posición 4:");
console.log(ventas[4].producto);

console.log("Tabla completa de ventas:");
console.table(ventas);

console.log('Ticket promedio:', ticketPromedio(ventas));

console.log('Medellín:', ventasPorCiudad(ventas, "Medellín"));
console.log('Medellín con desorden:', ventasPorCiudad(ventas, "  MEDELLÍN  "));