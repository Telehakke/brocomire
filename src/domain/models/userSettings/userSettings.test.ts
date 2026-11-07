import { describe, expect, it, test } from "vite-plus/test";
import { InMemoryUserSettingsRepository } from "../../../infrastructure/userSettings/inMemoryUserSettingsRepository";
import { createHistory } from "./history/history";
import { createHistoryList } from "./history/historyList";
import {
  createUserSettings,
  setBookFormat,
  setContentFit,
  setDisplayMode,
  setHistoryList,
  setIsSafeAreaEnabled,
  setIsSmoothScrollEnabled,
  setLongPressRecognitionTime,
  setMenuOpacity,
  setSafeAreaLength,
  setScrollSpeed,
  setScrollStepCount,
  setSharpeningFilterStrength,
  setShouldAdvance,
  setShouldPreload,
  setShouldShowBookmarkButton,
  setShouldShowFullscreenButton,
  setShouldShowInvertButton,
  setShouldShowProgressBar,
  setShouldShowSharpeningFilterButton,
  setTapAreaSize,
  setZoomStep,
  type UserSettings,
} from "./userSettings";
import { BookFormatEnum, createBookFormat } from "./valueObjects/bookFormat";
import { ContentFitEnum, createContentFit } from "./valueObjects/contentFit";
import { createDisplayMode, DisplayModeEnum } from "./valueObjects/displayMode";
import {
  createIsSafeAreaEnabled,
  IS_SAFE_AREA_ENABLED_DEFAULT,
} from "./valueObjects/isSafeAreaEnabled";
import {
  createIsSmoothScrollEnabled,
  IS_SMOOTH_SCROLL_ENABLED_DEFAULT,
} from "./valueObjects/isSmoothScrollEnabled";
import {
  createLongPressRecognitionTime,
  LONG_PRESS_RECOGNITION_TIME_MIN,
} from "./valueObjects/longPressRecognitionTime";
import { createMenuOpacity, MENU_OPACITY_MIN } from "./valueObjects/menuOpacity";
import { createSafeAreaLength, SAFE_AREA_LENGTH_MIN } from "./valueObjects/safeAreaLength";
import { createScrollSpeed, SCROLL_SPEED_MIN } from "./valueObjects/scrollSpeed";
import { createScrollStepCount, ScrollStepCountEnum } from "./valueObjects/scrollStepCount";
import {
  createSharpeningFilterStrength,
  SHARPENING_FILTER_STRENGTH_MIN,
} from "./valueObjects/sharpeningFilterStrength";
import { createShouldAdvance, SHOULD_ADVANCE_DEFAULT } from "./valueObjects/shouldAdvance";
import { createShouldPreload, SHOULD_PRELOAD_DEFAULT } from "./valueObjects/shouldPreload";
import {
  createShouldShowBookmarkButton,
  SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT,
} from "./valueObjects/shouldShowBookmarkButton";
import {
  createShouldShowFullscreenButton,
  SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT,
} from "./valueObjects/shouldShowFullscreenButton";
import {
  createShouldShowInvertButton,
  SHOULD_SHOW_INVERT_BUTTON_DEFAULT,
} from "./valueObjects/shouldShowInvertButton";
import {
  createShouldShowProgressBar,
  SHOULD_SHOW_PROGRESS_BAR_DEFAULT,
} from "./valueObjects/shouldShowProgressBar";
import {
  createShouldShowSharpeningFilterButton,
  SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
} from "./valueObjects/shouldShowSharpeningFilterButton";
import { createTapAreaSize, SizeEnum } from "./valueObjects/tapAreaSize";
import { createZoomStep, ZOOM_STEP_MIN } from "./valueObjects/zoomStep";

