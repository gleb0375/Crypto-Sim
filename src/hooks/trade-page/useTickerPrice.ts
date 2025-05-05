import { useQuery } from '@tanstack/react-query';
import { getTickerPrice } from '../../services/binanceApi.ts';


export const useTickerPrice = (symbol: string) => {
    return useQuery({
        queryKey: ['tickerPrice', symbol],
        queryFn: () => getTickerPrice(symbol),
        refetchInterval: 30000,
        staleTime: 15000,
    });
}
