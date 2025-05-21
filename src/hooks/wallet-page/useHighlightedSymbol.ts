import { useState, useEffect } from "react";

export const useHighlightedSymbol = () => {
    const [highlightedSymbol, setHighlightedSymbol] = useState<string | null>(null);

    useEffect(() => {
        if (!highlightedSymbol) return;

        const timeout = setTimeout(() => {
            setHighlightedSymbol(null);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [highlightedSymbol]);

    return { highlightedSymbol, setHighlightedSymbol };
};
