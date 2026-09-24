import { useAtomValue, useSetAtom } from "jotai";
import { useState, type JSX } from "react";
import { ScrollSpeed } from "../../../../domain/models/userSettings/valueObjects/scrollSpeed";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const ScrollSpeedSlider = (): JSX.Element => {
    const scrollSpeed = useAtomValue(UserSettingsAtom.scrollSpeed);
    const setUserSettings = useSetAtom(Atom.userSettings);
    const [value, setValue] = useState(scrollSpeed.value);

    const handleValueChangeEnd = (value: number): void => {
        setUserSettings((u) =>
            u.copyWith(
                { scrollSpeed: ScrollSpeed.createSafe(value) },
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Slider
            label={(v) => `垂直・水平スクロール速度：${v}倍`}
            min={ScrollSpeed.MIN}
            max={ScrollSpeed.MAX}
            value={value}
            onValueChange={setValue}
            onValueChangeEnd={handleValueChangeEnd}
        />
    );
};
