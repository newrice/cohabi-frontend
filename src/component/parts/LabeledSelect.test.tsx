import React from "react";
import { render, cleanup, screen } from "@testing-library/react";
import { MenuItem } from "@material-ui/core";
import userEvent from "@testing-library/user-event";
import { LabeledSelect } from ".";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let handleChange: jest.Mock<any, any>;
let c: JSX.Element[];

beforeEach(() => {
  c = [
    <MenuItem key="category-select-a" value="aaa">
      AAA
    </MenuItem>,
    <MenuItem key="category-select-b" value="bbb">
      BBB
    </MenuItem>,
    <MenuItem key="category-select-c" value="ccc">
      CCC
    </MenuItem>,
    <MenuItem key="category-select-d" disabled value="ddd">
      DDD
    </MenuItem>,
    <MenuItem key="category-select-e" value="eee">
      EEE
    </MenuItem>,
  ];
  handleChange = jest.fn();
});

afterEach(() => {
  cleanup();
});

describe("* LabeledSelect", () => {
  test("children:x|value:x", () => {
    const value = "";
    const res = render(
      <LabeledSelect label="my-label" value={value} testid="labeled-select">
        {[]}
      </LabeledSelect>,
    );
    userEvent.click(res.getByRole("button"));
    expect(res.queryByTestId("labeled-select-input")).not.toHaveValue();
    expect(res.queryByRole("listbox")).toBeInTheDocument();
    expect(res.queryByRole("option")).not.toBeInTheDocument();
  });
  test("children:x|value:o", () => {
    const value = "aaa";
    const res = render(
      <LabeledSelect label="my-label" value={value} testid="labeled-select">
        {[]}
      </LabeledSelect>,
    );
    userEvent.click(res.getByRole("button"));
    expect(res.queryByTestId("labeled-select-input")).toHaveValue("aaa");
    expect(res.queryByRole("listbox")).toBeInTheDocument();
    expect(res.queryByRole("option")).not.toBeInTheDocument();
  });
  test("children:o|value:x", () => {
    const value = "";
    const res = render(
      <LabeledSelect label="my-label" value={value} testid="labeled-select">
        {c}
      </LabeledSelect>,
    );
    userEvent.click(res.getByRole("button"));
    expect(res.queryByTestId("labeled-select-input")).not.toHaveValue();
    expect(res.queryByRole("listbox")).toBeInTheDocument();
    expect(res.queryAllByRole("option")[0]).toHaveTextContent("AAA");
    expect(res.queryAllByRole("option")[1]).toHaveTextContent("BBB");
    expect(res.queryAllByRole("option")[2]).toHaveTextContent("CCC");
    expect(res.queryAllByRole("option")[3]).toHaveTextContent("DDD");
    expect(res.queryAllByRole("option")[4]).toHaveTextContent("EEE");
  });
  test("children:o|value:o", () => {
    const value = "bbb";
    const res = render(
      <LabeledSelect label="mylabel" value={value} testid="labeled-select">
        {c}
      </LabeledSelect>,
    );
    expect(res.queryByTestId("labeled-select-input")).toHaveValue("bbb");
    expect(res.queryByTestId("labeled-select-label")).toHaveTextContent("BBB");
    userEvent.click(res.getByRole("button"));
    expect(res.queryAllByRole("option")[0]).toHaveTextContent("AAA");
    expect(res.queryAllByRole("option")[1]).toHaveTextContent("BBB");
    expect(res.queryAllByRole("option")[2]).toHaveTextContent("CCC");
    expect(res.queryAllByRole("option")[3]).toHaveTextContent("DDD");
    expect(res.queryAllByRole("option")[4]).toHaveTextContent("EEE");
    expect(res.queryAllByRole("option").length).toBe(5);
  });
  test("not include value", () => {
    const value = "fff";
    const res = render(
      <LabeledSelect label="my-label" value={value} testid="labeled-select">
        {c}
      </LabeledSelect>,
    );
    expect(res.queryByTestId("labeled-select-input")).toHaveValue("fff");
    expect(res.queryByTestId("labeled-select-label")).not.toHaveTextContent("");
    userEvent.click(res.getByRole("button"));
    expect(res.queryAllByRole("option")[0]).toHaveTextContent("AAA");
    expect(res.queryAllByRole("option")[1]).toHaveTextContent("BBB");
    expect(res.queryAllByRole("option")[2]).toHaveTextContent("CCC");
    expect(res.queryAllByRole("option")[3]).toHaveTextContent("DDD");
    expect(res.queryAllByRole("option")[4]).toHaveTextContent("EEE");
    expect(res.queryAllByRole("option").length).toBe(5);
  });
  test("no label", () => {
    const value = "aaa";
    const res = render(
      <LabeledSelect label="" value={value} testid="labeled-select">
        {c}
      </LabeledSelect>,
    );
    expect(res.queryByTestId("wrapped-labeled-select-label")).toHaveTextContent(
      "",
    );
  });
  test("has Label", () => {
    const value = "aaa";
    const res = render(
      <LabeledSelect label="my-label" value={value} testid="labeled-select">
        {c}
      </LabeledSelect>,
    );
    // AAAのコンテンツにラベルがついていること
    expect(res.queryByTestId("labeled-select-label")).toHaveTextContent("AAA");
  });
  test("selectable", () => {
    const value = "aaa";
    const res = render(
      <LabeledSelect
        label="my-label"
        onChange={handleChange}
        value={value}
        testid="labeled-select"
      >
        {c}
      </LabeledSelect>,
    );
    userEvent.click(res.getByTestId("labeled-select-label"));
    userEvent.click(res.getAllByRole("option")[1]);
    expect(handleChange.mock.calls[0][0].target.value).toBe("bbb");
  });
  test("selectable", () => {
    const value = "";
    const res = render(
      <LabeledSelect
        label="my-label"
        onChange={handleChange}
        value={value}
        testid="labeled-select"
      >
        {c}
      </LabeledSelect>,
    );
    userEvent.click(res.getByTestId("labeled-select-label"));
    userEvent.click(res.getAllByRole("option")[0]);
    expect(handleChange.mock.calls[0][0].target.value).toBe("aaa");
  });
  test("closable", () => {
    const value = "";
    const res = render(
      <LabeledSelect
        label="my-label"
        onChange={handleChange}
        value={value}
        testid="labeled-select"
      >
        {c}
      </LabeledSelect>,
    );
    userEvent.click(res.getByTestId("labeled-select-label"));
    userEvent.click(res.getAllByRole("option")[2]);
    expect(handleChange.mock.calls[0][0].target.value).toBe("ccc");
    expect(res.queryByRole("listbox")).not.toBeInTheDocument();
  });
  test("has class", () => {
    const value = "eee";
    const res = render(
      <LabeledSelect
        label="my-label"
        onChange={handleChange}
        value={value}
        selectClass="my-sel-class"
        labelClass="my-lab-class"
        className="my-form-ctr-class"
        testid="labeled-select"
      >
        {c}
      </LabeledSelect>,
    );
    expect(
      res
        .getByTestId("labeled-select-label")
        .parentElement?.classList.contains("my-sel-class"),
    ).toBe(true);
    expect(res.getByText("my-label").classList.contains("my-lab-class")).toBe(
      true,
    );
    expect(
      res
        .getByText("my-label")
        .parentElement?.classList.contains("my-form-ctr-class"),
    ).toBe(true);
  });
});
