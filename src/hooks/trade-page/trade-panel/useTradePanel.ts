import { useState, useMemo, useRef, useEffect } from "react";
import { useWallet } from "../../../contexts/WalletContext.tsx";

export const useTradePanel = (symbol: string, price?: number) => {
    const [mode, setMode] = useState<"buy" | "sell">("buy");
    const [qty, setQty] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const lastChanged = useRef<"qty" | "orderValue" | null>(null);
    const { getBalance, executeTrade } = useWallet();

    const availableBalance = useMemo(() => {
        return mode === "buy" ? getBalance("USDT") : getBalance(symbol);
    }, [mode, symbol, getBalance]);

    const availableBalanceDisplay = availableBalance.toLocaleString("en-US", {
        maximumFractionDigits: 2,
    });

    useEffect(() => {
        if (!price) return;

        if (lastChanged.current === "qty") {
            const parsedQty = parseFloat(qty);
            if (!isNaN(parsedQty)) {
                setOrderValue((parsedQty * price).toFixed(2));
            } else {
                setOrderValue("");
            }
        }
    }, [qty, price]);

    useEffect(() => {
        if (!price) return;

        if (lastChanged.current === "orderValue") {
            const parsedValue = parseFloat(orderValue);
            if (!isNaN(parsedValue) && price > 0) {
                setQty((parsedValue / price).toFixed(6));
            } else {
                setQty("");
            }
        }
    }, [orderValue, price]);

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastChanged.current = "qty";
        setQty(e.target.value);
    };

    const handleOrderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastChanged.current = "orderValue";
        setOrderValue(e.target.value);
    };

    const handleExecuteTrade = (): { success: boolean; amount?: number; value?: number } => {
        if (!price) return { success: false };

        const amount = parseFloat(qty);
        if (isNaN(amount) || amount <= 0) return { success: false };

        const totalValue = amount * price;

        if (mode === "buy" && totalValue > getBalance("USDT")) {
            alert("Insufficient USDT balance");
            return { success: false };
        }

        if (mode === "sell" && amount > getBalance(symbol)) {
            alert(`Insufficient ${symbol} balance`);
            return { success: false };
        }

        executeTrade(mode, symbol, price, amount);

        return { success: true, amount, value: totalValue };
    };

    const resetForm = () => {
        setQty("");
        setOrderValue("");
        lastChanged.current = null;
    };

    const hasInsufficientBalance = useMemo(() => {
        if (!price) return false;
        const amount = parseFloat(qty);
        if (isNaN(amount) || amount <= 0) return false;

        return mode === "buy"
            ? amount * price > getBalance("USDT")
            : amount > getBalance(symbol);
    }, [mode, qty, price, getBalance, symbol]);

    return {
        mode,
        setMode,
        qty,
        orderValue,
        availableBalanceDisplay,
        handleQtyChange,
        handleOrderValueChange,
        handleExecuteTrade,
        resetForm,
        hasInsufficientBalance,
    };
};
