import { arrayMoveClone, arrayMoveMutate } from "./arrayUtil";

const fixture = () => [
  { id: 1, name: "a" },
  { id: 2, name: "b" },
  { id: 3, name: "c" },
  { id: 4, name: "d" },
  { id: 5, name: "e" },
];

describe("* arrayUtil ", () => {
  test("* arrayMoveByClone", () => {
    const base = fixture();
    expect(arrayMoveClone(base, 3, 0)).toEqual([
      { id: 4, name: "d" },
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
      { id: 5, name: "e" },
    ]);
    expect(arrayMoveClone(base, -1, 0)).toEqual([
      { id: 5, name: "e" },
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
      { id: 4, name: "d" },
    ]);
    expect(arrayMoveClone(base, 1, -2)).toEqual([
      { id: 1, name: "a" },
      { id: 3, name: "c" },
      { id: 4, name: "d" },
      { id: 2, name: "b" },
      { id: 5, name: "e" },
    ]);
    expect(arrayMoveClone(base, -3, -4)).toEqual([
      { id: 1, name: "a" },
      { id: 3, name: "c" },
      { id: 2, name: "b" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
    ]);
    expect(arrayMoveClone(base, 5, 6)).toEqual([
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
      { id: 4, name: "d" },
      { id: 5, name: "e" },
    ]);
    expect(arrayMoveClone(base, -1000, 0)).toEqual(fixture());
    expect(arrayMoveClone(base, 1000, 0)).toEqual(fixture());
    expect(base).toEqual(fixture());
  });
  test("* arrayMoveMutate", () => {
    const base = fixture();
    arrayMoveMutate(base, 3, 0);
    expect(base).toEqual([
      { id: 4, name: "d" },
      { id: 1, name: "a" },
      { id: 2, name: "b" },
      { id: 3, name: "c" },
      { id: 5, name: "e" },
    ]);
  });
});
