import { thousandCommas as Commas } from ".";

describe("* thousandCommas", () => {
  test("no commas minus", () => {
    expect(Commas(-999)).toBe("-999");
  });
  test("with one comma minus", () => {
    expect(Commas(-1000)).toBe("-1,000");
  });
  test("with two comma minus", () => {
    expect(Commas(-1000000)).toBe("-1,000,000");
  });
  test("zero", () => {
    expect(Commas(0)).toBe("0");
  });
  test("no commas", () => {
    expect(Commas(999)).toBe("999");
  });
  test("one commas", () => {
    expect(Commas(1000)).toBe("1,000");
  });
  test("two commas", () => {
    expect(Commas(1000000)).toBe("1,000,000");
  });
  test("decimal 1", () => {
    expect(Commas(1.1)).toBe("1.1");
  });
  test("decimal 2", () => {
    expect(Commas(1.11)).toBe("1.11");
  });
  test("decimal 1 with comma", () => {
    expect(Commas(1000.1)).toBe("1,000.1");
  });
  test("decimal 2 with comma", () => {
    expect(Commas(1000.11)).toBe("1,000.11");
  });
});
