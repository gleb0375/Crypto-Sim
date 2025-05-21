import React, { createContext, useContext, useEffect, useState } from "react";
import { WalletCoinItem } from "../types/wallet.types.ts";
import { buildInitialWallet } from "../utils/buildInitialWallet.ts";
import { useAllTickerPrices } from "../hooks/wallet-context/useAllTickerPrices.ts";

type TradeMode = "buy" | "sell";

interface WalletContextType {
    wallet: WalletCoinItem[];
    getBalance(symbol: string): number;
    executeTrade(mode: TradeMode, symbol: string, price: number, amount: number): void;
    resetWallet(): void;
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

                    let newAvgBuyPrice = item.avgBuyPrice ?? 0;
                    if (mode === "buy") {
                        const totalCostBefore = newAvgBuyPrice * item.holdings;
                        const totalCostNew = price * amount;
                        newAvgBuyPrice = newHoldings > 0
                            ? (totalCostBefore + totalCostNew) / newHoldings
                            : 0;
                    } else {
                        newAvgBuyPrice = item.avgBuyPrice ?? 0;
                    }

                    return {
                        ...item,
                        holdings: newHoldings,
                        value: newHoldings * price,
                        avgBuyPrice: newAvgBuyPrice,
                    };
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


    const resetWallet = () => {
        const initial = buildInitialWallet();
        setWallet(initial);
        localStorage.setItem(WALLET_KEY, JSON.stringify(initial));
    };

    return (
        <WalletContext.Provider value={{ wallet, getBalance, executeTrade, resetWallet }}>
            {children}
        </WalletContext.Provider>
    );
};

export const useWallet = () => {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used inside WalletProvider");
    return ctx;
};
