import { useCallback, useEffect, useRef } from "react";
import { useKeyPressEvent, KEYS } from "./useKeyPressEvent";
//import { useMutationObservation } from "./useMutationObservation";

const defaultCaptureEvents = [
  KEYS.ARROW_DOWN,
  KEYS.ARROW_UP,
  KEYS.ARROW_LEFT,
  KEYS.ARROW_RIGHT,
  KEYS.TAB,
  KEYS.ESCAPE,
];

const getDefaultKeyboardAction = ({ key, shiftKey }) => {
  const isTab = key === KEYS.TAB;
  const isNextSelection = key === KEYS.ARROW_DOWN || (isTab && !shiftKey);
  const isPreviousSelection = key === KEYS.ARROW_UP || (isTab && shiftKey);
  const rightPress = key === KEYS.ARROW_RIGHT;
  const leftPress = key === KEYS.ARROW_LEFT;
  const isExit = key === KEYS.ESCAPE;

  return {
    isNextSelection,
    isPreviousSelection,
    rightPress,
    leftPress,
    isExit,
    isTab,
  };
};

export const getKeyboardAction = getDefaultKeyboardAction;

export const useKeyboardNavigation = function ({
  items,
  isActive,
  selectedItemIndex,
  setSelectedItemIndex,
  mutationObserver,
  observingElement,
  captureEvents = defaultCaptureEvents,
  horizontalArrowHandler = null,
  exitHandler = null,
  getKeyboardAction = getDefaultKeyboardAction,
}) {
  const keyPressEvent = useKeyPressEvent({
    captureEvents,
    isActive,
  });
  const { lastUpdateTime } = keyPressEvent;
  const selectedItemIndexRef = useRef(selectedItemIndex);

  const {
    isNextSelection,
    isPreviousSelection,
    rightPress,
    leftPress,
    isExit,
  } = getKeyboardAction(keyPressEvent);

  // useMutationObservation({
  //   observerHandler: mutationObserver,
  //   observingElement,
  // });

  useEffect(() => {
    isExit && exitHandler();
  }, [exitHandler, isExit]);

  useEffect(() => {
    if (items.length && isPreviousSelection) {
      selectedItemIndexRef.current = getPreviousFocusableElement(
        selectedItemIndexRef.current,
        items
      );

      setSelectedItemIndex(selectedItemIndexRef.current);
    }
  }, [isPreviousSelection, items, lastUpdateTime, setSelectedItemIndex]);

  useEffect(() => {
    if (items.length && isNextSelection) {
      selectedItemIndexRef.current = getNextFocusableElement(
        selectedItemIndexRef.current,
        items
      );
      setSelectedItemIndex(selectedItemIndexRef.current);
    }
  }, [isNextSelection, items, lastUpdateTime, setSelectedItemIndex]);

  useEffect(() => {
    if (horizontalArrowHandler && rightPress) {
      horizontalArrowHandler(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rightPress]);

  useEffect(() => {
    if (horizontalArrowHandler && leftPress) {
      horizontalArrowHandler(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftPress]);
  const updateRefIndex = useCallback((updatedIndex) => {
    selectedItemIndexRef.current = updatedIndex;
  }, []);
  return { selectedItemIndex, updateRefIndex };
};

export const getNextFocusableElement = (selectedItem, elements) => {
  const lastElementIndex = elements.length - 1;
  const firstElementIndex = 0;
  return selectedItem < lastElementIndex ? selectedItem + 1 : firstElementIndex;
};

export const getPreviousFocusableElement = (selectedItem, elements) => {
  const lastElementIndex = elements.length - 1;
  return selectedItem > 0 ? selectedItem - 1 : lastElementIndex;
};

export const classMutationObserver = (selectedClassName) => {
  return function (event) {
    event.forEach((mutation) => {
      const { target: selectedElement = {} } = mutation;
      selectedElement &&
        selectedElement?.classList?.contains(selectedClassName) &&
        selectedElement?.focus();
    });
  };
};
