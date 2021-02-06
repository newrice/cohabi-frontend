import React from "react";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import _ from "lodash";
import { ISnackBar, SnackBar } from "./Snackbar";

let handleClose = jest.fn();

afterEach(() => {
  cleanup();
});

describe("* SnackBar", () => {
  beforeEach(() => {
    handleClose = jest.fn();
  });
  test("[open]:true, [message]:yes, [severity]:error, [closable]:true", () => {
    const snackProps: ISnackBar = {
      open: true,
      message: "test message",
      severity: "error",
      closable: true,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.getByRole("alert")).toHaveClass("MuiAlert-filledError"); // open, success
    expect(res.getByRole("alert")).toHaveTextContent("test message"); // message
    userEvent.click(res.getByRole("button"));
    expect(handleClose).toBeCalled(); // closable
  });
  test("[open]:true, [message]:no, [severity]:success, [closable]:true", () => {
    const snackProps: ISnackBar = {
      open: true,
      message: "",
      severity: "success",
      closable: true,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.getByRole("alert")).toHaveClass("MuiAlert-filledSuccess"); // open, success
    expect(res.getByRole("alert")).toHaveTextContent(""); // message
    userEvent.click(res.getByRole("button"));
    expect(handleClose).toBeCalled(); // closable
  });
  test("[open]:true, [message]:no, [severity]:warning, [closable]:false", () => {
    const snackProps: ISnackBar = {
      open: true,
      message: "",
      severity: "warning",
      closable: false,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.getByRole("alert")).toHaveClass("MuiAlert-filledWarning"); // open, success
    expect(res.getByRole("alert")).toHaveTextContent(""); // message
    expect(res.queryByRole("button")).not.toBeInTheDocument();
  });
  test("[open]:false, [message]:yes, [severity]:success, [closable]:false", () => {
    const snackProps: ISnackBar = {
      open: false,
      message: "test message",
      severity: "success",
      closable: false,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.queryByRole("alert")).not.toBeInTheDocument(); // open
  });
  test("[open]:false, [message]:yes, [severity]:warning, [closable]:true", () => {
    const snackProps: ISnackBar = {
      open: false,
      message: "test message",
      severity: "warning",
      closable: true,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.queryByRole("alert")).not.toBeInTheDocument(); // open
  });
  test("[open]:false, [message]:no, [severity]:success, [closable]:true", () => {
    const snackProps: ISnackBar = {
      open: false,
      message: "",
      severity: "success",
      closable: true,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.queryByRole("alert")).not.toBeInTheDocument(); // open
  });
  test("[open]:false, [message]:no, [severity]:error, [closable]:false", () => {
    const snackProps: ISnackBar = {
      open: false,
      message: "",
      severity: "error",
      closable: false,
      handleClose,
    };
    const res = render(<SnackBar {...snackProps} />);
    expect(res.queryByRole("alert")).not.toBeInTheDocument(); // open
  });
  test("MuiSnackbarProps : autoHideDuration", () => {
    jest.useFakeTimers();
    const snackProps: ISnackBar = {
      open: true,
      message: "test message",
      severity: "success",
      closable: true,
      handleClose,
      autoHideDuration: 1999,
    };
    render(<SnackBar {...snackProps} />);
    expect(setTimeout).toHaveBeenNthCalledWith(2, expect.anything(), 1999);
  });
  test("unclosable : Click away", () => {
    jest.useFakeTimers();
    const snackProps: ISnackBar = {
      open: true,
      message: "test message",
      severity: "success",
      closable: true,
      handleClose,
    };
    const res = render(
      <>
        <button>test button</button>
        <SnackBar {...snackProps} />
      </>,
    );
    userEvent.click(res.getByText("test button"));
    expect(res.queryByRole("alert")).toBeInTheDocument(); // open
    expect(handleClose).not.toBeCalled(); // closable
  });
});
