import React from 'react';
import styled from 'styled-components';
import WalletScrollBoxItem from './WalletScrollBoxItem';
import { WalletCoinItem } from '../../types/coin.types';
import { COL_TEMPLATE, MOBILE_COL_TEMPLATE, LEFT_COLUMN_WIDTH } from '../../constants/wallet.constants';

interface Props {
    coins: WalletCoinItem[];
}

const ScrollBoxContainer = styled.div`
    background:#1e1e24;
    border-radius:1rem;
    box-shadow:0 0 10px rgba(0,0,0,.4);

    width:${LEFT_COLUMN_WIDTH};
    padding:1rem;
    margin-top:1rem;

    display:flex;
    flex-direction:column;
    overflow:hidden;
    min-height:0;
`;

const HeaderRow = styled.div`
    display:grid;
    grid-template-columns:${COL_TEMPLATE};
    align-items:center;

    padding:.5rem 1rem;
    font-weight:700;
    font-size:clamp(.7rem,3.5vw,1rem);
    color:#bcbcbc;

    border-bottom:1px solid #444;
    background:#1e1e24;
    position:sticky;top:0;z-index:1;

    @media (max-width:480px){
        grid-template-columns:${MOBILE_COL_TEMPLATE};
    }
`;

const ItemsContainer = styled.div`
    flex:1;
    overflow-y:auto;
    position:relative;
    mask-image:linear-gradient(to bottom, black 90%, transparent);
    -webkit-mask-image:linear-gradient(to bottom, black 90%, transparent);

    &::-webkit-scrollbar{width:6px;}
    &::-webkit-scrollbar-track{background:transparent;}
    &::-webkit-scrollbar-thumb{background:#555;border-radius:3px;}
    &::-webkit-scrollbar-thumb:hover{background:#777;}
`;

const WalletScrollBox:React.FC<Props> = ({ coins }) => (
    <ScrollBoxContainer>
        <HeaderRow>
            <span>#</span>
            <span>Name</span>
            <span>Holdings</span>
            <span>Value</span>
        </HeaderRow>

        <ItemsContainer>
            {coins.map((c,i)=>(
                <WalletScrollBoxItem key={c.symbol} coin={c} index={i+1}/>
            ))}
        </ItemsContainer>
    </ScrollBoxContainer>
);

export default WalletScrollBox;
