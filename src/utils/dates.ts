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