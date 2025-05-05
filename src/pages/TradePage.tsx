import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TradingChart from "../common-components/trade-page-ui/chart/TradingChart";
import CoinInfoComponent from "../common-components/trade-page-ui/coin/CoinInfoComponent.tsx";
import TimeIntervalComponent from "../common-components/trade-page-ui/coin/TimeIntervalComponent.tsx";
import Loader from "../common-components/loader/Loader";
import TradePanel from "../common-components/trade-page-ui/trade-panel/TradePanel.tsx";
import MobileTradePanel from "./TradePage.mobile";
import { COINS } from "../constants/coins.constants";
import { TIME_INTERVALS } from "../constants/market.constans";
import { useTradePage } from "../hooks/trade-page/useTradePage.ts";
import ErrorModal from "../common-components/modals/ErrorModal.tsx";

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
        coinReady,
        intervalReady
    } = useTradePage();

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);
            setSelectedCoin(COINS[0]);
            setSelectedInterval(TIME_INTERVALS[2]);
        }
    }, [error]);

    if (!coinReady || !intervalReady || isLoading) return <Loader />;

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

            {showError && (
                <ErrorModal
                    error={(error as Error)?.message || "Unexpected error occurred."}
                    onClose={() => setShowError(false)}
                />
            )}
        </>
    );
};

export default TradePage;
