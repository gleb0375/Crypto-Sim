import React from "react";
import styled from "styled-components";
import TradingChart from "../common-components/chart/TradingChart";
import CoinInfoComponent from "../common-components/coin/CoinInfoComponent.tsx";
import TimeIntervalComponent from "../common-components/chart/TimeIntervalComponent.tsx";
import Loader from "../common-components/loader/Loader";
import TradePanel from "../common-components/trade/TradePanel";
import MobileTradePanel from "./TradePage.mobile";
import { COINS } from "../constants/coins.constants";
import { TIME_INTERVALS } from "../constants/market.constans";
import {useTradePage} from "../hooks/trade/useTradePage.ts";

const ContainerCoinDetail = styled.div`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    color: #ffffff;
    font-size: 2rem;
    background-color: #16161b;
    gap: 5vh;

    @media (max-width: 768px) {
        flex-direction: column;
        gap: 2vh;
    }
`;

const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ChartContainer = styled.div`
    width: 100vh;
    height: 60vh;
    background-color: #16161b;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.5rem;
    border: 4px solid #1e1e24;
    border-radius: 10px;

    @media (max-width: 768px) {
        border: none;
        width: 100%;
        height: 65vh;
    }
`;

const RightPanel = styled.div`
    width: 25%;
    min-width: 25vh;
    max-width: 35vh;
    height: 57vh;
    margin-top: calc(4vh + 2vh + 3vh + 2vh);
    background-color: #1e1e24;
    border-radius: 10px;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(34, 32, 32, 0.4);

    @media (max-width: 768px) {
        display: none;
    }
`;

const TradePage: React.FC = () => {
    const {
        selectedCoin,
        setSelectedCoin,
        selectedInterval,
        setSelectedInterval,
        displayPrice,
        chartData,
        error,
        isLoading,
        isMobileTradeOpen,
        openMobileTrade,
        closeMobileTrade,
        setLivePrice,
    } = useTradePage();


    if (isLoading) return <Loader />;
    if (error) return <ContainerCoinDetail>Error: {(error as Error).message}</ContainerCoinDetail>;

    return (
        <>
            <ContainerCoinDetail>
                <LeftPanel>
                    <CoinInfoComponent
                        coins={COINS}
                        selectedCoin={selectedCoin}
                        price={displayPrice}
                        onSelectCoin={(coin) => {
                            setSelectedCoin(coin);
                            setLivePrice(undefined);
                        }}
                    />

                    <TimeIntervalComponent
                        intervals={TIME_INTERVALS}
                        selectedInterval={selectedInterval}
                        onSelect={setSelectedInterval}
                    />

                    <ChartContainer>
                        {chartData ? (
                            <TradingChart
                                data={chartData}
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
                    <TradePanel symbol={selectedCoin.symbol} name={selectedCoin.name} price={displayPrice} />
                </RightPanel>
            </ContainerCoinDetail>

            <MobileTradePanel
                isOpen={isMobileTradeOpen}
                onOpen={openMobileTrade}
                onClose={closeMobileTrade}
                symbol={selectedCoin.symbol}
                name={selectedCoin.name}
                price={displayPrice}
            />
        </>
    );
};

export default TradePage;
