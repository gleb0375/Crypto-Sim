// src/common-components/trade/ModeSwitch.tsx
import React from "react";
import styled from "styled-components";

const SwitchContainer = styled.div<{ mode: "buy" | "sell" }>`
    position: relative;
    width: 100%;
    height: 4vh;
    background: #4c4c4c; /* фон «неактивного» состояния */
    border-radius: 0.25rem;
    cursor: pointer;
    user-select: none;
    display: flex;
    font-family: 'telegraf', sans-serif;
    font-weight: 400;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: ${({ mode }) => (mode === "buy" ? "0" : "50%")};
        width: 50%;
        height: 100%;
        background: ${({ mode }) => (mode === "buy" ? "#44a868" : "#e15241")};
        border-radius: 0.25rem;
        transition: left 0.2s ease, background 0.2s ease;
    }
`;

const SwitchLabel = styled.div<{ side: "buy" | "sell"; mode: "buy" | "sell" }>`
    font-size: 3vh;
    flex: 1;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ side, mode }) => (side === mode ? "#fdfdfd" : "#ccc")};
    transition: color 0.2s ease;
    ${({ side, mode }) =>
            side === mode &&
            `
      font-weight: 400; 
    `}
`;

interface ModeSwitchProps {
    mode: "buy" | "sell";
    onChange: (mode: "buy" | "sell") => void;
}

const ModeSwitch: React.FC<ModeSwitchProps> = ({ mode, onChange }) => {
    const toggle = () => onChange(mode === "buy" ? "sell" : "buy");

    return (
        <SwitchContainer mode={mode} onClick={toggle}>
            <SwitchLabel side="buy" mode={mode}>
                Buy
            </SwitchLabel>
            <SwitchLabel side="sell" mode={mode}>
                Sell
            </SwitchLabel>
        </SwitchContainer>
    );
};

export default ModeSwitch;
