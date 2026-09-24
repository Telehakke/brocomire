import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom } from "../../atoms";

export const PageNumber = (): JSX.Element => {
    const fileManager = useAtomValue(AppStateAtom.fileManager);

    return (
        <div className="rounded-sm bg-neutral-300/75 px-1 select-none">
            <p className="font-bold text-black tabular-nums">
                {fileManager.progress()}
            </p>
        </div>
    );
};
