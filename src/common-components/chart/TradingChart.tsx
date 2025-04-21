import React, { useEffect } from "react";
import { init, dispose, KLineData } from "klinecharts";
import { TradingChartProps } from "../../types/market.types";

interface Props extends TradingChartProps {
    onPriceUpdate?: (price: number) => void;
}

const convertKline = (item: TradingChartProps["data"][number]): KLineData => ({
    timestamp: item.openTime,
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: parseFloat(item.volume),
});

const TradingChart: React.FC<Props> = ({ data, symbol, interval, onPriceUpdate }) => {
    useEffect(() => {
        const chart = init("k-line-chart");

        chart?.setStyles({
            layout: { backgroundColor: "#16161b" },
            xAxis: { tickText: { color: "#fff", size: 14 }, axisLine: { color: "#fff" } },
            yAxis: { tickText: { color: "#fff", size: 14 }, axisLine: { color: "#fff" } },
            grid: {
                horizontal: { color: "#888", style: "dashed" },
                vertical: { color: "#888", style: "dashed" },
            },
        });

        const formatted = data.map(convertKline).sort((a, b) => a.timestamp - b.timestamp);
        chart?.applyNewData(formatted);

        const wsSymbol = symbol.toLowerCase();
        const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${wsSymbol}@kline_${interval}`);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            const k = message.k;

            if (k) {
                const newCandle: KLineData = {
                    timestamp: k.t,
                    open: parseFloat(k.o),
                    high: parseFloat(k.h),
                    low: parseFloat(k.l),
                    close: parseFloat(k.c),
                    volume: parseFloat(k.v),
                };

                chart?.updateData(newCandle);

                if (onPriceUpdate) {
                    onPriceUpdate(parseFloat(k.c));
                }
            }
        };

        return () => {
            ws.close();
            dispose("k-line-chart");
        };
    }, [data, symbol, interval]);

    return <div id="k-line-chart" style={{ width: "100%", height: "100%" }} />;
};

export default TradingChart;
