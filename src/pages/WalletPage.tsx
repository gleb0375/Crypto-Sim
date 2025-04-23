import React from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet/WalletAccountHeader";
import WalletScrollBox from "../common-components/wallet/WalletScrollBox";
import {LEFT_COLUMN_WIDTH, walletMockData} from "../constants/coins.constants.ts";

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

const WalletPage: React.FC = () => {
    return (
        <ContainerWallet>
            <LeftColumn>
                <WalletAccountHeader />
                <WalletScrollBox coins={walletMockData} />
            </LeftColumn>
        </ContainerWallet>
    );
};

export default WalletPage;
