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
import {IoMdClose} from "react-icons/io";

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
        font-size: 3.5vh;
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
    }
`;

const MobileTradeWrapper = styled.div`
    margin-top: 5rem;
    padding: 1rem;
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
`;

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    color: #fff;
    font-size: 2rem;
    cursor: pointer;
    z-index: 10;
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
                    <TradePanel symbol={selectedCoin.symbol} name={selectedCoin.name} price={displayPrice} />
                </RightPanel>
            </ContainerCoinDetail>

            <MobileTradeButton onClick={() => setIsMobileTradeOpen(true)}>
                Open Trade Panel
            </MobileTradeButton>

            {isMobileTradeOpen && (
                <MobileTradeModal>
                    <CloseButton onClick={() => setIsMobileTradeOpen(false)}>
                        <IoMdClose />
                    </CloseButton>
                    <MobileTradeWrapper>
                        <TradePanel symbol={selectedCoin.symbol} name={selectedCoin.name} price={displayPrice} />
                    </MobileTradeWrapper>
                </MobileTradeModal>
            )}
        </>
    );
};

export default TradePage;
