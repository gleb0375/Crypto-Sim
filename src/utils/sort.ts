import { WalletCoinItem } from "../types/wallet.types";

export type SortKey = "name" | "holdings" | "value" | null;
export type SortDirection = "asc" | "desc" | null;

export const sortWalletCoins = (
    coins: WalletCoinItem[],
    sortKey: SortKey,
    sortDirection: SortDirection
): WalletCoinItem[] => {
    if (!sortKey || !sortDirection) return coins;

    const sorted = [...coins];

    if (sortKey === "name") {
        sorted.sort((a, b) =>
            sortDirection === "asc"
                ? a.name.localeCompare(b.name)
                : b.name.localeCompare(a.name)
        );
    } else {
        sorted.sort((a, b) => {
            const aVal = sortKey === "holdings" ? a.holdings : a.value;
            const bVal = sortKey === "holdings" ? b.holdings : b.value;
            return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        });
    }

    return sorted;
};
