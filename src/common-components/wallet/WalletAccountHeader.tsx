import React from "react";
import styled from "styled-components";
import { LEFT_COLUMN_WIDTH } from "../../constants/wallet.constants.ts";
import { WalletBalance } from "../../types/coin.types.ts";
import { formatBtcWithSpaces, formatUsdWithSpaces } from "../../utils/number.ts";
import { IoIosCheckboxOutline, IoIosSquareOutline } from "react-icons/io";

interface Props {
    balance: WalletBalance;
    hideZero: boolean;
    onToggleHideZero: () => void;
}

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
    position: relative;
`;

const Title = styled.div`
    color: #b3c1bb;
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

const HideZeroContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 1.5rem;
    align-self: flex-end;
    gap: 0.5rem;
`;

const IconWrapper = styled.div`
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        font-size: 2.5vh;
        color: #bbb;
        transition: color 0.2s;
    }
`;

const HideZeroLabel = styled.span`
    margin-top: 0.5vh;
    color: #bbb;
    font-size: 2vh;
    user-select: none;
    pointer-events: none;
`;

const WalletAccountHeader: React.FC<Props> = ({ balance, hideZero, onToggleHideZero }) => {
    return (
        <HeaderBox>
            <Title>Total Balance</Title>
            <BalanceUSD>${formatUsdWithSpaces(balance.totalValueUSD)}</BalanceUSD>
            <BalanceBTC>= {formatBtcWithSpaces(balance.totalHoldingsBTC)} BTC</BalanceBTC>

            <HideZeroContainer>
                <IconWrapper onClick={onToggleHideZero}>
                    {hideZero ? <IoIosCheckboxOutline /> : <IoIosSquareOutline />}
                </IconWrapper>
                <HideZeroLabel>Hide Zero Balances</HideZeroLabel>
            </HideZeroContainer>
        </HeaderBox>
    );
};

export default WalletAccountHeader;
