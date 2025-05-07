import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    font-family: 'telegraf', sans-serif;
    padding: 2rem;
    color: #c1c1c1;
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
`;

const Title = styled.h1`
    font-size: 3vh;
`;

const Paragraph = styled.p`
    font-size: 1.8vh;
`;

const HomePage: React.FC = () => {
    return (
        <Container>
            <Title>About CryptoSim</Title>
            <Paragraph>
                <strong>CryptoSim</strong> is a cryptocurrency trading simulator that allows users to experience
                real-time market behavior using virtual money. The app includes live price tracking, interactive
                charts, and a personal wallet for managing and simulating buy/sell operations without financial risk.
            </Paragraph>
        </Container>
    );
};

export default HomePage;
