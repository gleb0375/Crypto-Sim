import React from "react";
import styled from "styled-components";
import WalletScrollBoxItem from "./WalletScrollBoxItem";
import { WalletCoinItem } from "../../types/coin.types.ts";
import {LEFT_COLUMN_WIDTH} from "../../constants/coins.constants.ts";

interface Props {
    coins: WalletCoinItem[];
}

const ScrollBoxContainer = styled.div`
    background-color: #1e1e24;
    border-radius: 1rem;
    padding: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    max-height: 60vh;
    overflow-y: auto;
    width: ${LEFT_COLUMN_WIDTH};
    box-sizing: border-box;
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #bcbcbc;
    border-bottom: 1px solid #444;
`;

const HeaderColumn = styled.div`
    &:nth-child(1) {
        flex: 1.5;
    }
    &:nth-child(2),
    &:nth-child(3) {
        width: 6rem;
        text-align: right;
    }
`;

const WalletScrollBox: React.FC<Props> = ({ coins }) => {
    return (
        <ScrollBoxContainer>
            <HeaderRow>
                <HeaderColumn>Name</HeaderColumn>
                <HeaderColumn>Holdings</HeaderColumn>
                <HeaderColumn>Value</HeaderColumn>
            </HeaderRow>
            {coins.map((coin) => (
                <WalletScrollBoxItem key={coin.symbol} coin={coin} />
            ))}
        </ScrollBoxContainer>
    );
};

export default WalletScrollBox;
