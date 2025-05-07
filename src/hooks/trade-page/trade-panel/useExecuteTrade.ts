import {UseExecuteTradeProps} from "../../../types/trade.types.ts";

export const useExecuteTrade = ({
                                    mode,
                                    symbol,
                                    qty,
                                    price,
                                    getBalance,
                                    executeTrade,
                                }: UseExecuteTradeProps ) => {
    return (): { success: boolean; amount?: number; value?: number } => {
        if (!price) return { success: false };

        const amount = parseFloat(qty);
        if (isNaN(amount) || amount <= 0) return { success: false };

        const totalValue = amount * price;

        if (mode === "buy" && totalValue > getBalance("USDT")) {
            alert("Insufficient USDT balance");
            return { success: false };
        }

        if (mode === "sell" && amount > getBalance(symbol)) {
            alert(`Insufficient ${symbol} balance`);
            return { success: false };
        }

        executeTrade(mode, symbol, price, amount);

        return { success: true, amount, value: totalValue };
    };
};
