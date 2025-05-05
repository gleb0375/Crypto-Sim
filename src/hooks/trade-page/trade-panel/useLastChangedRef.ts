import { useRef } from "react";

export const useLastChangedRef = () => {
    return useRef<"qty" | "orderValue" | null>(null);
};
