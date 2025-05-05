import React, { createContext, useContext, useEffect, useState } from "react";
import { WalletCoinItem } from "../types/coin.types.ts";
import { buildInitialWallet } from "../utils/buildInitialWallet.ts";
import { useAllTickerPrices } from "../hooks/wallet-context/useAllTickerPrices.ts";

type TradeMode = "buy" | "sell";

interface WalletContextType {
    wallet: WalletCoinItem[];
    getBalance(symbol: string): number;
    executeTrade(mode: TradeMode, symbol: string, price: number, amount: number): void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WALLET_KEY = "wallet-state";

export const WalletProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [wallet, setWallet] = useState<WalletCoinItem[]>(() => {
        const saved = localStorage.getItem(WALLET_KEY);
        return saved ? JSON.parse(saved) : buildInitialWallet();
    });

    const { prices } = useAllTickerPrices();

    useEffect(() => {
        localStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
    }, [wallet]);

    useEffect(() => {
        if (!prices || Object.keys(prices).length === 0) return;

        setWallet((prevWallet) =>
            prevWallet.map((item) => {
                if (item.symbol === "USDT") return item;

                const livePrice = prices[item.symbol];
                if (!livePrice) return item;

                return { ...item, value: item.holdings * livePrice };
            })
        );
    }, [prices]);

    const getBalance = (symbol: string) =>
        wallet.find((item) => item.symbol === symbol)?.holdings ?? 0;

    const executeTrade = (mode: TradeMode, symbol: string, price: number, amount: number) => {
        setWallet((prevWallet) =>
            prevWallet.map((item) => {
                if (item.symbol === symbol) {
                    const delta = mode === "buy" ? amount : -amount;
                    const newHoldings = item.holdings + delta;
                    return { ...item, holdings: newHoldings, value: newHoldings * price };
                }
                if (item.symbol === "USDT") {
                    const usdtDelta = mode === "buy" ? -amount * price : amount * price;
                    const newHoldings = item.holdings + usdtDelta;
                    return { ...item, holdings: newHoldings, value: newHoldings };
                }
                return item;
            })
        );
    };

    return (
        <WalletContext.Provider value={{ wallet, getBalance, executeTrade }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
    return ctx;
};
