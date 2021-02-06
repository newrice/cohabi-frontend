import { ICategory, IUser } from "../types";
import {
  getCategoryName,
  getUserName,
  getAvatar,
  createSnackState,
  isN999,
} from "./dataUtil";

const categories: ICategory[] = [
  {
    id: "N_1",
    name: "名前1",
    disabled: false,
  },
  {
    id: "N_2",
    name: "名前2",
    disabled: true,
  },
  {
    id: "N_3",
    name: "名前3",
    disabled: false,
  },
  {
    id: "N_999",
    name: "名前999",
    disabled: false,
  },
  {
    id: "N_XXX",
    name: "名前XXX",
    disabled: false,
  },
];

const users: IUser[] = [
  {
    id: "N_1",
    name: "名前1",
    email: "mail1@example.com",
    avatar:
      "xxxaaabbbcccdddeeefff1112223334445556667778889990001112223334445556667778888999000",
  },
  {
    id: "N_2",
    name: "名前2",
    email: "mail2@example.com",
  },
];

describe("* dateUtil", () => {
  describe("* getCategoryName", () => {
    test("has item", () => {
      const name = getCategoryName(categories, "N_2");
      expect(name).toBe("名前2");
    });
    test("has item XXX", () => {
      const name = getCategoryName(categories, "N_XXX");
      expect(name).toBe("名前XXX");
    });
    test("no todo", () => {
      const name = getCategoryName(categories, "N_YYY");
      expect(name).toBe("N_YYY");
    });
    test("no list", () => {
      const name = getCategoryName([], "N_ZZZ");
      expect(name).toBe("N_ZZZ");
    });
  });
  describe("* getUserName", () => {
    test("has item1", () => {
      const name = getUserName(users, "N_1");
      expect(name).toBe("名前1");
    });
    test("has item2", () => {
      const name = getUserName(users, "N_2");
      expect(name).toBe("名前2");
    });
    test("no todo", () => {
      const name = getUserName(users, "N_YYY");
      expect(name).toBe("N_YYY");
    });
    test("no list", () => {
      const name = getUserName([], "N_ZZZ");
      expect(name).toBe("N_ZZZ");
    });
  });
  describe("* getAvatar", () => {
    test("has item1", () => {
      const name = getAvatar(users, "N_1");
      expect(name).toBe(
        "xxxaaabbbcccdddeeefff1112223334445556667778889990001112223334445556667778888999000",
      );
    });
    test("has item no avatar", () => {
      const name = getAvatar(users, "N_2");
      expect(name).toBe("");
    });
    test("no item", () => {
      const name = getAvatar(users, "N_YYY");
      expect(name).toBe("");
    });
    test("no list", () => {
      const name = getAvatar([], "N_ZZZ");
      expect(name).toBe("");
    });
  });
  describe("* createSnackState", () => {
    test("error msg", () => {
      const obj = createSnackState(true, "Failed");
      expect(obj).toEqual({
        message: "Failed",
        severity: "error",
        closable: false,
        autoHideDuration: undefined,
      });
    });
    test("error no msg", () => {
      const obj = createSnackState(true, "");
      expect(obj).toEqual({
        message: "",
        severity: "error",
        closable: false,
        autoHideDuration: undefined,
      });
    });
    test("no error msg", () => {
      const obj = createSnackState(false, "Success");
      expect(obj).toEqual({
        message: "Success",
        severity: "success",
        closable: true,
        autoHideDuration: 3000,
      });
    });
    test("no error no msg", () => {
      const obj = createSnackState(false, "");
      expect(obj).toEqual({
        message: "",
        severity: "success",
        closable: true,
        autoHideDuration: 3000,
      });
    });
  });
  describe("* isN999", () => {
    test("undef", () => {
      const b = isN999();
      expect(b).toBe(false);
    });
    test("str xxx", () => {
      const b = isN999("N_XXX");
      expect(b).toBe(true);
    });
    test("str 999", () => {
      const b = isN999("N_999");
      expect(b).toBe(true);
    });
    test("obj xxx", () => {
      const b = isN999({
        id: "N_XXX",
        name: "A",
        disabled: true,
      });
      expect(b).toBe(true);
    });
    test("obj 999", () => {
      const b = isN999({
        id: "N_999",
        name: "B",
        disabled: false,
      });
      expect(b).toBe(true);
    });
    test("str other", () => {
      const b = isN999("N_1");
      expect(b).toBe(false);
    });
    test("obj other", () => {
      const b = isN999({
        id: "N_XX",
        name: "C",
        disabled: true,
      });
      expect(b).toBe(false);
    });
  });
});
