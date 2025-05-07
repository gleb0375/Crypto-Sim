import { useEffect } from "react";
import {useTradeCalculationsProps} from "../../../types/trade.types.ts";

export const useTradeCalculations = ({
                                         qty,
                                         orderValue,
                                         price,
                                         setQty,
                                         setOrderValue,
                                         lastChanged,
                                     }: useTradeCalculationsProps) => {
    useEffect(() => {
        if (!price || lastChanged.current !== "qty") return;

        const parsedQty = parseFloat(qty);
        if (!isNaN(parsedQty)) {
            setOrderValue((parsedQty * price).toFixed(2));
        } else {
            setOrderValue("");
        }
    }, [qty, price]);

    useEffect(() => {
        if (!price || lastChanged.current !== "orderValue") return;

        const parsedValue = parseFloat(orderValue);
        if (!isNaN(parsedValue) && price > 0) {
            setQty((parsedValue / price).toFixed(6));
        } else {
            setQty("");
        }
    }, [orderValue, price]);
};
