import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { Clock } from "../../../infrastructure/clock/clock";

export const ClockView = (): JSX.Element => {
    const [value, setValue] = useState("");

    useEffect(() => {
        let isMounted = true;
        const routine = (): void => {
            if (!isMounted) return;
            setValue(Clock.now());
            window.setTimeout(routine, Clock.getMsecToNextUpdate());
        };
        routine();
        return (): void => {
            isMounted = false;
        };
    }, []);

    return (
        <div className="rounded-sm bg-neutral-300/75 px-1 select-none">
            <p className="font-bold text-black tabular-nums">{value}</p>
        </div>
    );
};
