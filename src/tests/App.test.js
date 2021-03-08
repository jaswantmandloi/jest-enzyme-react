import React from "react";
import { shallow } from "enzyme";
import App from "../App";
const title = "React enzyme jest";
const wrapped = shallow(<App />);

describe("App Title", () => {
  it("renders the Titles children", () => {
    expect(wrapped.find("div").text()).toEqual(title);
  });
});
