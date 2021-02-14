export type TKeyOfCostsQueryParam = "id";
export type TValueOfCostsQueryParam = "new" | string | null;
export type TCostsQueryParam = {
  [key in TKeyOfCostsQueryParam]: TValueOfCostsQueryParam;
};
