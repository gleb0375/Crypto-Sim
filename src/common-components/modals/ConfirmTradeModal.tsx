import React from "react";
import styled from "styled-components";
import {ConfirmTradeModalProps} from "../../types/modals.types.ts";

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
`;

const Title = styled.h2`
    font-size: 3vh;
    color: #1b1b1b;
    margin-bottom: 2vh;
`;

const Message = styled.p`
    font-size: 2vh;
    color: #000;
    margin-bottom: 2vh;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 2vh;
`;

const Button = styled.button<{ primary?: boolean }>`
    padding: 1vh 2vw;
    font-size: 2vh;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    background-color: ${({ primary }) => (primary ? "#4caf50" : "#ccc")};
    color: ${({ primary }) => (primary ? "#fff" : "#000")};

    &:hover {
        background-color: ${({ primary }) => (primary ? "#45a049" : "#bbb")};
    }
`;

const ConfirmTradeModal: React.FC<ConfirmTradeModalProps> = ({
                                                                 name, amount, value, mode, onConfirm, onClose
                                                             }) => {
    const verb = mode === "buy" ? "buy" : "sell";

    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>Confirm Trade</Title>
                <Message>
                    Are you sure you want to {verb} {amount.toFixed(6)} {name} for ${value.toFixed(2)}?
                </Message>
                <ButtonRow>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={onConfirm}>Confirm</Button>
                </ButtonRow>
            </Modal>
        </Overlay>
    );
};

export default ConfirmTradeModal;
