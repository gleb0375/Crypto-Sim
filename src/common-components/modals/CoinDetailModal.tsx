import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useWallet } from '../../contexts/WalletContext.tsx';
import { IoMdClose } from "react-icons/io";
import {CoinDetailModalProps} from "../../types/modals.types.ts";


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
`;

const Modal = styled.div`
    position: relative;
    background: #dce9fc;
    margin: 2vh;
    padding: 2vh;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
`;

const CloseIcon = styled.button`
    position: absolute;
    top: 1vh;
    right: 1vh;
    background: none;
    border: none;
    color: #333;
    font-size: 4vh;
    cursor: pointer;
    z-index: 10;

    &:hover {
        color: #000;
    }
`;

const spinY = keyframes`
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(360deg); }
`;

const CoinHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
`;

const Logo = styled.img`
    width: 7vh;
    height: 7vh;
    border-radius: 50%;
    animation: ${spinY} 4s linear infinite;
    transform-style: preserve-3d;
`;

const CoinName = styled.h2`
    font-size: 4vh;
    color: #1a1a1a;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    font-size: 1.2rem;
    color: #333;
    max-width: 20rem;
    margin: 0.5rem auto;
`;

const Label = styled.span`
    text-align: left;
    font-weight: 500;
    min-width: 6rem;
`;

const Value = styled.span`
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: 600;
`;


const CoinDetailModal: React.FC<CoinDetailModalProps> = ({ symbol, onClose }) => {
    const { wallet } = useWallet();
    const coin = wallet.find(c => c.symbol === symbol);

    if (!coin) return null;

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={onClose}>
                    <IoMdClose />
                </CloseIcon>

                <CoinHeader>
                    <Logo src={coin.logo} alt={coin.name} />
                    <CoinName>{coin.name}</CoinName>
                </CoinHeader>

                <InfoRow>
                    <Label>Holdings:</Label>
                    <Value>{coin.holdings.toFixed(6)}</Value>
                </InfoRow>
                <InfoRow>
                    <Label>Value:</Label>
                    <Value>${coin.value.toFixed(2)}</Value>
                </InfoRow>

            </Modal>
        </Overlay>
    );
};

export default CoinDetailModal;
