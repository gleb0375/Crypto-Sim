import { useMemo } from "react";
import {useTradeBalanceProps} from "../../../types/trade.types.ts";

export const useTradeBalance = ({ mode, symbol, qty, price, getBalance }: useTradeBalanceProps) => {
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
