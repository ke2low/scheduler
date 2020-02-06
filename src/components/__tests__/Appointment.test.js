/*
  We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

import { render } from "@testing-library/react";

import Appointment from "components/Appointment";

/*
  A test that renders a React Component
*/
// it("renders without crashing", () => {
//   render(<Appointment />);
// });


// If we want to group a series of tests, we can wrap them all in a describe function. We will want to group related tests to organize our test suite as it grows.
describe("Appointment", () => {
  it("renders without crashing", () => {
    render(<Appointment />);
  });
});