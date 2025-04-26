import {WalletBalance, WalletCoinItem} from "../types/coin.types.ts";

export const calculateWalletBalance = (coins: WalletCoinItem[]): WalletBalance => {
    const totalValueUSD = coins.reduce((sum, coin) => sum + coin.value, 0);
    const totalHoldingsBTC = coins.reduce((sum, coin) => sum + coin.holdings, 0);
    return { totalValueUSD, totalHoldingsBTC };
};