const userSettingsDefault: UserSettings = {
  bookFormat: createBookFormat(),
  contentFit: createContentFit(),
  displayMode: createDisplayMode(),
  historyList: createHistoryList(),
  isSafeAreaEnabled: createIsSafeAreaEnabled(),
  isSmoothScrollEnabled: createIsSmoothScrollEnabled(),
  longPressRecognitionTime: createLongPressRecognitionTime(),
  menuOpacity: createMenuOpacity(),
  safeAreaLength: createSafeAreaLength(),
  scrollSpeed: createScrollSpeed(),
  scrollStepCount: createScrollStepCount(),
  sharpeningFilterStrength: createSharpeningFilterStrength(),
  shouldAdvance: createShouldAdvance(),
  shouldPreload: createShouldPreload(),
  shouldShowBookmarkButton: createShouldShowBookmarkButton(),
  shouldShowFullscreenButton: createShouldShowFullscreenButton(),
  shouldShowInvertButton: createShouldShowInvertButton(),
  shouldShowProgressBar: createShouldShowProgressBar(),
  shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(),
  tapAreaSize: createTapAreaSize(),
  zoomStep: createZoomStep(),
};

describe("createUserSettings", () => {
  it("正常値の入力に対し正常値を返す", () => {
    expect(
      createUserSettings({
        ...userSettingsDefault,
        bookFormat: createBookFormat(BookFormatEnum.horizontal),
      }),
    ).toEqual({
      ...userSettingsDefault,
      bookFormat: createBookFormat(BookFormatEnum.horizontal),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        contentFit: createContentFit(ContentFitEnum.fill),
      }),
    ).toEqual({
      ...userSettingsDefault,
      contentFit: createContentFit(ContentFitEnum.fill),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        displayMode: createDisplayMode(DisplayModeEnum.book),
      }),
    ).toEqual({
      ...userSettingsDefault,
      displayMode: createDisplayMode(DisplayModeEnum.book),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        historyList: createHistoryList([createHistory("filename", 0)]),
      }),
    ).toEqual({
      ...userSettingsDefault,
      historyList: createHistoryList([createHistory("filename", 0)]),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        isSafeAreaEnabled: createIsSafeAreaEnabled(!IS_SAFE_AREA_ENABLED_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      isSafeAreaEnabled: createIsSafeAreaEnabled(!IS_SAFE_AREA_ENABLED_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        isSmoothScrollEnabled: createIsSmoothScrollEnabled(!IS_SMOOTH_SCROLL_ENABLED_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      isSmoothScrollEnabled: createIsSmoothScrollEnabled(!IS_SMOOTH_SCROLL_ENABLED_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        longPressRecognitionTime: createLongPressRecognitionTime(
          LONG_PRESS_RECOGNITION_TIME_MIN + 1,
        ),
      }),
    ).toEqual({
      ...userSettingsDefault,
      longPressRecognitionTime: createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MIN + 1),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        menuOpacity: createMenuOpacity(MENU_OPACITY_MIN + 1),
      }),
    ).toEqual({
      ...userSettingsDefault,
      menuOpacity: createMenuOpacity(MENU_OPACITY_MIN + 1),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        safeAreaLength: createSafeAreaLength(SAFE_AREA_LENGTH_MIN + 1),
      }),
    ).toEqual({
      ...userSettingsDefault,
      safeAreaLength: createSafeAreaLength(SAFE_AREA_LENGTH_MIN + 1),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        scrollSpeed: createScrollSpeed(SCROLL_SPEED_MIN + 1),
      }),
    ).toEqual({
      ...userSettingsDefault,
      scrollSpeed: createScrollSpeed(SCROLL_SPEED_MIN + 1),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        scrollStepCount: createScrollStepCount(ScrollStepCountEnum.six),
      }),
    ).toEqual({
      ...userSettingsDefault,
      scrollStepCount: createScrollStepCount(ScrollStepCountEnum.six),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        sharpeningFilterStrength: createSharpeningFilterStrength(
          SHARPENING_FILTER_STRENGTH_MIN + 1,
        ),
      }),
    ).toEqual({
      ...userSettingsDefault,
      sharpeningFilterStrength: createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MIN + 1),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldAdvance: createShouldAdvance(!SHOULD_ADVANCE_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldAdvance: createShouldAdvance(!SHOULD_ADVANCE_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldPreload: createShouldPreload(!SHOULD_PRELOAD_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldPreload: createShouldPreload(!SHOULD_PRELOAD_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldShowBookmarkButton: createShouldShowBookmarkButton(
          !SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT,
        ),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldShowBookmarkButton: createShouldShowBookmarkButton(
        !SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT,
      ),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldShowFullscreenButton: createShouldShowFullscreenButton(
          !SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT,
        ),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldShowFullscreenButton: createShouldShowFullscreenButton(
        !SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT,
      ),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldShowInvertButton: createShouldShowInvertButton(!SHOULD_SHOW_INVERT_BUTTON_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldShowInvertButton: createShouldShowInvertButton(!SHOULD_SHOW_INVERT_BUTTON_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldShowProgressBar: createShouldShowProgressBar(!SHOULD_SHOW_PROGRESS_BAR_DEFAULT),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldShowProgressBar: createShouldShowProgressBar(!SHOULD_SHOW_PROGRESS_BAR_DEFAULT),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(
          !SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
        ),
      }),
    ).toEqual({
      ...userSettingsDefault,
      shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(
        !SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
      ),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        tapAreaSize: createTapAreaSize(SizeEnum.none, SizeEnum.none),
      }),
    ).toEqual({
      ...userSettingsDefault,
      tapAreaSize: createTapAreaSize(SizeEnum.none, SizeEnum.none),
    });

    expect(
      createUserSettings({
        ...userSettingsDefault,
        zoomStep: createZoomStep(ZOOM_STEP_MIN + 1),
      }),
    ).toEqual({
      ...userSettingsDefault,
      zoomStep: createZoomStep(ZOOM_STEP_MIN + 1),
    });
  });

  it("不正値の入力に対しデフォルト値を返す", () => {
    expect(createUserSettings(null)).toEqual(userSettingsDefault);
    expect(createUserSettings()).toEqual(userSettingsDefault);
  });
});

