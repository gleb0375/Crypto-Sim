import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet/WalletAccountHeader";
import WalletScrollBox from "../common-components/wallet/WalletScrollBox";
import { LEFT_COLUMN_WIDTH } from "../constants/wallet.constants.ts";
import { calculateWalletBalance } from "../utils/calculateWalletBalance.ts";
import { useWallet } from "../contexts/WalletContext.tsx";
import { useTickerPrice } from "../hooks/useTickerPrice.ts";

const ContainerWallet = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    background-color: #16161b;
    padding: 2vh;
    box-sizing: border-box;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50vh;
    width: ${LEFT_COLUMN_WIDTH};
    height: 100%;
    gap: 2rem;
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
        </ContainerWallet>
    );
};

export default WalletPage;
