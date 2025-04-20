import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/constants';

const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #13161c;
    //background-color: #14121c;
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

const NavButton = styled.button`
    display: inline-block;
    position: relative;
    backface-visibility: hidden;
    vertical-align: middle;
    box-shadow: 0 0 0.0625rem rgba(0, 0, 0, 0);
    transform: translateZ(0);
    transition-duration: 0.3s;
    transition-property: transform, text-shadow;
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

    &::-moz-focus-inner {
        border: 0;
    }

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
`;

const Header: React.FC = () => {
    const navigate = useNavigate();

    return (
        <HeaderContainer>
            <NavSection>
                <NavButton id="len1" onClick={() => navigate(ROUTES.HOME)}>
                    About
                </NavButton>
                <NavButton id="len2" onClick={() => navigate(ROUTES.COIN_DETAIL)}>
                    Trade
                </NavButton>
                <NavButton id="len3" onClick={() => navigate(ROUTES.WALLET)}>
                    Wallet
                </NavButton>
                {/*<NavButton id="len4" onClick={() => navigate(ROUTES.TRADING)}>*/}
                {/*    Trading*/}
                {/*</NavButton>*/}
            </NavSection>
        </HeaderContainer>
    );
};

export default Header;
