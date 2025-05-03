import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet/WalletAccountHeader";
import WalletScrollBox from "../common-components/wallet/WalletScrollBox";
import PieWalletChart from "../common-components/wallet/PieWalletChart";
import { LEFT_COLUMN_WIDTH } from "../constants/wallet.constants.ts";
import { calculateWalletBalance } from "../utils/calculateWalletBalance.ts";
import { useWallet } from "../contexts/WalletContext.tsx";
import { useTickerPrice } from "../hooks/useTickerPrice.ts";
import { COINS, USDT_COIN } from "../constants/coins.constants.ts";

const ContainerWallet = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: #16161b;
    padding: 2vh;
    box-sizing: border-box;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50vh;
    width: ${LEFT_COLUMN_WIDTH};
    height: 100%;
    gap: 2rem;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        align-items: center;
    }
`;

const RightColumn = styled.div`
    flex: 1;
    padding-left: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const HIDE_ZERO_KEY = "wallet-hide-zero";

const WalletPage: React.FC = () => {
    const { wallet } = useWallet();
    const { data: btcTicker } = useTickerPrice("BTCUSDT");
    const btcPrice = parseFloat(btcTicker?.price || "0");

    const [hideZero, setHideZero] = useState<boolean>(() => {
        const saved = localStorage.getItem(HIDE_ZERO_KEY);
        return saved === "true";
    });

    useEffect(() => {
        localStorage.setItem(HIDE_ZERO_KEY, hideZero.toString());
    }, [hideZero]);

    const filteredWallet = hideZero
        ? wallet.filter((coin) => coin.holdings > 0)
        : wallet;

    const balance = useMemo(
        () => calculateWalletBalance(wallet, btcPrice),
        [wallet, btcPrice]
    );

    const pieData = useMemo(() => {
        const total = filteredWallet.reduce((sum, c) => sum + c.value, 0);

        return filteredWallet
            .filter((coin) => coin.value > 0)
            .map((coin) => {
                const isUSDT = coin.symbol === "USDT";
                const baseSymbol = isUSDT ? "USDT" : coin.symbol.replace("USDT", "");
                const color = isUSDT
                    ? USDT_COIN.color
                    : COINS.find((c) => c.symbol === coin.symbol)?.color || "#888";

                const rawValue = Math.round(coin.value / 10) * 10;

                // игнорируем доли менее 0.1% от общего портфеля
                const finalValue = rawValue < total * 0.001 ? 0 : rawValue;

                return {
                    name: baseSymbol,
                    value: finalValue,
                    color,
                };
            })
            .filter((entry) => entry.value > 0); // очищаем нули
    }, [filteredWallet]);

    return (
        <ContainerWallet>
            <LeftColumn>
                <WalletAccountHeader
                    balance={balance}
                    hideZero={hideZero}
                    onToggleHideZero={() => setHideZero((prev) => !prev)}
                />
                <WalletScrollBox coins={filteredWallet} />
            </LeftColumn>
            <RightColumn>
                <PieWalletChart data={pieData} />
            </RightColumn>
        </ContainerWallet>
    );
};

export default WalletPage;
