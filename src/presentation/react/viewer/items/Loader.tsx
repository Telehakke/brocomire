import { useAtomValue } from "jotai";
import { LoaderCircle } from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { isLoadingAtom } from "../../../atoms";

export const Loader = (): JSX.Element | null => {
  const isLoading = useAtomValue(isLoadingAtom);

  if (!isLoading) return null;
  return (
    <LoaderCircle className="fixed inset-0 m-auto inline size-16 animate-spin stroke-green-500" />
  );
};
