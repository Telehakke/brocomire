import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { ClockManager } from "./clockManager";

export const Clock = (): JSX.Element => {
    const [clockManager, setClockManager] = useState(new ClockManager());

    useEffect(() => {
        let isMounted = true;
        const routine = (): void => {
            if (!isMounted) return;
            setClockManager((c) => c.update());
            window.setTimeout(routine, ClockManager.getMsecToNextUpdate());
        };
        routine();
        return (): void => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="tabular-nums opacity-75 select-none">
            <p className="text-black" style={{ WebkitTextStroke: "2px #000" }}>
                {clockManager.time}
            </p>
            <p className="-translate-y-full text-white">{clockManager.time}</p>
        </div>
    );
};
