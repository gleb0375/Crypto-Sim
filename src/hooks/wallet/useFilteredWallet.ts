import { useMemo } from "react";
import {WalletCoinItem} from "../../types/coin.types.ts";

export const useFilteredWallet = (
    wallet: WalletCoinItem[],
    hideZero: boolean
) => {
    return useMemo(
        () => (hideZero ? wallet.filter((c) => c.holdings > 0) : wallet),
        [wallet, hideZero]
    );
};
