import { useState } from "react";

export const useSelectedInterval = () => {
    const [selectedInterval, setSelectedInterval] = useState("1m");
    return { selectedInterval, setSelectedInterval };
};
