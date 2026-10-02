import { useAtomValue, useSetAtom } from "jotai";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { SafeAreaLength } from "../../../../domain/models/userSettings/valueObjects/safeAreaLength";
import { LocalStorageUserSettingsRepository } from "../../../../infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, UserSettingsAtom } from "../../../atoms";
import { Slider } from "../../utils/Slider";

export const SafeAreaLengthSlider = (): JSX.Element => {
    const safeAreaLength = useAtomValue(UserSettingsAtom.safeAreaLength);
    const setUserSettings = useSetAtom(Atom.userSettings);
    const [value, setValue] = useState(safeAreaLength.value);

    const handleValueChangedEnd = (value: number): void => {
        setUserSettings((u) =>
            u.setSafeAreaLength(
                () => SafeAreaLength.createSafe(value),
                new LocalStorageUserSettingsRepository(),
            ),
        );
    };

    return (
        <Slider
            label={getLabel}
            min={SafeAreaLength.MIN}
            max={SafeAreaLength.MAX}
            value={value}
            onValueChange={setValue}
            onValueChangeEnd={handleValueChangedEnd}
        />
    );
};

const getLabel = (value: number): string => {
    if (value === SafeAreaLength.MIN) return "セーフエリアの長さ：自動";
    return `セーフエリアの長さ：${value}px`;
};
