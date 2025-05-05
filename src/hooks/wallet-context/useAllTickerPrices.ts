import { useEffect, useState } from "react";
import { COINS } from "../../constants/coins.constants.ts";
import { BINANCE_TICKER_PRICE_ENDPOINT } from "../../constants/market.constans.ts";

type PricesMap = Record<string, number>;

export const useAllTickerPrices = () => {
    const [prices, setPrices] = useState<PricesMap>({});

    useEffect(() => {
        const fetchPrices = async () => {
            try {
                const res = await fetch(BINANCE_TICKER_PRICE_ENDPOINT);
                const data: { symbol: string; price: string }[] = await res.json();

                const symbols = COINS.map((c) => c.symbol);
                const filtered = data.filter((item) => symbols.includes(item.symbol));

                const priceMap: PricesMap = {};
                for (const item of filtered) {
                    priceMap[item.symbol] = parseFloat(item.price);
                }

                setPrices(priceMap);
            } catch (err) {
                console.error("Error fetching all ticker prices", err);
            }
        };

        fetchPrices();
        const interval = setInterval(fetchPrices, 5000); // каждые 5 сек
        return () => clearInterval(interval);
    }, []);

    return { prices };
};
