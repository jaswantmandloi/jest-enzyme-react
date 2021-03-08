import { useEffect, useRef, useState } from "react";

function MoveSelection() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const items = useRef([1, 2, 3, 4, 5]);
  const { key } = useKeyPress();
  // eslint-disable-next-line no-console
  //console.log("key", key);

  useEffect(() => {
    if (key === "ArrowDown") {
      setSelectedItemIndex((lastPosition) => lastPosition + 1);
    }
  }, [key]);

  useEffect(() => {
    if (key === "ArrowUp") {
      setSelectedItemIndex((lastPosition) => lastPosition - 1);
    }
  }, [key]);

  return (
    <div>
      <ul>
        {items.current.map((item) => {
          return (
            <li
              key={item}
              className={selectedItemIndex === item ? "selected" : ""}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MoveSelection;

const useKeyPress = () => {
  const [event, setEvent] = useState({ key: "" });
  useEffect(() => {
    const downHandler = (event) => {
      // eslint-disable-next-line no-console
      //console.log("event", event);
      setEvent({ key: event.key, lastUpdateTime: new Date().getTime() });
    };
    const upHandler = () => {
      setEvent({ key: "", lastUpdateTime: new Date().getTime() });
    };
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener(downHandler);
      window.removeEventListener(upHandler);
    };
  }, []);

  return event;
};
