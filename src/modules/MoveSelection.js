import { useEffect, useRef, useState } from "react";

function MoveSelection() {
  const [selectedItem, setSelectedItem] = useState(null);
  const items = useRef([1, 2, 3, 4, 5]);

  useEffect(() => {
    const downHandler = (event) => {
      const { key } = event;
      if (key === "ArrowDown") {
        setSelectedItem((lastPosition) => lastPosition + 1);
      } else {
        setSelectedItem((lastPosition) => lastPosition - 1);
      }
    };
    window.addEventListener("keydown", downHandler);

    return () => {
      window.removeEventListener(downHandler);
    };
  }, []);

  return (
    <div>
      <ul>
        {items.current.map((item) => {
          return (
            <li key={item} className={selectedItem === item ? "selected" : ""}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default MoveSelection;
