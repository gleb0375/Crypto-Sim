import {WalletBalance, WalletCoinItem} from "../types/coin.types.ts";

export const calculateWalletBalance = (
    coins: WalletCoinItem[],
    btcPrice: number
): WalletBalance => {
    const totalValueUSD = coins.reduce((sum, coin) => sum + coin.value, 0);

    const totalHoldingsBTC = coins.reduce((sum, coin) => {
        if (coin.symbol === "BTCUSDT") return sum + coin.holdings;
        return sum + (coin.value / btcPrice);
    }, 0);

    return { totalValueUSD, totalHoldingsBTC };
};
