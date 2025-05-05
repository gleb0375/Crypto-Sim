import { useState, useEffect } from "react";
import { Coin } from "../../types/coin.types.ts";
import { COINS } from "../../constants/coins.constants.ts";

const LOCAL_STORAGE_KEY = "selectedCoinSymbol";

export const useSelectedCoin = () => {
    const [selectedCoin, setSelectedCoinState] = useState<Coin>(COINS[0]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedSymbol = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedSymbol) {
            const coin = COINS.find(c => c.symbol === storedSymbol);
            if (coin) setSelectedCoinState(coin);
        }
        setIsInitialized(true);
    }, []);

    const setSelectedCoin = (coin: Coin) => {
        setSelectedCoinState(coin);
        localStorage.setItem(LOCAL_STORAGE_KEY, coin.symbol);
    };

    return { selectedCoin, setSelectedCoin, isInitialized };
};
