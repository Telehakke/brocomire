import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../../atoms";
import { Slider } from "../../../components/Slider";
import { PreloadPageCount } from "../../../models/validator";

export const PreloadPageCountSlider = (): JSX.Element => {
    const pageCount = useAtomValue(AppStateAtom.preloadPageCount);
    const setAppStore = useSetAtom(Atom.appStore);
    const [value, setValue] = useState(pageCount);

    return (
        <Slider
            label={(v) => `先読みページ数：${v}`}
            min={PreloadPageCount.MIN}
            max={PreloadPageCount.MAX}
            value={value}
            onValueChange={setValue}
            onValueChangeEnd={(v) =>
                setAppStore((a) => a.setPreloadPageCount(v))
            }
        />
    );
};
