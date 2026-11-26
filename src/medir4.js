const { generarVentas } = require("./generador");
const { clientesRecurrentes, clientesRecurrentesSet, comprasPorCliente } = require("./analitica");

// Datos Día 1 - 12 ventas
const dia1 = [
  { cliente: "C01" }, { cliente: "C02" }, { cliente: "C01" },
  { cliente: "C03" }, { cliente: "C02" }, { cliente: "C04" },
  { cliente: "C01" }, { cliente: "C03" }, { cliente: "C05" },
  { cliente: "C06" }, { cliente: "C02" }, { cliente: "C07" },
];

console.log("Día 1 Original:", [...clientesRecurrentes(dia1)].sort());
console.log("Día 1 Set:", [...clientesRecurrentesSet(dia1)].sort());
console.log("Día 1 Map:", [...comprasPorCliente(dia1)].sort());

// Verificación con 5000
const ventas5000 = generarVentas(5000);
const a = [...clientesRecurrentes(ventas5000)].sort().join(",");
const b = [...clientesRecurrentesSet(ventas5000)].sort().join(",");
const c = [...comprasPorCliente(ventas5000)].sort().join(",");
console.log("¿Las 3 iguales con 5000?", a === b && b === c);

// Medición
for (const n of [1000, 10000, 100000]) {
  const ventas = generarVentas(n);
  if (n <= 10000) {
    console.time(`Original n=${n}`);
    clientesRecurrentes(ventas);
    console.timeEnd(`Original n=${n}`);
  }
  console.time(`Set n=${n}`);
  clientesRecurrentesSet(ventas);
  console.timeEnd(`Set n=${n}`);

  console.time(`Map n=${n}`);
  comprasPorCliente(ventas);
  console.timeEnd(`Map n=${n}`);
}