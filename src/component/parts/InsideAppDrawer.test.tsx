import React from "react";
import { render, cleanup, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InsideAppDrawer } from "./InsideAppDrawer";

let container: HTMLElement;
let customRender: RenderResult;

beforeEach(() => {
  container = document.createElement("div");
  container.id = "_App_";
});
afterEach(() => {
  cleanup();
});

const testInputAttr = {
  "data-testid": "test-input",
};

const setup = (element: JSX.Element) => {
  customRender = render(element, {
    container: document.body.appendChild(container),
  });
  return customRender;
};

describe("* InsideAppDrawer", () => {
  test("specified exist container", () => {
    const newContainer = document.createElement("div");
    newContainer.id = "test-container";
    const res = render(
      <InsideAppDrawer open={true} containerId="test-container">
        <input {...testInputAttr} />
      </InsideAppDrawer>,
      { container: document.body.appendChild(newContainer) },
    );
    expect(res.queryByRole("presentation")).toBeInTheDocument();
    expect(res.queryByRole("presentation")).toContainElement(
      res.getByTestId("test-input"),
    );
  });
  test("specified unexist container", () => {
    const newContainer = document.createElement("div");
    newContainer.id = "test-container";
    const res = render(
      <InsideAppDrawer open={true} containerId="test-container-notexist">
        <input {...testInputAttr} />
      </InsideAppDrawer>,
      { container: document.body.appendChild(newContainer) },
    );
    expect(res.queryByRole("presentation")).not.toBeInTheDocument();
    expect(res.queryByRole("test-input")).not.toBeInTheDocument();
  });
  test("unspecified exist container", () => {
    const res = setup(
      <InsideAppDrawer open={true}>
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );
    expect(res.queryByRole("presentation")).toBeInTheDocument();
    expect(res.queryByRole("presentation")).toContainElement(
      res.getByTestId("test-input"),
    );
  });
  test("unspecified unexist container", () => {
    const res = setup(
      <InsideAppDrawer open={true} containerId="_App_notexist">
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );
    expect(res.queryByRole("presentation")).not.toBeInTheDocument();
    expect(res.queryByRole("test-input")).not.toBeInTheDocument();
  });
  test("render child", () => {
    const res = setup(
      <InsideAppDrawer open={true}>
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );
    expect(res.queryByRole("presentation")).toContainElement(
      res.getByTestId("test-input"),
    );
  });
  test("pass mui drawer props - non pass", async () => {
    const onClose = jest.fn();
    const res = setup(
      <InsideAppDrawer open={true} onClose={onClose}>
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );

    expect(onClose).not.toBeCalled();
    userEvent.type(res.getByTestId("test-input"), "{esc}");
    expect(onClose).toBeCalledTimes(1);
  });
  test("pass mui drawer props - pass", async () => {
    const onClose = jest.fn();
    const res = setup(
      <InsideAppDrawer open={true} onClose={onClose} disableEscapeKeyDown>
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );

    expect(onClose).not.toBeCalled();
    userEvent.type(res.getByTestId("test-input"), "{esc}");
    expect(onClose).not.toBeCalled();
  });
  test("close", () => {
    const res = setup(
      <InsideAppDrawer open={false}>
        <input {...testInputAttr} />
      </InsideAppDrawer>,
    );
    expect(res.queryByRole("presentation")).not.toBeInTheDocument();
    expect(res.queryByRole("test-input")).not.toBeInTheDocument();
  });
});
