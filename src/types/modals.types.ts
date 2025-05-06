export interface TradeSuccessModalProps {
    name: string;
    amount: number;
    value: number;
    mode: "buy" | "sell";
    onClose: () => void;
}

export interface ErrorModalProps {
    error: string;
    onClose: () => void;
}

export interface CoinDetailModalProps {
    symbol: string;
    onClose: () => void;
}

export interface ConfirmTradeModalProps extends TradeSuccessModalProps {
    onConfirm: () => void;
}