test("setBookFormat", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    bookFormat: createBookFormat(BookFormatEnum.horizontal),
  };
  expect(
    setBookFormat(
      createUserSettings(userSettingsDefault),
      createBookFormat(BookFormatEnum.horizontal),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setContentFit", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    contentFit: createContentFit(ContentFitEnum.fill),
  };
  expect(
    setContentFit(
      createUserSettings(userSettingsDefault),
      createContentFit(ContentFitEnum.fill),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setDisplayMode", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    displayMode: createDisplayMode(DisplayModeEnum.book),
  };
  expect(
    setDisplayMode(
      createUserSettings(userSettingsDefault),
      createDisplayMode(DisplayModeEnum.book),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setHistoryList", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    historyList: createHistoryList([createHistory("filename", 0)]),
  };
  expect(
    setHistoryList(
      createUserSettings(userSettingsDefault),
      createHistoryList([createHistory("filename", 0)]),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setIsSafeAreaEnabled", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    isSafeAreaEnabled: createIsSafeAreaEnabled(!IS_SAFE_AREA_ENABLED_DEFAULT),
  };
  expect(
    setIsSafeAreaEnabled(
      createUserSettings(userSettingsDefault),
      createIsSafeAreaEnabled(!IS_SAFE_AREA_ENABLED_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setIsSmoothScrollEnabled", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    isSmoothScrollEnabled: createIsSmoothScrollEnabled(!IS_SMOOTH_SCROLL_ENABLED_DEFAULT),
  };
  expect(
    setIsSmoothScrollEnabled(
      createUserSettings(userSettingsDefault),
      createIsSmoothScrollEnabled(!IS_SMOOTH_SCROLL_ENABLED_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setLongPressRecognitionTime", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    longPressRecognitionTime: createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MIN + 1),
  };
  expect(
    setLongPressRecognitionTime(
      createUserSettings(userSettingsDefault),
      createLongPressRecognitionTime(LONG_PRESS_RECOGNITION_TIME_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setMenuOpacity", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    menuOpacity: createMenuOpacity(MENU_OPACITY_MIN + 1),
  };
  expect(
    setMenuOpacity(
      createUserSettings(userSettingsDefault),
      createMenuOpacity(MENU_OPACITY_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setSafeAreaLength", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    safeAreaLength: createSafeAreaLength(SAFE_AREA_LENGTH_MIN + 1),
  };
  expect(
    setSafeAreaLength(
      createUserSettings(userSettingsDefault),
      createSafeAreaLength(SAFE_AREA_LENGTH_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setScrollSpeed", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    scrollSpeed: createScrollSpeed(SCROLL_SPEED_MIN + 1),
  };
  expect(
    setScrollSpeed(
      createUserSettings(userSettingsDefault),
      createScrollSpeed(SCROLL_SPEED_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setScrollStepCount", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    scrollStepCount: createScrollStepCount(ScrollStepCountEnum.six),
  };
  expect(
    setScrollStepCount(
      createUserSettings(userSettingsDefault),
      createScrollStepCount(ScrollStepCountEnum.six),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setSharpeningFilterStrength", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    sharpeningFilterStrength: createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MIN + 1),
  };
  expect(
    setSharpeningFilterStrength(
      createUserSettings(userSettingsDefault),
      createSharpeningFilterStrength(SHARPENING_FILTER_STRENGTH_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldAdvance", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldAdvance: createShouldAdvance(!SHOULD_ADVANCE_DEFAULT),
  };
  expect(
    setShouldAdvance(
      createUserSettings(userSettingsDefault),
      createShouldAdvance(!SHOULD_ADVANCE_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldPreload", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldPreload: createShouldPreload(!SHOULD_PRELOAD_DEFAULT),
  };
  expect(
    setShouldPreload(
      createUserSettings(userSettingsDefault),
      createShouldPreload(!SHOULD_PRELOAD_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldShowBookmarkButton", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldShowBookmarkButton: createShouldShowBookmarkButton(!SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT),
  };
  expect(
    setShouldShowBookmarkButton(
      createUserSettings(userSettingsDefault),
      createShouldShowBookmarkButton(!SHOULD_SHOW_BOOKMARK_BUTTON_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldShowFullscreenButton", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldShowFullscreenButton: createShouldShowFullscreenButton(
      !SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT,
    ),
  };
  expect(
    setShouldShowFullscreenButton(
      createUserSettings(userSettingsDefault),
      createShouldShowFullscreenButton(!SHOULD_SHOW_FULLSCREEN_BUTTON_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldShowInvertButton", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldShowInvertButton: createShouldShowInvertButton(!SHOULD_SHOW_INVERT_BUTTON_DEFAULT),
  };
  expect(
    setShouldShowInvertButton(
      createUserSettings(userSettingsDefault),
      createShouldShowInvertButton(!SHOULD_SHOW_INVERT_BUTTON_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldShowProgressBar", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldShowProgressBar: createShouldShowProgressBar(!SHOULD_SHOW_PROGRESS_BAR_DEFAULT),
  };
  expect(
    setShouldShowProgressBar(
      createUserSettings(userSettingsDefault),
      createShouldShowProgressBar(!SHOULD_SHOW_PROGRESS_BAR_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setShouldShowSharpeningFilterButton", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    shouldShowSharpeningFilterButton: createShouldShowSharpeningFilterButton(
      !SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT,
    ),
  };
  expect(
    setShouldShowSharpeningFilterButton(
      createUserSettings(userSettingsDefault),
      createShouldShowSharpeningFilterButton(!SHOULD_SHOW_SHARPENING_FILTER_BUTTON_DEFAULT),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setTapAreaSize", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    tapAreaSize: createTapAreaSize(SizeEnum.none, SizeEnum.none),
  };
  expect(
    setTapAreaSize(
      createUserSettings(userSettingsDefault),
      createTapAreaSize(SizeEnum.none, SizeEnum.none),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});

test("setZoomStep", () => {
  const repository = new InMemoryUserSettingsRepository();
  const expected: UserSettings = {
    ...userSettingsDefault,
    zoomStep: createZoomStep(ZOOM_STEP_MIN + 1),
  };
  expect(
    setZoomStep(
      createUserSettings(userSettingsDefault),
      createZoomStep(ZOOM_STEP_MIN + 1),
      repository,
    ),
  ).toEqual(expected);
  expect(repository.value).toEqual(expected);
});
