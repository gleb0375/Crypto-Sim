export const compactNumber = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 2
});

export function formatCompact(value: number): string {
    return compactNumber.format(value);
}

export const formatUsdWithSpaces = (value: number): string => {
    return value
        .toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })
        .replace(/,/g, " ");
};

export const formatBtcWithSpaces = (value: number): string => {
    return value
        .toLocaleString("en-US", {
            minimumFractionDigits: 8,
            maximumFractionDigits: 8,
        })
        .replace(/,/g, " ");
};