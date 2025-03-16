// src/pages/CoinDetailPage.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { COINS, Coin } from "../constants/binanceConstants";
import { useKlines } from "../hooks/useKlines";
import TradingChart from "../common-components/chart/TradingChart";
import CoinHeader from "../common-components/coin/CoinHeader";

const ContainerCoinDetail = styled.div`
    display: flex;             /* Горизонтальное размещение */
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 2rem;
    background-color: #332d2d;
    /* Можем задать gap, чтобы раздвинуть блоки */
    gap: 5vh; /* или 3rem, или иные относительные единицы */
`;

const ChartContainer = styled.div`
    width: 100vh;
    height: 60vh;
    background-color: #2c2121;
    border: 2px dashed #292121;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1a2531;
    font-size: 1.5rem;
    overflow: auto;
    padding: 1rem;
    transform: translate(5vh, 5vh);
`;

const HeaderWrapper = styled.div`
    margin-top: 5vh;
    margin-left: 10vh;
`;

const CoinDetailPage: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    const { data, error, isLoading } = useKlines(selectedCoin.symbol, "1m");

    if (isLoading) {
        return <ContainerCoinDetail>Loading...</ContainerCoinDetail>;
    }

    if (error) {
        return (
            <ContainerCoinDetail>
                Error: {(error as Error).message}
            </ContainerCoinDetail>
        );
    }

    let price: number | undefined;
    if (data && data.length > 0) {
        price = parseFloat(data[data.length - 1].close);
    }

    return (
        <ContainerCoinDetail>
            <ChartContainer>
                {data ? <TradingChart data={data} /> : <div>No data</div>}
            </ChartContainer>

            <HeaderWrapper>
                <CoinHeader
                    coins={COINS}
                    selectedCoin={selectedCoin}
                    price={price}
                    onSelectCoin={(coin) => setSelectedCoin(coin)}
                />
            </HeaderWrapper>
        </ContainerCoinDetail>
    );
};

export default CoinDetailPage;
