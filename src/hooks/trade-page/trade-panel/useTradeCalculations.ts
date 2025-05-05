import {MutableRefObject, useEffect} from "react";

interface Props {
    qty: string;
    orderValue: string;
    price?: number;
    setQty: (value: string) => void;
    setOrderValue: (value: string) => void;
    lastChanged: MutableRefObject<"qty" | "orderValue" | null>;
}

export const useTradeCalculations = ({
                                         qty,
                                         orderValue,
                                         price,
                                         setQty,
                                         setOrderValue,
                                         lastChanged,
                                     }: Props) => {
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
