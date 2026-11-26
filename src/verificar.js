const ventas = require("./datos.js");
const {
  totalVendido,
  totalVendidoM,
  unidadesVendidas,
  unidadesVendidasM,
  ventasPorCiudad,
  ventasPorCiudadM
} = require("./analitica.js");

function verificar(nombre, valorCiclo, valorMetodo) {
  const igual = valorCiclo === valorMetodo;
  console.log(`${nombre}: ciclo = ${valorCiclo} | metodo = ${valorMetodo} | ${igual ? "OK" : "DIFERENTE"}`);
}

verificar("totalVendido", totalVendido(ventas), totalVendidoM(ventas));
verificar("unidadesVendidas", unidadesVendidas(ventas), unidadesVendidasM(ventas));
verificar("ventasPorCiudad Medellin", ventasPorCiudad(ventas, "Medellín"), ventasPorCiudadM(ventas, "Medellín"));
verificar("ventasPorCiudad Medellin con desorden", ventasPorCiudad(ventas, "  MEDELLÍN  "), ventasPorCiudadM(ventas, "  MEDELLÍN  "));