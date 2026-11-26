const { mejorSemanaBruta, mejorSemana, parMasCercano } = require("./analitica");

const ventasDiarias = [320, 410, 280, 390, 510, 620, 700, 300, 290, 450, 480, 530, 610, 680, 350, 330, 420, 470, 560, 640, 710, 380, 360, 440, 500, 590, 650, 720, 400, 370];

console.log("Bruta:", mejorSemanaBruta(ventasDiarias, 7));
console.log("Ventana:", mejorSemana(ventasDiarias, 7));

// Medición 100.000 días al azar
const diasGrandes = Array.from({ length: 100000 }, () => Math.floor(Math.random() * 500) + 200);
console.time("Bruta 100k");
mejorSemanaBruta(diasGrandes, 7);
console.timeEnd("Bruta 100k");
console.time("Ventana 100k");
mejorSemana(diasGrandes, 7);
console.timeEnd("Ventana 100k");

// Par más cercano
const precios = [18000, 26000, 35000, 42000, 45000, 79000, 95000, 120000];
console.log("100.000:", parMasCercano(precios, 100000));
console.log("140.000:", parMasCercano(precios, 140000));
console.log("40.000:", parMasCercano(precios, 40000));