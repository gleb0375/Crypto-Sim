import React from "react";
import styled from "styled-components";
import BeanEaterGif from "/assets/loading/BeanEater.gif";

const LoaderWrapper = styled.div`
    background-color: #16161b;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoaderImage = styled.img`
    width: 200px;
    height: 200px;
`;

const Loader: React.FC = () => {
    return (
        <LoaderWrapper>
            <LoaderImage src={BeanEaterGif} alt="Loading..." />
        </LoaderWrapper>
    );
};

export default Loader;
