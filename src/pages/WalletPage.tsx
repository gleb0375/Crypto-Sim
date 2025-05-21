import React from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet-page-ui/header/WalletAccountHeader.tsx";
import WalletScrollBox from "../common-components/wallet-page-ui/scroll-box/WalletScrollBox.tsx";
import PieWalletChart from "../common-components/wallet-page-ui/pie-chart/PieWalletChart.tsx";
import { LEFT_COLUMN_WIDTH } from "../constants/wallet.constants.ts";
import {useWalletPage} from "../hooks/wallet-page/useWalletPage.ts";

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

const LeftPanel = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50vh;
    width: ${LEFT_COLUMN_WIDTH};
    height: 100%;

    @media (max-width: 768px) {
        width: 100%;
        max-width: 100%;
        align-items: center;
    }
`;

const RightPanel = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #16161b;
    overflow: hidden;
    
    @media (max-width: 768px) {
        display: none;
    }
`;

const ChartWrapper = styled.div`
    width: 100%;
    max-width: 85vh;
    background-color: #535561;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
`;


const WalletPage: React.FC = () => {
    const { balance, filteredWallet, pieData, hideZero, toggleHideZero,  highlightedSymbol, setHighlightedSymbol} = useWalletPage();

    return (
        <ContainerWallet>
            <LeftPanel>
                <WalletAccountHeader
                    balance={balance}
                    hideZero={hideZero}
                    onToggleHideZero={toggleHideZero}
                />
                <WalletScrollBox
                    coins={filteredWallet}
                    onHighlight={setHighlightedSymbol}
                />
            </LeftPanel>
            <RightPanel>
                <ChartWrapper>
                    <PieWalletChart
                        data={pieData}
                        highlightedSymbol={highlightedSymbol}
                    />
                </ChartWrapper>
            </RightPanel>
        </ContainerWallet>
    );
};

export default WalletPage;
