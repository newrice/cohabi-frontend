// eslint-disable-next-line import/prefer-default-export
export const ph = (phstr: string, vals: string[]): string => {
  let res = phstr;
  vals.forEach((val, index) => {
    res = res.replace(`{${index}}`, val);
  });
  return res;
};

// xxxx.0 -> x,xxx / xxxx.1 -> x,xxx.1
// eslint-disable-next-line import/prefer-default-export
export const thousandCommas = (num: number): string => {
  const s = String(num).split(".");
  let ret = String(s[0]).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  if (s.length > 1) {
    ret += `.${s[1]}`;
  }
  return ret;
};
