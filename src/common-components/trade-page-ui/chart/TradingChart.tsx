import React, { useEffect } from "react";
import { init, dispose, KLineData } from "klinecharts";
import {ExtendedTradingChartProps} from "../../../types/market.types.ts";
import { getKlines } from "../../../services/binanceApi.ts";
import {convertKline} from "../../../utils/convertKline.ts";

const TradingChart: React.FC<ExtendedTradingChartProps> = ({ data, symbol, interval, onPriceUpdate }) => {
    useEffect(() => {
        const chart = init("k-line-chart");
        if (!chart) return;

        chart.setStyleOptions({
            layout: {
                background: "#16161b",
                textColor: "#ffffff",
            },
            grid: {
                horizontal: { color: "#888", style: "dashed" },
                vertical: { color: "#888", style: "dashed" },
            },
            xAxis: {
                axisLine: { color: "#ffffff" },
                tickText: { color: "#ffffff", size: 14 },
            },
            yAxis: {
                axisLine: { color: "#ffffff" },
                tickText: { color: "#ffffff", size: 14 },
            },
            candle: {
                upColor: "#26A69A",
                downColor: "#EF5350",
                noChangeColor: "#999999",
                border: true,
                wick: true,
            },
            crosshair: {
                showCrosshair: true,
                showCrosshairText: false
            },
        });

        const formatted = data.map(convertKline).sort((a, b) => a.timestamp - b.timestamp);
        chart.applyNewData(formatted);
        console.log("[Chart] Applied initial candles:", formatted.length);

        let oldestTimestamp = formatted[0]?.timestamp ?? Infinity;

        chart.loadMore?.(async (timestamp) => {
            console.log("[Chart] loadMore called with timestamp:", timestamp);

            const moreData = await getKlines(symbol, interval, {
                endTime: timestamp,
                limit: 500,
            });

            const moreFormatted = moreData
                .map(convertKline)
                .sort((a, b) => a.timestamp - b.timestamp);

            const earliest = moreFormatted[0]?.timestamp;
            if (!earliest || earliest >= oldestTimestamp) {
                console.log("[Chart] No more unique historical data, stopping loadMore.");
                return;
            }

            oldestTimestamp = earliest;
            chart.applyMoreData?.(moreFormatted, true);
            console.log(`[Chart] Loaded ${moreFormatted.length} older candles`);
        });

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

                chart.updateData(newCandle);

                if (onPriceUpdate) {
                    onPriceUpdate(parseFloat(k.c));
                }
            }
        };

        const handleResize = () => {
            chart.resize();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            ws.close();
            dispose("k-line-chart");
        };
    }, [data, symbol, interval]);

    return <div id="k-line-chart" style={{ width: "100%", height: "100%" }} />;
};

export default TradingChart;
