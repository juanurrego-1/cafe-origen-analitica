# Rendimiento del motor de analítica - Café Origen v0.2

Documento técnico que describe el rendimiento del software que se conectará con la plataforma del marketplace.

## 1. Tabla de rendimiento

Mediciones realizadas con 10.000 ventas generadas con `generador.js`.

| Función | Qué hace | Complejidad temporal | Complejidad espacial | Justificación | Medido con 10.000 ventas |
|---|---|---|---|---|---|
| totalVendido | Suma cantidad * precio de todas las ventas | O(n) | O(1) | Recorre el arreglo una vez y solo guarda un total | 20.000 operaciones |
| ventaMayor | Busca la venta de mayor valor | O(n) | O(1) | Recorre el arreglo una vez y solo guarda la mayor | 40.000 operaciones |
| totalPorCiudad | Suma ventas por cada ciudad | O(n) | O(k) | Recorre el arreglo una vez, guarda un total por cada ciudad distinta, k = número de ciudades | 20.000 operaciones |
| primerVenta | Devuelve la primera venta | O(1) | O(1) | No recorre el arreglo, solo accede a la posición 0 | 1 operación |
| clientesRecurrentes | Encuentra clientes que compraron más de una vez | O(n²) | O(r) | Tiene un ciclo dentro de otro ciclo para comparar cada venta con las demás. Guarda los recurrentes, r = número de clientes recurrentes | ~183 ms medido por proyección desde 8.000 ventas |
| totalCiudadCadena | Suma ventas de una ciudad usando map, filter, map y reduce | O(n) | O(n) | Hace 4 recorridos y crea 3 arreglos intermedios. En Big O se eliminan constantes: O(4n) = O(n) | 4 recorridos, 3 arreglos nuevos |
| totalCiudadUnaPasada | Suma ventas de una ciudad en un solo recorrido | O(n) | O(1) | Hace 1 recorrido y solo guarda un total | 1 recorrido, 0 arreglos nuevos |
| topProductosPorValor | Suma ventas por producto y ordena de mayor a menor | O(n + m log m) | O(m) | Recorre las ventas una vez para sumar por producto y luego ordena los productos. m = número de productos distintos | 1 recorrido + ordenamiento |

## 2. Proyección para 1.000.000 de ventas

Estimación a partir de las mediciones con 10.000 ventas y 16.000 ventas.

| Función | Proyección para 1.000.000 de ventas | Cómo se calculó |
|---|---|---|
| totalVendido | 2.000.000 operaciones | O(n): se multiplica por 100 porque 1.000.000 / 10.000 = 100 |
| ventaMayor | 4.000.000 operaciones | O(n): se multiplica por 100 |
| totalPorCiudad | 2.000.000 operaciones | O(n): se multiplica por 100 |
| primerVenta | 1 operación | O(1): no cambia, siempre es 1 |
| clientesRecurrentes | ~32 minutos | O(n²): desde 16.000 ventas que tardó 0,501 s. 0,501 * (1.000.000 / 16.000)² = 0,501 * 3.906 = 1.957 s. No se ejecutó por ser inviable |
| totalCiudadCadena | 4.000.000 de pasos y 3 arreglos de 1.000.000 | O(n) en tiempo, pero O(n) en memoria |
| totalCiudadUnaPasada | 1.000.000 de pasos, memoria O(1) | O(n) en tiempo, O(1) en memoria |
| topProductosPorValor | 1.000.000 de pasos + ordenamiento de m productos | El ordenamiento crece más rápido que n, pero menos que n² |

## 3. Riesgos

Orden de mayor a menor riesgo cuando crezcan los datos:

1. **clientesRecurrentes - Riesgo alto.** Es O(n²). Con 16.000 ventas tarda 0,501 s, con 100.000 tarda 20,7 s y con 1.000.000 tardaría ~32 minutos. Es el único que se vuelve inviable.
2. **topProductosPorValor - Riesgo medio.** Es O(n + m log m). Si crece mucho la cantidad de productos distintos, el ordenamiento empieza a pesar.
3. **totalPorCiudad - Riesgo medio bajo.** Es O(n) en tiempo, pero su memoria O(k) crece con la cantidad de ciudades distintas.
4. **totalCiudadCadena - Riesgo medio bajo.** Es O(n) en tiempo, pero su memoria O(n) crea 3 arreglos nuevos por cada reporte.
5. **totalVendido, ventaMayor, totalCiudadUnaPasada - Riesgo bajo.** Son O(n) en tiempo y O(1) en memoria.
6. **primerVenta - Riesgo nulo.** Es O(1) en tiempo y memoria.

**Criterio:** se ordena primero por complejidad temporal, porque el tiempo es lo que deja al usuario esperando. Después se tiene en cuenta la complejidad espacial, porque la memoria extra también puede agotar el servidor.

## 4. Plan de optimización

### Función de mayor riesgo: clientesRecurrentes

**Idea de mejora sin implementarla todavía:**

En vez de comparar cada venta con todas las demás, se puede contar cuántas veces aparece cada cliente en una sola pasada usando un objeto o un Map, y al final quedarse con los que tienen conteo mayor a 1.

**¿Qué trabajo se repite?**
Se repite la comparación de los mismos clientes muchas veces. Si un cliente tiene 50 compras, la función actual lo compara 50 veces contra todas las demás ventas.

**¿Qué información se podría guardar para no buscarla de nuevo?**
El conteo de compras por cliente. Si ya se contó que un cliente apareció 2 veces, no hay que volver a buscarlo en todo el arreglo, solo hay que aumentar su contador.

Con esa mejora la función pasaría de O(n²) a O(n) en tiempo, y su memoria seguiría siendo O(r), solo para guardar los clientes recurrentes.

## 5. Revisión de un compañero

Observación de un compañero: "El documento está claro, pero ¿por qué no optimizan de una vez clientesRecurrentes si ya saben que es O(n²)?"

Respuesta: Porque este documento es la versión v0.2 de diagnóstico. Primero se necesitaba la evidencia con mediciones para justificar el cambio ante la gerencia y el marketplace. La optimización está propuesta en el plan anterior y será el siguiente paso, para no cambiar el motor sin tener la línea base medida.