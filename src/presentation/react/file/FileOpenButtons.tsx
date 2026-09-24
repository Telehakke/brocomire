import { useRef, type ChangeEvent, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import { LargeIconButton } from "../utils/LargeIconButton";

export const FileOpenButton = (props: {
    text: string;
    accept: string;
    multiple?: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement, HTMLInputElement>) => void;
    children: ReactNode;
}): JSX.Element => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    return (
        <>
            <input
                className="hidden"
                ref={inputRef}
                type="file"
                accept={props.accept}
                multiple={props.multiple}
                onChange={props.onChange}
            />
            <LargeIconButton
                text={props.text}
                onClick={() => inputRef.current?.click()}
            >
                {props.children}
            </LargeIconButton>
        </>
    );
};
