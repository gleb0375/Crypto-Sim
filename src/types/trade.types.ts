import {MutableRefObject} from "react";

export interface TradePanelProps {
    symbol: string;
    name: string;
    price?: number;
}

export interface MobileTradePanelProps extends TradePanelProps {
    isOpen: boolean;
    onClose: () => void;
    onOpen: () => void;
}

export interface UseExecuteTradeProps  {
    mode: "buy" | "sell";
    symbol: string;
    qty: string;
    price?: number;
    getBalance: (symbol: string) => number;
    executeTrade: (mode: "buy" | "sell", symbol: string, price: number, amount: number) => void;
}

export interface useTradeBalanceProps {
    mode: "buy" | "sell";
    symbol: string;
    qty: string;
    price?: number;
    getBalance: (symbol: string) => number;
}

export interface useTradeCalculationsProps {
    qty: string;
    orderValue: string;
    price?: number;
    setQty: (value: string) => void;
    setOrderValue: (value: string) => void;
    lastChanged: MutableRefObject<"qty" | "orderValue" | null>;
}
