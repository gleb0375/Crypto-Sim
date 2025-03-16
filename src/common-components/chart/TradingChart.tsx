import React, { useEffect, useRef } from "react";
import { init, dispose, Chart } from "klinecharts";
import { TradingChartProps } from "../../constants/binanceConstants";

const convertKline = (item: TradingChartProps["data"][number]) => ({
    timestamp: item.openTime,
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: parseFloat(item.volume),
});

const TradingChart: React.FC<TradingChartProps> = ({ data }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = init(chartContainerRef.current);
        if (!chart) return;

        chartRef.current = chart;

        chart.setStyles({
            layout: {
                backgroundColor: '#3d4047',
                textColor: '#fcfdfd',
            },
            grid: {
                //@ts-ignore
                horizontal: { color: '#888', style: 'dashed' },
                //@ts-ignore
                vertical: { color: '#888', style: 'dashed' },
            },
        });

        return () => {
            dispose(chart);
        };
    }, []);

    useEffect(() => {
        if (!chartRef.current) return;
        if (!data || data.length === 0) return;

        const convertedData = data.map(convertKline);
        chartRef.current.applyNewData(convertedData);
    }, [data]);

    return (
        <div
            ref={chartContainerRef}
            style={{ width: "100%", height: "100%" }}
        />
    );
};

export default TradingChart;
