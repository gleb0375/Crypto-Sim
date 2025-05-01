import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import CoinDropdownList from "./CoinDropdownList";
import { Coin, CoinHeaderProps } from "../../types/coin.types.ts";

const HeaderContainer = styled.div`
    height: 4vh;
    display: flex;
   // background-color: #16161b;
    color: #ffffff;
    position: relative;
    align-items: center;
    margin-bottom: 2vh;
    margin-left: 2vh;
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

const CoinPrice = styled.div<{ change?: "up" | "down" | "neutral" }>`
    font-size: 2.5vh;
    color: ${({ change }) =>
            change === "up" ? "#00c46a" :
                    change === "down" ? "#e15241" :
                            "#e5ece2"};
    font-weight: bold;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    transition: color 0.3s ease;
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

const DropdownIcon = styled.div`
    width: 3.5vh;
    height: 3.5vh;

    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        width: 100%;
        height: 100%;
    }
`;

const CoinInfoContainer: React.FC<CoinHeaderProps> = ({
                                                          coins,
                                                          selectedCoin,
                                                          price,
                                                          onSelectCoin
                                                      }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [previousPrice, setPreviousPrice] = useState<number | null>(null);
    const [priceChange, setPriceChange] = useState<"up" | "down" | "neutral">("neutral");

    useEffect(() => {
        if (price !== undefined && previousPrice !== null) {
            if (price > previousPrice) {
                setPriceChange("up");
            } else if (price < previousPrice) {
                setPriceChange("down");
            } else {
                setPriceChange("neutral");
            }
        }
        if (price !== undefined) {
            setPreviousPrice(price);
        }
    }, [price]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelectCoin = (coin: Coin) => {
        onSelectCoin(coin);
        setIsOpen(false);
    };

    const displayPrice =
        price !== undefined
            ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
            : "...";

    return (
        <HeaderContainer>
            <Section>
                <DropdownButton onClick={toggleDropdown}>
                    <DropdownIcon>
                        {isOpen ? <IoIosArrowDropup /> : <IoIosArrowDropdown />}
                    </DropdownIcon>
                </DropdownButton>
            </Section>

            <Section>
                <CoinLogo src={selectedCoin.logo} alt={`${selectedCoin.name} Logo`} />
                <CoinSymbol>{selectedCoin.name}/USDT</CoinSymbol>
            </Section>

            <Section>
                <CoinPrice change={priceChange}>{displayPrice}</CoinPrice>
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

export default CoinInfoContainer;
