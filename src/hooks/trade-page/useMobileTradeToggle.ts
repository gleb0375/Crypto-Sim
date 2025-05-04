import { useState } from "react";

export const useMobileTradeToggle = () => {
    const [isMobileTradeOpen, setIsMobileTradeOpen] = useState(false);

    return {
        isMobileTradeOpen,
        openMobileTrade: () => setIsMobileTradeOpen(true),
        closeMobileTrade: () => setIsMobileTradeOpen(false),
    };
};
