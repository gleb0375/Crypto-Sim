import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useKlines } from "../hooks/useKlines";
import { useTickerPrice } from "../hooks/useTickerPrice";
import TradingChart from "../common-components/chart/TradingChart";
import CoinInfoContainer from "../common-components/coin/CoinInfoContainer";
import TimeIntervalContainer from "../common-components/chart/TimeIntervalContainer";
import Loader from "../common-components/loader/Loader";
import TradePanel from "../common-components/trade/TradePanel.tsx";
import { Coin } from "../types/coin.types";
import { COINS } from "../constants/coins.constants";
import { TIME_INTERVALS } from "../constants/market.constans";

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

const RightPanel = styled.div`
    width: 25%;
    min-width: 25vh;
    max-width: 35vh;
    height: 56vh;
    margin-top: calc(4vh + 2vh + 3vh + 2vh);
    background-color: #1e1e24;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(34, 32, 32, 0.4);
`;

const TradePage: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    const [selectedInterval, setSelectedInterval] = useState("1m");
    const [livePrice, setLivePrice] = useState<number>();

    const { data, error, isLoading } = useKlines(selectedCoin.symbol, selectedInterval);
    const { data: tickerData } = useTickerPrice(selectedCoin.symbol);

    useEffect(() => {
        if (tickerData && livePrice === undefined) {
            setLivePrice(parseFloat(tickerData.price));
        }
    }, [tickerData, livePrice]);

    const displayPrice = livePrice;

    if (isLoading) return <Loader />;
    if (error) return <ContainerCoinDetail>Error: {(error as Error).message}</ContainerCoinDetail>;

    return (
        <ContainerCoinDetail>
            <LeftPanel>
                <CoinInfoContainer
                    coins={COINS}
                    selectedCoin={selectedCoin}
                    price={displayPrice}
                    onSelectCoin={(coin) => {
                        setSelectedCoin(coin);
                        setLivePrice(undefined);
                    }}
                />

                <TimeIntervalContainer
                    intervals={TIME_INTERVALS}
                    selectedInterval={selectedInterval}
                    onSelect={setSelectedInterval}
                />

                <ChartContainer>
                    {data ? (
                        <TradingChart
                            data={data}
                            symbol={selectedCoin.symbol}
                            interval={selectedInterval}
                            onPriceUpdate={setLivePrice}
                        />
                    ) : (
                        <div>No data</div>
                    )}
                </ChartContainer>
            </LeftPanel>

            <RightPanel>
                <TradePanel
                    symbol={selectedCoin.symbol}
                    price={displayPrice}
                />
            </RightPanel>
        </ContainerCoinDetail>
    );
};

export default TradePage;
