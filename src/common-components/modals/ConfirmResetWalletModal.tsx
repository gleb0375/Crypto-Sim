import React from "react";
import styled from "styled-components";
import {ConfirmResetWalletModalProps} from "../../types/modals.types.ts";

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
    background: #1e1e24;
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
    color: #ff4c4c;
    margin-bottom: 2vh;
`;

const Message = styled.p`
    font-size: 2vh;
    color: #ccc;
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
    background-color: ${({ primary }) => (primary ? "#ba0000" : "#444")};
    color: ${({ primary }) => (primary ? "#fff" : "#ccc")};

    &:hover {
        background-color: ${({ primary }) => (primary ? "#a50000" : "#555")};
    }
`;

const ConfirmResetWalletModal: React.FC<ConfirmResetWalletModalProps> = ({ onConfirm, onClose }) => {
    return (
        <Overlay onClick={onClose}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <Title>Reset Wallet?</Title>
                <Message>
                    This will permanently reset your wallet to the initial state. Are you sure?
                </Message>
                <ButtonRow>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button primary onClick={onConfirm}>Reset</Button>
                </ButtonRow>
            </Modal>
        </Overlay>
    );
};

export default ConfirmResetWalletModal;
