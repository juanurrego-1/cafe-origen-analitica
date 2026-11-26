const { generarVentas } = require("./generador");
const { catalogo } = require("./catalogo");
const {
  totalVendido, ventaMayor, totalPorCiudad, primerVenta,
  clientesRecurrentes, comprasPorCliente,
  productoEstrellaPorCiudad, comboRegalo, primerClienteUnico,
  mejorSemana
} = require("./analitica");

const n = parseInt(process.argv[2]) || 12;

// Día 1 real si no pasan número, si pasan número usa generadas
let ventas;
if (process.argv[2]) {
  ventas = generarVentas(n);
} else {
  ventas = [
    { cliente: "C01", ciudad: "Medellín", producto: "Origen Huila 500 g", cantidad: 2, precio: 42000 },
    { cliente: "C02", ciudad: "Medellín", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C01", ciudad: "Bogotá", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C03", ciudad: "Medellín", producto: "Origen Huila 500 g", cantidad: 3, precio: 42000 },
    { cliente: "C02", ciudad: "Bogotá", producto: "Taza de cerámica", cantidad: 1, precio: 35000 },
    { cliente: "C04", ciudad: "Medellín", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C01", ciudad: "Medellín", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C03", ciudad: "Bogotá", producto: "Origen Huila 500 g", cantidad: 2, precio: 42000 },
    { cliente: "C05", ciudad: "Bogotá", producto: "Taza de cerámica", cantidad: 1, precio: 35000 },
    { cliente: "C06", ciudad: "Medellín", producto: "Origen Sierra 500 g", cantidad: 1, precio: 45000 },
    { cliente: "C02", ciudad: "Medellín", producto: "Origen Huila 500 g", cantidad: 1, precio: 42000 },
    { cliente: "C07", ciudad: "Bogotá", producto: "Origen Sierra 500 g", cantidad: 2, precio: 45000 },
  ];
}

const ventasDiarias = [320, 410, 280, 390, 510, 620, 700, 300, 290, 450, 480, 530, 610, 680, 350, 330, 420, 470, 560, 640, 710, 380, 360, 440, 500, 590, 650, 720, 400, 370];

console.time("Reporte total");
console.log("=== CAFÉ ORIGEN - REPORTE v1.0 ===");
console.log("Ventas procesadas:", ventas.length);
console.log("\n1. Total vendido:", totalVendido(ventas));
console.log("2. Venta mayor:", ventaMayor(ventas));
console.log("3. Total por ciudad:", totalPorCiudad(ventas));
console.log("4. Primera venta:", primerVenta(ventas));
console.log("5. Clientes recurrentes (v1.0 optimizado):", comprasPorCliente(ventas));
console.log("6. Producto estrella por ciudad:", productoEstrellaPorCiudad(ventas));
console.log("7. Combo regalo 87.000:", comboRegalo(catalogo, 87000));
console.log("8. Cliente para cupón (primer cliente único):", primerClienteUnico(ventas));
console.log("9. Mejor semana septiembre:", mejorSemana(ventasDiarias, 7));
console.timeEnd("Reporte total");