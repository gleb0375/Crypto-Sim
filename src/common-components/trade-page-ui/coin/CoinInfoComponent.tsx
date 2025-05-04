import React from "react";
import styled from "styled-components";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import CoinDropdownList from "./CoinDropdownList.tsx";
import { CoinHeaderProps } from "../../../types/coin.types.ts";
import {useCoinInfo} from "../../../hooks/trade-page/useCoinInfo.ts";

const CoinInfoContainer = styled.div`
    height: 4vh;
    display: flex;
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

const CoinInfoComponent: React.FC<CoinHeaderProps> = ({
                                                          coins,
                                                          selectedCoin,
                                                          price,
                                                          onSelectCoin,
                                                      }) => {
    const {
        isOpen,
        toggleDropdown,
        handleSelectCoin,
        priceChange,
        formattedPrice
    } = useCoinInfo(price, onSelectCoin);

    return (
        <CoinInfoContainer>
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
                <CoinPrice change={priceChange}>{formattedPrice}</CoinPrice>
            </Section>

            {isOpen && (
                <CoinDropdownList
                    coins={coins}
                    onSelectCoin={handleSelectCoin}
                />
            )}
        </CoinInfoContainer>
    );
};

export default CoinInfoComponent;
