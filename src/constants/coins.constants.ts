import {Coin, WalletCoinItem} from "../types/coin.types";

export const START_USDT_BALANCE = 100456;

export const USDT_COIN: Coin = {
    symbol: "USDT",
    name: "USDT",
    logo: "/assets/logos/tether-usdt-logo.svg",
    color: "#26A17B",
};

export const COINS: Coin[] = [
    { symbol: "BTCUSDT", name: "BTC", logo: "/assets/logos/bitcoin-btc-logo.svg", color: "#f7931a" },
    { symbol: "ETHUSDT", name: "ETH", logo: "/assets/logos/ethereum-eth-logo.png", color: "#627eea" },
    { symbol: "XRPUSDT", name: "XRP", logo: "/assets/logos/xrp-xrp-logo.svg", color: "#23292f" },
    { symbol: "DOGEUSDT", name: "DOGE", logo: "/assets/logos/dogecoin-doge-logo.svg", color: "#c2a633" },
    { symbol: "ADAUSDT", name: "ADA", logo: "/assets/logos/cardano-ada-logo.svg", color: "#0033ad" },
    { symbol: "SOLUSDT", name: "SOL", logo: "/assets/logos/solana-sol-logo.svg", color: "#00ffa3" },
    { symbol: "BNBUSDT", name: "BNB", logo: "/assets/logos/bnb-bnb-logo.svg", color: "#f3ba2f" },
    { symbol: "DOTUSDT", name: "DOT", logo: "/assets/logos/polkadot-new-dot-logo.svg", color: "#e6007a" },
    { symbol: "LTCUSDT", name: "LTC", logo: "/assets/logos/litecoin-ltc-logo.svg", color: "#345d9d" },
    { symbol: "LINKUSDT", name: "LINK", logo: "/assets/logos/chainlink-link-logo.svg", color: "#2a5ada" },
    { symbol: "BCHUSDT", name: "BCH", logo: "/assets/logos/bitcoin-cash-bch-logo.svg", color: "#8dc351" },
    { symbol: "XLMUSDT", name: "XLM", logo: "/assets/logos/stellar-xlm-logo.svg", color: "#14b6e7" },
    { symbol: "UNIUSDT", name: "UNI", logo: "/assets/logos/uniswap-uni-logo.svg", color: "#ff007a" },
    { symbol: "ICPUSDT", name: "ICP", logo: "/assets/logos/internet-computer-icp-logo.svg", color: "#3b00b9" },
    { symbol: "ALGOUSDT", name: "ALGO", logo: "/assets/logos/algorand-algo-logo.svg", color: "#000000" },
    { symbol: "ATOMUSDT", name: "ATOM", logo: "/assets/logos/cosmos-atom-logo.svg", color: "#2e3148" },
    { symbol: "AVAXUSDT", name: "AVAX", logo: "/assets/logos/avalanche-avax-logo.svg", color: "#e84142" },
    { symbol: "MATICUSDT", name: "MATIC", logo: "/assets/logos/polygon-matic-logo.svg", color: "#8247e5" },
    { symbol: "VETUSDT", name: "VET", logo: "/assets/logos/vechain-vet-logo.svg", color: "#15bdd8" },
    { symbol: "TRONUSDT", name: "TRON", logo: "/assets/logos/tron-trx-logo.svg", color: "#ec1d27" },
];


// redundant
export const walletMockData: WalletCoinItem[] = [
    { rank: 1, name: "USDT", symbol: "USDT", logo: "/assets/logos/tether-usdt-logo.svg", color: "#26A17B", holdings: 10000, value: 10000 },
    { rank: 2, name: "BTC", symbol: "BTCUSDT", logo: "/assets/logos/bitcoin-btc-logo.svg", color: "#f7931a", holdings: 2.35, value: 122345.67 },
    { rank: 3, name: "ETH", symbol: "ETHUSDT", logo: "/assets/logos/ethereum-eth-logo.png", color: "#627eea", holdings: 15.78, value: 45678.12 },
    { rank: 4, name: "XRP", symbol: "XRPUSDT", logo: "/assets/logos/xrp-xrp-logo.svg", color: "#23292f", holdings: 1345.22, value: 5634.87 },
    { rank: 5, name: "DOGE", symbol: "DOGEUSDT", logo: "/assets/logos/dogecoin-doge-logo.svg", color: "#c2a633", holdings: 5420.99, value: 7890.45 },
    { rank: 6, name: "ADA", symbol: "ADAUSDT", logo: "/assets/logos/cardano-ada-logo.svg", color: "#0033ad", holdings: 3200.5, value: 8700 },
    { rank: 7, name: "SOL", symbol: "SOLUSDT", logo: "/assets/logos/solana-sol-logo.svg", color: "#00ffa3", holdings: 145.32, value: 15400.33 },
    { rank: 8, name: "BNB", symbol: "BNBUSDT", logo: "/assets/logos/bnb-bnb-logo.svg", color: "#f3ba2f", holdings: 75, value: 19234.12 },
    { rank: 9, name: "DOT", symbol: "DOTUSDT", logo: "/assets/logos/polkadot-new-dot-logo.svg", color: "#e6007a", holdings: 800, value: 5678.45 },
    { rank: 10, name: "LTC", symbol: "LTCUSDT", logo: "/assets/logos/litecoin-ltc-logo.svg", color: "#345d9d", holdings: 120, value: 9234.55 },
    { rank: 11, name: "LINK", symbol: "LINKUSDT", logo: "/assets/logos/chainlink-link-logo.svg", color: "#2a5ada", holdings: 540.88, value: 4500.67 },
    { rank: 12, name: "BCH", symbol: "BCHUSDT", logo: "/assets/logos/bitcoin-cash-bch-logo.svg", color: "#8dc351", holdings: 67.32, value: 6700 },
    { rank: 13, name: "XLM", symbol: "XLMUSDT", logo: "/assets/logos/stellar-xlm-logo.svg", color: "#14b6e7", holdings: 9200.55, value: 3450.33 },
    { rank: 14, name: "UNI", symbol: "UNIUSDT", logo: "/assets/logos/uniswap-uni-logo.svg", color: "#ff007a", holdings: 180.45, value: 3700.77 },
    { rank: 15, name: "ICP", symbol: "ICPUSDT", logo: "/assets/logos/internet-computer-icp-logo.svg", color: "#3b00b9", holdings: 60.2, value: 4100.9 },
    { rank: 16, name: "ALGO", symbol: "ALGOUSDT", logo: "/assets/logos/algorand-algo-logo.svg", color: "#000000", holdings: 1300, value: 2345.99 },
    { rank: 17, name: "ATOM", symbol: "ATOMUSDT", logo: "/assets/logos/cosmos-atom-logo.svg", color: "#2e3148", holdings: 220.1, value: 8500.45 },
    { rank: 18, name: "AVAX", symbol: "AVAXUSDT", logo: "/assets/logos/avalanche-avax-logo.svg", color: "#e84142", holdings: 75.5, value: 12000.32 },
    { rank: 19, name: "MATIC", symbol: "MATICUSDT", logo: "/assets/logos/polygon-matic-logo.svg", color: "#8247e5", holdings: 4300.33, value: 6500.12 },
    { rank: 20, name: "VET", symbol: "VETUSDT", logo: "/assets/logos/vechain-vet-logo.svg", color: "#15bdd8", holdings: 9200.99, value: 3900.22 },
    { rank: 21, name: "TRON", symbol: "TRONUSDT", logo: "/assets/logos/tron-trx-logo.svg", color: "#ec1d27", holdings: 7800.12, value: 4100.11 },
];
