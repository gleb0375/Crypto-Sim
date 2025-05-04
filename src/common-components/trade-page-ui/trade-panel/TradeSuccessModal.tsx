import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";

interface TradeSuccessModalProps {
    symbol: string;
    amount: number;
    value: number;
    mode: "buy" | "sell";
    onClose: () => void;
}

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
    padding: 2vh 2vw;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    font-family: 'telegraf', sans-serif;
    font-weight: 400;
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

const Title = styled.h2`
    font-size: 3vh;
    color: #2e7d32;
    margin-bottom: 2vh;
`;

const Message = styled.p`
    font-size: 2vh;
    color: #1b1b1b;
`;

const TradeSuccessModal: React.FC<TradeSuccessModalProps> = ({ symbol, amount, value, mode, onClose }) => {
    const verb = mode === "buy" ? "bought" : "sold";

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <CloseIcon onClick={onClose}>
                    <IoMdClose />
                </CloseIcon>
                <Title>Trade Successful!</Title>
                <Message>
                    You successfully {verb} {amount.toFixed(2)} {symbol} for ${value.toFixed(2)}
                </Message>
            </Modal>
        </Overlay>
    );
};

export default TradeSuccessModal;
