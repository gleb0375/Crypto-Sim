import React from "react";
import styled from "styled-components";
import {LEFT_COLUMN_WIDTH} from "../../constants/wallet.constants.ts";

const HeaderBox = styled.div`
    background-color: #1e1e24;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: ${LEFT_COLUMN_WIDTH};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
`;

const Title = styled.div`
    font-size: 4vh;
    font-family: 'telegraf', sans-serif;
    font-weight: 800;
    letter-spacing: 0.04em;
`;

const BalanceUSD = styled.div`
    font-size: 5vh;
    color: #00ff99;
    font-weight: bold;
`;

const BalanceBTC = styled.div`
    font-size: 1rem;
    color: #888;
`;

const WalletAccountHeader: React.FC = () => {
    return (
        <HeaderBox>
            <Title>Total Balance</Title>
            <BalanceUSD>$641.85</BalanceUSD>
            <BalanceBTC>= 0.00768845 BTC</BalanceBTC>
        </HeaderBox>
    );
};

export default WalletAccountHeader;
