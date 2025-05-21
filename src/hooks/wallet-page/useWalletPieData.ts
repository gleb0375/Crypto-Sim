import { useMemo, useRef } from "react";
import { PieDataItem, WalletCoinItem } from "../../types/wallet.types.ts";
import { COINS, USDT_COIN } from "../../constants/coins.constants.ts";

const isSignificantlyDifferent = (prev: PieDataItem[], next: PieDataItem[], threshold = 0.01) => {
    if (prev.length !== next.length) return true;

    for (let i = 0; i < prev.length; i++) {
        if (prev[i].symbol !== next[i].symbol) return true;
        const diff = Math.abs(prev[i].value - next[i].value);
        const total = Math.max(prev[i].value, next[i].value);
        if (total > 0 && diff / total > threshold) return true;
    }

    return false;
};

export const useWalletPieData = (wallet: WalletCoinItem[]) => {
    const prevPieDataRef = useRef<PieDataItem[]>([]);

    const newPieData = useMemo(() => {
        const total = wallet.reduce((sum, c) => sum + c.value, 0);

        return wallet
            .filter(c => c.value > 0)
            .map(c => {
                const color =
                    c.symbol === "USDT"
                        ? USDT_COIN.color
                        : COINS.find(x => x.symbol === c.symbol)?.color || "#888";

                const rawValue   = Math.round(c.value / 10) * 10;
                const finalValue = rawValue < total * 0.01 ? 0 : rawValue;

                return {
                    symbol: c.symbol,
                    name  : c.name,
                    value : finalValue,
                    color,
                };
            })
            .filter(e => e.value > 0);
    }, [wallet]);

    const prevPieData = prevPieDataRef.current;

    const isDifferent = isSignificantlyDifferent(prevPieData, newPieData);

    if (isDifferent) {
        prevPieDataRef.current = newPieData;
    }

    return isDifferent ? newPieData : prevPieData;
};
