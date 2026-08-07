import { useAtomValue, useSetAtom } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { AppStateAtom, Atom } from "../../../atoms";
import { Switch } from "../../../components/Switch";

export const ShouldPreloadSwitch = (): JSX.Element => {
    const shouldPreload = useAtomValue(AppStateAtom.shouldPreload);
    const setAppStore = useSetAtom(Atom.appStore);

    return (
        <Switch
            label="先読みの有効化"
            checked={shouldPreload}
            onCheckedChange={(c) => setAppStore((a) => a.setShouldPreload(c))}
        />
    );
};
