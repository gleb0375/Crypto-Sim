import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.ts';

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
    z-index: 1000;
`;

const NavSection = styled.nav`
    display: flex;
    align-items: center;
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
`;

const Header: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <HeaderContainer>
            <NavSection>
                <NavButton
                    id="len1"
                    onClick={() => navigate(ROUTES.HOME)}
                    isActive={location.pathname === ROUTES.HOME}
                >
                    About
                </NavButton>
                <NavButton
                    id="len2"
                    onClick={() => navigate(ROUTES.COIN_DETAIL)}
                    isActive={location.pathname === ROUTES.COIN_DETAIL}
                >
                    Trade
                </NavButton>
                <NavButton
                    id="len3"
                    onClick={() => navigate(ROUTES.WALLET)}
                    isActive={location.pathname === ROUTES.WALLET}
                >
                    Wallet
                </NavButton>
            </NavSection>
        </HeaderContainer>
    );
};

export default Header;
