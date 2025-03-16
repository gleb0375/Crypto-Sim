export interface Kline {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    closeTime: number;
    quoteAssetVolume: string;
    numberOfTrades: number;
    takerBuyBaseAssetVolume: string;
    takerBuyQuoteAssetVolume: string;
    ignore: string;
}


export interface MinimalKlineData {
    openTime: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string
}

export interface TradingChartProps {
    data: MinimalKlineData[];
}

export interface TickerPrice {
    symbol: string;
    price: string;
}

export interface Coin {
    symbol: string;
    name: string;
    logo: string;
}

export const BINANCE_API_BASE_URL = 'https://api.binance.com/api/v3';
export const BINANCE_KLINES_ENDPOINT = `${BINANCE_API_BASE_URL}/klines`;
export const BINANCE_TICKER_PRICE_ENDPOINT = `${BINANCE_API_BASE_URL}/ticker/price`;

export const TIME_INTERVALS = ["1h", "4h", "1d", "1w", "1M"];

export const DEFAULT_KLINE_LIMIT = 1000; // Количество свечек по умолчанию

export const COINS: Coin[] = [
    { symbol: "BTCUSDT", name: "BTC", logo: "/assets/logos/bitcoin-btc-logo.svg" },
    { symbol: "ETHUSDT", name: "ETH", logo: "/assets/logos/ethereum-eth-logo.png" },
    { symbol: "XRPUSDT", name: "XRP", logo: "/assets/logos/xrp-xrp-logo.svg" },
    { symbol: "DOGEUSDT", name: "DOGE", logo: "/assets/logos/dogecoin-doge-logo.svg" },
    { symbol: "ADAUSDT", name: "ADA", logo: "/assets/logos/cardano-ada-logo.svg" },
    { symbol: "SOLUSDT", name: "SOL", logo: "/assets/logos/solana-sol-logo.svg" },
    { symbol: "BNBUSDT", name: "BNB", logo: "/assets/logos/bnb-bnb-logo.svg" },
    { symbol: "DOTUSDT", name: "DOT", logo: "/assets/logos/polkadot-new-dot-logo.svg" },
    { symbol: "LTCUSDT", name: "LTC", logo: "/assets/logos/litecoin-ltc-logo.svg" },
    { symbol: "LINKUSDT", name: "LINK", logo: "/assets/logos/chainlink-link-logo.svg" },
    { symbol: "BCHUSDT", name: "BCH", logo: "/assets/logos/bitcoin-cash-bch-logo.svg" },
    { symbol: "XLMUSDT", name: "XLM", logo: "/assets/logos/stellar-xlm-logo.svg" },
    { symbol: "UNIUSDT", name: "UNI", logo: "/assets/logos/uniswap-uni-logo.svg" },
    { symbol: "ICPUSDT", name: "ICP", logo: "/assets/logos/internet-computer-icp-logo.svg" },
    { symbol: "ALGOUSDT", name: "ALGO", logo: "/assets/logos/algorand-algo-logo.svg" },
    { symbol: "ATOMUSDT", name: "ATOM", logo: "/assets/logos/cosmos-atom-logo.svg" },
    { symbol: "AVAXUSDT", name: "AVAX", logo: "/assets/logos/avalanche-avax-logo.svg" },
    { symbol: "MATICUSDT", name: "MATIC", logo: "/assets/logos/polygon-matic-logo.svg" },
    { symbol: "VETUSDT", name: "VET", logo: "/assets/logos/vechain-vet-logo.svg" },
    { symbol: "TRONUSDT", name: "TRON", logo: "/assets/logos/tron-trx-logo.svg" },
];
