import React, { useState } from "react";
import styled from "styled-components";
import { LEFT_COLUMN_WIDTH } from "../../../constants/wallet.constants.ts";
import { WalletBalance } from "../../../types/wallet.types.ts";
import { formatBtcWithSpaces, formatUsdWithSpaces } from "../../../utils/number.ts";
import { IoIosCheckboxOutline, IoIosSquareOutline } from "react-icons/io";
import { useWallet } from "../../../contexts/WalletContext.tsx";
import ConfirmResetWalletModal from "../../modals/ConfirmResetWalletModal.tsx";

interface Props {
    balance: WalletBalance;
    hideZero: boolean;
    onToggleHideZero: () => void;
}

const HeaderBox = styled.div`
    font-family: 'telegraf', sans-serif;
    background-color: #1e1e24;
    padding: 2vh;
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

const ResetButton = styled.button`
    position: absolute;
    bottom: 1.5vh;
    left: 1.5vh;
    background-color: transparent;
    color: #ba0000;
    border: 2px solid #ba0000;
    padding: 0.6vh 1.4vh;
    border-radius: 0.5rem;
    font-size: 1.5vh;
    font-family: 'telegraf', sans-serif;
    font-weight: 600;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: background-color 0.25s, color 0.25s, box-shadow 0.25s;

    &:hover {
        background-color: #ba0000;
        color: #fff;
        box-shadow: 0 0 8px rgba(186, 0, 0, 0.5);
    }
`;

const WalletAccountHeader: React.FC<Props> = ({ balance, hideZero, onToggleHideZero }) => {
    const { resetWallet } = useWallet();
    const [showModal, setShowModal] = useState(false);

    const handleResetConfirm = () => {
        resetWallet();
        setShowModal(false);
    };

    return (
        <>
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

                <ResetButton onClick={() => setShowModal(true)}>Reset Wallet</ResetButton>
            </HeaderBox>

            {showModal && (
                <ConfirmResetWalletModal
                    onConfirm={handleResetConfirm}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default WalletAccountHeader;
