export const compactNumber = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
});

export function formatCompact(value: number): string {
    return compactNumber.format(value);
}