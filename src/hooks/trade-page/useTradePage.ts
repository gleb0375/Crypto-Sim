import { useKlines } from "./useKlines.ts";
import { useSelectedCoin } from "./useSelectedCoin.ts";
import { useSelectedInterval } from "./useSelectedInterval.ts";
import { useLivePrice } from "./useLivePrice.ts";
import { useMobileTradeToggle } from "./useMobileTradeToggle.ts";

export const useTradePage = () => {
    const { selectedCoin, setSelectedCoin, isInitialized: coinReady } = useSelectedCoin();
    const { selectedInterval, setSelectedInterval, isInitialized: intervalReady } = useSelectedInterval();
    const { isMobileTradeOpen, openMobileTrade, closeMobileTrade } = useMobileTradeToggle();

    const isReady = coinReady && intervalReady;

    const { livePrice, setLivePrice } = useLivePrice(isReady ? selectedCoin.symbol : "");
    const { data, error, isLoading } = useKlines(
        isReady ? selectedCoin.symbol : "",
        isReady ? selectedInterval : ""
    );

    return {
        selectedCoin,
        setSelectedCoin,
        selectedInterval,
        setSelectedInterval,
        displayPrice: livePrice,
        chartData: data,
        error,
        isLoading,
        isMobileTradeOpen,
        openMobileTrade,
        closeMobileTrade,
        setLivePrice,
        coinReady,
        intervalReady,
    };
};
