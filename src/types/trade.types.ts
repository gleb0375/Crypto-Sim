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
