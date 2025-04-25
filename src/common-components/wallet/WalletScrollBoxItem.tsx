import React from "react";
import styled from "styled-components";
import { WalletCoinItem } from "../../types/coin.types.ts";

interface Props {
    coin: WalletCoinItem;
    index: number;
}

const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #d6edff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    height: 5vh;
`;

const Rank = styled.div<{ bg: string }>`
    background-color: ${(props) => props.bg};
    color: white;
    font-weight: bold;
    width: 3rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const CoinInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 2vh;
    padding: 0 1.5rem;
    flex: 1;
`;

const Logo = styled.img`
    width: 3vh;
    height: 3vh;
`;

const Name = styled.span`
    font-weight: bold;
    color: #2e2e2e;
`;

const Holdings = styled.div`
    width: 6rem;
    text-align: center;
    color: #2e2e2e;
`;

const Value = styled.div`
    width: 6rem;
    text-align: right;
    font-weight: bold;
    color: #1a1a1a;
    padding-right: 1.5rem;
`;

const WalletScrollBoxItem: React.FC<Props> = ({ coin }) => {
    return (
        <ItemContainer>
            <Rank bg={coin.color}>{coin.rank}</Rank>
            <CoinInfo>
                <Logo src={coin.logo} alt={coin.name} />
                <Name>{coin.name}</Name>
            </CoinInfo>
            <Holdings>{coin.holdings}</Holdings>
            <Value>{coin.value}</Value>
        </ItemContainer>
    );
};

export default WalletScrollBoxItem;
