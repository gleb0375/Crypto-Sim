import React from "react";
import styled from "styled-components";
import ModeSwitch from "./ModeSwitch.tsx";
import {TradePanelProps} from "../../../types/trade.types.ts";
import {useTradePanel} from "../../../hooks/trade-page/trade-panel/useTradePanel.ts";

const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
`;

const Section = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2.5vh;
`;

const Label = styled.label`
    color: #aaa;
    font-size: 1.7vh;
`;

const Row = styled.div`
    padding-top: 1.5vh;
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 0.5rem;
`;

const UnitWrapper = styled.div`
    position: relative;
    width: 100%;
`;

const UnitInput = styled.input`
    width: 100%;
    height: 5vh;
    background: #27282c;
    border: none;
    border-radius: 4px;
    font-size: 1.8vh;
    line-height: 5vh;
    font-family: inherit;
    font-weight: inherit;
    color: #fff;
    padding-left: 12px;
    padding-right: 3rem;
    box-sizing: border-box;
    outline: none;
    user-select: none;
    pointer-events: none;
`;

const UnitInside = styled.span`
    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.8vh;
    font-family: inherit;
    font-weight: inherit;
    color: #fff;
    pointer-events: none;
`;

const EditableInput = styled.input`
    width: 100%;
    height: 5vh;
    background: #27282c;
    border: none;
    border-radius: 4px;
    font-size: 1.8vh;
    line-height: 5vh;
    font-family: inherit;
    font-weight: inherit;
    color: #fff;
    padding-left: 12px;
    box-sizing: border-box;
    outline: none;

    -moz-appearance: textfield;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;

const ActionButton = styled.button<{ mode: "buy" | "sell" }>`
    width: 100%;
    padding: 0.7vh;
    background: ${({ mode }) => (mode === "buy" ? "#44a868" : "#e15241")};
    color: white;
    font-size: 3vh;
    font-family: inherit;
    font-weight: 500;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.2s ease;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    @media (max-width: 768px) {
        margin-top: 5vh;
    }
`;

const ErrorInputWrapper = styled(UnitWrapper)<{ hasError?: boolean }>`
    ${props => props.hasError && `
        input {
            border: 1px solid #ff4d4f;
        }
    `}
`;

const BalanceValue = styled.div<{ hasError?: boolean }>`
    color: ${props => props.hasError ? "#ff4d4f" : "#fff"};
    font-size: 0.9rem;
`;

const TradePanel: React.FC<TradePanelProps> = ({ symbol, name, price }) => {
    const {
        mode,
        setMode,
        qty,
        orderValue,
        availableBalanceDisplay,
        handleQtyChange,
        handleOrderValueChange,
        handleExecuteTrade,
        hasInsufficientBalance,
    } = useTradePanel(symbol, price);

    return (
        <PanelContainer>
            <ModeSwitch mode={mode} onChange={setMode} />
            <Section>
                <Row>
                    <Label>Available Balance</Label>
                    <BalanceValue hasError={hasInsufficientBalance}>
                        {availableBalanceDisplay} {mode === "buy" ? "USDT" : name}
                    </BalanceValue>

                </Row>
                <div>
                    <Label>Order Price</Label>
                    <UnitWrapper>
                        <UnitInput type="text" readOnly value={price?.toFixed(2) ?? "--"} />
                        <UnitInside>USDT</UnitInside>
                    </UnitWrapper>
                </div>
                <div>
                    <Label>Qty</Label>
                    <UnitWrapper>
                        <EditableInput
                            type="number"
                            placeholder="0"
                            value={qty}
                            onChange={handleQtyChange}
                        />
                    </UnitWrapper>
                </div>
                <div>
                <Label>Order Value</Label>
                    <ErrorInputWrapper hasError={ mode === "buy" && hasInsufficientBalance}>
                        <EditableInput
                            type="number"
                            placeholder="0"
                            value={orderValue}
                            onChange={handleOrderValueChange}
                        />
                        <UnitInside>USDT</UnitInside>
                    </ErrorInputWrapper>
                </div>
            </Section>
            <ActionButton
                mode={mode}
                disabled={!qty || !price || hasInsufficientBalance}
                onClick={handleExecuteTrade}
            >
                {mode === "buy" ? `Buy ${symbol}` : `Sell ${symbol}`}
            </ActionButton>
        </PanelContainer>
    );
};

export default TradePanel;