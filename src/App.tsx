import { onCleanup, onMount, Show, type JSX } from "solid-js";
import { updateHistory } from "./application/viewer/updateHistory";
import { LocalStorageUserSettingsRepository } from "./infrastructure/userSettings/localStorageUserSettingsRepository";
import {
  fileManagerSignal,
  fileNavigatorSignal,
  onViewerSignal,
  userSettingsStore,
} from "./presentation/signals";
import { Home } from "./presentation/solid/home/Home";
import { Menu } from "./presentation/solid/menu/Menu";
import { NotificationView } from "./presentation/solid/notification/NotificationView";
import { SideMenu } from "./presentation/solid/sideMenu/SideMenu";
import { ImageViewer } from "./presentation/solid/viewer/ImageViewer";

export const App = (): JSX.Element => {
  const [, setUserSettings] = userSettingsStore;
  const [onViewer] = onViewerSignal;

  onMount(() => {
    setUserSettings(new LocalStorageUserSettingsRepository().load());
  });

  onMount(() => {
    const handleChange = (): void => {
      // ブラウザが最小化されたら履歴を更新
      if (document.hidden) runUpdateHistory();
    };
    document.addEventListener("visibilitychange", handleChange);
    onCleanup(() => {
      document.removeEventListener("visibilitychange", handleChange);
    });
  });

  return (
    <Show when={onViewer()} fallback={<Home />}>
      <>
        <ImageViewer />
        <SideMenu />
        <Menu />
        <NotificationView />
      </>
    </Show>
  );
};

const runUpdateHistory = (): void => {
  const [fileManager] = fileManagerSignal;
  const [fileNavigator] = fileNavigatorSignal;
  const [userSettings, setUserSettings] = userSettingsStore;

  updateHistory(
    fileManager(),
    () => fileNavigator(),
    () => userSettings,
    (v) => setUserSettings(v),
    new LocalStorageUserSettingsRepository(),
  );
};
