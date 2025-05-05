import { useMemo, useRef } from "react";
import { WalletCoinItem } from "../../types/coin.types.ts";
import { COINS, USDT_COIN } from "../../constants/coins.constants.ts";

interface PieChartEntry {
    name: string;
    value: number;
    color: string;
}

const isSignificantlyDifferent = (prev: PieChartEntry[], next: PieChartEntry[], threshold = 0.01) => {
    if (prev.length !== next.length) return true;

    for (let i = 0; i < prev.length; i++) {
        if (prev[i].name !== next[i].name) return true;
        const diff = Math.abs(prev[i].value - next[i].value);
        const total = Math.max(prev[i].value, next[i].value);
        if (total > 0 && diff / total > threshold) return true;
    }

    return false;
};

export const useWalletPieData = (wallet: WalletCoinItem[]) => {
    const prevPieDataRef = useRef<PieChartEntry[]>([]);

    const newPieData = useMemo(() => {
        const total = wallet.reduce((sum, c) => sum + c.value, 0);

        const pie = wallet
            .filter((coin) => coin.value > 0)
            .map((coin) => {
                const color =
                    coin.symbol === "USDT"
                        ? USDT_COIN.color
                        : COINS.find((c) => c.symbol === coin.symbol)?.color || "#888";

                const rawValue = Math.round(coin.value / 10) * 10;
                const finalValue = rawValue < total * 0.01 ? 0 : rawValue;

                return {
                    name: coin.name,
                    value: finalValue,
                    color,
                };
            })
            .filter((entry) => entry.value > 0);

        return pie;
    }, [wallet]);

    const prevPieData = prevPieDataRef.current;

    const isDifferent = isSignificantlyDifferent(prevPieData, newPieData);

    if (isDifferent) {
        prevPieDataRef.current = newPieData;
    }

    return isDifferent ? newPieData : prevPieData;
};
