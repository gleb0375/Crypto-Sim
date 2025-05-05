import { useState } from "react";

export const useTradeMode = () => {
    const [mode, setMode] = useState<"buy" | "sell">("buy");
    return { mode, setMode };
};
