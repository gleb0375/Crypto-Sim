import {COINS, START_USDT_BALANCE, USDT_COIN} from "../constants/coins.constants";
import {WalletCoinItem} from "../types/wallet.types.ts";

export const buildInitialWallet = (): WalletCoinItem[] => {
    const usdtItem: WalletCoinItem = {
        ...USDT_COIN,
        rank: 1,
        holdings: START_USDT_BALANCE,
        value: START_USDT_BALANCE,
    };

    const otherItems: WalletCoinItem[] = COINS.map((coin, idx) => ({
        ...coin,
        rank: idx + 2,
        holdings: 0,
        value: 0,
    }));

    return [usdtItem, ...otherItems];
};
