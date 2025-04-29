// src/common-components/trade/CustomSlider.tsx
import React from "react";
import Slider, { SliderProps } from "rc-slider";
import "rc-slider/assets/index.css";
import styled from "styled-components";

// Стили: используем .rc-slider-mark как кружки-насечки
const StyledSlider = styled(Slider)<SliderProps>`
    .rc-slider-rail {
        background-color: #444;
        height: 4px;
        border-radius: 2px;
    }
    .rc-slider-track {
        background-color: #44a868;
        height: 4px;
        border-radius: 2px;
    }
    .rc-slider-handle {
        width: 16px;
        height: 16px;
        margin-top: -6px;
        background-color: #44a868;
        border: none;
        box-shadow: none;
        cursor: grab;
    }
    /* Насечки: стилизуем каждую метку-маркер */
    .rc-slider-mark {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        margin-left: -4px;           /* центр по оси X */
        border: 2px solid #666;
        background: transparent;
        border-radius: 50%;
    }
    /* Подсветка маркера слева от ручки */
    .rc-slider-mark-active {
        border-color: #44a868;
    }
    /* Текст на крайних метках */
    .rc-slider-mark-text {
        font-size: 0.75rem;
        color: #ccc;
        margin-top: 0.5rem;
    }
`;

type CustomSliderProps = Omit<SliderProps, "onChange"> & {
    value: number;
    onChange: (value: number) => void;
};

const CustomSlider: React.FC<CustomSliderProps> = ({
                                                       value,
                                                       onChange,
                                                       ...restProps
                                                   }) => (
    <StyledSlider
        {...restProps}
        min={0}
        max={100}
        step={1}            // свободное движение по всей длине
        value={value}
        onChange={(val) => {
            const v = Array.isArray(val) ? val[0] : val;
            onChange(v);
        }}
        marks={{
            0: "0%",
            25: "",
            50: "",
            75: "",
            100: "100%",
        }}
        // dots НЕ нужен — метки будут рисоваться через .rc-slider-mark
    />
);

export default CustomSlider;
