import React, { useMemo } from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet/WalletAccountHeader";
import WalletScrollBox from "../common-components/wallet/WalletScrollBox";
//import PieWalletChart from "../common-components/wallet/PieWalletChart";
import { LEFT_COLUMN_WIDTH } from "../constants/wallet.constants.ts";
import { calculateWalletBalance } from "../utils/calculateWalletBalance.ts";
//import { buildInitialWallet } from "../utils/buildInitialWallet.ts";
//import { WalletCoinItem } from "../types/coin.types.ts";
import {useWallet} from "../contexts/WalletContext.tsx";
import {useTickerPrice} from "../hooks/useTickerPrice.ts";

const ContainerWallet = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: #16161b;
  padding: 2vh;
  box-sizing: border-box;
`;

const LeftColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 50vh;
    width: ${LEFT_COLUMN_WIDTH};
    height: 100%;
    gap: 2rem;
`;

// const RightColumn = styled.div`
//     flex: 1;
//     padding-left: 2rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
// `;

const WalletPage: React.FC = () => {
    const { wallet } = useWallet();
    const { data: btcTicker } = useTickerPrice("BTCUSDT");
    const btcPrice = parseFloat(btcTicker?.price || "0");

    const balance = useMemo(() => calculateWalletBalance(wallet, btcPrice), [wallet, btcPrice]);

    /*const pieData = useMemo(() => {
        return wallet.map((item: WalletCoinItem) => ({
            name: item.name,
            value: item.value,
        }));
    }, [wallet]);*/

    return (
        <ContainerWallet>
            <LeftColumn>
                <WalletAccountHeader balance={balance} />
                <WalletScrollBox coins={wallet} />
            </LeftColumn>

            {/*<RightColumn>*/}
            {/*    /!* передаём реальные pieData *!/*/}
            {/*    <PieWalletChart data={pieData} />*/}
            {/*</RightColumn>*/}
        </ContainerWallet>
    );
};

export default WalletPage;
