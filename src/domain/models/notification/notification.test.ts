import { describe, expect, test } from "vite-plus/test";
import {
  fadeOutNotification,
  hideNotification,
  initNotification,
  showNotificationMessage,
} from "./notification";

test("initNotification", () => {
  expect(initNotification()).toEqual({ message: undefined, visibility: "hidden" });
});

describe("showNotificationMessage", () => {
  const notification = showNotificationMessage("message");
  expect(notification).toEqual({ message: "message", visibility: "visible" });

  test("fadeOutNotification", () => {
    expect(fadeOutNotification(notification)).toEqual({
      message: "message",
      visibility: "fade-out",
    });
  });

  test("hideNotification", () => {
    expect(hideNotification(notification)).toEqual({ message: "message", visibility: "hidden" });
  });
});
