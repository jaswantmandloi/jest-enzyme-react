import { useEffect, useState } from "react";

const handleKeyPressEventsDefaultValue = null;
const defaultEventObject = {
  shiftKey: false,
  key: "",
  lastUpdateTime: new Date().getTime(),
};

export const useKeyPressEvent = function ({
  captureEvents,
  handleKeyPressEvents = handleKeyPressEventsDefaultValue,
  isActive = true,
}) {
  const [keyEvent, setKeyEvent] = useState(defaultEventObject);

  useEffect(() => {
    function downHandler(event) {
      // Prevent event handling in case of inActive
      if (!isActive) {
        return;
      }
      const { key, shiftKey } = event;
      if (captureEvents.includes(key)) {
        event.preventDefault();
        const eventObj = {
          shiftKey,
          key,
          lastUpdateTime: new Date().getTime(),
        };
        handleKeyPressEvents
          ? handleKeyPressEvents(eventObj)
          : setKeyEvent(eventObj);
      }
    }

    function upHandler() {
      setKeyEvent(defaultEventObject);
    }

    window.addEventListener("keydown", downHandler);
    handleKeyPressEvents === null &&
      window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      handleKeyPressEvents === null &&
        window.removeEventListener("keyup", upHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return keyEvent;
};

export const KEYS = {
  ARROW_DOWN: "ArrowDown",
  ARROW_UP: "ArrowUp",
  ARROW_RIGHT: "ArrowRight",
  ARROW_LEFT: "ArrowLeft",
  TAB: "Tab",
  ESCAPE: "Escape",
  ENTER: "Enter",
};
