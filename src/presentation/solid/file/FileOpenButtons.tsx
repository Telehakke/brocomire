import type { JSX } from "solid-js/jsx-runtime";
import { LargeIconButton } from "../utils/LargeIconButton";

export const FileOpenButton = (props: {
  text: string;
  accept: string;
  multiple?: boolean;
  onChange: JSX.ChangeEventHandlerUnion<HTMLInputElement, Event>;
  children: JSX.Element;
}): JSX.Element => {
  // oxlint-disable-next-line no-unassigned-vars
  let inputRef: HTMLInputElement | undefined;

  return (
    <>
      <input
        class="hidden"
        ref={inputRef}
        type="file"
        accept={props.accept}
        multiple={props.multiple}
        onChange={props.onChange}
      />
      <LargeIconButton text={props.text} onClick={() => inputRef?.click()}>
        {props.children}
      </LargeIconButton>
    </>
  );
};
