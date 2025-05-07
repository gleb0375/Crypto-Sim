import React from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from './constants/routes.ts';
import Header from "./common-components/header/header.tsx";
import TradePage from "./pages/TradePage.tsx";
import { GlobalStyle } from './styles/GlobalStyles';
import WalletPage from "./pages/WalletPage.tsx";
import AboutPage from "./pages/HomePage.tsx";

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
                    <Route path="/" element={<Navigate to={ROUTES.TRADE} replace />} />
                    <Route path={ROUTES.TRADE} element={<TradePage />} />
                    <Route path={ROUTES.WALLET} element={<WalletPage />} />
                    <Route path={ROUTES.ABOUT} element={<AboutPage />} />
                </Routes>
            </ContentContainer>
        </Router>
    );
};

export default App;
