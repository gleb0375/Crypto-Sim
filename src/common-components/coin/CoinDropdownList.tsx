// src/common-components/coin/CoinDropdownList.tsx
import React from "react";
import styled from "styled-components";
import { Coin } from "../../constants/binanceConstants";

const DropdownListContainer = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #101014;
    margin-top: 0.5rem;
    padding: 0.5rem;
    width: 15vh;
    z-index: 10;
    font-size: 0.8rem;
    max-height: 10rem;
    overflow-y: auto;
`;

const DropdownItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.3rem 0.5rem;
    cursor: pointer;

    &:hover {
        background-color: #444;
    }
`;

const DropdownItemLogo = styled.img`
    width: 24px;
    height: 24px;
`;

interface CoinDropdownListProps {
    coins: Coin[];
    onSelectCoin: (coin: Coin) => void;
}

const CoinDropdownList: React.FC<CoinDropdownListProps> = ({
                                                               coins,
                                                               onSelectCoin
                                                           }) => {
    return (
        <DropdownListContainer>
            {coins.map((coin) => (
                <DropdownItem key={coin.symbol} onClick={() => onSelectCoin(coin)}>
                    <DropdownItemLogo src={coin.logo} alt={coin.name} />
                    {coin.name}
                </DropdownItem>
            ))}
        </DropdownListContainer>
    );
};

export default CoinDropdownList;
