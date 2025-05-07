import { MutableRefObject, useState } from "react";

export const useTradeForm = (
    lastChanged: MutableRefObject<"qty" | "orderValue" | null>
) => {
    const [qty, setQty] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const sanitizeNumberInput = (value: string) => {
        if (value === "") return true;

        if (value.trim().startsWith("-")) return false;

        const parsed = parseFloat(value);
        return !isNaN(parsed);
    };

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!sanitizeNumberInput(value)) return;
        lastChanged.current = "qty";
        setQty(value);
    };

    const handleOrderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (!sanitizeNumberInput(value)) return;
        lastChanged.current = "orderValue";
        setOrderValue(value);
    };

    const resetForm = () => {
        setQty("");
        setOrderValue("");
        lastChanged.current = null;
    };

    return {
        qty,
        setQty,
        orderValue,
        setOrderValue,
        handleQtyChange,
        handleOrderValueChange,
        resetForm,
    };
};
