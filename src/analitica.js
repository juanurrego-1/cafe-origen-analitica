function valorVenta(venta) {
    return venta.cantidad * venta.precio;
}

function totalVendido(ventas) {
    let total = 0;
    for (let venta of ventas) {
        total += valorVenta(venta)
    }
    return total;
}

function unidadesVendidas(ventas) {
    let total = 0;
    for (let venta of ventas) {
        total += venta.cantidad;
    }
    return total;
}

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

function totalVendidoM(ventas) {
  return ventas.reduce((acumulado, venta) => acumulado + valorVenta(venta), 0);
}

function unidadesVendidasM(ventas) {
  return ventas.reduce((acumulado, venta) => acumulado + venta.cantidad, 0);
}

function ventasPorCiudadM(ventas, ciudad) {
  const ciudadBuscada = ciudad.trim().toLowerCase();
  return ventas
    .filter((venta) => venta.ciudad.trim().toLowerCase() === ciudadBuscada)
    .reduce((acumulado, venta) => acumulado + valorVenta(venta), 0);
}

function totalPorCiudad(ventas) {
  const totales = {};
  for (const venta of ventas) {
    const clave = venta.ciudad.trim().toLowerCase();
    if (!totales[clave]) {
      totales[clave] = 0;
    }
    totales[clave] += valorVenta(venta);
  }
  return totales;
}

function unidadesPorProducto(ventas) {
  const unidades = {};
  for (const venta of ventas) {
    const producto = venta.producto.trim();
    if (!unidades[producto]) {
      unidades[producto] = 0;
    }
    unidades[producto] += venta.cantidad;
  }
  return unidades;
}

function topProductosPorValor(ventas, k) {
  const totales = {};
  for (const venta of ventas) {
    const producto = venta.producto.trim();
    if (!totales[producto]) {
      totales[producto] = 0;
    }
    totales[producto] += valorVenta(venta);
  }
  const lista = Object.entries(totales).map(([producto, total]) => ({ producto, total }));
  const ordenada = [...lista].sort((a, b) => b.total - a.total);
  return ordenada.slice(0, k);
}

function totalPorCiudadM(ventas) {
  return ventas.reduce((totales, venta) => {
    const clave = venta.ciudad.trim().toLowerCase();
    totales[clave] = (totales[clave] || 0) + valorVenta(venta);
    return totales;
  }, {});
}

function unidadesPorProductoM(ventas) {
  return ventas.reduce((unidades, venta) => {
    const producto = venta.producto.trim();
    unidades[producto] = (unidades[producto] || 0) + venta.cantidad;
    return unidades;
  }, {});
}

function topProductosPorValorM(ventas, k) {
  const totales = ventas.reduce((acumulado, venta) => {
    const producto = venta.producto.trim();
    acumulado[producto] = (acumulado[producto] || 0) + valorVenta(venta);
    return acumulado;
  }, {});
  const lista = Object.entries(totales).map(([producto, total]) => ({ producto, total }));
  const ordenada = [...lista].sort((a, b) => b.total - a.total);
  return ordenada.slice(0, k);
}

function ventasDelDia(ventas, fecha) {
  return ventas.filter((venta) => venta.fecha === fecha);
}

function clientesRecurrentes(ventas) {
  const recurrentes = [];
  for (let i = 0; i < ventas.length; i++) {
    for (let j = i + 1; j < ventas.length; j++) {
      if (ventas[i].cliente === ventas[j].cliente && !recurrentes.includes(ventas[i].cliente)) {
        recurrentes.push(ventas[i].cliente);
      }
    }
  }
  return recurrentes;
}

function totalCiudadCadena(ventas, ciudad) {
  const ciudadBuscada = ciudad.trim().toLowerCase();
  return ventas
    .map(v => ({ ...v, ciudad: v.ciudad.trim().toLowerCase() })) // 1er recorrido, crea arreglo 1
    .filter(v => v.ciudad === ciudadBuscada) // 2do recorrido, crea arreglo 2
    .map(v => v.cantidad * v.precio) // 3er recorrido, crea arreglo 3
    .reduce((acc, valor) => acc + valor, 0); // 4to recorrido
}

function totalCiudadUnaPasada(ventas, ciudad) {
  const ciudadBuscada = ciudad.trim().toLowerCase();
  let total = 0;
  for (const venta of ventas) { // 1 solo recorrido, 0 arreglos nuevos
    if (venta.ciudad.trim().toLowerCase() === ciudadBuscada) {
      total += venta.cantidad * venta.precio;
    }
  }
  return total;
}



function clientesRecurrentesSet(ventas) {
  const vistos = new Set();
  const recurrentes = new Set();

  for (const venta of ventas) {
    if (vistos.has(venta.cliente)) {
      recurrentes.add(venta.cliente);
    } else {
      vistos.add(venta.cliente);
    }
  }
  return [...recurrentes];
}

