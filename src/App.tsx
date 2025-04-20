import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from './constants/constants';
import Header from "./common-components/header/header.tsx";
import CoinDetailPage from "./pages/CoinDetailPage.tsx";
import { GlobalStyle } from './styles/GlobalStyles';
import WalletPage from "./pages/WalletPage.tsx";

const ContentContainer = styled.main`
    position: relative;
    top: 8vh;        
    height: 92vh;    
    overflow-y: auto;
    background-color: #fff;
`;

const App: React.FC = () => {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <ContentContainer>
                <Routes>
                    <Route path={ROUTES.COIN_DETAIL} element={<CoinDetailPage />} />
                    <Route path={ROUTES.WALLET} element={<WalletPage />} />
                    {/*<Route path={ROUTES.TRADING} element={<TradingPage />} />*/}
                </Routes>
            </ContentContainer>
        </Router>
    );
};

export default App;
