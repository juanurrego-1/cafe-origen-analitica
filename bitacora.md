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