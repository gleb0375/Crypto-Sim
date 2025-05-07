import { useMemo } from "react";
import { WalletCoinItem } from "../../types/wallet.types.ts";
import { calculateWalletBalance } from "../../utils/calculateWalletBalance.ts";

export const useWalletBalance = (
    wallet: WalletCoinItem[],
    btcPrice: number
) => {
    return useMemo(() => calculateWalletBalance(wallet, btcPrice), [wallet, btcPrice]);
};
