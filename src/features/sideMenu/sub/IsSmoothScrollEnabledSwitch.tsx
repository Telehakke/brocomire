import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../../atoms";
import { Switch } from "../../../components/Switch";

export const IsSmoothScrollEnabledSwitch = (): JSX.Element => {
    const isSmoothScrollEnabled = useAtomValue(
        AppStateAtom.isSmoothScrollEnabled,
    );
    const setAppStore = useSetAtom(Atom.appStore);

    return (
        <Switch
            label="滑らかスクロールの有効化"
            checked={isSmoothScrollEnabled}
            onCheckedChange={(c) =>
                setAppStore((a) => a.setIsSmoothScrollEnabled(c))
            }
        />
    );
};
