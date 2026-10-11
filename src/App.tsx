import { atom, useAtomValue, useSetAtom } from "jotai";
import { useEffect, type JSX } from "react";
import { updateHistory } from "./application/viewer/updateHistory";
import { FileNavigator } from "./domain/models/file/fileNavigator";
import { UserSettings } from "./domain/models/userSettings/userSettings";
import { LocalStorageUserSettingsRepository } from "./infrastructure/userSettings/localStorageUserSettingsRepository";
import { Atom, fileManagerAtom, fileNavigatorAtom, onViewerAtom } from "./presentation/atoms";
import { Home } from "./presentation/react/home/Home";
import { Menu } from "./presentation/react/menu/Menu";
import { NotificationView } from "./presentation/react/notification/NotificationView";
import { SideMenu } from "./presentation/react/sideMenu/SideMenu";
import { ImageViewer } from "./presentation/react/viewer/ImageViewer";

const updateHistoryAtom = atom(null, (get, set) => {
  const fileNavigatorStore = FileNavigator.getStore(
    () => get(fileNavigatorAtom),
    (v) => set(fileNavigatorAtom, v),
  );
  const userSettingsStore = UserSettings.getStore(
    () => get(Atom.userSettings),
    (v) => set(Atom.userSettings, v),
  );
  updateHistory(
    get(fileManagerAtom),
    fileNavigatorStore,
    userSettingsStore,
    new LocalStorageUserSettingsRepository(),
  );
});

export const App = (): JSX.Element => {
  const userSettings = useSetAtom(Atom.userSettings);
  const updateHistory = useSetAtom(updateHistoryAtom);
  const onViewer = useAtomValue(onViewerAtom);

  useEffect(() => {
    userSettings(new LocalStorageUserSettingsRepository().load());
  }, [userSettings]);

  useEffect(() => {
    const handleChange = (): void => {
      // ブラウザが最小化されたら履歴を更新
      if (document.hidden) updateHistory();
    };
    document.addEventListener("visibilitychange", handleChange);
    return (): void => document.removeEventListener("visibilitychange", handleChange);
  }, [updateHistory]);

  if (!onViewer) return <Home />;
  return (
    <>
      <ImageViewer />
      <SideMenu />
      <Menu />
      <NotificationView />
    </>
  );
};
