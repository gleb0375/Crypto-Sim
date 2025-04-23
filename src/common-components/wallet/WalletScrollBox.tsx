import React from "react";
import styled from "styled-components";
import WalletScrollBoxItem from "./WalletScrollBoxItem";
import { WalletCoinItem } from "../../types/coin.types.ts";
import { LEFT_COLUMN_WIDTH } from "../../constants/coins.constants.ts";

interface Props {
    coins: WalletCoinItem[];
}

const ScrollBoxContainer = styled.div`
    background-color: #1e1e24;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
    width: ${LEFT_COLUMN_WIDTH};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
    min-height: 0;
    padding: 1rem;         
    margin-top: 1rem;
`;

const HeaderRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    font-weight: bold;
    color: #bcbcbc;
    border-bottom: 1px solid #444;
    background-color: #1e1e24;
    position: sticky;
    top: 0;
    z-index: 1;
`;

const HeaderColumn = styled.div`
    display: flex;
    align-items: center;
    font-size: clamp(0.7rem, 3.5vw, 1rem);

    &:nth-child(1) {
        width: 1.5rem;
        justify-content: center;
        text-align: center;
    }

    &:nth-child(2) {
        flex: 2;
        padding-left: 2.5rem;
        min-width: 8rem;

        @media (max-width: 480px) {
            padding-left: 1rem;
        }
    }

    &:nth-child(3),
    &:nth-child(4) {
        width: 6rem;
        text-align: right;
        justify-content: flex-end;
        padding-right: 1rem;

        @media (max-width: 480px) {
            width: 7rem;
            padding-right: 0.5rem;
        }
    }
`;

const ItemsContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    min-height: 0;
    position: relative;

    mask-image: linear-gradient(to bottom, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent);

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #555;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #777;
    }
`;



const WalletScrollBox: React.FC<Props> = ({ coins }) => {
    return (
        <ScrollBoxContainer>
            <HeaderRow>
                <HeaderColumn>#</HeaderColumn>
                <HeaderColumn>Name</HeaderColumn>
                <HeaderColumn>Holdings</HeaderColumn>
                <HeaderColumn>Value</HeaderColumn>
            </HeaderRow>
            <ItemsContainer>
                {coins.map((coin, index) => (
                    <WalletScrollBoxItem key={coin.symbol} coin={coin} index={index + 1} />
                ))}
            </ItemsContainer>
        </ScrollBoxContainer>
    );
};

export default WalletScrollBox;
