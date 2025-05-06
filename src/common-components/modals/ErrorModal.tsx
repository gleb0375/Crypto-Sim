import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import {ErrorModalProps} from "../../types/modals.types.ts";

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
    background: #fff3f3;
    padding: 2vh 2vw;
    border-radius: 12px;
    width: 90%;
    max-width: 400px;
    text-align: center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    font-family: 'telegraf', sans-serif;
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

    &:hover {
        color: #000;
    }
`;

const Title = styled.h2`
    font-size: 3vh;
    color: #d32f2f;
    margin-bottom: 2vh;
`;

const Message = styled.p`
    font-size: 2vh;
    color: #1b1b1b;
`;

const ErrorModal: React.FC<ErrorModalProps> = ({ error, onClose }) => (
    <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
            <CloseIcon onClick={onClose}>
                <IoMdClose />
            </CloseIcon>
            <Title>Something went wrong</Title>
            <Message>{error}</Message>
        </Modal>
    </Overlay>
);

export default ErrorModal;
