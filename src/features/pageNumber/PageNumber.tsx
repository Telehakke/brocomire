import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { Atom } from "../../atoms";

export const PageNumber = (): JSX.Element => {
    const file = useAtomValue(Atom.fileManager);
    const text = `${file.index + 1} / ${file.length}`;

    return (
        <div className="rounded-sm bg-neutral-600/50 px-1 tabular-nums select-none">
            <p className="text-neutral-100">{text}</p>
        </div>
    );
};
