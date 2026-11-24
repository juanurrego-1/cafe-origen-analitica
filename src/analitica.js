function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

module.exports = {
    valorVenta
};




// Calcula el total vendido en dinero
function totalVendido(ventas) {
    let total = 0;

    for (let venta of ventas) {
        total += valorVenta(venta)
    }

    return total;
}

// Calcula la cantidad total de unidades vendidas
function unidadesVendidas(ventas) {
    let total = 0;

    for (let venta of ventas) {
        total += venta.cantidad;
    }

    return total;
}

// Encuentra la venta de mayor valor
function ventaMayor(ventas) {
    let mayor = ventas[0];

    for (let venta of ventas) {
        if (valorVenta(venta) > valorVenta(mayor)) {
            mayor = venta;
        }
    }

    return mayor;
}

function ticketPromedio(ventas) {
  let total = 0;
  let validas = 0;

  for (const venta of ventas) {
    if (venta.cantidad > 0) {
      total += valorVenta(venta);
      validas++;
    }
  }

  if (validas === 0) {
    return 0;
  }

  return total / validas;
}

function ventasPorCiudad(ventas, ciudad) {
  let total = 0;
  const ciudadBuscada = ciudad.trim().toLowerCase();

  for (const venta of ventas) {
    const ciudadVenta = venta.ciudad.trim().toLowerCase();
    if (ciudadVenta === ciudadBuscada) {
      total += valorVenta(venta);
    }
  }

  return total;
}






// Exportar las funciones
module.exports = {
    totalVendido,
    unidadesVendidas,
    ventaMayor,
    ticketPromedio,
    ventasPorCiudad



};

