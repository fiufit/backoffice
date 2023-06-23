enum Meses {
    Enero = 1,
    Febrero = 2,
    Marzo = 3,
    Abril = 4,
    Mayo = 5,
    Junio = 6,
    Julio = 7,
    Agosto = 8,
    Septiembre = 9,
    Octubre = 10,
    Noviembre = 11,
    Diciembre = 12
}

export function getLastDayOfMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export function getMonthAndYearLessMonth(lessMonth: number) {

  var date = new Date();
  
  // Resta lessMonth meses a la fecha actual
  date.setMonth(date.getMonth() - lessMonth);
  
  var year = date.getFullYear();
  var month = date.getMonth();
  
  return {
    year: year,
    month: month
  };

}

export function getMonthName(month: number): string {
  return Meses[month];
}

export function addDays(date: Date, days: number): Date {
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export function sameDay(date1: Date, date2: Date): boolean {

  return date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate();

}

export function sameUTCDay(date1: Date, date2: Date): boolean {

  return date1.getUTCFullYear() === date2.getUTCFullYear() &&
    date1.getUTCMonth() === date2.getUTCMonth() &&
    date1.getUTCDate() === date2.getUTCDate();

}

export function isToday(date: Date): boolean {
  const today = new Date();
  return sameUTCDay(today, date);
}

export function formatDateUTCSimple(date: Date): string {
  
  const realMonth = date.getMonth() + 1;
  const month = (realMonth < 10) ? "0"+realMonth : realMonth;

  return date.getUTCDate()+"/"+month.toString()+"/"+date.getUTCFullYear();  
}