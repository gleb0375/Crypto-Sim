
import {Kline, TickerPrice} from "../types/market.types.ts";
import {
    BINANCE_KLINES_ENDPOINT,
    BINANCE_TICKER_PRICE_ENDPOINT,
    DEFAULT_KLINE_LIMIT
} from "../constants/market.constans.ts";

export async function getKlines(
    symbol: string,
    interval: string,
    limit: number = DEFAULT_KLINE_LIMIT
): Promise<Kline[]> {
    const url = `${BINANCE_KLINES_ENDPOINT}?symbol=${symbol}&interval=${interval}&limit=${limit}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching klines: ${response.statusText}`);
    }
    const data = await response.json();

    return data.map((item: any[]): Kline => ({
        openTime: item[0],
        open: item[1],
        high: item[2],
        low: item[3],
        close: item[4],
        volume: item[5],
        closeTime: item[6],
        quoteAssetVolume: item[7],
        numberOfTrades: item[8],
        takerBuyBaseAssetVolume: item[9],
        takerBuyQuoteAssetVolume: item[10],
        ignore: item[11],
    }));
}

export async function getTickerPrice(symbol: string): Promise<TickerPrice> {
    const url = `${BINANCE_TICKER_PRICE_ENDPOINT}?symbol=${symbol}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Error fetching ticker price: ${response.statusText}`);
    }
    return await response.json();
}
