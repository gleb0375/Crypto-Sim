import { useEffect, useState } from "react";
import { COINS } from "../../constants/coins.constants.ts";
import { Coin } from "../../types/coin.types.ts";

const STORAGE_KEY = "selectedCoinSymbol";

export const useSelectedCoin = () => {
    const getInitialCoin = (): Coin => {
        const storedSymbol = localStorage.getItem(STORAGE_KEY);
        const found = COINS.find((c) => c.symbol === storedSymbol);
        return found || COINS[0];
    };

    const [selectedCoin, setSelectedCoinState] = useState<Coin>(getInitialCoin);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        setIsInitialized(true);
    }, []);

    const setSelectedCoin = (coin: Coin) => {
        localStorage.setItem(STORAGE_KEY, coin.symbol);
        setSelectedCoinState(coin);
    };

    const reset = () => {
        setSelectedCoin(COINS[0]);
    };

    return {
        selectedCoin,
        setSelectedCoin,
        isInitialized,
        reset,
    };
};
