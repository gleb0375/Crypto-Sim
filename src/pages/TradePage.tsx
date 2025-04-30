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
    background-color: #101014;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #1a2531;
    font-size: 1.5rem;

    @media (max-width: 768px) {
        width: 100%;
        height: 50vh;
    }
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

    @media (max-width: 768px) {
        display: none;
    }
`;

const MobileTradeButton = styled.button`
    display: none;

    @media (max-width: 768px) {
        display: block;
        position: fixed;
        bottom: 20px;
        left: 20px;
        right: 20px;
        padding: 1rem;
        background-color: #28a745;
        color: white;
        font-size: 1.6rem;
        border: none;
        border-radius: 0.8rem;
        z-index: 1000;
    }
`;

const MobileTradeModal = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: #1e1e24;
        z-index: 2000;
        overflow-y: auto;
        padding: 2rem 1rem;
    }
`;

const MobileTradeWrapper = styled.div`
    width: 100%;
    max-width: 420px;
`;

const CloseButton = styled.button`
    align-self: flex-end;
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    margin-bottom: 1rem;
`;

const TradePage: React.FC = () => {
    const [selectedCoin, setSelectedCoin] = useState<Coin>(COINS[0]);
    const [selectedInterval, setSelectedInterval] = useState("1m");
    const [livePrice, setLivePrice] = useState<number>();
    const [isMobileTradeOpen, setIsMobileTradeOpen] = useState(false);

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
        <>
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
                    <TradePanel symbol={selectedCoin.symbol} price={displayPrice} />
                </RightPanel>
            </ContainerCoinDetail>

            <MobileTradeButton onClick={() => setIsMobileTradeOpen(true)}>
                Open Trade Panel
            </MobileTradeButton>

            {isMobileTradeOpen && (
                <MobileTradeModal>
                    <MobileTradeWrapper>
                        <CloseButton onClick={() => setIsMobileTradeOpen(false)}>×</CloseButton>
                        <TradePanel symbol={selectedCoin.symbol} price={displayPrice} />
                    </MobileTradeWrapper>
                </MobileTradeModal>
            )}
        </>
    );
};

export default TradePage;
