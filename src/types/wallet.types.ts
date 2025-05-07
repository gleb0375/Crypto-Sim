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
}

export interface PieChartEntry {
    name: string;
    value: number;
    color: string;
}