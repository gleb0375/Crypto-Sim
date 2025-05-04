import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import TradePanel from "../common-components/trade-page-ui/trade-panel/TradePanel.tsx";
import {MobileTradePanelProps} from "../types/trade.types.ts";

const MobileTradeButton = styled.button`
    display: none;

    @media (max-width: 768px) {
        font-family: 'telegraf', sans-serif;
        font-weight: 400;
        display: block;
        position: fixed;
        bottom: 2vh;
        left: 2vh;
        right: 2vh;
        padding: 1rem;
        background-color: #2e2e33;
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

const MobileTradePanel: React.FC<MobileTradePanelProps> = ({ isOpen, onClose, onOpen, symbol, name, price }) => (
    <>
        <MobileTradeButton onClick={onOpen}>Open Trade Panel</MobileTradeButton>

        {isOpen && (
            <MobileTradeModal>
                <CloseButton onClick={onClose}>
                    <IoMdClose />
                </CloseButton>
                <MobileTradeWrapper>
                    <TradePanel symbol={symbol} name={name} price={price} />
                </MobileTradeWrapper>
            </MobileTradeModal>
        )}
    </>
);

export default MobileTradePanel;
