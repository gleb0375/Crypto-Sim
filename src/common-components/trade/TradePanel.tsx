// src/common-components/trade/TradePanel.tsx
import React, { useState } from "react";
import styled from "styled-components";
import ModeSwitch from "./ModeSwitch";

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

const BalanceValue = styled.div`
    color: #fff;
    font-size: 0.9rem;
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

const Slider = styled.input.attrs({ type: "range", min: 0, max: 100 })`
    width: 100%;
`;

const Button = styled.button`
    width: 100%;
    padding: 0.7vh;
    background: #44a868;
    color: white;
    font-size: 3vh;
    font-family: inherit;
    font-weight: 500;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

interface Props {
    symbol: string;
    price?: number;
}

const TradePanel: React.FC<Props> = ({ symbol, price }) => {
    const [mode, setMode] = useState<"buy" | "sell">("buy");
    const [qty, setQty] = useState("");
    const [percent, setPercent] = useState(0);

    const orderValue = (price ?? 0) * (parseFloat(qty) || 0);
    const availableBalanceDisplay = `… ${symbol}`;

    return (
        <PanelContainer>
            <ModeSwitch mode={mode} onChange={setMode} />

            <Section>
                <Row>
                    <Label>Available Balance</Label>
                    <BalanceValue>{availableBalanceDisplay}</BalanceValue>
                </Row>

                <div>
                    <Label>Order Price</Label>
                    <UnitWrapper>
                        <UnitInput
                            type="text"
                            readOnly
                            value={price?.toFixed(2) ?? "--"}
                        />
                        <UnitInside>{symbol}</UnitInside>
                    </UnitWrapper>
                </div>

                <div>
                    <Label>Qty</Label>
                    <EditableInput
                        type="number"
                        placeholder="0"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </div>

                <Slider
                    value={percent}
                    onChange={(e) => setPercent(Number(e.target.value))}
                />

                <div>
                    <Label>Order Value</Label>
                    <UnitWrapper>
                        <UnitInput
                            type="text"
                            readOnly
                            value={orderValue.toFixed(2)}
                        />
                        <UnitInside>USDT</UnitInside>
                    </UnitWrapper>
                </div>
            </Section>

            <Button disabled={!qty || !price}>
                {mode === "buy" ? `Buy ${symbol}` : `Sell ${symbol}`}
            </Button>
        </PanelContainer>
    );
};

export default TradePanel;
