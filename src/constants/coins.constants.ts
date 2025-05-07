import { Coin } from "../types/coin.types";

export const START_USDT_BALANCE = 1000000;

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
    { symbol: "SOLUSDT", name: "SOL", logo: "/assets/logos/solana-sol-logo.svg", color: "#b900eb" },
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
    { symbol: "TRONUSDT", name: "TRON", logo: "/assets/logos/tron-trx-logo.svg", color: "#ec1d27" }, // does exist on binance -> error
];