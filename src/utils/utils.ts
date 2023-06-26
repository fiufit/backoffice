export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toLocalTimeString(date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions): string {
    return new Date(date).toLocaleTimeString(locales, options);
}

export function toLocalDateString(date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions) {
    return new Date(date).toLocaleDateString(locales, options);
}

export function debounce(func: (event: React.ChangeEvent<HTMLInputElement>) => void, delay: number = 750) {
    let timerId: number;
    return function(event: React.ChangeEvent<HTMLInputElement>) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
        func(event);
        }, delay);
    };
}

export function getPercentage(partial: number, total: number): string {

  const percentage = (partial / total) * 100;
  const porcentajeRedondeado = percentage.toFixed(2); // Redondea a dos decimales

  return porcentajeRedondeado + "%";

}

export function boolToStr(val: boolean): string {
    return val ? "true" : "false";
}

export function strToBool(val: string): boolean {
    const newVal = val.trim().toLocaleLowerCase();
    return (newVal === "true");
}