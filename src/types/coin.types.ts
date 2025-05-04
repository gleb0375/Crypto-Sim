export interface Coin {
    symbol: string;
    name: string;
    logo: string;
    color: string;
}

export interface CoinDropdownListProps {
    coins: Coin[];
    onSelectCoin: (coin: Coin) => void;
}

export interface CoinHeaderProps {
    coins: Coin[];
    selectedCoin: Coin;
    price?: number;
    onSelectCoin: (coin: Coin) => void;
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