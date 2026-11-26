function generarVentas(n) {
  const productos = ["Camiseta", "Pantalón", "Zapatos", "Gorra", "Chaqueta"];
  const ciudades = ["Medellín", "Bogotá", "Cali", "Barranquilla"];
  const clientes = ["Ana", "Luis", "Carlos", "María", "Juan", "Sofía"];
  const precios = [25000, 45000, 80000, 15000, 120000];

  const ventas = [];
  for (let i = 0; i < n; i++) {
    ventas.push({
      producto: productos[Math.floor(Math.random() * productos.length)],
      ciudad: ciudades[Math.floor(Math.random() * ciudades.length)],
      cliente: clientes[Math.floor(Math.random() * clientes.length)],
      precio: precios[Math.floor(Math.random() * precios.length)],
      cantidad: Math.floor(Math.random() * 5) + 1, // entre 1 y 5
      fecha: "2026-09-01"
    });
  }
  return ventas;
}

module.exports = { generarVentas };