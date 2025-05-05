import { useEffect, useState } from "react";
import { TIME_INTERVALS } from "../../constants/market.constans.ts";

const STORAGE_KEY = "selectedInterval";

export const useSelectedInterval = () => {
    const getInitialInterval = (): string => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return TIME_INTERVALS.includes(stored!) ? stored! : TIME_INTERVALS[3];
    };

    const [selectedInterval, setSelectedIntervalState] = useState<string>(getInitialInterval);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    const setSelectedInterval = (interval: string) => {
        localStorage.setItem(STORAGE_KEY, interval);
        setSelectedIntervalState(interval);
    };

    const reset = () => {
        setSelectedInterval(TIME_INTERVALS[0]);
    };

    return {
        selectedInterval,
        setSelectedInterval,
        isInitialized,
        reset,
    };
};
