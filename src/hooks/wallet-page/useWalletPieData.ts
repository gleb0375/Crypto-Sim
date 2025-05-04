import { useMemo } from "react";
import {WalletCoinItem} from "../../types/coin.types.ts";
import {COINS, USDT_COIN} from "../../constants/coins.constants.ts";

export const useWalletPieData = (wallet: WalletCoinItem[]) => {
    return useMemo(() => {
        const total = wallet.reduce((sum, c) => sum + c.value, 0);

        return wallet
            .filter((coin) => coin.value > 0)
            .map((coin) => {
                const isUSDT = coin.symbol === "USDT";
                const baseSymbol = isUSDT ? "USDT" : coin.symbol.replace("USDT", "");
                const color = isUSDT
                    ? USDT_COIN.color
                    : COINS.find((c) => c.symbol === coin.symbol)?.color || "#888";

                const rawValue = Math.round(coin.value / 10) * 10;
                const finalValue = rawValue < total * 0.001 ? 0 : rawValue;

                return {
                    name: baseSymbol,
                    value: finalValue,
                    color,
                };
            })
            .filter((entry) => entry.value > 0);
    }, [wallet]);
};
