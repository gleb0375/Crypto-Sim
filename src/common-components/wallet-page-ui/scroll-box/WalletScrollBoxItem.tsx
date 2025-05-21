import React from "react";
import styled from "styled-components";
import { WalletScrollBoxItemProps } from "../../../types/wallet.types.ts";
import {formatCompact} from "../../../utils/number.ts";
import {GiPayMoney} from "react-icons/gi";


const ItemContainer = styled.div`
    display: flex;
    align-items: center;
    background-color: #d6edff;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 1rem;
    height: 5vh;
    cursor: pointer;

    transition: background-color 0.2s ease;

    &:hover {
        background-color: #b6dbff;
    }
`;

const Rank = styled.div<{ bg: string }>`
    background-color: ${(props) => props.bg};
    color: white;
    font-weight: bold;
    min-width: 2rem;
    max-width: 2.5rem;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
`;


const CoinInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 2vh;
    padding: 0 0.8rem;
    min-width: 6rem;
    flex: 1 1 auto;
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
    font-size: 2vh;
   
    @media (max-width: 480px) {
        font-size: 1.8vh;
    }
`;

const Value = styled.div`
    width: 6rem;
    text-align: right;
    font-weight: bold;
    color: #1a1a1a;
    padding-right: 1rem;
    font-size: 2vh;

    @media (max-width: 480px) {
        font-size: 1.8vh;
    }
`;

const SellButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #1e1e24;
    font-size: 3vh;
    padding-right: 0.5rem;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #fd0500;
    }
`;


const WalletScrollBoxItem: React.FC<WalletScrollBoxItemProps> = ({ coin, index, onSellAll, onError }) => {
    const displayHoldings = formatCompact(coin.holdings);
    const displayValue    = formatCompact(coin.value);

    return (
        <ItemContainer>
            <Rank bg={coin.color}>{index}</Rank>
            <CoinInfo>
                <Logo src={coin.logo} alt={coin.name} />
                <Name>{coin.name}</Name>
            </CoinInfo>
            <Holdings title={coin.holdings.toString()}>{displayHoldings}</Holdings>
            <Value title={coin.value.toString()}>{displayValue}</Value>
            <SellButton
                title="Sell all"
                onClick={(e) => {
                    e.stopPropagation();
                    if (coin.symbol === "USDT") {
                        onError();
                    } else {
                        onSellAll();
                    }
                }}
            >
                <GiPayMoney />
            </SellButton>

        </ItemContainer>

    );
};

export default WalletScrollBoxItem;
