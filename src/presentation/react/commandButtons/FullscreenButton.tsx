import { useAtomValue } from "jotai";
import { Fullscreen as FullscreenIcon } from "lucide-react";
import { useState } from "react";
import type { JSX } from "react/jsx-runtime";
import { Fullscreen } from "../../../infrastructure/viewer/fullscreen";
import { UserSettingsAtom } from "../../atoms";
import { IconBlueButton } from "../utils/IconBlueButton";
import { IconButton } from "../utils/IconButton";

export const FullscreenButton = (): JSX.Element | null => {
    const shouldShowButton = useAtomValue(
        UserSettingsAtom.shouldShowFullscreenButton,
    );
    const [onFullscreen, setOnFullscreen] = useState(false);

    if (!shouldShowButton.value) return null;
    if (onFullscreen) {
        return <FullscreenIconBlueButton setOnFullscreen={setOnFullscreen} />;
    }
    return <FullscreenIconButton setOnFullscreen={setOnFullscreen} />;
};

const FullscreenIconBlueButton = (props: {
    setOnFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    const handleClick = (): void => {
        Fullscreen.exit();
        props.setOnFullscreen(false);
    };
    return (
        <IconBlueButton.Button onClick={handleClick}>
            <FullscreenIcon
                className={Object.values(IconBlueButton.className).join(" ")}
            />
        </IconBlueButton.Button>
    );
};

const FullscreenIconButton = (props: {
    setOnFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
}): JSX.Element => {
    const handleClick = (): void => {
        Fullscreen.execute();
        props.setOnFullscreen(true);
    };

    return (
        <IconButton.Button onClick={handleClick}>
            <FullscreenIcon
                className={Object.values(IconButton.className).join(" ")}
            />
        </IconButton.Button>
    );
};
