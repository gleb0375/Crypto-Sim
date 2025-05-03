import { useFilteredWallet } from "./useFilteredWallet";
import { useWalletBalance } from "./useWalletBalance";
import { useWalletPieData } from "./useWalletPieData";
import { useHideZeroPreference } from "./useHideZeroPreference";
import {useTickerPrice} from "../useTickerPrice.ts";
import {useWallet} from "../../contexts/WalletContext.tsx";

export const useWalletPage = () => {
    const { wallet } = useWallet();
    const { data: btcTicker } = useTickerPrice("BTCUSDT");
    const btcPrice = parseFloat(btcTicker?.price || "0");

    const { hideZero, toggleHideZero } = useHideZeroPreference();
    const filteredWallet = useFilteredWallet(wallet, hideZero);
    const balance = useWalletBalance(wallet, btcPrice);
    const pieData = useWalletPieData(filteredWallet);

    return {
        balance,
        filteredWallet,
        pieData,
        hideZero,
        toggleHideZero,
    };
};
