import { useEffect, useState } from "react";

export const useShakeOnError = (trigger: boolean, duration = 400) => {
    const [shake, setShake] = useState(false);

    useEffect(() => {
        if (trigger) {
            setShake(true);
            const timer = setTimeout(() => setShake(false), duration);
            return () => clearTimeout(timer);
        }
    }, [trigger, duration]);

    return shake;
};
