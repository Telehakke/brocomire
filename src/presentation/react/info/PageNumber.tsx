import { useAtomValue } from "jotai";
import type { JSX } from "react/jsx-runtime";
import { FileNavigator } from "../../../domain/models/file/fileNavigator";
import { fileNavigatorAtom } from "../../atoms";

export const PageNumber = (): JSX.Element => {
  const fileNavigator = useAtomValue(fileNavigatorAtom);

  return (
    <div className="rounded-sm bg-neutral-300/75 px-1 select-none">
      <p className="font-bold text-black tabular-nums">{FileNavigator.progress(fileNavigator)}</p>
    </div>
  );
};
