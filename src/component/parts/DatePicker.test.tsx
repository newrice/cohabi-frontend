import React from "react";
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
  RenderResult,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DatePicker } from "./DatePicker";
import { getDateStr, getPlusMinusOneDate } from "../../../testutil/date";

let container: HTMLElement;
let customRender: RenderResult;
const now = new Date();
const getNow = () => {
  return new Date(now);
};
const testId = "test-datepicker";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let handleChange: jest.Mock<any, any>;
let targetDate: Date;
let targetPlusOne: Date;

beforeEach(() => {
  container = document.createElement("div");
  container.id = "_App_";
  targetDate = new Date(2020, 10 - 1, 14);
  targetPlusOne = new Date(2020, 10 - 1, 15);
  handleChange = jest.fn();
});
afterEach(() => {
  cleanup();
});

const setup = (element: JSX.Element) => {
  customRender = render(element, {
    container: document.body.appendChild(container),
  });
  return customRender;
};

describe("* DatePicker", () => {
  test("date has value", () => {
    const res = setup(
      <DatePicker
        value={getNow()}
        format="yyyy/MM/dd"
        onChange={handleChange}
        testid={testId}
      />,
    );
    expect(res.queryByTestId(testId)).toBeInTheDocument();
    expect(res.queryByTestId(testId)).toHaveValue(getDateStr(getNow()));
  });
  test("date could be changed", async () => {
    const value = targetDate;
    const res = setup(
      <DatePicker
        value={value}
        format="yyyy/MM/dd"
        onChange={handleChange}
        testid="test-datepicker"
      />,
    );
    userEvent.click(res.getByTestId(testId));
    userEvent.click(res.getByText("15"));
    userEvent.click(res.getByText("OK"));
    // TODO: test --env=jest-environment-jsdom-sixteen should remove by upgradeing react-scripts
    await waitForElementToBeRemoved(() => res.queryAllByRole("dialog"));
    expect(handleChange).toBeCalledWith(targetPlusOne);
    expect(res.queryByRole("dialog")).toBeNull();
  });
  test("date future to error", () => {
    const { plus } = getPlusMinusOneDate(getNow());

    const res = setup(
      <DatePicker
        value={plus}
        format="yyyy/MM/dd"
        disableFuture
        onChange={handleChange}
        testid="test-datepicker"
      />,
    );
    expect(res.queryByTestId("test-datepicker")).toHaveValue(getDateStr(plus));
    expect(
      res.queryByText("Date should not be after maximal date"),
    ).toBeInTheDocument();
  });
  test("date cancelable", async () => {
    const date = targetDate;
    const res = setup(
      <DatePicker
        value={date}
        onChange={handleChange}
        testid="test-datepicker"
      />,
    );
    userEvent.click(res.getByTestId(testId));
    userEvent.click(res.getByText("15"));
    userEvent.click(res.getByText("Cancel"));
    // TODO: test --env=jest-environment-jsdom-sixteen should remove by upgradeing react-scripts
    await waitForElementToBeRemoved(() => res.queryAllByRole("dialog"));
    expect(handleChange).not.toBeCalled();
    expect(res.queryByRole("dialog")).toBeNull();
  });
  test("date other date", () => {
    const otherDate = new Date(2019, 1 - 1, 1);
    const res = setup(
      <DatePicker
        value={otherDate}
        onChange={handleChange}
        format="yyyy/MM/dd"
        testid="test-datepicker"
      />,
    );
    expect(res.queryByTestId("test-datepicker")).toHaveValue(
      getDateStr(otherDate),
    );
  });
});
