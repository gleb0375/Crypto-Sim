import { useEffect, useState } from "react";
import { Coin } from "../../types/coin.types.ts";

export const useCoinInfo = (price?: number, onSelectCoin?: (coin: Coin) => void) => {
    const [isOpen, setIsOpen] = useState(false);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [priceChange, setPriceChange] = useState<"up" | "down" | "neutral">("neutral");

    useEffect(() => {
        if (price !== undefined && previousPrice !== null) {
            if (price > previousPrice) {
                setPriceChange("up");
            } else if (price < previousPrice) {
                setPriceChange("down");
            } else {
                setPriceChange("neutral");
            }
        }
        if (price !== undefined) {
            setPreviousPrice(price);
        }
    }, [price]);

    const toggleDropdown = () => setIsOpen(prev => !prev);
    const closeDropdown = () => setIsOpen(false);

    const handleSelectCoin = (coin: Coin) => {
        onSelectCoin?.(coin);
        closeDropdown();
    };

    const formattedPrice = price !== undefined
        ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        : "...";

    return {
        isOpen,
        toggleDropdown,
        handleSelectCoin,
        priceChange,
        formattedPrice,
    };
};
