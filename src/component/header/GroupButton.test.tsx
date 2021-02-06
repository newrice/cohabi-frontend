import { render, cleanup, RenderResult } from "@testing-library/react";

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

describe("* GroupButton", () => {
  test.todo("is not signed in");
  test.todo("signed in to active");
  test.todo("can open");
  test.todo("list empty");
  test.todo("list one select");
  test.todo("list two select");
  test.todo("already selected");
  test.todo("exit to close");
});
