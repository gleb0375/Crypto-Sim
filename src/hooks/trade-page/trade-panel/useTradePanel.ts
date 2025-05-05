import { useWallet } from "../../../contexts/WalletContext.tsx";
import { useTradeMode } from "./useTradeMode.ts";
import { useTradeForm } from "./useTradeForm.ts";
import { useLastChangedRef } from "./useLastChangedRef.ts";
import { useTradeCalculations } from "./useTradeCalculations.ts";
import { useTradeBalance } from "./useTradeBalance.ts";
import { useExecuteTrade } from "./useExecuteTrade.ts";
import { useShakeOnError } from "./useShakeOnError.ts";

export const useTradePanel = (symbol: string, price?: number) => {
    const { getBalance, executeTrade } = useWallet();
    const { mode, setMode } = useTradeMode();
    const lastChanged = useLastChangedRef();

    const {
        qty,
        orderValue,
        setQty,
        setOrderValue,
        handleQtyChange,
        handleOrderValueChange,
        resetForm,
    } = useTradeForm(lastChanged);

    useTradeCalculations({ qty, orderValue, price, setQty, setOrderValue, lastChanged });

    const {
        availableBalanceDisplay,
        hasInsufficientBalance,
    } = useTradeBalance({ mode, symbol, qty, price, getBalance });

    const handleExecuteTrade = useExecuteTrade({
        mode,
        symbol,
        qty,
        price,
        getBalance,
        executeTrade,
    });

    const shake = useShakeOnError(hasInsufficientBalance);

    return {
        mode,
        setMode,
        qty,
        orderValue,
        availableBalanceDisplay,
        handleQtyChange,
        handleOrderValueChange,
        handleExecuteTrade,
        resetForm,
        hasInsufficientBalance,
        shake,
    };
};
