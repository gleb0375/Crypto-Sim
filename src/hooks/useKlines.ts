import { useQuery } from '@tanstack/react-query';
import { getKlines } from '../services/binanceApi';
import { Kline } from "../types/market.types.ts";

export const useKlines = (symbol: string, interval: string) => {
    return useQuery<Kline[]>({
        queryKey: ['klines', symbol, interval],
        queryFn: () => getKlines(symbol, interval),
        refetchInterval: false,
        staleTime: 60000,
    });
};
