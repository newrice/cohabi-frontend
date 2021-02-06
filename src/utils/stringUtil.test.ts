import { ph } from "./stringUtil";

let target: string;
let replaces: string[];
beforeEach(() => {
  target = "";
  replaces = [];
});

describe("* String Util", () => {
  describe("* ph", () => {
    // 0 string - empty string, 0 vals
    test("0 string - empty string, 0 vals", () => {
      const res = ph(target, replaces);
      expect(res).toBe("");
    });
    // 0 string, 0 vals
    test("0 string, 0 vals", () => {
      target = "こんにちは世界";
      const res = ph(target, replaces);
      expect(res).toBe("こんにちは世界");
    });
    // 1 string, 0 vals
    test("1 string, 0 vals", () => {
      target = "こんにちは{0}世界";
      const res = ph(target, replaces);
      expect(res).toBe("こんにちは{0}世界");
    });
    // 0 string, 1 vals
    test("0 string, 1 vals", () => {
      target = "Hello, World!!";
      replaces = ["everyone in the"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, World!!");
    });
    // 1 string, 1 vals
    test("1 string, 1 vals", () => {
      target = "Hello, {0} World!!";
      replaces = ["everyone in the"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, everyone in the World!!");
    });
    // 2 string, 1 vals
    test("2 string, 1 vals", () => {
      target = "Hello, {0} {1} World!!";
      replaces = ["everyone in the"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, everyone in the {1} World!!");
    });
    // 1 string, 2 vals
    test("1 string, 2 vals", () => {
      target = "Hello, {0} World!!";
      replaces = ["everyone in this", "beautiful"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, everyone in this World!!");
    });
    // 2 string, 2 vals
    test("2 string, 2 vals", () => {
      target = "Hello, {0} {1} World!!";
      replaces = ["everyone in this", "beautiful"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, everyone in this beautiful World!!");
    });
    // string reverse
    test("string reverse", () => {
      target = "Hello, {1} {0} World!!";
      replaces = ["everyone in this", "beautiful"];
      const res = ph(target, replaces);
      expect(res).toBe("Hello, beautiful everyone in this World!!");
    });
  });
});
