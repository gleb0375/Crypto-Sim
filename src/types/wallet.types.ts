import {Coin} from "./coin.types.ts";

interface PieDataItem {
    name: string;
    value: number;
    color: string;
}

export interface PieWalletChartProps  {
    data: PieDataItem[];
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
}

export interface WalletScrollBoxItemProps {
    coin: WalletCoinItem;
    index: number;
    onSellAll: () => void;
    onError: () => void;
}

export interface PieChartEntry {
    name: string;
    value: number;
    color: string;
}