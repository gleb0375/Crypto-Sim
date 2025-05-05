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

export interface TradeSuccessModalProps {
    name: string;
    amount: number;
    value: number;
    mode: "buy" | "sell";
    onClose: () => void;
}

