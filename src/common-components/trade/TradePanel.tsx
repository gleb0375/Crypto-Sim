// src/common-components/trade/TradePanel.tsx
import React, { useState } from "react";
import styled from "styled-components";
import ModeSwitch from "./ModeSwitch";

const PanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;           /* тянемся на всю высоту RightPanel */
`;

const Section = styled.div`
    flex: 1;                /* занимает всё оставшееся пространство */
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2.5vh;
`;

const Label = styled.label`
    color: #aaa;
    font-size: 0.8rem;
`;

const Input = styled.input`
    width: 100%;
    height: 3vh;
    border: 1px solid #444;
    border-radius: 4px;
    background: #1e1e24;
    color: #fff;
    font-size: 0.9rem;
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
  font-family: 'Inter','Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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

    return (
        <PanelContainer>
            <ModeSwitch mode={mode} onChange={setMode} />

            <Section>
                <div>
                    <Label>Available Balance</Label>
                    <div>… {symbol}</div>
                </div>

                <div>
                    <Label>Order Price</Label>
                    <Input
                        type="text"
                        readOnly
                        value={price?.toFixed(2) ?? "--"}
                    />{" "}
                    {symbol}
                </div>

                <div>
                    <Label>Qty</Label>
                    <Input
                        type="number"
                        placeholder={symbol}
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                    />
                </div>

                <Slider
                    value={percent}
                    onChange={(e) => {
                        const p = Number(e.target.value);
                        setPercent(p);
                        // расчёт qty от баланса позже
                    }}
                />

                <div>
                    <Label>Order Value</Label>
                    <Input type="text" readOnly value={orderValue.toFixed(2)} /> USDT
                </div>
            </Section>

            <Button disabled={!qty || !price}>
                {mode === "buy" ? `Buy ${symbol}` : `Sell ${symbol}`}
            </Button>
        </PanelContainer>
    );
};

export default TradePanel;
