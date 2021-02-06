import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import EditIcon from "@material-ui/icons/Edit";
import { SimpleFab } from "./SimpleFab";

describe("* SimpleFab", () => {
  test("enabled", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleFab handleClick={handleClick} icon={<EditIcon />} />,
    );
    expect(res.getByRole("button")).toBeEnabled();
  });
  test("enabled clickable", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleFab handleClick={handleClick} icon={<EditIcon />} />,
    );
    userEvent.click(res.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  test("disbale clickable", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleFab disabled handleClick={handleClick} icon={<EditIcon />} />,
    );
    expect(res.getByRole("button")).toBeDisabled();
  });
  test("disbale clickable", () => {
    const handleClick = jest.fn();
    const res = render(
      <SimpleFab disabled handleClick={handleClick} icon={<EditIcon />} />,
    );
    userEvent.click(res.getByRole("button"));
    expect(handleClick).toBeCalledTimes(0);
  });
});
