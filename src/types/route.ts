export type TKeyOfCostsQueryParam = "mode";
export type TValueOfCostsParam = "list" | "new";
export type TCostsQueryParam = {
  [key in TKeyOfCostsQueryParam]: TValueOfCostsParam;
};
