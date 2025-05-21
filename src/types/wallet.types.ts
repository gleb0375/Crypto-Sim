import {Coin} from "./coin.types.ts";

export interface PieWalletChartProps  {
    data: PieDataItem[];
    highlightedSymbol?: string | null;
}

export interface WalletCoinItem extends Coin {
    rank: number;
    holdings: number;
    value: number;
    avgBuyPrice: number;
}

export interface WalletBalance {
    totalValueUSD: number;
    totalHoldingsBTC: number;
}

export interface WalletScrollBoxProps {
    coins: WalletCoinItem[];
    onHighlight: (symbol: string) => void;
}

export interface WalletScrollBoxItemProps {
    coin: WalletCoinItem;
    index: number;
    onSellAll: () => void;
    onError: () => void;
    onHighlight: (symbol: string) => void;
    highlightableSymbols: string[];
}

export interface PieDataItem {
    symbol: string;
    name: string;
    value: number;
    color: string;
}
