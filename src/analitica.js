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

// Exportar las funciones
module.exports = {
    totalVendido,
    unidadesVendidas,
    ventaMayor
};

