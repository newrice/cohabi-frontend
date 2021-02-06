import { isApiError } from "./isApiError";

describe("* isApiError", () => {
  test("error with undefined", () => {
    const obj = isApiError(undefined);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe("");
  });
  test("only error", () => {
    const api = {
      result: {
        error: true,
        message: "test error",
      },
    };
    const obj = isApiError(api);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe("test error");
  });
  test("only error with no message", () => {
    const api = {
      result: {
        error: true,
        message: "",
      },
    };
    const obj = isApiError(api);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe("");
  });
  test("error and with no body", () => {
    const api = {
      result: {
        error: true,
        message: "",
      },
    };
    const obj = isApiError(api, true);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe("");
  });
  test("error with body", () => {
    const api = {
      result: {
        error: true,
        message: "test error",
      },
      body: {},
    };
    const obj = isApiError(api);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe("test error");
  });
  test("error as no body", () => {
    const api = {
      result: {
        error: false,
        message: "",
      },
    };
    const obj = isApiError(api, true);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe(""); // is it OK?
  });
  test("error as undefined body", () => {
    const api = {
      result: {
        error: false,
        message: "",
      },
      body: undefined,
    };
    const obj = isApiError(api, true);
    expect(obj.error).toBe(true);
    expect(obj.message).toBe(""); // is it OK?
  });
  test("no error with no body", () => {
    const api = {
      result: {
        error: false,
        message: "",
      },
    };
    const obj = isApiError(api);
    expect(obj.error).toBe(false);
    expect(obj.message).toBe(""); // is it OK?
  });
  test("no error with body", () => {
    const api = {
      result: {
        error: false,
        message: "",
      },
      body: {},
    };
    const obj = isApiError(api, true);
    expect(obj.error).toBe(false);
    expect(obj.message).toBe("");
  });
  test("no error with listed body", () => {
    const api = {
      result: {
        error: false,
        message: "",
      },
      body: ["test", "list", "body"],
    };
    const obj = isApiError(api, true);
    expect(obj.error).toBe(false);
    expect(obj.message).toBe("");
  });
});
