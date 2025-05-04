import { useState } from "react";
import { Coin } from "../../types/coin.types.ts";
import { COINS } from "../../constants/coins.constants.ts";

export const useSelectedCoin = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    return { selectedCoin, setSelectedCoin };
};
