import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from './constants/constants';
import Header from "./common-components/header/header.tsx";
import CoinDetailPage from "./pages/CoinDetailPage.tsx";
import { GlobalStyle } from './styles/GlobalStyles';

const ContentContainer = styled.main`
    position: relative;
    top: 8vh;         /* смещаем основной блок на 8vh вниз, ровно под хедер */
    height: 92vh;     /* оставшиеся 92vh экрана */
    overflow-y: auto; /* при большом контенте будет прокрутка */
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
                    {/*<Route path={ROUTES.WALLET} element={<WalletPage />} />*/}
                    {/*<Route path={ROUTES.TRADING} element={<TradingPage />} />*/}
                </Routes>
            </ContentContainer>
        </Router>
    );
};

export default App;
