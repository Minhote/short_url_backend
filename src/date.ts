import { getDaysToExpire, getFormattedDateUTC } from "./utils/fns";

// function addOneDay(date: Date, numberOfDays = 1): Date {
//   const newDate = new Date(date); // Crear una copia de la fecha original
//   newDate.setDate(newDate.getDate() + numberOfDays); // Aumentar un día
//   return newDate;
// }
const hoy = new Date();
const expira = new Date("2025-02-18 15:41:22.547");
const expirado = new Date("2025-02-20 16:47:46.812");
console.table([
  ["hoy", hoy],
  ["expira", expira],
]);

// Pendiente generar un bucle para saber cuantos dias faltan para que expire la url y devolverlo a la view

// let str1 = new Date(getFormattedDateUTC(hoy, 89)).toISOString().split("T")[0];
// let str2 = new Date(expira).toISOString().split("T")[0];
// console.log(str1 === str2);

// console.log(getDaysToExpire(expira.toString()));
const utcNow = new Date(
  Date.UTC(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
);

const utcExpired = new Date(
  Date.UTC(expirado.getFullYear(), expirado.getMonth(), expirado.getDate())
);
const utcExpiration = new Date(
  Date.UTC(expira.getFullYear(), expira.getMonth(), expira.getDate())
);
// console.log(
//   utcNow,
//   utcExpiration,
//   utcExpiration.getTime(),
//   utcNow.getTime(),
//   (utcExpiration.getTime() - utcNow.getTime()) / (1000 * 60 * 60 * 24)
// );

console.log(getDaysToExpire("2025-02-18 15:41:22.547"));
