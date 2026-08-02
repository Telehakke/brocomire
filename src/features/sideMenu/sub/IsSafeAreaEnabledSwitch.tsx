import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../../atoms";
import { Switch } from "../../../components/Switch";

export const IsSafeAreaEnabledSwitch = (): JSX.Element => {
    const isSafeAreaEnabled = useAtomValue(AppStateAtom.isSafeAreaEnabled);
    const setAppStore = useSetAtom(Atom.appStore);

    return (
        <Switch
            label="セーフエリアの有効化"
            checked={isSafeAreaEnabled}
            onCheckedChange={(c) =>
                setAppStore((a) => a.setIsSafeAreaEnabled(c))
            }
        />
    );
};
