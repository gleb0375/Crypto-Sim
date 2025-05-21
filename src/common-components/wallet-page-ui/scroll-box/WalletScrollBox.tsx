import React, { useState } from 'react';
import styled from 'styled-components';
import WalletScrollBoxItem from './WalletScrollBoxItem.tsx';
import { WalletScrollBoxProps } from '../../../types/wallet.types.ts';
import CoinDetailModal from '../../modals/CoinDetailModal.tsx';
import { COL_TEMPLATE, MOBILE_COL_TEMPLATE, LEFT_COLUMN_WIDTH } from '../../../constants/wallet.constants.ts';
import ConfirmTradeModal from "../../modals/ConfirmTradeModal.tsx";
import {useWallet} from "../../../contexts/WalletContext.tsx";
import TradeSuccessModal from "../../modals/TradeSuccessModal.tsx";
import ErrorModal from "../../modals/ErrorModal.tsx";
import {SortDirection, SortKey, sortWalletCoins} from "../../../utils/sort.ts";
import {useWalletPieData} from "../../../hooks/wallet-page/useWalletPieData.ts";


const ScrollBoxContainer = styled.div`
    background: #1e1e24;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0,0,0,.4);
    width: ${LEFT_COLUMN_WIDTH};
    padding: 1rem;
    margin-top: 1rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 0;
`;

const HeaderRow = styled.div`
    display: grid;
    grid-template-columns: ${COL_TEMPLATE};
    align-items: center;

    padding: 0.5rem;
    font-weight: 700;
    font-size: clamp(0.7rem, 3.5vw, 0.9rem);
    color: #bcbcbc;

    border-bottom: 1px solid #444;
    background: #1e1e24;
    position: sticky;
    top: 0;
    z-index: 1;

    span:nth-child(1) {
        padding-left: 0.2rem;
    }

    span:nth-child(2) {
        justify-content: flex-start;
    }

    span:nth-child(3) {
        padding-right: 1.5vh;
        justify-self: end;
    }

    span:nth-child(4) {
        justify-self: end;
        padding-right: 0.5rem;
    }

    span:nth-child(5) {
        justify-self: end;
        padding-right: 0.5vh;
    }

    span:nth-child(2),
    span:nth-child(3),
    span:nth-child(4) {
        cursor: pointer;
    }

    @media (max-width: 480px) {
        grid-template-columns: ${MOBILE_COL_TEMPLATE};
    }
`;

const ItemsContainer = styled.div`
    flex: 1;
    overflow-y: auto;
    position: relative;
    mask-image: linear-gradient(to bottom, black 90%, transparent);
    @ts-ignore 
    -webkit-mask-image: linear-gradient(to bottom, black 90%, transparent);

    &::-webkit-scrollbar{width:6px;}
    &::-webkit-scrollbar-track{background:transparent;}
    &::-webkit-scrollbar-thumb{background:#555;border-radius:3px;}
    &::-webkit-scrollbar-thumb:hover{background:#777;}
`;

const WalletScrollBox: React.FC<WalletScrollBoxProps> = ({ coins, onHighlight }) => {
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
    const [selectedCoinToSell, setSelectedCoinToSell] = useState<typeof coins[0] | null>(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [lastTrade, setLastTrade] = useState<{ name: string; amount: number; value: number } | null>(null);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const [sortKey, setSortKey] = useState<SortKey>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);

    const { executeTrade, wallet } = useWallet();

    const pieData = useWalletPieData(wallet);
    const highlightableSymbols = pieData.map(entry => entry.symbol);

    const handleSort = (key: SortKey) => {
        if (sortKey !== key) {
            setSortKey(key);
            setSortDirection(key === "name" ? "asc" : "desc");
        } else {
            if (sortDirection === "desc") {
                setSortDirection("asc");
            } else if (sortDirection === "asc") {
                setSortKey(null);
                setSortDirection(null);
            } else {
                setSortDirection("desc");
            }
        }
    };

    const sortedCoins = sortWalletCoins(coins, sortKey, sortDirection);

    return (
        <>
            <ScrollBoxContainer>
                <HeaderRow>
                    <span>#</span>
                    <span onClick={() => handleSort("name")}>Name</span>
                    <span onClick={() => handleSort("holdings")}>Holdings</span>
                    <span onClick={() => handleSort("value")}>Value</span>
                    <span>Sell All</span>
                </HeaderRow>

                <ItemsContainer>
                    {sortedCoins.map((c, i) => (
                        <div key={c.symbol} onClick={() => setSelectedSymbol(c.symbol)}>
                            <WalletScrollBoxItem
                                coin={c}
                                index={i + 1}
                                onSellAll={() => setSelectedCoinToSell(c)}
                                onError={() => setShowErrorModal(true)}
                                onHighlight={onHighlight}
                                highlightableSymbols={highlightableSymbols}
                            />
                        </div>
                    ))}
                </ItemsContainer>
            </ScrollBoxContainer>

            {selectedSymbol && (
                <CoinDetailModal
                    symbol={selectedSymbol}
                    onClose={() => setSelectedSymbol(null)}
                />
            )}

            {selectedCoinToSell && selectedCoinToSell.holdings > 0 && (() => {
                const coin = wallet.find(c => c.symbol === selectedCoinToSell.symbol);
                if (!coin) return null;

                const currentPrice = coin.value / coin.holdings;
                const currentValue = coin.value;

                return (
                    <ConfirmTradeModal
                        name={coin.name}
                        amount={coin.holdings}
                        value={currentValue}
                        mode="sell"
                        warning={
                            selectedCoinToSell.symbol !== "USDT" &&
                            selectedCoinToSell.holdings > 0 &&
                            selectedCoinToSell.avgBuyPrice > (selectedCoinToSell.value / selectedCoinToSell.holdings)
                        }
                        onClose={() => setSelectedCoinToSell(null)}
                        onConfirm={() => {
                            executeTrade("sell", coin.symbol, currentPrice, coin.holdings);
                            setLastTrade({
                                name: coin.name,
                                amount: coin.holdings,
                                value: currentValue,
                            });
                            setShowSuccessModal(true);
                            setSelectedCoinToSell(null);
                        }}
                    />
                );
            })()}

            {showSuccessModal && lastTrade && (
                <TradeSuccessModal
                    name={lastTrade.name}
                    amount={lastTrade.amount}
                    value={lastTrade.value}
                    mode="sell"
                    onClose={() => setShowSuccessModal(false)}
                />
            )}

            {showErrorModal && (
                <ErrorModal
                    error="You can't sell USDT. This currency is used for trading only."
                    onClose={() => setShowErrorModal(false)}
                />
            )}
        </>
    );
};

export default WalletScrollBox;
