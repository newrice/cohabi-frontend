import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SimpleButton } from "./SimpleButton";

describe("* SimpleButton", () => {
  test("invisible disabled", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        visible={false}
        disabled
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    expect(res.queryByTestId("simple-button")).toBeNull();
  });
  // invisible enabled
  test("invisible enabled", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        visible={false}
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    expect(res.queryByTestId("simple-button")).toBeNull();
  });
  // visible disabled
  test("visible disabled", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        disabled
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    userEvent.click(res.getByTestId("simple-button"));
    expect(handleClick).not.toBeCalled();
  });
  // visible enabled
  test("visible enabled", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    userEvent.click(res.getByTestId("simple-button"));
    expect(handleClick).toBeCalled();
  });
  // has class attributes
  test("has class attributes", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        onClick={handleClick}
        className="test-class1 test-class2"
        testid="simple-button"
      />,
    );
    expect(res.getByTestId("simple-button")).toHaveAttribute(
      "class",
      // TODO: containできないかな
      "MuiButtonBase-root MuiButton-root MuiButton-text parts-simple-button test-class1 test-class2",
    );
  });
  // has label text
  test("has label text", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    expect(res.getByTestId("simple-button")).toHaveTextContent("日本語");
  });
  // default
  test("no default test id", () => {
    const handleClick = jest.fn();
    const res = render(<SimpleButton label="日本語" onClick={handleClick} />);
    expect(res.getByText("日本語")).not.toHaveAttribute("data-testid");
  });
  // MuiButtons Props
  test("MuiButtons Props", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleButton
        label="日本語"
        variant="contained"
        type="reset"
        onClick={handleClick}
        testid="simple-button"
      />,
    );
    expect(res.getByTestId("simple-button")).toHaveAttribute("type", "reset");
  });
});
