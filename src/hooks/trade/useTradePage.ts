import {useEffect, useState} from "react";
import {Coin} from "../../types/coin.types.ts";
import {COINS} from "../../constants/coins.constants.ts";
import {useKlines} from "../useKlines.ts";
import {useTickerPrice} from "../useTickerPrice.ts";

export const useTradePage = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    const [selectedInterval, setSelectedInterval] = useState("1m");
    const [livePrice, setLivePrice] = useState<number>();
    const [isMobileTradeOpen, setIsMobileTradeOpen] = useState(false);

    const { data, error, isLoading } = useKlines(selectedCoin.symbol, selectedInterval);
    const { data: tickerData } = useTickerPrice(selectedCoin.symbol);

    useEffect(() => {
        if (tickerData && livePrice === undefined) {
            setLivePrice(parseFloat(tickerData.price));
        }
    }, [tickerData, livePrice]);

    const displayPrice = livePrice;

    return {
        selectedCoin,
        setSelectedCoin,
        selectedInterval,
        setSelectedInterval,
        displayPrice,
        chartData: data,
        error,
        isLoading,
        isMobileTradeOpen,
        openMobileTrade: () => setIsMobileTradeOpen(true),
        closeMobileTrade: () => setIsMobileTradeOpen(false),
        setLivePrice,
    };
};
