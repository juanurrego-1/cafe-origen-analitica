const { catalogo } = require("./catalogo");
const { comboRegalo, productoEstrellaPorCiudad, primerClienteUnico } = require("./analitica");

console.log("87.000:", comboRegalo(catalogo, 87000));
console.log("61.000:", comboRegalo(catalogo, 61000));
console.log("0:", comboRegalo(catalogo, 0));
console.log("Vacío:", comboRegalo([], 87000));



const ventasDia1 = [
  { cliente: "C01", ciudad: "Medellín", producto: "Origen Huila 500 g" },
  { cliente: "C02", ciudad: "Medellín", producto: "Origen Sierra 500 g" },
  { cliente: "C01", ciudad: "Bogotá", producto: "Origen Huila 500 g" },
  { cliente: "C03", ciudad: "Medellín", producto: "Origen Huila 500 g" },
  { cliente: "C02", ciudad: "Bogotá", producto: "Taza de cerámica" },
  { cliente: "C04", ciudad: "Medellín", producto: "Origen Sierra 500 g" },
  { cliente: "C01", ciudad: "Medellín", producto: "Origen Huila 500 g" },
  { cliente: "C03", ciudad: "Bogotá", producto: "Origen Huila 500 g" },
  { cliente: "C05", ciudad: "Bogotá", producto: "Taza de cerámica" },
  { cliente: "C06", ciudad: "Medellín", producto: "Origen Sierra 500 g" },
  { cliente: "C02", ciudad: "Medellín", producto: "Origen Huila 500 g" },
  { cliente: "C07", ciudad: "Bogotá", producto: "Origen Sierra 500 g" },
];

console.log("Estrella:", productoEstrellaPorCiudad(ventasDia1));
console.log("Primer único:", primerClienteUnico(ventasDia1));