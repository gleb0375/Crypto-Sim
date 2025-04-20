import React, { useState } from "react";
import styled from "styled-components";
import { useKlines } from "../hooks/useKlines";
import TradingChart from "../common-components/chart/TradingChart";
import CoinInfoContainer from "../common-components/coin/CoinInfoContainer.tsx";
import TimeIntervalContainer from "../common-components/chart/TimeIntervalContainer.tsx";
import { Coin } from "../types/coin.types.ts";
import { COINS } from "../constants/coins.constants.ts";
import {TIME_INTERVALS} from "../constants/market.constans.ts";

    const ContainerCoinDetail = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 2rem;
    background-color: #16161b;
    gap: 5vh;
`;

const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
`;

const ChartContainer = styled.div`
    width: 100vh;
    height: 60vh;
    background-color: #101014;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1a2531;
    font-size: 1.5rem;
    overflow: auto;
`;

const CoinDetailPage: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    const [selectedInterval, setSelectedInterval] = useState("1m");
    const { data, error, isLoading } = useKlines(selectedCoin.symbol, selectedInterval);

    if (isLoading) {
        return <ContainerCoinDetail>Loading...</ContainerCoinDetail>;
    }

    if (error) {
        return <ContainerCoinDetail>Error: {(error as Error).message}</ContainerCoinDetail>;
    }

    let price: number | undefined;
    if (data && data.length > 0) {
        price = parseFloat(data[data.length - 1].close);
    }

    return (
        <ContainerCoinDetail>
            <LeftPanel>
                <CoinInfoContainer
                    coins={COINS}
                    selectedCoin={selectedCoin}
                    price={price}
                    onSelectCoin={(coin) => setSelectedCoin(coin)}
                />
                <TimeIntervalContainer
                    intervals={TIME_INTERVALS}
                    selectedInterval={selectedInterval}
                    onSelect={setSelectedInterval}
                />
                <ChartContainer>
                    {data ? <TradingChart data={data} /> : <div>No data</div>}
                </ChartContainer>
            </LeftPanel>
        </ContainerCoinDetail>
    );
};

export default CoinDetailPage;
