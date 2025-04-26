import React, {useMemo} from "react";
import styled from "styled-components";
import WalletAccountHeader from "../common-components/wallet/WalletAccountHeader";
import WalletScrollBox from "../common-components/wallet/WalletScrollBox";
import {LEFT_COLUMN_WIDTH} from "../constants/wallet.constants.ts";
import {calculateWalletBalance} from "../utils/calculateWalletBalance.ts";
import {buildInitialWallet} from "../utils/buildInitialWallet.ts";

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

const WalletPage: React.FC = () => {
    const wallet = useMemo(buildInitialWallet, []);
    const balance = useMemo(() => calculateWalletBalance(wallet), [wallet]);

    return (
        <ContainerWallet>
            <LeftColumn>
                <WalletAccountHeader balance={balance} />
                <WalletScrollBox coins={wallet} />
            </LeftColumn>
        </ContainerWallet>
    );
};

export default WalletPage;
