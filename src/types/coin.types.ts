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

