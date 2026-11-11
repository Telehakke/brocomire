import { LoaderCircle } from "lucide-solid";
import { Show } from "solid-js";
import type { JSX } from "solid-js/jsx-runtime";
import { isLoadingSignal } from "../../../signals";

export const Loader = (): JSX.Element => {
  const [isLoading] = isLoadingSignal;

  return (
    <Show when={isLoading()}>
      <LoaderCircle class="fixed inset-0 m-auto inline size-16 animate-spin stroke-green-500" />
    </Show>
  );
};
