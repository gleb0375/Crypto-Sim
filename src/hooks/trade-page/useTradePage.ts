import { useKlines } from "../useKlines.ts";
import { useSelectedCoin } from "./useSelectedCoin.ts";
import { useSelectedInterval } from "./useSelectedInterval.ts";
import { useLivePrice } from "./useLivePrice.ts";
import { useMobileTradeToggle } from "./useMobileTradeToggle.ts";

export const useTradePage = () => {
    const { selectedCoin, setSelectedCoin } = useSelectedCoin();
    const { selectedInterval, setSelectedInterval } = useSelectedInterval();
    const { livePrice, setLivePrice } = useLivePrice(selectedCoin.symbol);
    const { isMobileTradeOpen, openMobileTrade, closeMobileTrade } = useMobileTradeToggle();

    const { data, error, isLoading } = useKlines(selectedCoin.symbol, selectedInterval);

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
    };
};
