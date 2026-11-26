const { generarVentas } = require("./generador");
const { totalCiudadCadena, totalCiudadUnaPasada } = require("./analitica");

const ventas = generarVentas(10000);
const cadena = totalCiudadCadena(ventas, "Medellín");
const unaPasada = totalCiudadUnaPasada(ventas, "Medellín");

console.log("Cadena:", cadena);
console.log("Una pasada:", unaPasada);
console.log("¿Iguales?", cadena === unaPasada);