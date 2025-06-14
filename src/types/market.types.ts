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
    volume: string;
}

export interface TickerPrice {
    symbol: string;
    price: string;
}

export interface TradingChartProps {
    data: MinimalKlineData[];
    symbol: string;
    interval: string;
}

export interface ExtendedTradingChartProps extends TradingChartProps {
    onPriceUpdate?: (price: number) => void;
}

export interface TimeIntervalContainerProps {
    intervals: string[];
    selectedInterval: string;
    onSelect: (interval: string) => void;
}



