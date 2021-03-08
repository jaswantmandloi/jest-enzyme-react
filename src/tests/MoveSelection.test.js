import React from "react";
import { mount } from "enzyme";
import MoveSelection from "modules/MoveSelection";
import { act } from "react-dom/test-utils";

const map = {};
window.addEventListener = jest.fn((event, callback) => {
  map[event] = callback;
});

const wrapped = mount(<MoveSelection />);

describe("Move selection testing", () => {
  it("No item should be selected", () => {
    wrapped
      .find("ul")
      .find("li")
      .forEach((element) => {
        expect(element.hasClass("selected")).toEqual(false);
      });
    //
  });

  it("select fist item", async () => {
    act(async () => {
      fireKeyDown();
      await Promise.resolve(true);
      wrapped.update();
      //console.log("html", wrapped.debug());

      const firstElement = wrapped.find("ul").find("li").at(0);
      expect(firstElement.hasClass("selected")).toEqual(true);
    });
  });
});

function fireKeyDown() {
  map.keydown({ key: "ArrowDown" });
}
