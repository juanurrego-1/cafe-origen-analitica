const { generarVentas } = require("./generador");
const { clientesRecurrentes } = require("./analitica");

const tamanos = [1000, 2000, 4000, 8000, 16000];

for (const n of tamanos) {
  const ventas = generarVentas(n);
  console.time(`n=${n}`);
  clientesRecurrentes(ventas);
  console.timeEnd(`n=${n}`);
}

// Paso 6 del reto: probar solo si es menor a 2 minutos
const ventas100k = generarVentas(100000);
console.time("n=100000");
clientesRecurrentes(ventas100k);
console.timeEnd("n=100000");