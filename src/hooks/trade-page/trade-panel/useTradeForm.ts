import {MutableRefObject, useState} from "react";

export const useTradeForm = (
    lastChanged: MutableRefObject<"qty" | "orderValue" | null>
) => {
    const [qty, setQty] = useState("");
    const [orderValue, setOrderValue] = useState("");

    const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastChanged.current = "qty";
        setQty(e.target.value);
    };

    const handleOrderValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        lastChanged.current = "orderValue";
        setOrderValue(e.target.value);
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
