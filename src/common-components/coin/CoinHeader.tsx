import React, { useState } from "react";
import styled from "styled-components";
import { Coin } from "../../constants/binanceConstants";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import CoinDropdownList from "./CoinDropdownList";

const HeaderContainer = styled.div`
    display: flex;
    background-color: #16161b;
    color: #ffffff;
    position: relative;
    align-items: center;
    margin-bottom: 2vh;
`;

const Section = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`;

const CoinLogo = styled.img`
    width: 3.5vh;
    height: 3.5vh;
`;

const CoinSymbol = styled.div`
    font-size: 2vh;
    margin-left: 1rem;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 500;
    letter-spacing: 1px;
`;

const CoinPrice = styled.div`
    font-size: 2.5vh;
    color: #e5ece2;
    font-weight: bold;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
    const displayPrice = price ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "...";


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
                <DropdownButton onClick={toggleDropdown}>
                    {isOpen ? <IoIosArrowDropup size={24} /> : <IoIosArrowDropdown size={24} />}
                </DropdownButton>
            </Section>

            <Section>
                <CoinLogo src={selectedCoin.logo} alt={`${selectedCoin.name} Logo`}/>
                <CoinSymbol>{selectedCoin.name}/USDT</CoinSymbol>
            </Section>

            <Section>
                    <CoinPrice>{displayPrice}</CoinPrice>
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