function comprasPorCliente(ventas) {
  const conteo = new Map();

  for (const venta of ventas) {
    conteo.set(venta.cliente, (conteo.get(venta.cliente) || 0) + 1);
  }

  const recurrentes = [];
  for (const [cliente, cantidad] of conteo) {
    if (cantidad > 1) {
      recurrentes.push(cliente);
    }
  }
  return recurrentes;
}


function comboRegaloFuerzaBruta(catalogo, valor) {
  for (let i = 0; i < catalogo.length; i++) {
    for (let j = i + 1; j < catalogo.length; j++) {
      if (catalogo[i].precio + catalogo[j].precio === valor) {
        return [catalogo[i], catalogo[j]];
      }
    }
  }
  return null;
}


function comboRegalo(catalogo, valor) {
  const vistos = new Map(); // precio -> producto

  for (const producto of catalogo) {
    const complemento = valor - producto.precio;
    if (vistos.has(complemento)) {
      return [vistos.get(complemento), producto];
    }
    vistos.set(producto.precio, producto);
  }
  return null;
}

function productoEstrellaPorCiudad(ventas) {
  const porCiudad = new Map(); // ciudad -> Map(producto -> conteo)

  for (const venta of ventas) {
    if (!porCiudad.has(venta.ciudad)) {
      porCiudad.set(venta.ciudad, new Map());
    }
    const conteo = porCiudad.get(venta.ciudad);
    conteo.set(venta.producto, (conteo.get(venta.producto) || 0) + 1);
  }

  const resultado = {};
  for (const [ciudad, conteo] of porCiudad) {
    let maxProducto = null;
    let maxConteo = 0;
    for (const [producto, cantidad] of conteo) {
      if (cantidad > maxConteo) {
        maxConteo = cantidad;
        maxProducto = producto;
      }
    }
    resultado[ciudad] = { producto: maxProducto, ventas: maxConteo };
  }
  return resultado;
}

function primerClienteUnico(ventas) {
  const conteo = new Map();

  for (const venta of ventas) {
    conteo.set(venta.cliente, (conteo.get(venta.cliente) || 0) + 1);
  }

  for (const venta of ventas) {
    if (conteo.get(venta.cliente) === 1) {
      return venta.cliente;
    }
  }
  return null;
}


function mejorSemanaBruta(dias, k) {
  if (k > dias.length) return null;
  let maxTotal = -Infinity;
  let maxInicio = 0;

  for (let i = 0; i <= dias.length - k; i++) {
    let total = 0;
    for (let j = 0; j < k; j++) {
      total += dias[i + j];
    }
    if (total > maxTotal) {
      maxTotal = total;
      maxInicio = i;
    }
  }
  return { total: maxTotal, inicio: maxInicio };
}

function mejorSemana(dias, k) {
  if (k > dias.length) return null;

  // 1. Calcula la primera ventana
  let ventana = 0;
  for (let i = 0; i < k; i++) {
    ventana += dias[i];
  }

  let maxTotal = ventana;
  let maxInicio = 0;

  // 2. Desliza: suma el que entra, resta el que sale
  for (let i = k; i < dias.length; i++) {
    ventana = ventana + dias[i] - dias[i - k];
    if (ventana > maxTotal) {
      maxTotal = ventana;
      maxInicio = i - k + 1;
    }
  }
  return { total: maxTotal, inicio: maxInicio };
}

function parMasCercano(precios, presupuesto) {
  let izq = 0;
  let der = precios.length - 1;
  let mejorPar = null;
  let mejorSuma = -Infinity;

  while (izq < der) {
    const suma = precios[izq] + precios[der];
    if (suma <= presupuesto) {
      if (suma > mejorSuma) {
        mejorSuma = suma;
        mejorPar = [precios[izq], precios[der]];
      }
      izq++; // puedo intentar acercarme más subiendo el menor
    } else {
      der--; // me pasé, bajo el mayor
    }
  }
  return mejorPar;
}

module.exports = {
  valorVenta,
  totalVendido,
  unidadesVendidas,
  ventaMayor,
  ticketPromedio,
  ventasPorCiudad,
  totalVendidoM,
  unidadesVendidasM,
  ventasPorCiudadM,
  totalPorCiudad,
  unidadesPorProducto,
  topProductosPorValor,
  totalPorCiudadM,
  unidadesPorProductoM,
  topProductosPorValorM,
  ventasDelDia,
  clientesRecurrentes,
  totalCiudadCadena,
  totalCiudadUnaPasada,
  clientesRecurrentesSet,
  comprasPorCliente,
  comboRegaloFuerzaBruta,
  comboRegalo,
  productoEstrellaPorCiudad,
  primerClienteUnico,
  mejorSemanaBruta,
  mejorSemana,
  parMasCercano
};