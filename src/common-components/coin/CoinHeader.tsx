import React, { useState } from "react";
import styled from "styled-components";
import { Coin } from "../../constants/binanceConstants";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import CoinDropdownList from "./CoinDropdownList";

const HeaderContainer = styled.div`
    display: flex;
    background-color: #2c2121;
    border: 2px dashed #292121;
    color: #ffffff;
    padding: 1rem;
    position: relative;
    align-items: center;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;

const CoinLogo = styled.img`
    width: 40px;
    height: 40px;
`;

const CoinSymbol = styled.div`
    font-size: 1.5rem;
    margin-left: 2rem;
`;

const PriceWrapper = styled.div`
    width: 12rem;          
    display: flex;
    justify-content: flex-end;
`;

const CoinPrice = styled.div`
    font-size: 1.5rem;
    color: #32b81d;
`;

const DropdownButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 0.3rem;
  border-radius: 4px;

  &:hover {
    background-color: #444;
  }
`;

interface CoinHeaderProps {
    coins: Coin[];
    selectedCoin: Coin;
    price?: number;
    onSelectCoin: (coin: Coin) => void;
}

const CoinHeader: React.FC<CoinHeaderProps> = ({
                                                   coins,
                                                   selectedCoin,
                                                   price,
                                                   onSelectCoin
                                               }) => {
    const [isOpen, setIsOpen] = useState(false);
    const displayPrice = price ? price.toFixed(2) : "...";

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectCoin = (coin: Coin) => {
        onSelectCoin(coin);
        setIsOpen(false);
    };

    return (
        <HeaderContainer>
            <Section>
                <CoinLogo src={selectedCoin.logo} alt={`${selectedCoin.name} Logo`} />
                <CoinSymbol>{selectedCoin.name}</CoinSymbol>
            </Section>

            <Section>
                <PriceWrapper>
                    <CoinPrice>{displayPrice} USDT</CoinPrice>
                </PriceWrapper>
            </Section>

            <Section>
                <DropdownButton onClick={toggleDropdown}>
                    {isOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
                </DropdownButton>
            </Section>

            {isOpen && (
                <CoinDropdownList
                    coins={coins}
                    onSelectCoin={handleSelectCoin}
                />
            )}
        </HeaderContainer>
    );
};

export default CoinHeader;
