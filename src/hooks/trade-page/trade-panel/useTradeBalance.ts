import { useMemo } from "react";

interface Props {
    mode: "buy" | "sell";
    symbol: string;
    qty: string;
    price?: number;
    getBalance: (symbol: string) => number;
}

export const useTradeBalance = ({ mode, symbol, qty, price, getBalance }: Props) => {
    const availableBalance = useMemo(() => {
        return mode === "buy" ? getBalance("USDT") : getBalance(symbol);
    }, [mode, symbol, getBalance]);

    const availableBalanceDisplay = availableBalance.toLocaleString("en-US", {
        maximumFractionDigits: 2,
    });

    const hasInsufficientBalance = useMemo(() => {
        if (!price) return false;
        const amount = parseFloat(qty);
        if (isNaN(amount) || amount <= 0) return false;

        return mode === "buy"
            ? amount * price > getBalance("USDT")
            : amount > getBalance(symbol);
    }, [mode, qty, price, getBalance, symbol]);

    return { availableBalanceDisplay, hasInsufficientBalance };
};
