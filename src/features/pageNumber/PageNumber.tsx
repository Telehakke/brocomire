import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { Atom } from "../../atoms";

export const PageNumber = (): JSX.Element => {
    const file = useAtomValue(Atom.fileManager);
    const text = `${file.index + 1} / ${file.length}`;

    return (
        <div className="rounded-sm bg-neutral-300/75 px-1 select-none">
            <p className="font-bold text-black tabular-nums">{text}</p>
        </div>
    );
};
