import { useEffect, useState } from "react";
import { useTickerPrice } from "../useTickerPrice.ts";

export const useLivePrice = (symbol: string) => {
    const [livePrice, setLivePrice] = useState<number>();
    const { data: tickerData } = useTickerPrice(symbol);

    useEffect(() => {
        if (tickerData && livePrice === undefined) {
            setLivePrice(parseFloat(tickerData.price));
        }
    }, [tickerData, livePrice]);

    return { livePrice, setLivePrice };
};
