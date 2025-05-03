import { KLineData } from "klinecharts";
import {MinimalKlineData} from "../types/market.types.ts";

export const convertKline = (item: MinimalKlineData): KLineData => ({
    timestamp: item.openTime,
    open: parseFloat(item.open),
    high: parseFloat(item.high),
    low: parseFloat(item.low),
    close: parseFloat(item.close),
    volume: parseFloat(item.volume),
});
