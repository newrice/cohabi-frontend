import i18n, { TFunction } from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./resource_en";
import ja from "./resource_ja";

const initI18n = (): Promise<TFunction> =>
  i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: en,
      },
      ja: {
        translation: ja,
      },
    },
    lng: "ja",
    fallbackLng: "ja",
    interpolation: { escapeValue: false },
  });

export default initI18n;
