es la primera vez que me familiariso con el tema por lo que tuve que usar ia para entender por donde empezar.

Con 5 ventas, la función hace 10 comparaciones.
Fórmula general: n _ (n - 1) / 2
Con n=5: 5 _ 4 / 2 = 10
Por eso es O(n²), porque las comparaciones crecen como el cuadrado de n.


## Clientes recurrentes - O(n²)

### Mediciones reales
n=1000: 3.301ms
n=2000: 8.023ms
n=4000: 27.518ms
n=8000: 117.216ms
n=16000: 501.502ms
n=100000: 20.754s

### Análisis
Cada vez que duplico n, el tiempo se multiplica por ~4. Esto confirma que es O(n²).

### Estimación
Predicción para 100.000 desde 16.000: 19.57s. Real: 20.754s. La estimación fue correcta.
Estimación para 1.000.000: ~32 minutos. Por eso no se ejecutó, sería inviable.

### Costo oculto de includes
includes() también recorre el arreglo recurrentes. En el peor caso, si hay muchos clientes recurrentes, la función se vuelve peor que O(n²).

### Conclusión para la gerente
El reporte se vuelve lento porque por cada venta vuelve a revisar todas las demás para buscar repetidos. Con pocos datos no se nota, pero cuando el historial crece, el trabajo crece mucho más rápido que los datos.


Comparación totalCiudadCadena vs totalCiudadUnaPasada

totalCiudadCadena:
- Recorridos completos: 4 (map, filter, map, reduce)
- Arreglos nuevos creados: 3 (uno en cada map y uno en el filter)
- Tiempo: O(4n) = O(n)
- Espacio: O(3n) = O(n)

totalCiudadUnaPasada:
- Recorridos completos: 1 (un solo for)
- Arreglos nuevos creados: 0
- Tiempo: O(n)
- Espacio: O(1)

Conclusión: las dos tienen el mismo tiempo O(n), pero la versión de cadena usa memoria O(n) porque crea arreglos intermedios, mientras la versión de una pasada usa memoria O(1) porque solo guarda un total.



Aunque la cadena recorre el arreglo 4 veces, en Big O se eliminan las constantes. O(4n) se simplifica a O(n). Las dos crecen igual cuando n crece, la diferencia no está en el tiempo sino en la memoria.

- totalVendido: Tiempo O(n), Espacio O(1) - solo guarda un total
- ventaMayor: Tiempo O(n), Espacio O(1) - solo guarda la mayor
- primerVenta: Tiempo O(1), Espacio O(1) - solo devuelve el primero
- clientesRecurrentes: Tiempo O(n²), Espacio O(r) - guarda los recurrentes, r = # clientes repetidos
- totalPorCiudad: Tiempo O(n), Espacio O(k) - guarda un total por cada ciudad distinta, k = # ciudades
- topProductosPorValor: Tiempo O(n + m log m), Espacio O(m) - guarda un total por cada producto distinto y luego ordena, m = # productos
- totalCiudadCadena: Tiempo O(n), Espacio O(n) - crea 3 arreglos del tamaño de las ventas
- totalCiudadUnaPasada: Tiempo O(n), Espacio O(1) - solo guarda un total


Dejo totalCiudadUnaPasada en el motor. La cadena se lee mejor, pero en un servidor con memoria limitada crear 3 arreglos nuevos por cada reporte es un desperdicio. La versión de una pasada da el mismo resultado, con el mismo tiempo O(n), pero con memoria O(1). En este caso, los recursos pesan más que la legibilidad.



## Optimización clientes recurrentes - Método

### 1. Entender
Entrada: arreglo de ventas, cada venta tiene cliente.
Salida: arreglo con los clientes que compraron más de 1 vez, sin repetidos.
Restricciones: debe responder en menos de 1 segundo con 100.000 ventas. No puede usar ciclos anidados.

### 2. Ejemplos y casos borde
- Ventas vacías -> []
- Todas de un solo cliente -> [ese cliente]
- Todos clientes distintos -> []
- Un cliente con 2 compras y resto distintos -> [ese cliente]

### 3. Fuerza bruta
Versión actual: por cada venta compara con todas las demás.
Complejidad: Tiempo O(n²), Espacio O(r) donde r = recurrentes.
Problema: con 100.000 tarda 20,7 segundos.

### 4. Idea de optimización
En vez de buscar de nuevo cada cliente en todo el arreglo, guardar lo que ya vi en una estructura de búsqueda en tiempo constante: Set o Map.
Así cada venta se revisa una sola vez.
Complejidad esperada: Tiempo O(n), Espacio O(n) por guardar los clientes vistos.


### Medición optimización

Verificación:
- Día 1: Original, Set y Map devuelven ['C01', 'C02', 'C03']
- Con 5000 ventas: ¿Las 3 iguales? true

Tiempos:
- n=1000: Original 2.137ms, Set 0.038ms, Map 0.03ms
- n=10000: Original 251.545ms, Set 0.761ms, Map 0.332ms
- n=100000: Original 20.754s, Set 2.007ms, Map 3.13ms

Conclusión: las dos versiones optimizadas son O(n) y cumplen el requisito de menos de 1 segundo con 100.000 ventas. La original era O(n²) y tardaba 20,7 segundos.