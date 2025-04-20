import React, { useState } from "react";
import styled from "styled-components";
import { useKlines } from "../hooks/useKlines";
import TradingChart from "../common-components/chart/TradingChart";
import CoinHeader from "../common-components/coin/CoinHeader";
import {Coin} from "../types/coin.types.ts";
import {COINS} from "../constants/coins.constants.ts";
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

const TimeIntervalsContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2vh;
`;

const TimeButton = styled.button<{ selected: boolean }>`
    background-color: ${({ selected }) => (selected ? "#ffffff22" : "transparent")};
    border: 1px solid #ffffff55;
    color: white;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1.5vh;
    border-radius: 5px;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    

    &:hover {
        background-color: #ffffff33;
    }
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
                <CoinHeader
                    coins={COINS}
                    selectedCoin={selectedCoin}
                    price={price}
                    onSelectCoin={(coin) => setSelectedCoin(coin)}
                />
                <TimeIntervalsContainer>
                    {TIME_INTERVALS.map((interval) => (
                        <TimeButton
                            key={interval}
                            selected={selectedInterval === interval}
                            onClick={() => setSelectedInterval(interval)}
                        >
                            {interval}
                        </TimeButton>
                    ))}
                </TimeIntervalsContainer>
                <ChartContainer>
                    {data ? <TradingChart data={data} /> : <div>No data</div>}
                </ChartContainer>
            </LeftPanel>
        </ContainerCoinDetail>
    );
};

export default CoinDetailPage;
