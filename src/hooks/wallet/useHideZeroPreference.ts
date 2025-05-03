import { useEffect, useState } from "react";

const HIDE_ZERO_KEY = "wallet-hide-zero";

export const useHideZeroPreference = () => {
    const [hideZero, setHideZero] = useState<boolean>(() => {
        return localStorage.getItem(HIDE_ZERO_KEY) === "true";
    });

    useEffect(() => {
        localStorage.setItem(HIDE_ZERO_KEY, hideZero.toString());
    }, [hideZero]);

    return {
        hideZero,
        toggleHideZero: () => setHideZero((prev) => !prev),
    };
};
