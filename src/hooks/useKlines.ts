import { useQuery } from '@tanstack/react-query';
import { getKlines } from '../services/binanceApi';
import {Kline} from "../constants/binanceConstants.ts";

export const useKlines = (symbol: string, interval: string) => {
    return useQuery<Kline[]>({
        queryKey: ['klines', symbol, interval],
        queryFn: () => getKlines(symbol, interval),
        refetchInterval: 10000,
        staleTime: 30000,
    });
};
