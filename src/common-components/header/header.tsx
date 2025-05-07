import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { GiHamburgerMenu } from 'react-icons/gi';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #13161c;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    height: 8vh;
    z-index: 1100;

    @media (max-width: 768px) {
        justify-content: space-between;
    }
`;

const NavSection = styled.nav`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const IdentityBox = styled.div`
    position: absolute;
    left: 2vh;
    top: 1.2vh;
    color: #ccc;
    font-size: 2vh;
    line-height: 1.4;
    text-align: left;
    white-space: pre-line;
`;


const NavButton = styled.button<{ isActive: boolean }>`
    display: inline-block;
    position: relative;
    vertical-align: middle;
    background: transparent;
    color: #ecf0f1;
    padding: 0.5rem 1rem;
    border: none;
    margin: 0 3.5rem;
    font-size: 2vh;
    text-transform: uppercase;
    cursor: pointer;
    outline: none;
    letter-spacing: 0.08em;
    font-family: 'telegraf', sans-serif;
    font-weight: 400;
    transition: 0.3s ease;

    &::-moz-focus-inner {
        border: 0;
    }

    ${({ isActive }) =>
            isActive
                    ? css`
                        text-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.8);
                    `
                    : css`
                        transform: translateZ(0);
                        transition-property: transform, text-shadow;

                        &:before {
                            content: '';
                            position: absolute;
                            pointer-events: none;
                            z-index: -1;
                            top: 115%;
                            left: 5%;
                            height: 0.7rem;
                            width: 90%;
                            opacity: 0;
                            background: radial-gradient(
                                    ellipse at center,
                                    rgba(255, 255, 255, 0.35) 0%,
                                    rgba(255, 255, 255, 0) 80%
                            );
                            transition-duration: 0.3s;
                            transition-property: transform;
                        }

                        &:hover,
                        &:active,
                        &:focus {
                            transform: translateY(-5px);
                            text-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.8);
                        }

                        &:hover:before,
                        &:active:before,
                        &:focus:before {
                            opacity: 1;
                            transform: translateY(-5px);
                        }
                    `}

    @media (max-width: 768px) {
    &:hover,
    &:active,
    &:focus {
        transform: none !important;
        text-shadow: none !important;
    }

    &:before,
    &:hover:before,
    &:active:before,
    &:focus:before {
        display: none !important;
        opacity: 0 !important;
        transform: none !important;
    }
}
`;

const BurgerButton = styled.button`
    background: transparent;
    border: none;
    color: white;
    font-size: 1.8rem;
    display: none;
    cursor: pointer;

    @media (max-width: 768px) {
        display: block;
        margin-left: auto;
    }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
    position: fixed;
    top: 8vh;
    right: 0;
    width: 200px;
    height: calc(100vh - 8vh);
    background-color: #13161c;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transform: translateX(${props => (props.isOpen ? '0' : '100%')});
    transition: transform 0.3s ease-in-out;

    button {
        margin: 0;
        padding: 0.5rem;
        width: 100%;
        font-size: 1rem;
        text-align: left;
    }
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <HeaderContainer>
            <IdentityBox>
                Hleb Hnatsiuk
                {"\n"}A23B0392P
            </IdentityBox>

            <NavSection>
                <NavButton
                    onClick={() => navigate(ROUTES.ABOUT)}
                    isActive={location.pathname === ROUTES.ABOUT}
                >
                    About
                </NavButton>
                <NavButton
                    onClick={() => navigate(ROUTES.TRADE)}
                    isActive={location.pathname === ROUTES.TRADE}
                >
                    Trade
                </NavButton>
                <NavButton
                    onClick={() => navigate(ROUTES.WALLET)}
                    isActive={location.pathname === ROUTES.WALLET}
                >
                    Wallet
                </NavButton>
            </NavSection>
            <BurgerButton onClick={() => setSidebarOpen(!sidebarOpen)}>
                <GiHamburgerMenu />
            </BurgerButton>
            <Sidebar isOpen={sidebarOpen}>
                <NavButton
                    onClick={() => {
                        navigate(ROUTES.ABOUT);
                        setSidebarOpen(false);
                    }}
                    isActive={location.pathname === ROUTES.ABOUT}
                >
                    About
                </NavButton>
                <NavButton
                    onClick={() => {
                        navigate(ROUTES.TRADE);
                        setSidebarOpen(false);
                    }}
                    isActive={location.pathname === ROUTES.TRADE}
                >
                    Trade
                </NavButton>
                <NavButton
                    onClick={() => {
                        navigate(ROUTES.WALLET);
                        setSidebarOpen(false);
                    }}
                    isActive={location.pathname === ROUTES.WALLET}
                >
                    Wallet
                </NavButton>
            </Sidebar>
        </HeaderContainer>
    );
};

export default Header;
