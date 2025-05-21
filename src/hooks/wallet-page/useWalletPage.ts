import { useFilteredWallet } from "./useFilteredWallet";
import { useWalletBalance } from "./useWalletBalance";
import { useWalletPieData } from "./useWalletPieData";
import { useHideZeroPreference } from "./useHideZeroPreference";
import {useTickerPrice} from "../trade-page/useTickerPrice.ts";
import {useWallet} from "../../contexts/WalletContext.tsx";
import {useHighlightedSymbol} from "./useHighlightedSymbol.ts";

export const useWalletPage = () => {
    const { wallet } = useWallet();
    const { data: btcTicker } = useTickerPrice("BTCUSDT");
    const btcPrice = parseFloat(btcTicker?.price || "0");

    const { hideZero, toggleHideZero } = useHideZeroPreference();
    const filteredWallet = useFilteredWallet(wallet, hideZero);
    const balance = useWalletBalance(wallet, btcPrice);
    const pieData = useWalletPieData(filteredWallet);
    const { highlightedSymbol, setHighlightedSymbol } = useHighlightedSymbol();


    return {
        balance,
        filteredWallet,
        pieData,
        hideZero,
        toggleHideZero,
        highlightedSymbol,
        setHighlightedSymbol,
    };
};
