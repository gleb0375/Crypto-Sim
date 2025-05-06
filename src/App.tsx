import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from './constants/routes.ts';
import Header from "./common-components/header/header.tsx";
import TradePage from "./pages/TradePage.tsx";
import { GlobalStyle } from './styles/GlobalStyles';
import WalletPage from "./pages/WalletPage.tsx";

const ContentContainer = styled.main`
    position: relative;
    top: 8vh;
    height: 92vh;
    overflow-y: auto;
    background-color: #1e1f22;
`;

const App: React.FC = () => {
    return (
        <Router>
            <GlobalStyle />
            <Header />
            <ContentContainer>
                <Routes>
                    <Route path={ROUTES.TRADE} element={<TradePage />} />
                    <Route path={ROUTES.WALLET} element={<WalletPage />} />
                    {/*<Route path={ROUTES.ABOUT} element={<TradingPage />} />*/}
                </Routes>
            </ContentContainer>
        </Router>
    );
};

export default App;
