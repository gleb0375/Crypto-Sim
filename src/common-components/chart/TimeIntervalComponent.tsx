import React from "react";
import styled from "styled-components";
import {TimeIntervalContainerProps} from "../../types/market.types.ts";

const TimeIntervalContainer = styled.div`
    display: flex;
    gap: 1rem;
    margin-bottom: 2vh;
    margin-left: 2vh;
    height: 3vh;
`;

const TimeButton = styled.button<{ selected: boolean }>`
    background: transparent;
    border: none;
    color: ${({ selected }) => (selected ? '#ffffff' : '#cccccc')};
    font-size: 1.5vh;
    padding: 0.3rem 0.6rem;
    cursor: pointer;
    border-radius: 4px;
    font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: ${({ selected }) => (selected ? 600 : 400)};
    position: relative;
    transition: color 0.2s ease;

    &:hover {
        color: #ffffff;
    }

    &:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 20%;
        width: 60%;
        height: 2px;
        background: ${({ selected }) => (selected ? '#ffffff' : 'transparent')};
        transition: background 0.2s ease;
    }

    &:hover:after {
        background: #ffffff55;
    }
`;


const TimeIntervalComponent: React.FC<TimeIntervalContainerProps> = ({
                                                                         intervals,
                                                                         selectedInterval,
                                                                         onSelect
                                                                     }) => {
    return (
        <TimeIntervalContainer>
            {intervals.map((interval) => (
                <TimeButton
                    key={interval}
                    selected={selectedInterval === interval}
                    onClick={() => onSelect(interval)}
                >
                    {interval}
                </TimeButton>
            ))}
        </TimeIntervalContainer>
    );
};

export default TimeIntervalComponent;
