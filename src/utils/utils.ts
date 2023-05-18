export function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function toLocalTimeString(date: string, locales: Intl.LocalesArgument, options: Intl.DateTimeFormatOptions): string {
    return new Date(date).toLocaleTimeString(locales, options);
}