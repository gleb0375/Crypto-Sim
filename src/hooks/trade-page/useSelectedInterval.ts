import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "selectedInterval";

export const useSelectedInterval = () => {
    const [selectedInterval, setSelectedIntervalState] = useState("1m");
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (stored) {
            setSelectedIntervalState(stored);
        }
        setIsInitialized(true);
    }, []);

    const setSelectedInterval = (interval: string) => {
        setSelectedIntervalState(interval);
        localStorage.setItem(LOCAL_STORAGE_KEY, interval);
    };

    return { selectedInterval, setSelectedInterval, isInitialized };
};
