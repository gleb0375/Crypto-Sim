import {Coin, WalletCoinItem} from "../types/coin.types";

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


export const walletMockData: WalletCoinItem[] = [
    {
        rank: 1,
        name: "BTC",
        symbol: "BTCUSDT",
        logo: "/assets/logos/bitcoin-btc-logo.svg",
        holdings: "198K",
        value: "$17.64B",
        color: "#f7931a"
    },
    {
        rank: 2,
        name: "ETH",
        symbol: "ETHUSDT",
        logo: "/assets/logos/ethereum-eth-logo.png",
        holdings: "56.0K",
        value: "$122.2M",
        color: "#627eea"
    },
    {
        rank: 3,
        name: "WBTC",
        symbol: "WBTCUSDT",
        logo: "/assets/logos/bitcoin-btc-logo.svg",
        holdings: "750.7",
        value: "$66.6M",
        color: "#b14435"
    },
    // и так далее для остальных
];

export const LEFT_COLUMN_WIDTH = "50vh";
