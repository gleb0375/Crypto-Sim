import { useMemo } from "react";
import {WalletCoinItem} from "../../types/coin.types.ts";
import {calculateWalletBalance} from "../../utils/calculateWalletBalance.ts";

export const useWalletBalance = (
    wallet: WalletCoinItem[],
    btcPrice: number
) => {
    return useMemo(() => calculateWalletBalance(wallet, btcPrice), [wallet, btcPrice]);
};
