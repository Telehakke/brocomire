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
        <div className="rounded-sm bg-neutral-300/75 px-1 tabular-nums select-none">
            <p className="text-black">{clockManager.time}</p>
        </div>
    );
};
