import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { Atom } from "../../atoms";

export const PageNumber = (): JSX.Element => {
    const file = useAtomValue(Atom.fileManager);
    const text = `${file.index + 1} / ${file.length}`;

    return (
        <div className="tabular-nums opacity-75 select-none">
            <p className="text-black" style={{ WebkitTextStroke: "2px #000" }}>
                {text}
            </p>
            <p className="-translate-y-full text-white">{text}</p>
        </div>
    );
};
